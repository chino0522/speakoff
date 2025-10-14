"use client"

import { Button } from '@radix-ui/themes';
import { Share, Mic, Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Podcast {
    id: string;
    title: string;
    description: string | null;
    channel_name: string | null;
    tags: string | null;
    start_time: string | null;
    end_time: string | null;
    num_of_listeners: number | null;
    num_of_likes: number | null;
    host_id: string | null;
}

export default function Dashboard() {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        fetchPodcasts();
    }, []);

    const fetchPodcasts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/podcast`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setPodcasts(data);
            }
        } catch (error) {
            console.error('Error fetching podcasts:', error);
            setPodcasts([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const handleJoinPodcast = (podcastId: string): void => {
        router.push(`podcast/${podcastId}`)
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 p-6 flex items-center justify-center">
                <div className="text-center">
                    <Mic className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400 text-lg">Loading podcasts...</p>
                </div>
            </div>
        );
    }

    if (podcasts.length === 0) {
        return (
            <div className="min-h-screen bg-gray-950 p-6 flex items-center justify-center">
                <div className="text-center">
                    <Mic className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No podcasts yet</h3>
                    <p className="text-gray-400">Create your first podcast to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Podcasts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcasts.map((podcast) => (
                        <div
                            key={podcast.id}
                            className="bg-gray-900 rounded-xl border border-gray-800 hover:border-purple-500 transition-all duration-300 p-6 group"
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-3 flex-shrink-0">
                                    <Mic className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-bold text-lg mb-1 leading-tight">{podcast.title}</h3>
                                    {podcast.channel_name && (
                                        <p className="text-purple-400 text-sm font-medium">{podcast.channel_name}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            {podcast.description && (
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                                    {podcast.description}
                                </p>
                            )}

                            {/* Tags */}
                            {podcast.tags && (
                                <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
                                    {podcast.tags.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-800 text-purple-400 px-2 py-1 rounded-md text-xs font-medium "
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Time Info */}
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4 pb-4 border-b border-gray-800">
                                <div className="flex items-center gap-1.5">
                                    <Play className="w-4 h-4" />
                                    <span>{formatDate(podcast.start_time)}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    size="3"
                                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors font-semibold"
                                    onClick={() => handleJoinPodcast(podcast.id)}
                                >
                                    Listen
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}