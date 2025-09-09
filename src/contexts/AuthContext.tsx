import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/lib/api";

interface User {
	id: number;
	full_name: string;
	email: string;
	user_type: "ADMIN" | "HOD" | "FACULTY" | "STAFF" | "STUDENT";
	department_id: number;
	is_active: boolean;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => Promise<User>;
	logout: () => void;
	loading: boolean;
	isAdmin: boolean;
	isHOD: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("sms_token")
	);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			authAPI
				.getCurrentUser()
				.then(setUser)
				.catch(() => {
					localStorage.removeItem("sms_token");
					setToken(null);
				})
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, [token]);

	const login = async (email: string, password: string): Promise<User> => {
		const response = await authAPI.login(email, password);
		localStorage.setItem("sms_token", response.token);
		setToken(response.token);

		const userData = await authAPI.getCurrentUser();
		setUser(userData);

		return userData;
	};

	const logout = () => {
		localStorage.removeItem("sms_token");
		setToken(null);
		setUser(null);
		navigate("/login");
	};

	const value: AuthContextType = {
		user,
		token,
		login,
		logout,
		loading,
		isAdmin: user?.user_type === "ADMIN",
		isHOD: user?.user_type === "HOD",
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
