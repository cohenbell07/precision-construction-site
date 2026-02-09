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
  webpack: (config, { isServer, dev }) => {
    if (isServer) {
      // Fix for gray-matter/js-yaml webpack bundling issue
      config.externals = config.externals || [];
      config.externals.push({
        'js-yaml': 'commonjs js-yaml',
      });
    }
    
    // Fix webpack cache warnings and compilation issues
    if (dev) {
      // Prevent aggressive chunk optimization that can cause loading issues
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
      };
      
      // Fix webpack cache managed paths warnings
      // Configure snapshot to properly handle node_modules structure
      config.snapshot = {
        ...(config.snapshot || {}),
        managedPaths: [
          /^(.+[\\/])?node_modules[\\/]/,
        ],
      };
      
      // Suppress infrastructure logging warnings (managed paths warnings)
      if (!config.infrastructureLogging) {
        config.infrastructureLogging = {};
      }
      // Keep warnings but reduce noise from managed paths
      config.infrastructureLogging.level = config.infrastructureLogging.level || 'info';
    }
    
    return config;
  },
  // Compiler options for better stability
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

module.exports = nextConfig;

