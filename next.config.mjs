import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'
import createNextIntlPlugin from 'next-intl/plugin'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/webpack'

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true,
        customCollections: {
          dl: FileSystemIconLoader('./src/components/icons/svg'),
        },
      }),
    )

    return config
  },
}

export default withNextIntl(nextConfig)
