'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';

export const TypewriterEffectSmooth = ({
	words,
	className,
	cursorClassName,
}: {
	words: {
		text: string;
		className?: string;
	}[];
	className?: string;
	cursorClassName?: string;
}) => {
	const wordsArray = words.map((word) => {
		return {
			...word,
			text: word.text.split(''),
		};
	});

	const renderWords = () => {
		return (
			<div>
				{wordsArray.map((word, idx) => {
					return (
						<div
							key={`word-${idx}`}
							className='inline-block'
						>
							{word.text.map((char, index) => (
								<span
									key={`char-${index}`}
									className={cn(`dark:text-white text-black `, word.className)}
								>
									{char}
								</span>
							))}
							&nbsp;
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className={cn('flex my-6 p-2 items-center justify-center', className)}>
			<motion.div
				className='overflow-hidden'
				initial={{
					width: '0%',
				}}
				whileInView={{
					width: 'fit-content',
				}}
				transition={{
					duration: 2,
					ease: 'linear',
					delay: 1,
				}}
			>
				<div
					className={cn(
						'text-xs sm:text-2xl md:text-[0.55rem] lg:text-xs',
						'xl:text-sm 2xl:text-lg font-bold',
					)}
					style={{
						whiteSpace: 'nowrap',
					}}
				>
					{renderWords()}
				</div>
			</motion.div>
			<motion.span
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.8,

					repeat: Infinity,
					repeatType: 'reverse',
				}}
				className={cn(
					'block rounded-sm w-[4px] h-4 sm:h-8 md:h-4 xl:h-6 2xl:h-8 bg-blue-500',
					cursorClassName,
				)}
			></motion.span>
		</div>
	);
};
