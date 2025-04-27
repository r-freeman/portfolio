import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return url
        },
        async jwt({token, user, account, profile}) {
            if (profile) {
                token.profile = profile
            }
            return token
        },
        async session({session, user, token}) {
            if (token.profile) {
                session.user = {
                    ...session.user,
                    ...token.profile
                }
            }
            return session
        }
    }
})