"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
    useRTCClient,
    useJoin,
    usePublish,
    useLocalMicrophoneTrack,
} from "agora-rtc-react"

type Props = {
    roomId: string
    uid: string
    isHost: boolean
}

export default function PodcastRoomClient({ roomId, uid, isHost }: Props) {
    const router = useRouter()
    const client = useRTCClient()
    const [joined, setJoined] = useState(false)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const micTrack = useLocalMicrophoneTrack(isHost)

    // 🎫 Fetch Agora token before joining
    useEffect(() => {
        const fetchToken = async () => {
            const res = await fetch("/api/agora/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ channelName: roomId, uid, isHost }),
            })
            const { rtcToken } = await res.json()
            setToken(rtcToken)
        }
        fetchToken()
    }, [roomId, uid, isHost])

    // 🎧 Join and set role once token is available
    useEffect(() => {
        if (!token) return

        const joinChannel = async () => {
            await client.setClientRole(isHost ? "host" : "audience")
            await client.join(process.env.NEXT_PUBLIC_AGORA_APP_ID!, roomId, token, uid)

            if (!isHost) {
                client.on("user-published", async (user, mediaType) => {
                    await client.subscribe(user, mediaType)
                    if (mediaType === "audio" && user.audioTrack) {
                        user.audioTrack.play()
                    }
                })
            }

            setJoined(true)
        }

        joinChannel()
        return () => {
            micTrack?.localMicrophoneTrack?.close()
            client.leave()
        }
    }, [token])

    // 📡 Publish local mic track if host
    usePublish(isHost && micTrack?.localMicrophoneTrack ? [micTrack.localMicrophoneTrack] : [])

    const handleEndStream = async () => {
        setLoading(true)
        try {
            micTrack?.localMicrophoneTrack?.close()
            await client.leave()
            await fetch("/api/podcast/end", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomId }),
            })
            router.push("/")
        } catch (err) {
            console.error("Error ending stream:", err)
        } finally {
            setLoading(false)
        }
    }

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
    )
}
