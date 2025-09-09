import React from "react";

export const AnimatedGradientText: React.FC<{
	children: React.ReactNode;
	className?: string;
}> = ({ children, className = "" }) => {
	return (
		<div
			className={`relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent ${className}`}
			style={{
				backgroundSize: "200% 200%",
				animation: "gradientShift 3s ease infinite",
			}}
		>
			{children}
		</div>
	);
};
