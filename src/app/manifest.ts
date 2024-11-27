import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Next.js PWA',
		short_name: 'NextPWA',
		description: 'A Progressive Web App built with Next.js',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/icon-256x256.png',
				sizes: '192x192',
				type: 'any',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
