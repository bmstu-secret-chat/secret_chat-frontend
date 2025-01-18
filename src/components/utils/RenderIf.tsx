import React from 'react';

type Props = {
	condition: boolean;
	children: React.ReactNode;
	className?: string;
};

const RenderIf: React.FC<Props> = ({ condition, children, className }) => {
	return condition && <div className={className}>{children}</div>;
};

export default RenderIf;
