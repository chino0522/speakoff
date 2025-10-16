"use client";

import { useEffect, useState } from "react";

type LiveChatProps = {
    roomId: string;
    uid: string;
    rtmClient: React.MutableRefObject<any>;
    rtmChannel: React.MutableRefObject<any>;
};

export default function LiveChat({ roomId, uid, rtmClient, rtmChannel }: LiveChatProps) {
    const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
    const [input, setInput] = useState("");


    useEffect(() => {
        console.log("💬 LiveChat mounted for room:", roomId);

        const channel = rtmChannel.current;
        if (!channel) {
            console.error("❌ RTM channel not available");
            return;
        }

        // Listen for new messages
        const handleMessage = (message: any, peerId: string) => {
            setMessages((prev) => [...prev, { user: peerId, text: message.text }]);
        };

        channel.on("ChannelMessage", handleMessage);

        return () => {
            channel.off("ChannelMessage", handleMessage);
        };
    }, [rtmChannel, roomId]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || !rtmChannel.current) return;

        try {
            await rtmChannel.current.sendMessage({ text });
            setMessages((prev) => [...prev, { user: uid, text }]);
            setInput("");
        } catch (err) {
            console.error("❌ Failed to send RTM message:", err);
        }
    };

    return (
        <div className="absolute right-6 bottom-6 z-[9999] bg-gray-900">
            {/* 💬 Messages Section */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-2 rounded-md ${msg.user === uid
                            ? "bg-purple-600 text-white self-end ml-auto max-w-[80%]"
                            : "bg-gray-800 text-gray-200 max-w-[80%]"
                            }`}
                    >
                        <p className="text-xs opacity-70">
                            {msg.user === uid ? "You" : msg.user}
                        </p>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                ))}
            </div>

            {/* ✏️ Input Section */}
            <div className="flex items-center border-t border-gray-800 p-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent text-white outline-none text-sm px-2"
                />
                <button
                    onClick={sendMessage}
                    className="px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
