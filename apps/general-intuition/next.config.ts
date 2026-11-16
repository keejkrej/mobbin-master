import type { NextConfig } from "next";
const config: NextConfig = { basePath: "/general-intuition", output: "export", trailingSlash: true, transpilePackages: ["@study/ui"], images: { unoptimized: true }, devIndicators: false };
export default config;
