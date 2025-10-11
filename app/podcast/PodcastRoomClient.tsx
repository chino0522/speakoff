"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientBrowser } from "@/utils/supabase/client";
import PodcastEnded from "./PodcastEnded";

type PodcastRoomClientProps = {
    roomId: string;
    uid: string;
    isHost: boolean;
};

export default function PodcastRoomClient({ roomId, uid, isHost }: PodcastRoomClientProps) {
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLive, setIsLive] = useState(isHost); // Host starts live
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

            if (isHost) {
                const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
                await client.publish([micTrack]);
                trackRef.current = micTrack;
                setIsLive(true);
            } else {
                client.on("user-published", async (user: any, mediaType: "audio") => {
                    await client.subscribe(user, mediaType);
                    if (user.audioTrack) user.audioTrack.play();
                    setIsLive(true);
                });
            }

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

    // 🛑 Host manually ends stream
    const handleEndStream = async () => {
        setLoading(true);
        try {
            trackRef.current?.close();
            await clientRef.current?.leave();
            await fetch("/api/podcast/end", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId }),
            });
            setIsLive(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // 🧩 Conditional rendering
    if (!isLive) {
        return <PodcastEnded />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
            {joined ? (
                <>
                    <p className="text-xl font-semibold">
                        {isHost ? "🎙️ You’re live!" : "🎧 Listening..."}
                    </p>
                    {isHost && (
                        <button
                            onClick={handleEndStream}
                            disabled={loading}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
                        >
                            {loading ? "Ending..." : "End Stream"}
                        </button>
                    )}
                </>
            ) : (
                <p>Connecting to podcast...</p>
            )}
        </div>
    );
}
