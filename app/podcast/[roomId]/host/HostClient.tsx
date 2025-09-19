"use client";

import { useEffect, useMemo, useRef } from "react";
import type {
    IAgoraRTCClient,
    IRemoteAudioTrack,
    ICameraVideoTrack,
    IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";

export default function HostClient({ roomId }: { roomId: string }) {
    const uid = useMemo(() => Math.floor(Math.random() * 1e7), []);
    const clientRef = useRef<IAgoraRTCClient | null>(null);
    const localTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

    useEffect(() => {
        let client: IAgoraRTCClient;

        (async () => {
            const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

            // 🔑 Get token from your backend
            const res = await fetch("/api/agora/token", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ channelName: roomId, uid, role: "host" }),
            });

            const { appId, rtcToken } = await res.json();

            // 🎬 Create client
            client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
            clientRef.current = client;

            // 🔔 Handle remote users publishing
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "audio" && user.audioTrack) {
                    const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
                    remoteAudioTrack.play();
                }
            });

            client.on("user-unpublished", (user) => {
                console.log("User unpublished:", user.uid);
            });

            // 🚀 Join as host
            await client.setClientRole("host");
            await client.join(appId, roomId, rtcToken, uid);

            // 🎙️ Create & publish mic
            const mic = await AgoraRTC.createMicrophoneAudioTrack();
            localTrackRef.current = mic;
            await client.publish([mic]);

            console.log("✅ Host joined and publishing mic");
        })();

        return () => {
            (async () => {
                if (localTrackRef.current) {
                    localTrackRef.current.stop();
                    localTrackRef.current.close();
                }
                if (client) {
                    await client.leave();
                }
                console.log("👋 Left channel and cleaned up");
            })();
        };
    }, [roomId, uid]);

    return <h1>🎙️ Hosting Podcast: {roomId}</h1>;
}
