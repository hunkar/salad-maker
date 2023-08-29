/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/salad-maker",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
