'use client';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '@/shared/lib';

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
	// eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(
			'text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
			className,
		)}
		{...props}
	/>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
