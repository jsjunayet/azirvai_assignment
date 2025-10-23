import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
