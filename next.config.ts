import type { NextConfig } from "next";

// module.exports = {
// 	webpack: (config: NextConfig) => {
// 		config.resolve.fallback = { fs: false, path: false };
// 		return config;
// 	},
// };

const nextConfig: NextConfig = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	reactStrictMode: false,
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
				pathname: "/dzzxgsrbl/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
