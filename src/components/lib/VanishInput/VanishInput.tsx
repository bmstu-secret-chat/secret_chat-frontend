// Импортируем необходимые библиотеки
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
	value: string;
	placeholders: string[];
	setValue: (value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function VanishInput({
	value,
	placeholders,
	setValue,
	onSubmit,
}: Props) {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const startAnimation = () => {
		intervalRef.current = setInterval(() => {
			setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
		}, 3000);
	};

	const handleVisibilityChange = () => {
		if (document.visibilityState !== 'visible' && intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		} else if (document.visibilityState === 'visible') {
			startAnimation();
		}
	};

	useEffect(() => {
		startAnimation();
		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [placeholders]);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [animating, setAnimating] = useState(false);

	const draw = useCallback(() => {
		if (!inputRef.current) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = 800;
		canvas.height = 800;
		ctx.clearRect(0, 0, 800, 800);
		const computedStyles = getComputedStyle(inputRef.current);

		const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'));
		ctx.font = `${fontSize}px ${computedStyles.fontFamily}`;
		ctx.fillStyle = '#FFF';
		ctx.fillText(value, 40, 29);

		const imageData = ctx.getImageData(0, 0, 800, 800);
		const pixelData = imageData.data;
		const newData: any[] = [];

		for (let t = 0; t < 800; t++) {
			const i = 4 * t * 800;
			for (let n = 0; n < 800; n++) {
				const e = i + 4 * n;
				if (
					pixelData[e] !== 0 &&
					pixelData[e + 1] !== 0 &&
					pixelData[e + 2] !== 0
				) {
					newData.push({
						x: n,
						y: t,
						color: [
							pixelData[e],
							pixelData[e + 1],
							pixelData[e + 2],
							pixelData[e + 3],
						],
					});
				}
			}
		}

		newDataRef.current = newData.map(({ x, y, color }) => ({
			x,
			y,
			r: 1,
			color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		}));
	}, [value]);

	useEffect(() => {
		draw();
	}, [value, draw]);

	const animate = () => {
		const animateFrame = () => {
			requestAnimationFrame(() => {
				const ctx = canvasRef.current?.getContext('2d');
				if (ctx) {
					ctx.clearRect(0, 0, 800, 800);

					newDataRef.current.forEach((t) => {
						const { x, y, r, color } = t;

						const alpha = Math.max(0, r / 1);
						ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

						ctx.beginPath();
						ctx.rect(x, y, 1, 1); // Уменьшили размер квадрата
						ctx.fill();
					});
				}

				// Уменьшаем радиус для анимации исчезновения
				newDataRef.current.forEach((t) => {
					// Увеличиваем случайное смещение при каждом кадре
					const randomAngle = Math.random() * Math.PI * 2;
					const radius = 1; // Увеличили радиус разлета

					t.x += Math.cos(randomAngle) * radius; // Случайное смещение по X
					t.y += Math.sin(randomAngle) * radius; // Случайное смещение по Y
					t.r -= 0.05; // Уменьшаем радиус медленнее, чтобы анимация длилась дольше
				});

				if (newDataRef.current.some((t) => t.r > 0)) {
					animateFrame();
				} else {
					setValue('');
					setAnimating(false);
				}
			});
		};
		animateFrame();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !animating) {
			// vanishAndSubmit();
		}
	};

	const vanishAndSubmit = () => {
		setAnimating(true);
		draw();

		const value = inputRef.current?.value || '';
		if (value && inputRef.current) {
			animate(); // Убрали maxX, анимация теперь работает с каждым кадром
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		vanishAndSubmit();
		onSubmit(e);
	};

	return (
		<form
			className={cn(
				'w-full relative max-w-xl mx-auto bg-white dark:bg-zinc-800 h-12 rounded-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200',
				value && 'bg-gray-50',
			)}
			onSubmit={handleSubmit}
		>
			<canvas
				className={cn(
					'absolute pointer-events-none text-base transform origin-top-left filter invert dark:invert-0 pr-20',
					!animating ? 'opacity-0' : 'opacity-100',
				)}
				ref={canvasRef}
			/>
			<input
				onChange={(e) => {
					if (!animating) {
						setValue(e.target.value);
					}
				}}
				onKeyDown={handleKeyDown}
				ref={inputRef}
				value={value}
				type='text'
				className={cn(
					'w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20',
					animating && 'text-transparent dark:text-transparent',
				)}
			/>

			<button
				disabled={!value}
				type='submit'
				className='absolute right-2 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center'
			>
				<motion.svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					className='text-gray-300 h-4 w-4'
				>
					<path
						stroke='none'
						d='M0 0h24v24H0z'
						fill='none'
					/>
					<motion.path
						d='M5 12l14 0'
						initial={{
							strokeDasharray: '50%',
							strokeDashoffset: '50%',
						}}
						animate={{
							strokeDashoffset: value ? 0 : '50%',
						}}
						transition={{
							duration: 0.3,
							ease: 'linear',
						}}
					/>
					<path d='M13 18l6 -6' />
					<path d='M13 6l6 6' />
				</motion.svg>
			</button>

			<div className='absolute inset-0 flex items-center rounded-full pointer-events-none'>
				<AnimatePresence mode='wait'>
					{!value && (
						<motion.p
							initial={{
								y: 5,
								opacity: 0,
							}}
							key={`current-placeholder-${currentPlaceholder}`}
							animate={{
								y: 0,
								opacity: 1,
							}}
							exit={{
								y: -15,
								opacity: 0,
							}}
							transition={{
								duration: 0.3,
								ease: 'linear',
							}}
							className='dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate'
						>
							{placeholders[currentPlaceholder]}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</form>
	);
}
