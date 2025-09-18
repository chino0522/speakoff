import { Button } from '@radix-ui/themes';
import { Users, Timer, Vote, MessageCircle, Trophy, Mic } from 'lucide-react';

export default function IntroductionPage() {
    return (
        <div className="min-h-screen bg-theme-black">
            {/* Hero Section - Full viewport height */}
            <section className="px-6 py-20 min-h-screen flex items-center">
                <div className="max-w-6xl mx-auto text-center w-full">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Welcome to <span className="bg-gradient-to-r from-theme-lime to-theme-blue bg-clip-text text-transparent">SpeakOff</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                        The ultimate platform for collaborative live podcasts. Create shows with multiple hosts, engage with your audience through live comments and reactions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="4"
                            className="px-8 py-4 font-semibold text-black bg-theme-lime hover:bg-[#d4e89b] rounded-xl border-2 border-theme-lime hover:border-[#d4e89b] transition-all duration-200 text-lg cursor-pointer"
                        >
                            Start Your Podcast
                        </Button>
                        <Button
                            variant="ghost"
                            size="4"
                            className="px-8 py-4 text-white border-2 border-theme-blue rounded-xl hover:bg-theme-blue hover:text-white transition-all duration-200 text-lg cursor-pointer"
                        >
                            Listen to PodCasts
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-16 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        How PodCast Works
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1: Show Creation */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Create & Join Shows</h3>
                            <p className="text-gray-300">
                                Create podcast shows on any topic with multiple co-hosts. Set them as public for anyone to listen, or private with invite codes. Host together with your team in real-time.
                            </p>
                        </div>

                        {/* Feature 2: Live Audio */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Mic className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Multi-Host Audio</h3>
                            <p className="text-gray-300">
                                Broadcast live with multiple hosts speaking seamlessly. Crystal-clear audio quality ensures your conversation flows naturally while listeners enjoy the show.
                            </p>
                        </div>

                        {/* Feature 3: Timer */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Timer className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Flexible Duration</h3>
                            <p className="text-gray-300">
                                Host podcasts for as long as you want. Built-in timer helps you track episode length and manage your broadcast time efficiently.
                            </p>
                        </div>

                        {/* Feature 4: Live Reactions */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Vote className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Live Reactions</h3>
                            <p className="text-gray-300">
                                Listeners can show appreciation with thumbs up reactions in real-time. See instant feedback from your audience as you broadcast your show.
                            </p>
                        </div>

                        {/* Feature 5: Live Comments */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Live Text Comments</h3>
                            <p className="text-gray-300">
                                Listeners can share their thoughts through live text comments. Build a community around your podcast with real-time audience interaction and engagement.
                            </p>
                        </div>

                        {/* Feature 6: Show Analytics */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Show Analytics</h3>
                            <p className="text-gray-300">
                                Track your podcast performance with detailed analytics including listener count, engagement metrics, popular moments, and audience feedback insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="px-6 py-8 border-t border-gray-700">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Mic className="w-6 h-6 text-theme-lime" />
                        <span className="text-white font-bold text-xl">PodCast</span>
                    </div>
                    <p className="text-gray-400">
                        The future of collaborative podcasting. Where voices unite, stories unfold, and communities connect.
                    </p>
                </div>
            </footer>
        </div>
    );
}