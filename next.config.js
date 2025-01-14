/** @type {import("next").NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rbqinxbprdpgittiiwbt.supabase.co"
      }
    ]
  }
}

module.exports = nextConfig
