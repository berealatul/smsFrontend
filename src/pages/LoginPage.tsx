import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

const loginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginPageProps {
	onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		setError(null);

		try {
			await login(data.email, data.password);
			onLoginSuccess();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setIsLoading(false);
		}
	};

	const testCredentials = [
		{ role: "Admin", email: "admin@gmail.com", password: "adminpass" },
		{ role: "HOD", email: "hod.cse@gmail.com", password: "adminpass" },
		{
			role: "Faculty",
			email: "faculty.cse@gmail.com",
			password: "adminpass",
		},
	];

	const fillTestCredentials = (email: string, password: string) => {
		form.setValue("email", email);
		form.setValue("password", password);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4">
			<div className="w-full max-w-md space-y-6">
				<div className="text-center space-y-2">
					<AnimatedGradientText className="text-3xl font-bold">
						SMS Portal
					</AnimatedGradientText>
					<p className="text-muted-foreground">
						Student Monitoring System
					</p>
				</div>

				<Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
					<CardHeader className="space-y-1 text-center">
						<CardTitle className="text-2xl">Sign In</CardTitle>
						<CardDescription>
							Enter your credentials to access the system
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your email"
													type="email"
													{...field}
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your password"
													type="password"
													{...field}
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{error && (
									<div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-md">
										{error}
									</div>
								)}

								<RainbowButton
									type="submit"
									className="w-full"
									disabled={isLoading}
								>
									{isLoading ? "Signing in..." : "Sign In"}
								</RainbowButton>
							</form>
						</Form>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Test Credentials
								</span>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-2">
							{testCredentials.map((cred) => (
								<Button
									key={cred.role}
									variant="outline"
									size="sm"
									type="button"
									className="text-xs"
									onClick={() =>
										fillTestCredentials(
											cred.email,
											cred.password
										)
									}
									disabled={isLoading}
								>
									Fill {cred.role} Credentials
								</Button>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
