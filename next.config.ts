import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
    images: {
        remotePatterns: [new URL('https://odsdfqrwfaioqstxalpg.supabase.co/storage/v1/object/public/demo-bucket/img/**')],
    },
}

export default nextConfig;
