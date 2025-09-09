import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MagicSpinner } from "@/components/magicui/magic-spinner";

const AppRoutes: React.FC = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<MagicSpinner size="lg" />
			</div>
		);
	}

	return (
		<Routes>
			<Route
				path="/login"
				element={
					user ? (
						<Navigate to="/dashboard" replace />
					) : (
						<LoginPage onLoginSuccess={() => {}} />
					)
				}
			/>
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/"
				element={
					user ? (
						<Navigate to="/dashboard" replace />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
		</Routes>
	);
};

function App() {
	return (
		<Router>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</Router>
	);
}

export default App;
