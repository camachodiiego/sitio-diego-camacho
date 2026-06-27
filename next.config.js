/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ['@netlify/blobs'] },
  images: { unoptimized: true },
}
module.exports = nextConfig
