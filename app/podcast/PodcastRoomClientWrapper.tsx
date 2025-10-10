"use client";

import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider, IAgoraRTCClient } from "agora-rtc-react";
import PodcastRoomClient from "./PodcastRoomClient";

interface Props {
    roomId: string;
    uid: string;
    isHost: boolean;
}

export default function PodcastRoomClientWrapper({ roomId, uid, isHost }: Props) {
    const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" }) as unknown as IAgoraRTCClient;

    return (
        <AgoraRTCProvider client={client}>
            <PodcastRoomClient roomId={roomId} uid={uid} isHost={isHost} />
        </AgoraRTCProvider>
    );
}
