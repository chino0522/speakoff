"use client";

import { useEffect } from "react";

type Props = {
    clientRef: any;
    setIsLive: (val: boolean) => void;
};

export default function PodcastListenerView({ clientRef, setIsLive }: Props) {
    useEffect(() => {
        const setupListener = async () => {
            const client = clientRef.current;
            client.on("user-published", async (user: any, mediaType: "audio") => {
                await client.subscribe(user, mediaType);
                if (user.audioTrack) user.audioTrack.play();
                setIsLive(true);
            });
        };
        setupListener();
    }, [clientRef, setIsLive]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white space-y-6">
            <p className="text-xl font-semibold">🎧 Listening...</p>
        </div>
    );
}
