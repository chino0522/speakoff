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
                        The ultimate platform for live audio debates. Create rooms, engage in real-time discussions, and let the audience decide the winner.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button 
                            size="4"
                            className="px-8 py-4 font-semibold text-black bg-theme-lime hover:bg-[#d4e89b] rounded-xl border-2 border-theme-lime hover:border-[#d4e89b] transition-all duration-200 text-lg cursor-pointer"
                        >
                            Start Debating Now
                        </Button>
                        <Button 
                            variant="ghost"
                            size="4"
                            className="px-8 py-4 text-white border-2 border-theme-blue rounded-xl hover:bg-theme-blue hover:text-white transition-all duration-200 text-lg cursor-pointer"
                        >
                            Watch Live Debates
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 py-16 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-16">
                        How SpeakOff Works
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1: Room Creation */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Create & Join Rooms</h3>
                            <p className="text-gray-300">
                                Create debate rooms on any topic. Set them as public for anyone to join, or private with invite codes. Each room supports two debaters and unlimited listeners.
                            </p>
                        </div>

                        {/* Feature 2: Live Audio */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Mic className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Real-Time Audio</h3>
                            <p className="text-gray-300">
                                Engage in live audio debates with crystal-clear communication. Debaters speak while the audience listens and participates through voting and comments.
                            </p>
                        </div>

                        {/* Feature 3: Timer */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Timer className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">10-Minute Debates</h3>
                            <p className="text-gray-300">
                                Structured debates with a 10-minute timer that starts when both debaters are ready. Keep discussions focused and engaging for everyone involved.
                            </p>
                        </div>

                        {/* Feature 4: Live Voting */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Vote className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Live Voting System</h3>
                            <p className="text-gray-300">
                                Audience members vote for their preferred debater in real-time. Change your vote during the debate and see the winner determined by popular vote.
                            </p>
                        </div>

                        {/* Feature 5: Live Comments */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Live Text Comments</h3>
                            <p className="text-gray-300">
                                Share your thoughts through live text comments visible to other audience members. Debaters can review all feedback after the debate ends.
                            </p>
                        </div>

                        {/* Feature 6: Results & Analysis */}
                        <div className="bg-[#2A3441] rounded-xl p-6 border border-theme-blue/20 hover:border-theme-blue/40 transition-all duration-300">
                            <div className="w-12 h-12 bg-theme-purple rounded-lg flex items-center justify-center mb-4">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Results & Analysis</h3>
                            <p className="text-gray-300">
                                View detailed results after each debate including vote tallies, audience comments, winner announcement, and performance analytics.
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
                        <span className="text-white font-bold text-xl">SpeakOff</span>
                    </div>
                    <p className="text-gray-400">
                        The future of online debating. Where voices meet, ideas clash, and the best argument wins.
                    </p>
                </div>
            </footer>
        </div>
    );
}