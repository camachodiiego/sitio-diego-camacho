/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@netlify/blobs'],
  images: {
    domains: [],
    unoptimized: true,
  },
}

module.exports = nextConfig
