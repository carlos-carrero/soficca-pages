import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/es",
        destination: "/",
        permanent: true,
      },
      {
        source: "/es/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
