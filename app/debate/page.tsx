"use client";
import { useEffect, useRef, useState } from "react";

type PeerConnections = { [peerId: string]: RTCPeerConnection };

export default function DebateRoom() {
    const [peerId, setPeerId] = useState<string | null>(null);
    const [participants, setParticipants] = useState<string[]>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const pcsRef = useRef<PeerConnections>({});
    const localStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const roomId = "room1"; // hardcoded for now
        const ws = new WebSocket("wss://4b2b8ea9c947.ngrok-free.app");
        wsRef.current = ws;

        // 🔹 Setup WebSocket
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "join", roomId }));
        };

        ws.onmessage = async (event) => {
            const { type, peerId: otherId, from, payload } = JSON.parse(event.data);

            if (type === "joined") {
                setPeerId(otherId);
                console.log(`🟢 You joined as ${otherId}`);

                // Get mic stream once
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                localStreamRef.current = stream;
            }

            if (type === "new-peer") {
                console.log(`👋 Peer joined: ${otherId}`);
                setParticipants((prev) => [...prev, otherId]);
                createConnection(otherId, true); // true = initiator
            }

            if (type === "offer") {
                console.log(`📩 Offer from ${from}`);
                createConnection(from, false, payload.sdp);
            }

            if (type === "answer") {
                console.log(`📩 Answer from ${from}`);
                const pc = pcsRef.current[from];
                if (pc) {
                    await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
                }
            }

            if (type === "candidate") {
                const pc = pcsRef.current[from];
                if (pc) {
                    await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
                }
            }

            if (type === "peer-left") {
                console.log(`❌ Peer left: ${otherId}`);
                setParticipants((prev) => prev.filter((id) => id !== otherId));
                const pc = pcsRef.current[otherId];
                if (pc) {
                    pc.close();
                    delete pcsRef.current[otherId];
                }
            }
        };

        function createConnection(targetId: string, isInitiator: boolean, remoteSdp?: any) {
            if (pcsRef.current[targetId]) return; // already exists

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
            });
            pcsRef.current[targetId] = pc;

            // 🔊 Play remote audio
            pc.ontrack = (e) => {
                const audio = document.createElement("audio");
                audio.srcObject = e.streams[0];
                audio.autoplay = true;
                document.body.appendChild(audio);
            };

            // 📤 Send ICE candidates
            pc.onicecandidate = (e) => {
                if (e.candidate) {
                    ws.send(
                        JSON.stringify({
                            type: "candidate",
                            roomId,
                            from: peerId,
                            payload: { target: targetId, candidate: e.candidate }
                        })
                    );
                }
            };

            // 🎙️ Add local audio
            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => {
                    pc.addTrack(track, localStreamRef.current!);
                });
            }

            // If initiator, create and send an offer
            if (isInitiator) {
                pc.createOffer().then((offer) => {
                    pc.setLocalDescription(offer);
                    ws.send(
                        JSON.stringify({
                            type: "offer",
                            roomId,
                            from: peerId,
                            payload: { target: targetId, sdp: offer }
                        })
                    );
                });
            } else if (remoteSdp) {
                // Not initiator → handle incoming offer
                pc.setRemoteDescription(new RTCSessionDescription(remoteSdp)).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        ws.send(
                            JSON.stringify({
                                type: "answer",
                                roomId,
                                from: peerId,
                                payload: { target: targetId, sdp: answer }
                            })
                        );
                    });
                });
            }
        }

        return () => {
            Object.values(pcsRef.current).forEach((pc) => pc.close());
            ws.close();
        };
    }, []);

    return (
        <div>
            <h1>🎤 Debate Room</h1>
            <p>My PeerId: {peerId}</p>
            <h2>Participants</h2>
            <ul>
                {participants.map((id) => (
                    <li key={id}>{id}</li>
                ))}
            </ul>
        </div>
    );
}
