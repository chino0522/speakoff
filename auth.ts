import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import authConfig from './auth.config'

export const {
    handlers: { GET, POST },
    auth,        // server helper to read session in RSC / server actions
    signIn,      // server helper to sign in
    signOut,     // server helper to sign out
} = NextAuth({
    session: { strategy: "jwt" },
    ...authConfig,
})