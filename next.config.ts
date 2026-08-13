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
      { source: "/jobs", destination: "/careers", permanent: true },
      { source: "/job", destination: "/careers", permanent: true },
      { source: "/cybersecurity", destination: "/services", permanent: true },
      { source: "/customer-support", destination: "/services", permanent: true },
      { source: "/customer-care", destination: "/services", permanent: true },
    ];
  },
};

export default nextConfig;
