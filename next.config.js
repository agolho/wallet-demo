
require('dotenv').config();
console.log(process.env.DISCORD_CLIENT_ID);

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	env: {
		ALLOWED_WALLETS: process.env.ALLOWED_WALLETS,
		DISCORD_CLIENT_ID: "1229422203372699692",
		DISCORD_SECRET: "xAYSJEYjpX1inDnJ41jPguA7kC7N5Lkz"
	}
};

module.exports = nextConfig;
