/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ugsufdqwqaiqbawfsxwp.supabase.co'
        },
      ],
    },
  }

module.exports = nextConfig;
