"use client";

import { useEffect } from "react";

type Props = {
    clientRef: any;
    trackRef: any;
    setIsLive: (val: boolean) => void;
    loading: boolean;
    setLoading: (val: boolean) => void;
    roomId: string;
};

export default function PodcastHostView({
    clientRef,
    trackRef,
    setIsLive,
    loading,
    setLoading,
    roomId,
}: Props) {
    useEffect(() => {
        const setupHost = async () => {
            const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
            const micTrack = await AgoraRTC.createMicrophoneAudioTrack();
            await clientRef.current.publish([micTrack]);
            trackRef.current = micTrack;
            setIsLive(true);
        };
        setupHost();

        return () => {
            trackRef.current?.close();
        };
    }, [clientRef, setIsLive, trackRef]);

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
            console.error("Error ending stream:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
            <p className="text-xl font-semibold">🎙️ You’re live!</p>
            <button
                onClick={handleEndStream}
                disabled={loading}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
            >
                {loading ? "Ending..." : "End Stream"}
            </button>
        </div>
    );
}
