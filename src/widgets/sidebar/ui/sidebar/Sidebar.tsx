'use client';

import React from 'react';
import { useScreenWidth } from '@/shared/hooks';
import { cn } from '@/shared/lib';
import { SidebarLib, SidebarBody, SidebarLink } from '@/shared/ui';
import { RenderIf } from '@/shared/utils';
import { useSidebar } from '@/widgets/sidebar/model';

export const Sidebar = () => {
	const { isAuthorized, logoLink, upperLinks, downLinks, open, setOpen } =
		useSidebar();

	const { isPcDevice } = useScreenWidth();

	return (
		<RenderIf condition={isAuthorized}>
			<div
				className={cn(
					'top-0 left-0 fixed z-[100] h-screen flex flex-col md:flex-row',
					'mx-auto border border-neutral-700 overflow-hidden',
					'rounded-tr-md rounded-br-md',
				)}
			>
				<SidebarLib
					open={open}
					setOpen={setOpen}
				>
					<SidebarBody className='justify-between gap-10'>
						<div className='flex flex-col flex-1 justify-between overflow-hidden'>
							<div className='mt-2 flex flex-col gap-2'>
								<div className={'mb-8'}>
									<SidebarLink link={logoLink} />
								</div>
								{upperLinks.map((link, idx) => (
									<SidebarLink
										key={idx}
										link={link}
									/>
								))}
							</div>
							<div
								className={cn(
									isPcDevice ? 'mb-4' : 'mb-16',
									'flex flex-col gap-2',
								)}
							>
								{downLinks.map((link, idx) => (
									<SidebarLink
										key={idx}
										link={link}
									/>
								))}
							</div>
						</div>
					</SidebarBody>
				</SidebarLib>
			</div>
		</RenderIf>
	);
};
