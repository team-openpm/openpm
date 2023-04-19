/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [
      'shiki',
      'vscode-oniguruma',
      'vscode-textmate',
      'pg',
      'pg-native',
    ],
  },

  async rewrites() {
    return [
      {
        // Rewrite /packages/petstore2/openapi.json to /api/packages/petstore2/openapi
        source: '/packages/:package/openapi.json',
        destination: '/api/packages/:package/openapi',
      },
      {
        // Rewrite /packages/petstore2/openapi.json to /api/packages/petstore2/openapi
        source: '/packages/:package/openapi.yaml',
        destination: '/api/packages/:package/openapi',
      },

      // Rewrite /packages to /apis
      {
        source: '/apis',
        destination: '/packages',
      },

      {
        source: '/apis/:path*',
        destination: '/packages/:path*',
      },
    ]
  },
}

module.exports = nextConfig
