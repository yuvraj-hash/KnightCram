import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, Loader2, AlertCircle, ShieldCheck, CheckCircle2, X } from "lucide-react";
import { simulateLogin, simulateGoogleAuth } from "@/lib/authService";
import { cn } from "@/lib/utils";

interface LoginModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSwitchToSignUp?: () => void;
}

export default function LoginModal({ isOpen, onOpenChange, onSwitchToSignUp }: LoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Field focus states for floating label effect
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await simulateLogin(email, password);

            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    onOpenChange(false);
                    setSuccess(false);
                    setEmail("");
                    setPassword("");
                    navigate("/main");
                }, 1500);
            } else {
                setError(response.error || "Authentication failed");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await simulateGoogleAuth();

            if (response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    onOpenChange(false);
                    setSuccess(false);
                    setEmail("");
                    setPassword("");
                    navigate("/main");
                }, 1500);
            } else {
                setError(response.error || "Authentication failed");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[380px] bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl p-0 overflow-hidden gap-0 [&>button]:hidden">

                {/* Header Section */}
                <div className="p-4 relative overflow-hidden">
                    {/* Custom Close Button */}
                    <button
                        onClick={() => onOpenChange(false)}
                        className="absolute top-4 right-4 z-50 p-1.5 bg-black/5 hover:bg-black/20 text-muted-foreground hover:text-foreground rounded-full transition-colors flex items-center justify-center"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                    {/* Abstract Background Glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-surface-elevated rounded-xl flex items-center justify-center mb-3 shadow-lg border border-white/5 group">
                            <ShieldCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <DialogTitle className="text-xl font-display font-bold tracking-tight mb-2">
                            Welcome Back
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Enter your credentials to access the secure portal.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-4 pt-6">
                    <form onSubmit={handleLogin} className="space-y-3">

                        {/* Email Field with Floating Label Effect */}
                        <div className="relative group">
                            <div className={cn(
                                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none flex items-center gap-2",
                                (emailFocused || email) ? "top-0 scale-75 -translate-y-[140%] left-0 text-primary font-medium" : ""
                            )}>
                                <Mail className={cn("w-4 h-4", (emailFocused || email) ? "hidden" : "block")} />
                                <span>Email Address</span>
                            </div>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                className="h-9 bg-surface-elevated border-white/5 focus:border-primary/50 transition-all pl-3 pt-1 text-xs"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative group">
                            <div className={cn(
                                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none flex items-center gap-2",
                                (passwordFocused || password) ? "top-3 scale-75 -translate-y-[140%] left-0 text-primary font-medium" : ""
                            )}>
                                <Lock className={cn("w-4 h-4", (passwordFocused || password) ? "hidden" : "block")} />
                                <span>Password</span>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                className="h-9 bg-surface-elevated border-white/5 focus:border-primary/50 transition-all pl-3 pt-1 pr-10 text-xs"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Validation Status / Error Message */}
                        {error && (
                            <div className="text-destructive text-sm flex items-center gap-2 animate-fade-in bg-destructive/10 p-2 rounded-md border border-destructive/20">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="text-green-500 text-sm flex items-center gap-2 animate-fade-in bg-green-500/10 p-2 rounded-md border border-green-500/20">
                                <CheckCircle2 className="w-4 h-4" />
                                Login Successful! Redirecting...
                            </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors">
                                <input type="checkbox" className="rounded border-white/10 bg-surface-elevated text-primary focus:ring-primary/20" />
                                Remember me
                            </label>
                            <a href="#" className="hover:text-primary transition-colors hover:underline">Forgot password?</a>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading || success}
                            className="w-full h-9 text-xs font-semibold shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Authenticating...
                                </>
                            ) : success ? (
                                "Success"
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <div className="flex items-center gap-4 my-2">
                            <div className="h-px bg-white/10 flex-1" />
                            <span className="text-xs text-muted-foreground uppercase">Or</span>
                            <div className="h-px bg-white/10 flex-1" />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                            disabled={isLoading || success}
                            className="w-full h-9 bg-white text-black hover:bg-gray-200 border-none font-semibold transition-all flex items-center justify-center gap-2 text-xs"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        <p>Secured by Enterprise-Grade Encryption</p>
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-1 justify-center">
                            <span>Don't have an account?</span>
                            <button
                                type="button"
                                onClick={() => {
                                    onOpenChange(false);
                                    if (onSwitchToSignUp) onSwitchToSignUp();
                                }}
                                className="text-primary hover:underline font-medium focus:outline-none"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
