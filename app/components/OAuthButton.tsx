'use client'

import { Button } from '@radix-ui/themes'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

type OAuthButtonProps = {
    provider: 'google' | 'github'
}

const providerConfig = {
    google: {
        label: 'Continue with Google',
        icon: <span className="text-xl"><FcGoogle /></span>,
    },
    github: {
        label: 'Continue with GitHub',
        icon: <span className="text-xl"><FaGithub /></span>,
    },
}

export default function OAuthButton({ provider }: OAuthButtonProps) {
    const config = providerConfig[provider]

    return (
        <Button
            variant="outline"
            size="3"
            className="cursor-pointer w-full px-6 py-3 font-medium text-white bg-gray-800 border-gray-700 hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
            onClick={() => signIn(provider, { callbackUrl: '/' })}
        >
            <span className="flex items-center gap-3">
                {config.icon}
                {config.label}
            </span>
        </Button>
    )
}
