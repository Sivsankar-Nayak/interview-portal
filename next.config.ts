import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // This enables the Static Site Generation (SSG)
  images: {
    unoptimized: true,   // Required for GitHub Pages as it can't process images on the fly
  },
  // Optional: If your GitHub repo is NOT named yourname.github.io (e.g., /interview-site/)
  // basePath: '/your-repo-name', 
};

export default nextConfig;