'use client';

import { OrbitControls } from '@react-three/drei';
import { useThree, Canvas, extend, Node } from '@react-three/fiber'; // Импортируем Node
import { memo, useEffect, useRef, useState } from 'react';
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from 'three';
import ThreeGlobe from 'three-globe';
import countries from './globe.json';

declare module '@react-three/fiber' {
	// eslint-disable-next-line
	interface ThreeElements {
		threeGlobe: Node<ThreeGlobe, typeof ThreeGlobe>;
	}
}

extend({ ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
	order: number;
	startLat: number;
	startLng: number;
	endLat: number;
	endLng: number;
	arcAlt: number;
	color: string;
};

export type GlobeConfig = {
	pointSize?: number;
	globeColor?: string;
	showAtmosphere?: boolean;
	atmosphereColor?: string;
	atmosphereAltitude?: number;
	emissive?: string;
	emissiveIntensity?: number;
	shininess?: number;
	polygonColor?: string;
	ambientLight?: string;
	directionalLeftLight?: string;
	directionalTopLight?: string;
	pointLight?: string;
	arcTime?: number;
	arcLength?: number;
	rings?: number;
	maxRings?: number;
	initialPosition?: {
		lat: number;
		lng: number;
	};
	autoRotate?: boolean;
	autoRotateSpeed?: number;
};

interface WorldProps {
	globeConfig: GlobeConfig;
	data: Position[];
}

let numbersOfRings = [0];

const initialProps = {
	pointSize: 1,
	atmosphereColor: '#ffffff',
	showAtmosphere: true,
	atmosphereAltitude: 0.1,
	polygonColor: 'rgba(255,255,255,0.7)',
	globeColor: '#1d072e',
	emissive: '#000000',
	emissiveIntensity: 0.1,
	shininess: 0.9,
	arcTime: 2000,
	arcLength: 0.9,
	rings: 1,
	maxRings: 3,
	hexPolygonResolution: 2,
};

export const Globe = memo(({ globeConfig, data }: WorldProps) => {
	const [globeData, setGlobeData] = useState<
		| {
				size: number;
				order: number;
				color: (t: number) => string;
				lat: number;
				lng: number;
		  }[]
		| null
	>(null);

	const globeRef = useRef<ThreeGlobe | null>(null);

	const defaultProps = { ...initialProps, ...globeConfig };

	useEffect(() => {
		if (globeRef.current) {
			_buildData();
			_buildMaterial();
		}
		// eslint-disable-next-line
	}, [globeRef.current]);

	const _buildMaterial = () => {
		if (!globeRef.current) return;

		const globeMaterial = globeRef.current.globeMaterial() as unknown as {
			color: Color;
			emissive: Color;
			emissiveIntensity: number;
			shininess: number;
		};
		globeMaterial.color = new Color(globeConfig.globeColor);
		globeMaterial.emissive = new Color(globeConfig.emissive);
		globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
		globeMaterial.shininess = globeConfig.shininess || 0.9;
	};

	const _buildData = () => {
		const arcs = data;
		const points = [];
		for (let i = 0; i < arcs.length; i++) {
			const arc = arcs[i];
			const rgb = hexToRgb(arc.color) as { r: number; g: number; b: number };
			points.push({
				size: defaultProps.pointSize,
				order: arc.order,
				color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
				lat: arc.startLat,
				lng: arc.startLng,
			});
			points.push({
				size: defaultProps.pointSize,
				order: arc.order,
				color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
				lat: arc.endLat,
				lng: arc.endLng,
			});
		}

		// remove duplicates for same lat and lng
		const filteredPoints = points.filter(
			(v, i, a) =>
				a.findIndex((v2) =>
					['lat', 'lng'].every(
						(k) => v2[k as 'lat' | 'lng'] === v[k as 'lat' | 'lng'],
					),
				) === i,
		);

		setGlobeData(filteredPoints);
	};

	useEffect(() => {
		if (globeRef.current && globeData) {
			globeRef.current
				.hexPolygonsData(countries.features)
				.hexPolygonResolution(defaultProps.hexPolygonResolution)
				.hexPolygonMargin(0.7)
				.showAtmosphere(defaultProps.showAtmosphere)
				.atmosphereColor(defaultProps.atmosphereColor)
				.atmosphereAltitude(defaultProps.atmosphereAltitude)
				.hexPolygonColor(() => {
					return defaultProps.polygonColor;
				});
			startAnimation();
		}
		// eslint-disable-next-line
	}, [globeData]);

	const startAnimation = () => {
		if (!globeRef.current || !globeData) return;

		globeRef.current
			.arcsData(data)
			.arcStartLat((d) => (d as { startLat: number }).startLat)
			.arcStartLng((d) => (d as { startLng: number }).startLng)
			.arcEndLat((d) => (d as { endLat: number }).endLat)
			.arcEndLng((d) => (d as { endLng: number }).endLng)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.arcColor((e: any) => (e as { color: string }).color)
			.arcAltitude((e) => {
				return (e as { arcAlt: number }).arcAlt;
			})
			.arcStroke(() => {
				return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
			})
			.arcDashLength(defaultProps.arcLength)
			.arcDashInitialGap((e) => (e as { order: number }).order)
			.arcDashGap(15)
			.arcDashAnimateTime(() => defaultProps.arcTime);

		globeRef.current
			.pointsData(data)
			.pointColor((e) => (e as { color: string }).color)
			.pointsMerge(true)
			.pointAltitude(0.0)
			.pointRadius(2);

		globeRef.current
			.ringsData([])
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.ringColor((e: any) => (t: any) => e.color(t))
			.ringMaxRadius(defaultProps.maxRings)
			.ringPropagationSpeed(RING_PROPAGATION_SPEED)
			.ringRepeatPeriod(
				(defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
			);
	};

	useEffect(() => {
		if (!globeRef.current || !globeData) return;

		const interval = setInterval(() => {
			if (!globeRef.current || !globeData) return;
			numbersOfRings = genRandomNumbers(
				0,
				data.length,
				Math.floor((data.length * 4) / 5),
			);

			globeRef.current.ringsData(
				globeData.filter((d, i) => numbersOfRings.includes(i)),
			);
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [globeData, data.length]);

	return (
		<>
			<threeGlobe ref={globeRef} />
		</>
	);
});
Globe.displayName = 'Globe';

export function WebGLRendererConfig() {
	const { gl, size } = useThree();

	useEffect(() => {
		gl.setPixelRatio(window?.devicePixelRatio);
		gl.setSize(size.width, size.height);
		gl.setClearColor(0xffaaff, 0);
	}, [gl, size.height, size.width]);

	return null;
}

export const World = memo((props: WorldProps) => {
	const { globeConfig } = props;
	const scene = new Scene();
	scene.fog = new Fog(0xffffff, 400, 2000);
	return (
		<Canvas
			scene={scene}
			camera={new PerspectiveCamera(50, aspect, 180, 1800)}
		>
			<WebGLRendererConfig />
			<ambientLight
				color={globeConfig.ambientLight}
				// eslint-disable-next-line
				intensity={0.6}
			/>
			<directionalLight
				color={globeConfig.directionalLeftLight}
				// eslint-disable-next-line
				position={new Vector3(-400, 100, 400)}
			/>
			<directionalLight
				color={globeConfig.directionalTopLight}
				// eslint-disable-next-line
				position={new Vector3(-200, 500, 200)}
			/>
			<pointLight
				color={globeConfig.pointLight}
				// eslint-disable-next-line
				position={new Vector3(-200, 500, 200)}
				// eslint-disable-next-line
				intensity={0.8}
			/>
			<Globe {...props} />
			<OrbitControls
				enablePan={false}
				enableZoom={false}
				minDistance={cameraZ}
				maxDistance={cameraZ}
				autoRotateSpeed={1}
				autoRotate={true}
				minPolarAngle={Math.PI / 3.5}
				maxPolarAngle={Math.PI - Math.PI / 3}
			/>
		</Canvas>
	);
});
World.displayName = 'World';

export function hexToRgb(hex: string) {
	const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: Number.parseInt(result[1], 16),
				g: Number.parseInt(result[2], 16),
				b: Number.parseInt(result[3], 16),
			}
		: null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
	const arr = [];
	while (arr.length < count) {
		const r = Math.floor(Math.random() * (max - min)) + min;
		if (arr.indexOf(r) === -1) arr.push(r);
	}

	return arr;
}
