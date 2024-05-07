
require('dotenv').config();

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	env: {
		ALLOWED_WALLETS: process.env.ALLOWED_WALLETS,
		DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		DISCORD_SECRET: process.env.DISCORD_SECRET
	}
};

module.exports = nextConfig;
