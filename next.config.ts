import type { NextConfig } from "next";

// module.exports = {
// 	webpack: (config: NextConfig) => {
// 		config.resolve.fallback = { fs: false, path: false };
// 		return config;
// 	},
// };
const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	ignoreDuringBuilds: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/sightek/**",
				search: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/dr2hjb07z/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
