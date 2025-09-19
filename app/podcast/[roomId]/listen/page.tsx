"use client";

import { use, useEffect, useMemo, useRef } from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";

export default function Listener({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = use(params); // ✅ unwrap params
    const uid = useMemo(() => Math.floor(Math.random() * 1e7), []);
    const clientRef = useRef<IAgoraRTCClient | null>(null);

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/agora/token", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ channelName: roomId, uid, role: "audience" }),
            });
            const { appId, rtcToken } = await res.json();

            const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
            clientRef.current = client;

            await client.setClientRole("audience");
            await client.join(appId, roomId, rtcToken, uid);

            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "audio" && user.audioTrack) {
                    user.audioTrack.play();
                }
            });
        })();

        return () => {
            clientRef.current?.leave();
        };
    }, [roomId, uid]);

    return <h1>🎧 Listening to Podcast: {roomId}</h1>;
}
