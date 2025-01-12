import React from 'react';

type Props = {
	condition: boolean;
	children: React.ReactNode;
};

const RenderIf: React.FC<Props> = ({ condition, children }) => {
	return <>{condition && children}</>;
};

export default RenderIf;
