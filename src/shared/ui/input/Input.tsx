'use client';

import { IconEye, IconEyeOff, IconX } from '@tabler/icons-react';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';
import * as React from 'react';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	isError?: boolean;
	onClear?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	// eslint-disable-next-line react/prop-types
	({ className, type: rawType, isError, ...props }, ref) => {
		const radius = 100; // change this to increase the radius of the hover effect
		const [visible, setVisible] = React.useState(false);
		const [type, setType] = React.useState(rawType);

		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		function handleMouseMove({ currentTarget, clientX, clientY }: any) {
			const { left, top } = currentTarget.getBoundingClientRect();

			mouseX.set(clientX - left);
			mouseY.set(clientY - top);
		}

		const handleEyeClick = () => {
			setType(type === 'password' ? 'text' : 'password');
		};

		return (
			<motion.div
				style={{
					background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className={cn(
					'relative p-[2px] rounded-lg transition duration-300 group/input',
					className,
				)}
			>
				<input
					type={type}
					className={cn(
						`flex h-10 w-full bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400 border-red-700`,
						isError && 'border-[1px] border-solid',
						className,
					)}
					ref={ref}
					{...props}
				/>

				{/* Кнопка отчистки*/}
				<RenderIf
					condition={
						// eslint-disable-next-line react/prop-types
						!!props.onClear && (props.value as string).length > 0
					}
				>
					<button
						type='button'
						onClick={props.onClear}
						className={cn(
							'absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2',
							'text-gray-500 hover:text-gray-700',
						)}
					>
						<IconX size={20} />
					</button>
				</RenderIf>

				{/* Глазик для пароля*/}
				<RenderIf
					condition={
						// eslint-disable-next-line react/prop-types
						rawType === 'password' && (props.value as string).length > 0
					}
				>
					<button
						type='button'
						onClick={handleEyeClick}
						className={cn(
							'absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2',
							'text-gray-500 hover:text-gray-700',
						)}
					>
						{type === 'text' ? <IconEyeOff size={20} /> : <IconEye size={20} />}
					</button>
				</RenderIf>
			</motion.div>
		);
	},
);

Input.displayName = 'Input';

export { Input };
