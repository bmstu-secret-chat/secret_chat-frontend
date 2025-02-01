'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { LampContainer } from '@/components/lib/lamp/lamp';

export function Lamp() {
	return (
		<LampContainer>
			<motion.h1
				initial={{ opacity: 0.5, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: 'easeInOut',
				}}
				className='mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent lg:text-6xl'
			>
				Выберите, кому <br /> хотели бы написать
			</motion.h1>
		</LampContainer>
	);
}
