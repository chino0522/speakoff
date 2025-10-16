"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientBrowser } from "@/utils/supabase/client";
import PodcastEnded from "./PodcastEnded";
import PodcastHostView from "./PodcastHostView";
import PodcastListenerView from "./PodcastListenerView";

type PodcastRoomClientProps = {
    roomId: string;
    uid: string;
    isHost: boolean;
};

export default function PodcastRoomClient({
    roomId,
    uid,
    isHost,
}: PodcastRoomClientProps) {
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLive, setIsLive] = useState(isHost);
    const clientRef = useRef<any>(null);
    const trackRef = useRef<any>(null);
    const router = useRouter();

    // 🎧 Initialize and join Agora
    useEffect(() => {
        const init = async () => {
            const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
            const res = await fetch("/api/agora/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ channelName: roomId, uid, isHost }),
            });

            const { appId, rtcToken } = await res.json();
            const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
            clientRef.current = client;

            await client.setClientRole(isHost ? "host" : "audience");
            await client.join(appId, roomId, rtcToken, uid);

            setJoined(true);
        };

        init();

        return () => {
            trackRef.current?.close();
            clientRef.current?.leave();
        };
    }, [roomId, uid, isHost]);

    // 🧠 Listen for podcast ending via Supabase
    useEffect(() => {
        const supabase = createClientBrowser();
        const channel = supabase
            .channel("podcast-status")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "podcasts", filter: `id=eq.${roomId}` },
                (payload) => {
                    if (payload.new?.is_live === false) {
                        console.log("Podcast ended remotely.");
                        trackRef.current?.close();
                        clientRef.current?.leave();
                        setIsLive(false);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId]);

    // 🧩 Conditional Rendering
    if (!isLive) return <PodcastEnded />;

    if (!joined)
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <p>Connecting to podcast...</p>
            </div>
        );

    return isHost ? (
        <PodcastHostView
            clientRef={clientRef}
            trackRef={trackRef}
            setIsLive={setIsLive}
            loading={loading}
            setLoading={setLoading}
            roomId={roomId}
        />
    ) : (
        <PodcastListenerView clientRef={clientRef} setIsLive={setIsLive} />
    );
}
