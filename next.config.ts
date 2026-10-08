import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "moatv4k.net" }],
        destination: "https://www.moatv4k.net/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
