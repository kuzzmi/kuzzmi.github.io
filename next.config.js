/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  strictMode: true,
  env: {
    PUBLIC_URL: "https://kuzzmi.com",
    assetPrefix: "./",
  },
};

module.exports = nextConfig;
