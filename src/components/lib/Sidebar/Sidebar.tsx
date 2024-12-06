'use client';

import { motion } from 'framer-motion';
import Link, { LinkProps } from 'next/link';
import React, {
	useState,
	createContext,
	useContext,
	useRef,
	useCallback,
} from 'react';
import { useScreenWidth } from '@/hooks/useScreenWidth';
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
	return (
		<>
			<DesktopSidebar {...props} />
		</>
	);
};

export const DesktopSidebar = ({
	// eslint-disable-next-line react/prop-types
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { isPcDevice } = useScreenWidth();

	const { open, setOpen } = useSidebar();
	const sidebarRef = useRef<HTMLDivElement>(null); // Создаем реф для сайдбара
	const outsideSidebarRef = useRef<HTMLDivElement>(null); // Создаем реф для сайдбара

	const [currentWidth, setCurrentWidth] = useState(60);

	const touchStartX = useRef(0);
	const touchStartWidth = useRef(currentWidth);

	const MAX_SIDEBAR_WIDTH = 200;
	const MIN_SIDEBAR_WIDTH = 60;

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.targetTouches[0].clientX;
		touchStartWidth.current = currentWidth;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		const touchCurrentX = e.targetTouches[0].clientX;
		const swipeDistance = touchCurrentX - touchStartX.current;
		const newWidth = touchStartWidth.current + swipeDistance;
		setCurrentWidth(() =>
			newWidth > MAX_SIDEBAR_WIDTH
				? MAX_SIDEBAR_WIDTH
				: newWidth < MIN_SIDEBAR_WIDTH
					? MIN_SIDEBAR_WIDTH
					: newWidth,
		);
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

	const handleClickOutside = useCallback(
		(event: React.TouchEvent | React.MouseEvent) => {
			if (event instanceof MouseEvent) {
				event.stopImmediatePropagation();
			}

			event.preventDefault();

			setOpen(false);
			setCurrentWidth(MIN_SIDEBAR_WIDTH);
		},
		[setOpen],
	);

	return (
		<>
			<div
				ref={outsideSidebarRef}
				className={cn('fixed left-0 h-screen z-[-1]')}
				onClick={handleClickOutside}
				onTouchEnd={handleClickOutside}
				style={{
					width: currentWidth > MIN_SIDEBAR_WIDTH ? '100vw' : 0,
					backdropFilter: `blur(${(currentWidth / 150) ** 2}px)`,
					backgroundColor: `rgba(0,0,0,${(currentWidth / 400) ** 1.5})`,
				}}
			/>

			<motion.div
				ref={sidebarRef}
				className={cn(
					'h-full w-[60px] px-4 py-4 md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0',
					className,
				)}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onClick={() => {
					if (!isPcDevice) {
						setOpen(false);
						setCurrentWidth(60);
					}
				}}
				animate={{
					width: isPcDevice
						? open
							? MAX_SIDEBAR_WIDTH
							: MIN_SIDEBAR_WIDTH
						: currentWidth,
				}}
				transition={{ duration: isPcDevice ? 0.3 : 0.1 }}
				{...props}
			>
				<>{children}</>
			</motion.div>
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
					display: animate
						? open
							? 'inline-block'
							: 'inline-block'
						: 'inline-block',
					opacity: animate ? (open ? 1 : 1) : 1,
				}}
				className='text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0'
			>
				{link.label}
			</motion.span>
		</Link>
	);
};
