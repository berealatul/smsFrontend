import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MagicSpinner } from "@/components/magicui/magic-spinner";

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: "ADMIN" | "HOD" | "FACULTY" | "STAFF" | "STUDENT";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	requiredRole,
}) => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<MagicSpinner size="lg" />
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Access Denied</h2>
					<p>Please login to access this page.</p>
				</div>
			</div>
		);
	}

	if (requiredRole && user.user_type !== requiredRole) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Access Denied</h2>
					<p>You do not have permission to access this page.</p>
					<p className="text-sm text-muted-foreground">
						Required role: {requiredRole}
					</p>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
