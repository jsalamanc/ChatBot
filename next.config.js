/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
