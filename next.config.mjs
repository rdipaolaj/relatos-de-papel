/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      // u otros hosts de imágenes que uses…
    ],
    unoptimized: true,
  },
}

export default nextConfig
