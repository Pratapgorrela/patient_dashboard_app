/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			net: false,
			tls: false,
		};
		// 	config.resolve = {
		// 		...config.resolve,
		// 		fallback: {
		// 			// fixes proxy-agent dependencies
		// 			net: false,
		// 			dns: false,
		// 			tls: false,
		// 			assert: false,
		// 			// fixes next-i18next dependencies
		// 			path: false,
		// 			fs: false,
		// 			// fixes mapbox dependencies
		// 			events: false,
		// 			// fixes sentry dependencies
		// 			process: false,
		// 		},
		// 	};
		// config.module.exprContextCritical = false; // Workaround to suppress next-i18next warning, see https://github.com/isaachinman/next-i18next/issues/1545

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
		unoptimized: true,
	},
};

export default nextConfig;
