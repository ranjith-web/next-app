import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { config } from 'dotenv';
import path from 'path';

// Manually load the correct .env file based on APP_ENV
const envPath = path.resolve(process.cwd(), `.env.${process.env.APP_ENV || 'development'}`);
config({ path: envPath });


const withNextIntl = createNextIntlPlugin();

console.log('Build-time env:', envPath);

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', 'api.dicebear.com', 'ui-avatars.com', 'via.placeholder.com', 'robohash.org'],
  },
};

export default withNextIntl(nextConfig);
