/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  ...(isProd && {
    output: 'export', // 배포 환경에서 정적 사이트 생성
    basePath: '/hwonda.github.io', // GitHub Pages의 리포지토리 이름으로 변경
    assetPrefix: '/hwonda.github.io', // 정적 파일 경로
  }),
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
