import { auth } from '@/auth';
import { Users, Timer, Vote, MessageCircle, Trophy, Mic } from 'lucide-react';
import { Button } from '@radix-ui/themes';
import IntroductionPage from './components/IntroductionPage';

export default async function Home() {
  const session = await auth()

  if (!session) {
    return <IntroductionPage />;
  }

  return (
    <div className='bg-[#1D2530] min-h-screen'>
      {/* Authenticated homepage will be designed later */}
      <div className="flex items-center justify-center h-96">
        <h1 className="text-white text-2xl">Welcome to SpeakOff Dashboard</h1>
      </div>
    </div>
  );
}