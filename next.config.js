/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Fix for gray-matter/js-yaml webpack bundling issue
      config.externals = config.externals || [];
      config.externals.push({
        'js-yaml': 'commonjs js-yaml',
      });
    }
    return config;
  },
};

module.exports = nextConfig;

