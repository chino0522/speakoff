import { Button } from '@radix-ui/themes';
import Image from 'next/image';
import { auth } from '@/auth';
import Profile from '../Profile';
import AuthDialog from '../AuthDialog';

export default async function Header() {
    const session = await auth();
    return (
        <header className="w-full px-6 py-4 bg-[#7C3BED]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Image
                        src="/logo/speakoff.png"
                        alt="SpeakOff Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Credential Buttons Section */}
                <div className="flex items-center gap-3">
                    {
                        session ? (
                            <Profile />
                        ) : (
                            <AuthDialog />
                        )
                    }
                </div>
            </div>
        </header>
    );
}