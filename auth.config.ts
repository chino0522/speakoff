import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from 'next-auth/providers/google'
import { SupabaseAdapter } from '@auth/supabase-adapter'


export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        })
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY!
    }),
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            // Runs once when user first signs in
            if (user) {
                token.id = user.id // this is the Supabase user.id
            }
            return token
        },
        async session({ session, token }) {
            // Expose the id to the client
            if (token?.id) {
                session.user.id = token.id as string
            }
            return session
        },
    },
} satisfies NextAuthConfig 