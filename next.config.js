/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.(frag|vert)$/,
        // Asset module for shader files
        type: 'asset/source',
      }
    );
    return config;
  },
};

module.exports = nextConfig;
