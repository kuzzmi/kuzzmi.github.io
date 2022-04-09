/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  strictMode: true,
  trailingSlash: true,
  env: {
    PUBLIC_URL: "https://kuzzmi.com",
    assetPrefix: "./",
  },
};

module.exports = nextConfig;
