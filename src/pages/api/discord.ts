import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

const scopes = ['identify', 'email']

export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID ?? "1229422203372699692",
            clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "xAYSJEYjpX1inDnJ41jPguA7kC7N5Lkz",
            authorization: {params: {scope: scopes.join(' ')}},
        }),
    ],
})