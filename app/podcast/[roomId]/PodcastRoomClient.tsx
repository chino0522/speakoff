"use client";

import { useEffect, useRef, useState } from "react";
import { createClientBrowser } from "@/utils/supabase/client";
import PodcastEnded from "./PodcastEnded";
import PodcastHostView from "./PodcastHostView";
import PodcastListenerView from "./PodcastListenerView";
import LiveChat from "./LiveChat";

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

    const clientRef = useRef<any>(null); // Agora RTC
    const trackRef = useRef<any>(null);
    const rtmClientRef = useRef<any>(null); // Agora RTM
    const rtmChannelRef = useRef<any>(null);

    // 🎧 Initialize Agora RTC
    useEffect(() => {
        const initAgora = async () => {
            try {
                const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

                const res = await fetch("/api/agora/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ channelName: roomId, uid, isHost }),
                });

                const { appId, rtcToken, rtmToken } = await res.json();

                // --- RTC ---
                const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
                clientRef.current = client;
                await client.setClientRole(isHost ? "host" : "audience");
                await client.join(appId, roomId, rtcToken, uid);

                // --- RTM ---
                const AgoraRTM = (await import("agora-rtm-sdk")).default;
                const rtmClient = AgoraRTM.createInstance(appId);
                await rtmClient.login({ uid: String(uid), token: rtmToken });
                rtmClientRef.current = rtmClient;

                const rtmChannel = await rtmClient.createChannel(roomId);
                rtmChannelRef.current = rtmChannel;
                await rtmChannel.join();

                // Listen for messages
                rtmChannel.on("ChannelMessage", (message, peerId) => {
                    console.log("📩 Message from", peerId, ":", message.text);
                });

                setJoined(true);
            } catch (err) {
                console.error("Error joining Agora:", err);
            }
        };

        initAgora();

        return () => {
            trackRef.current?.close();
            clientRef.current?.leave();
            rtmChannelRef.current?.leave();
            rtmClientRef.current?.logout();
        };
    }, [roomId, uid, isHost]);

    // 🧠 Supabase listener for end of podcast
    useEffect(() => {
        const supabase = createClientBrowser();

        const channel = supabase
            .channel("podcast-status")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "podcasts",
                    filter: `id=eq.${roomId}`,
                },
                (payload) => {
                    if (payload.new?.is_live === false) {
                        console.log("🎙️ Podcast ended remotely.");
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

    // 🧩 Conditional UI
    if (!isLive) return <PodcastEnded />;
    if (!joined)
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <p>Connecting to podcast...</p>
            </div>
        );


    return (
        <>
            {isHost ? (
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
            )}

            {/* 🗨️ Live Chat (RTM-based) */}
            {rtmClientRef.current && rtmChannelRef.current && (
                <LiveChat
                    roomId={roomId}
                    uid={uid}
                    rtmClient={rtmClientRef}
                    rtmChannel={rtmChannelRef}
                />
            )}
        </>
    );
}
