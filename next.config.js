
require('dotenv').config();

/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	env: {
		ALLOWED_WALLETS: process.env.ALLOWED_WALLETS,
	}
};

module.exports = nextConfig;
