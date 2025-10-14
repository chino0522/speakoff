"use client"

import { Button } from '@radix-ui/themes';
import { Plus, Mic, Clock, Calendar, Users, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Podcast = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    start_time: string;
    end_time: string | null;
    num_of_listen: number;
    host_id: string;
    is_live: boolean;
};

export default function UserPodcastsPage() {
    // Mock data - replace with actual data from your database
    const [podcasts] = useState<Podcast[]>([
        {
            id: '1',
            title: 'Introduction to AI and Machine Learning',
            description: 'A comprehensive discussion about the fundamentals of artificial intelligence and how machine learning is transforming industries.',
            tags: ['AI', 'Technology', 'Education'],
            start_time: '2024-01-15T14:30:00',
            end_time: '2024-01-15T16:15:00',
            num_of_listen: 245,
            host_id: 'user-123',
            is_live: false
        },
        {
            id: '2',
            title: 'Building Better Teams',
            description: 'Leadership strategies and communication techniques for creating high-performing teams in modern workplaces.',
            tags: ['Leadership', 'Business', 'Management'],
            start_time: '2024-01-20T10:00:00',
            end_time: '2024-01-20T11:30:00',
            num_of_listen: 189,
            host_id: 'user-123',
            is_live: false
        },
        {
            id: '3',
            title: 'The Future of Web Development',
            description: 'Exploring emerging trends in web development, from new frameworks to best practices in modern web applications.',
            tags: ['Web Dev', 'Technology', 'Programming'],
            start_time: '2024-01-25T18:00:00',
            end_time: null,
            num_of_listen: 432,
            host_id: 'user-123',
            is_live: true
        }
    ]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatDuration = (start: string, end: string | null) => {
        if (!end) return 'Live';
        const startTime = new Date(start);
        const endTime = new Date(end);
        const diff = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    return (
        <div className="min-h-screen bg-theme-black p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">My Podcasts</h1>
                        <p className="text-gray-400">Manage and review your podcast recordings</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                        <Link href="/create-room">
                            <Button
                                size="3"
                                className="px-6 py-3 bg-theme-lime text-black hover:bg-[#d4e89b] rounded-lg font-medium cursor-pointer transition-colors"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create New Podcast
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-theme-purple to-theme-blue rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-lg font-semibold">Total Podcasts</h3>
                                <p className="text-3xl font-bold text-white mt-1">{podcasts.length}</p>
                            </div>
                            <Mic className="w-8 h-8 text-white/80" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-theme-lime/20 to-theme-lime/10 border border-theme-lime/30 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-lg font-semibold">Total Listeners</h3>
                                <p className="text-3xl font-bold text-theme-lime mt-1 font-mono">
                                    {podcasts.reduce((sum, p) => sum + p.num_of_listen, 0)}
                                </p>
                            </div>
                            <Users className="w-8 h-8 text-theme-lime" />
                        </div>
                    </div>

                    <div className="bg-[#2A3441] border border-gray-600 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-lg font-semibold">Live Now</h3>
                                <p className="text-3xl font-bold text-white mt-1">
                                    {podcasts.filter(p => p.is_live).length}
                                </p>
                            </div>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Podcasts List */}
                {podcasts.length > 0 ? (
                    <div className="space-y-4">
                        {podcasts.map((podcast) => (
                            <div
                                key={podcast.id}
                                className="bg-[#2A3441] rounded-xl border border-gray-600 hover:border-theme-blue/50 transition-all duration-300 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                        {/* Left Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-3 mb-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-theme-purple/30 to-theme-blue/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Mic className="w-6 h-6 text-theme-blue" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-xl font-semibold text-white truncate">
                                                            {podcast.title}
                                                        </h3>
                                                        {podcast.is_live && (
                                                            <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full flex-shrink-0">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                                <span className="text-green-400 text-xs font-medium">Live</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                                        {podcast.description}
                                                    </p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {podcast.tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-theme-purple/20 text-theme-purple px-2 py-1 rounded-full text-xs font-medium"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 ml-15">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {formatDate(podcast.start_time)}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="font-mono">
                                                        {formatDuration(podcast.start_time, podcast.end_time)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4 text-theme-lime" />
                                                    <span className="font-mono text-theme-lime">
                                                        {podcast.num_of_listen}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Actions */}
                                        <div className="flex lg:flex-col gap-2 lg:items-end">
                                            <Link href={`/podcast/${podcast.id}`} className="flex-1 lg:flex-initial">
                                                <Button
                                                    size="2"
                                                    className="w-full px-6 py-2 bg-theme-blue hover:bg-[#5a7ae6] text-white rounded-lg cursor-pointer transition-colors font-medium"
                                                >
                                                    {podcast.is_live ? (
                                                        <>
                                                            <Play className="w-4 h-4 mr-2" />
                                                            Join Live
                                                        </>
                                                    ) : (
                                                        'View Details'
                                                    )}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-16 bg-[#2A3441] rounded-xl border border-gray-600">
                        <Mic className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No podcasts yet</h3>
                        <p className="text-gray-400 mb-6">Create your first podcast to get started</p>
                        <Link href="/create-room">
                            <Button
                                size="3"
                                className="px-6 py-3 bg-theme-lime text-black hover:bg-[#d4e89b] rounded-lg font-medium cursor-pointer transition-colors"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create Your First Podcast
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}