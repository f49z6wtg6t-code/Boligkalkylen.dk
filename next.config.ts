import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "motivogruppen.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
