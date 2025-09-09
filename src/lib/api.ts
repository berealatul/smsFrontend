const API_BASE = "http://localhost/sms/api";

const getToken = () => localStorage.getItem("sms_token");

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
	const token = getToken();

	const response = await fetch(`${API_BASE}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
			...options.headers,
		},
		...options,
	});

	if (!response.ok) {
		// If unauthorized, clear token and redirect to login
		if (response.status === 401) {
			localStorage.removeItem("sms_token");
			window.location.href = "/login";
		}

		const errorData = await response.json();
		throw new Error(errorData.error || "API call failed");
	}

	return response.json();
};

export const authAPI = {
	login: (email: string, password: string) =>
		apiCall("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		}),

	getCurrentUser: () => apiCall("/auth/me"),

	updateProfile: (data: any) =>
		apiCall("/auth/me", {
			method: "PUT",
			body: JSON.stringify(data),
		}),
};

export const departmentAPI = {
	getAll: () => apiCall("/departments"),
	getById: (id: number) => apiCall(`/departments/${id}`),
	create: (data: any) =>
		apiCall("/departments", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	update: (id: number, data: any) =>
		apiCall(`/departments/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	delete: (id: number) => apiCall(`/departments/${id}`, { method: "DELETE" }),
};

export const userAPI = {
	getAll: () => apiCall("/users"),
	create: (data: any) =>
		apiCall("/users", {
			method: "POST",
			body: JSON.stringify(data),
		}),
	createBulk: (users: any[]) =>
		apiCall("/users/bulk", {
			method: "POST",
			body: JSON.stringify({ users }),
		}),
	update: (id: number, data: any) =>
		apiCall(`/users/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),
	delete: (id: number) => apiCall(`/users/${id}`, { method: "DELETE" }),
	activate: (userIds: number[]) =>
		apiCall("/users/activate", {
			method: "PUT",
			body: JSON.stringify({ user_ids: userIds }),
		}),
};
