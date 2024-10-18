/* eslint-disable react/prop-types */

'use client';

import { IconMenu2, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import React, { useState, createContext, useContext, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Links {
	label: string;
	href: string;
	icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
	undefined,
);

export const useSidebar = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
};

export const SidebarProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
	animate = true,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}) => {
	const [openState, setOpenState] = useState(false);

	const open = openProp !== undefined ? openProp : openState;
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

	return (
		<SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
			{children}
		</SidebarContext.Provider>
	);
};

export const Sidebar = ({
	children,
	open,
	setOpen,
	animate,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}) => {
	return (
		<SidebarProvider
			open={open}
			setOpen={setOpen}
			animate={animate}
		>
			{children}
		</SidebarProvider>
	);
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
	return (
		<>
			<DesktopSidebar {...props} />
			{/*<MobileSidebar {...(props as React.ComponentProps<'div'>)} />*/}
		</>
	);
};

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen } = useSidebar();
	const touchStartX = useRef(0); // Для отслеживания начальной точки касания
	const [currentWidth, setCurrentWidth] = useState(60); // Начальная ширина сайдбара

	const MAX_SIDEBAR_WIDTH = 300;
	const MIN_SIDEBAR_WIDTH = 60;

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.targetTouches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		const touchCurrentX = e.targetTouches[0].clientX;
		const swipeDistance = touchCurrentX - touchStartX.current;

		if (swipeDistance > 0) {
			const newWidth = Math.min(
				MIN_SIDEBAR_WIDTH + swipeDistance,
				MAX_SIDEBAR_WIDTH,
			);
			setCurrentWidth(newWidth);
		} else if (swipeDistance < 0) {
			const newWidth = Math.max(
				MAX_SIDEBAR_WIDTH + swipeDistance,
				MIN_SIDEBAR_WIDTH,
			);
			setCurrentWidth(newWidth);
		}
	};

	const handleTouchEnd = () => {
		// Если ширина больше половины максимальной — оставляем сайдбар открытым
		if (currentWidth > MAX_SIDEBAR_WIDTH / 2) {
			setOpen(true);
			setCurrentWidth(MAX_SIDEBAR_WIDTH);
		} else {
			// Если меньше — закрываем
			setOpen(false);
			setCurrentWidth(MIN_SIDEBAR_WIDTH);
		}
	};

	return (
		<>
			<motion.div
				className={cn(
					'h-full px-4 py-4 md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0',
					className,
				)}
				// style={{ width: currentWidth }} // Применяем динамическую ширину
				onTouchStart={handleTouchStart} // Начало касания
				onTouchMove={handleTouchMove} // Движение пальца
				onTouchEnd={handleTouchEnd} // Завершение касания
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				animate={{
					// width: animate ? (open ? '300px' : '60px') : '300px',
					width: currentWidth !== 60 ? currentWidth : open ? '300px' : '60px',
				}}
				{...props}
			>
				{children}
			</motion.div>
		</>
	);
};

export const MobileSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) => {
	const { open, setOpen } = useSidebar();

	return (
		<>
			<div
				className={cn(
					'h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full',
				)}
				{...props}
			>
				<div className='flex justify-end z-20 w-full'>
					<IconMenu2
						className='text-neutral-800 dark:text-neutral-200'
						onClick={() => setOpen(!open)}
					/>
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: '-100%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: '-100%', opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: 'easeInOut',
							}}
							className={cn(
								'fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between',
								className,
							)}
						>
							<div
								className='absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200'
								onClick={() => setOpen(!open)}
							>
								<IconX />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export const SidebarLink = ({
	link,
	className,
	...props
}: {
	link: Links;
	className?: string;
	props?: LinkProps;
}) => {
	const { open, animate } = useSidebar();
	return (
		<Link
			href={link.href}
			className={cn(
				'flex items-center justify-start gap-2  group/sidebar py-2',
				className,
			)}
			{...props}
		>
			{link.icon}

			<motion.span
				animate={{
					display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className='text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0'
			>
				{link.label}
			</motion.span>
		</Link>
	);
};
