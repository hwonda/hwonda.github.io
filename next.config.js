/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd && { output: 'export' }), // 배포 환경에서만 'export' 설정 적용
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push(
      {
        test: /\.(frag|vert)$/,
        // This is the asset module.
        type: 'asset/source',
      }
    )
    return config
  },
};

module.exports = nextConfig;