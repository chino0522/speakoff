"use client";

import { useEffect, useMemo, useRef } from "react";
import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";

export default function HostClient({ roomId }: { roomId: string }) {
    const uid = useMemo(() => Math.floor(Math.random() * 1e7), []);
    const clientRef = useRef<IAgoraRTCClient | null>(null);

    useEffect(() => {
        let client: IAgoraRTCClient;

        (async () => {
            const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

            const res = await fetch("/api/agora/token", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ channelName: roomId, uid, role: "host" }),
            });

            const { appId, rtcToken } = await res.json();

            client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
            clientRef.current = client;

            await client.setClientRole("host");
            await client.join(appId, roomId, rtcToken, uid);

            const mic = await AgoraRTC.createMicrophoneAudioTrack();
            await client.publish([mic]);
        })();

        return () => {
            client?.leave();
        };
    }, [roomId, uid]);

    return <h1>🎙️ Hosting Podcast: {roomId}</h1>;
}
