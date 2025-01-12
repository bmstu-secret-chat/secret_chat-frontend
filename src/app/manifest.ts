import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Safe chat',
		short_name: 'Safe chat',
		description: 'The most secure messenger',
		start_url: '/',
		display: 'standalone',
		background_color: 'rgba(255,255,255,0)',
		theme_color: '#000000',
		icons: [
			{
				src: '/icon-256x256.png',
				sizes: '256x256',
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
