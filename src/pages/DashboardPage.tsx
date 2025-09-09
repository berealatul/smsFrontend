import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { departmentAPI, userAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { MagicSpinner } from "@/components/magicui/magic-spinner";
import { Globe } from "@/components/magicui/globe";

interface Department {
	id: number;
	department_code: string;
	department_name: string;
	hod_name: string;
	hod_email: string;
}

interface User {
	id: number;
	full_name: string;
	email: string;
	user_type: string;
	department_name: string;
	is_active: boolean;
}

const DashboardPage: React.FC = () => {
	const { user, logout } = useAuth();
	const [departments, setDepartments] = useState<Department[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				if (user?.user_type === "ADMIN") {
					const [departmentsData, usersData] = await Promise.all([
						departmentAPI.getAll(),
						userAPI.getAll(),
					]);
					setDepartments(departmentsData);
					setUsers(usersData);
				} else if (user?.user_type === "HOD") {
					const usersData = await userAPI.getAll();
					setUsers(usersData);
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load data"
				);
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchData();
		}
	}, [user]);

	const handleLogout = () => {
		logout();
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<MagicSpinner size="lg" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
			{/* Header */}
			<header className="bg-white/90 backdrop-blur-sm shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div>
							<h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
								SMS Dashboard
							</h1>
							<p className="text-sm text-muted-foreground">
								Welcome back, {user?.full_name}
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="text-right">
								<p className="text-sm font-medium">
									{user?.full_name}
								</p>
								<p className="text-xs text-muted-foreground">
									{user?.user_type}
								</p>
							</div>
							<Button variant="outline" onClick={handleLogout}>
								Logout
							</Button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
						<p className="text-red-800">{error}</p>
					</div>
				)}

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{user?.user_type === "ADMIN" && (
						<Card className="bg-white/80 backdrop-blur-sm">
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-muted-foreground">
									Total Departments
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{departments.length}
								</div>
							</CardContent>
						</Card>
					)}

					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total Users
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{users.length}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Active Users
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{users.filter((u) => u.is_active).length}
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Students
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{
									users.filter(
										(u) => u.user_type === "STUDENT"
									).length
								}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Quick Actions</CardTitle>
							<CardDescription>
								Common tasks and operations
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-3">
								{user?.user_type === "ADMIN" && (
									<>
										<RainbowButton className="w-full justify-start">
											Create Department
										</RainbowButton>
										<InteractiveHoverButton className="w-full justify-start">
											Manage Departments
										</InteractiveHoverButton>
									</>
								)}
								<Button
									variant="outline"
									className="w-full justify-start"
								>
									Add Users
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start"
								>
									View Reports
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>System Status</CardTitle>
							<CardDescription>
								Current system information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex justify-between items-center">
								<span className="text-sm">API Status</span>
								<span className="text-green-600 text-sm font-medium">
									Online
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm">Database</span>
								<span className="text-green-600 text-sm font-medium">
									Connected
								</span>
							</div>
							<div className="flex justify-between items-center">
								<span className="text-sm">Last Backup</span>
								<span className="text-muted-foreground text-sm">
									2 hours ago
								</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Data Tables */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{user?.user_type === "ADMIN" && departments.length > 0 && (
						<Card className="bg-white/80 backdrop-blur-sm">
							<CardHeader>
								<CardTitle>Recent Departments</CardTitle>
								<CardDescription>
									Latest departments in the system
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{departments.slice(0, 5).map((dept) => (
										<div
											key={dept.id}
											className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
										>
											<div>
												<p className="font-medium">
													{dept.department_name}
												</p>
												<p className="text-sm text-muted-foreground">
													{dept.department_code}
												</p>
											</div>
											<div className="text-right">
												<p className="text-sm font-medium">
													{dept.hod_name}
												</p>
												<p className="text-xs text-muted-foreground">
													HOD
												</p>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Recent Users</CardTitle>
							<CardDescription>
								Latest users in the system
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{users.slice(0, 5).map((user) => (
									<div
										key={user.id}
										className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
									>
										<div>
											<p className="font-medium">
												{user.full_name}
											</p>
											<p className="text-sm text-muted-foreground">
												{user.email}
											</p>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">
												{user.user_type}
											</p>
											<p
												className={`text-xs ${
													user.is_active
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{user.is_active
													? "Active"
													: "Inactive"}
											</p>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Global Overview Card */}
				<div className="mt-6">
					<Card className="bg-white/80 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Global Network Overview</CardTitle>
							<CardDescription>
								SMS System Network Presence
							</CardDescription>
						</CardHeader>
						<CardContent className="flex items-center justify-center">
							<div className="relative w-96 h-96">
								<Globe className="w-full h-full" />
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
										<h3 className="text-lg font-semibold">
											Connected Worldwide
										</h3>
										<p className="text-sm text-muted-foreground">
											SMS Platform
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
};

export default DashboardPage;
