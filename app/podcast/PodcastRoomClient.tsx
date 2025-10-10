"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type PodcastRoomClientProps = {
    roomId: string;
    uid: string;
    isHost: boolean;
};

export default function PodcastRoomClient({ roomId, uid, isHost }: PodcastRoomClientProps) {
    const [joined, setJoined] = useState(false);
    const [loading, setLoading] = useState(false);
    const clientRef = useRef<any>(null);
    const trackRef = useRef<any>(null);
    const router = useRouter();

    // 🎧 Join + setup audio
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

            // ✅ set correct role
            await client.setClientRole(isHost ? "host" : "audience");

            // Join
            await client.join(appId, roomId, rtcToken, uid);

            if (isHost) {
                const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
                await client.publish([micTrack]);
                trackRef.current = micTrack;
            } else {
                client.on("user-published", async (user: any, mediaType: "audio" | "video" | "datachannel") => {
                    await client.subscribe(user, mediaType);
                    if (mediaType === "audio" && user.audioTrack) {
                        user.audioTrack.play();
                    }
                });
            }

            setJoined(true);
        };

        init();

        return () => {
            // Cleanup when leaving
            trackRef.current?.close();
            clientRef.current?.leave();
        };
    }, [roomId, uid, isHost]);

    // 🛑 Host manually ends stream
    const handleEndStream = async () => {
        setLoading(true);

        try {
            // Close local mic
            trackRef.current?.close();

            // Leave channel
            await clientRef.current?.leave();

            // Update Supabase: mark stream as not live
            await fetch("/api/podcast/end", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId }),
            });

            // Redirect
            router.push("/");
        } catch (err) {
            console.error("Error ending stream:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
            {joined ? (
                <>
                    <p className="text-xl font-semibold">
                        {isHost ? "🎙️ You’re live!" : "🎧 Listening to the podcast..."}
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
