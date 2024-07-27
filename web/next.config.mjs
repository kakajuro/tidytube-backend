/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverRuntimeConfig: {
    API_URL: process.env.API_URL
  },
};

export default nextConfig;
