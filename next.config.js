/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desabilita o ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Desabilita a verificação de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  // Força o uso do Webpack em vez do Turbopack em produção
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
}

module.exports = nextConfig
