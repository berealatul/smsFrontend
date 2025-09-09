import React from "react";

export const MagicSpinner: React.FC<{
	size?: "sm" | "md" | "lg";
	className?: string;
}> = ({ size = "md", className = "" }) => {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-8 w-8",
		lg: "h-12 w-12",
	};

	return (
		<div
			className={`${sizeClasses[size]} ${className} relative inline-flex items-center justify-center`}
		>
			<div
				className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-spin"
				style={{
					mask: "radial-gradient(farthest-side,#0000 calc(100% - 2px),#000 0)",
				}}
			/>
			<div className="absolute inset-1 rounded-full bg-background" />
		</div>
	);
};
