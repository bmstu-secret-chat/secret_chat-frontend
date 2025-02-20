import { Globe } from '@/features/landing/ui';
import { cn } from '@/shared/lib';

export const LandingPage = () => {
	return (
		<div className={cn('flex flex-col items-center justify-center bg-black')}>
			<Globe />
		</div>
	);
};
