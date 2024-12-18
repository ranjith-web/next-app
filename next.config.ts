import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', 'api.dicebear.com', 'ui-avatars.com', 'via.placeholder.com', 'robohash.org'],
  },
};

export default withNextIntl(nextConfig);
