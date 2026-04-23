import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "https", hostname: "www.nasa.gov" },
    ],
  },
};

export default nextConfig;
