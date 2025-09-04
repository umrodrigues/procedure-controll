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
  // Configuração do Turbopack (apenas para desenvolvimento)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

module.exports = nextConfig
