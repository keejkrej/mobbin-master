import type { NextConfig } from "next";
const config: NextConfig = { basePath: "/airbnb", output: "export", transpilePackages: ["@study/ui"], images: { unoptimized: true }, devIndicators: false };
export default config;
