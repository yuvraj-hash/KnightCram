
// This service simulates the high-security backend interactions
// In a real app, this would make fetch() calls to the Spring Boot backend

export interface AuthResponse {
    user?: {
        email: string;
        name: string;
        role: string;
    };
    error?: string;
    status: number;
}

const NETWORK_LATENCY_MS = 1200; // Simulated latency to prevent timing attacks/give "real" feel

export const simulateLogin = async (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate Backend Validation Logic
            if (!email.includes('@') || password.length < 8) {
                // In a real security scenario, we might keep this generic too, but for UI dev we return specific
                resolve({
                    error: "Invalid credentials.",
                    status: 401
                });
                return;
            }

            // Simulate Rate Limiting
            if (email === "spam@bot.com") {
                resolve({
                    error: "Too many requests. Please try again later.",
                    status: 429
                });
                return;
            }

            // Simulate Successful Login
            // In reality: Server verifies Hash(pwd + salt + pepper) == DB_Hash
            if (password === "ShowMeTheUI!") {
                resolve({
                    user: {
                        email,
                        name: "Admin User",
                        role: "admin"
                    },
                    status: 200
                });
            } else {
                // Generic error message to prevent User Enumeration
                resolve({
                    error: "Invalid email or password.",
                    status: 401
                });
            }
        }, NETWORK_LATENCY_MS);
    });
};

export const simulateSignUp = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate Backend Validation
            if (!email.includes('@')) {
                resolve({ error: "Invalid email address format.", status: 400 });
                return;
            }
            if (password.length < 12) { // Enforcing strict policy
                resolve({ error: "Password does not meet complexity requirements.", status: 400 });
                return;
            }

            // Simulate existing user check (Indexed Lookup)
            if (email === "existing@example.com") {
                // Generic error to prevent enumeration, or if strictly needed for UX:
                // "If an account exists, a recovery email has been sent."
                // But typically for generic signup:
                resolve({
                    error: "This email is already registered.", // Or "Registration failed."
                    status: 409
                });
                return;
            }

            // Simulate Successful Creation
            // Server: bcrypt hash (cost > 12), salt, store.
            resolve({
                user: {
                    email,
                    name,
                    role: "user"
                },
                status: 201
            });
        }, NETWORK_LATENCY_MS * 1.5); // Slightly longer for hashing cost
    });
};

export const simulateGoogleAuth = async (): Promise<AuthResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate successful Google OAuth flow
            resolve({
                user: {
                    email: "user@gmail.com",
                    name: "Google User",
                    role: "user"
                },
                status: 200
            });
        }, 1500);
    });
};
