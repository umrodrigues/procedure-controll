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
}

module.exports = nextConfig
