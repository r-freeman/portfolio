import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {PrismaClient} from '@prisma/client'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID ?? ""
const GITHUB_SECRET = process.env.GITHUB_SECRET ?? ""
const prisma = new PrismaClient()

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_SECRET
        })
    ],
})