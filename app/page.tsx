import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import IntroductionPage from './components/IntroductionPage';

export default async function Home() {
  const session = await auth()

  // Show default introduction page if session is invalid.
  if (!session) {
    return <IntroductionPage />;
  }

  redirect('/dashboard')
}