import { Button } from '@radix-ui/themes';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import Profile from '../Profile';
import AuthDialog from '../dialogs/AuthDialog';

export default async function Header() {
    const session = await auth();
    const user = session?.user;

    return (
        <header className="w-full px-6 py-4 bg-[#7C3BED]">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center cursor-pointer">
                    <Image
                        src="/logo/speakoff.png"
                        alt="SpeakOff Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </Link>

                {/* Credential Buttons Section */}
                <div className="flex items-center gap-3">
                    {session ? (
                        <Profile
                            name={user?.name}
                            email={user?.email}
                            image={user?.image}
                        />
                    ) : (
                        <AuthDialog />
                    )}
                </div>
            </div>
        </header>
    );
}
