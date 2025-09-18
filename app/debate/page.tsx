"use client";
import { useEffect, useRef, useState } from "react";

export default function DebateRoom() {
    const [role, setRole] = useState<"debater" | "listener" | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const roomId = "room1"; // hardcoded room for now
        const ws = new WebSocket("https://4b2b8ea9c947.ngrok-free.app");
        wsRef.current = ws;

        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" } // free Google STUN
            ]
        });

        pcRef.current = pc;

        // 🔊 Play incoming audio
        pc.ontrack = (e) => {
            const audio = document.createElement("audio");
            audio.srcObject = e.streams[0];
            audio.autoplay = true;
            document.body.appendChild(audio);
        };

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "join", roomId }));
        };

        ws.onmessage = async (event) => {
            const { type, from, payload } = JSON.parse(event.data);

            if (type === "role") {
                setRole(payload);
                if (payload === "debater") {
                    // 🎙️ Capture mic if debater
                    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
                        pc.createOffer().then((offer) => {
                            pc.setLocalDescription(offer);
                            ws.send(JSON.stringify({ type: "offer", roomId, payload: offer }));
                        });
                    });
                }
            }

            if (type === "offer") {
                await pc.setRemoteDescription(new RTCSessionDescription(payload));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                ws.send(JSON.stringify({ type: "answer", roomId, payload: answer }));
            } else if (type === "answer") {
                await pc.setRemoteDescription(new RTCSessionDescription(payload));
            } else if (type === "candidate") {
                await pc.addIceCandidate(new RTCIceCandidate(payload));
            }
        };

        // Send ICE candidates
        pc.onicecandidate = (e) => {
            if (e.candidate) {
                ws.send(JSON.stringify({ type: "candidate", roomId, payload: e.candidate }));
            }
        };

        return () => {
            ws.close();
            pc.close();
        };
    }, []);

    return (
        <div>
            <h1>🎤 Debate Room</h1>
            <p>{role ? `You are a ${role}` : "Joining..."}</p>
        </div>
    );
}
