"use client"

import { Button } from '@radix-ui/themes';
import { Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PodcastEnded() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-theme-black flex items-center justify-center p-6">
            <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-theme-purple to-theme-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mic className="w-10 h-10 text-white" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">
                    The host has ended the podcast
                </h1>
                <Button
                    size="3"
                    className="px-8 py-3 bg-theme-lime text-black hover:bg-[#d4e89b] rounded-lg cursor-pointer transition-colors font-medium"
                    onClick={() => {
                        router.push('/dashboard')
                    }}
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
}