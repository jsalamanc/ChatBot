/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_API_KEY: process.env.API_KEY,
    OPENAI_KEY: process.env.OPENAI_KEY
  },
};

module.exports = nextConfig;
