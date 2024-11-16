/* eslint-disable react/prop-types */
'use client';

import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import React, {
	useState,
	createContext,
	useContext,
	useRef,
	useCallback,
	useEffect,
} from 'react';
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

export const SidebarLib = ({
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
	return <DesktopSidebar {...props} />;
};

export const DesktopSidebar = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen } = useSidebar();
	const touchStartX = useRef(0);
	const sidebarRef = useRef<HTMLDivElement>(null); // Создаем реф для сайдбара
	const [currentWidth, setCurrentWidth] = useState(60);

	const MAX_SIDEBAR_WIDTH = 200;
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
		if (currentWidth > MAX_SIDEBAR_WIDTH / 2) {
			setOpen(true);
			setCurrentWidth(MAX_SIDEBAR_WIDTH);
		} else {
			setOpen(false);
			setCurrentWidth(MIN_SIDEBAR_WIDTH);
		}
	};

	// Функция для обработки кликов вне сайдбара
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setOpen(false);
				setCurrentWidth(MIN_SIDEBAR_WIDTH);
			}
		},
		[setOpen],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	return (
		<motion.div
			ref={sidebarRef} // Привязываем реф к контейнеру сайдбара
			className={cn(
				'h-full w-[60px] px-4 py-4 md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0',
				className,
			)}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			animate={{
				width:
					currentWidth !== 60
						? currentWidth
						: open
							? MAX_SIDEBAR_WIDTH
							: MIN_SIDEBAR_WIDTH,
			}}
			{...props}
		>
			{children}
		</motion.div>
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
