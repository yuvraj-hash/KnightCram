import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, User, Loader2, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { simulateSignUp, simulateGoogleAuth } from "@/lib/authService";
import { cn } from "@/lib/utils";


const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);


  // Focus states for floating labels
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  // Password Strength
  const [strengthScore, setStrengthScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState<string[]>([]);

  const navigate = useNavigate();

  // Real-time checks
  useEffect(() => {
    if (!password) {
      setStrengthScore(0);
      setPasswordFeedback([]);
      return;
    }

    let score = 0;
    const feedback = [];

    if (password.length >= 12) score += 1;
    else feedback.push("At least 12 characters");

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push("One uppercase letter");

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push("One lowercase letter");

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push("One number");

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push("One special character");

    setStrengthScore(score);
    setPasswordFeedback(feedback);
  }, [password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Client-side Checks
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (strengthScore < 4) { // Require high strength
      setError("Password must meet security requirements.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await simulateSignUp(name, email, password);

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          // Reset form
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/main");
        }, 2000);
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await simulateGoogleAuth();

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setPassword("");
          setConfirmPassword("");
          navigate("/main");
        }, 2000);
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-gray-500";
    if (score < 3) return "bg-red-500";
    if (score < 5) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthLabel = (score: number) => {
    if (score === 0) return "";
    if (score < 3) return "Weak";
    if (score < 5) return "Good";
    return "Strong";
  };

  return (
    <main className="flex min-h-screen w-full bg-background">

      {/* Left Side - Branding/Visuals */}
      <div className="hidden lg:flex w-[60%] h-screen sticky top-0 flex-col items-center justify-center bg-zinc-950 overflow-hidden border-r border-white/5">
        {/* Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

        <div className="relative z-10 p-12 text-center max-w-2xl flex flex-col items-center">

          {/* Brand Lockup */}
          <div className="flex items-center gap-4 mb-8">
            <img src="/Logo.png" alt="KnightCram Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <span className="text-5xl md:text-6xl font-['Bubblegum_Sans'] text-white pt-3">KnightCram</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">
            Join the global circle of <span className="text-[#FFC857]">night owls</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed mb-10 max-w-lg mx-auto">
            Be part of a community that values truth over marketing, reality over illusions. Your voice matters.
          </p>

          <div className="flex gap-4 justify-center items-center">
            <Link to="/signin">
              <Button className="h-12 px-8 bg-[#FFC857] hover:bg-[#FFD67D] text-black font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105">
                Sign In <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/main">
              <Button variant="outline" className="h-12 px-8 border-white/20 hover:bg-white/5 text-lg rounded-xl transition-all duration-300">
                Guest Mode
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 w-full text-center z-20 px-8">
          <p className="text-xs text-zinc-500 font-medium">
            By continuing, you agree to our{" "}
            <Link to="/user-agreement" className="text-blue-500 underline hover:text-blue-400 transition-colors">
              User Agreement
            </Link>{" "}
            and acknowledge our{" "}
            <Link to="/policies" className="text-blue-500 underline hover:text-blue-400 transition-colors">
              Policies
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-center p-8 bg-background relative">
        <div className="w-full max-w-[360px] border-none shadow-none sm:border sm:border-white/10 sm:shadow-2xl sm:bg-background/80 sm:backdrop-blur-xl rounded-xl overflow-hidden z-10">


          {/* Mobile Branding (Visible only on < lg screens) */}
          {/* Mobile Branding (Visible only on < lg screens) */}
          <div className="flex flex-col items-center gap-4 mb-10 lg:hidden animate-fade-in-down">
            <div className="flex items-center gap-3">
              <img src="/Logo.png" alt="KnightCram Logo" className="w-12 h-12 object-contain" />
              <span className="text-4xl font-['Bubblegum_Sans'] text-white pt-2">KnightCram</span>
            </div>
            <p className="text-sm text-zinc-400 text-center max-w-xs font-medium">
              Where Night Owls Unite & Thrive
            </p>
          </div>

          {/* Header */}
          <div className="p-4 pb-2 relative overflow-hidden text-center">
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-xl font-display font-bold tracking-tight mb-1 text-foreground">
                Set up your account
              </h2>
              <p className="text-xs text-muted-foreground">
                Be part of the community
              </p>
            </div>
          </div>

          <div className="p-4 pt-2">
            <form onSubmit={handleSignUp} className="space-y-2">

              {/* Name Field */}
              <div className="relative group">
                <div className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none flex items-center gap-2",
                  (nameFocused || name) ? "top-0 scale-75 -translate-y-[130%] left-0 text-primary font-medium" : ""
                )}>
                  <User className={cn("w-4 h-4", (nameFocused || name) ? "hidden" : "block")} />
                  <span className={cn((nameFocused || name) ? "" : "text-sm")}>Full Name</span>
                </div>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  className="h-10 bg-surface-elevated border-white/5 focus:border-primary/50 transition-all pl-3 pt-1 text-sm"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative group">
                <div className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none flex items-center gap-2",
                  (emailFocused || email) ? "top-0 scale-75 -translate-y-[130%] left-0 text-primary font-medium" : ""
                )}>
                  <Mail className={cn("w-4 h-4", (emailFocused || email) ? "hidden" : "block")} />
                  <span className={cn((emailFocused || email) ? "" : "text-sm")}>Email Address</span>
                </div>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  className="h-10 bg-surface-elevated border-white/5 focus:border-primary/50 transition-all pl-3 pt-1 text-sm"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none flex items-center gap-2",
                  (passwordFocused || password) ? "top-0 scale-75 -translate-y-[130%] left-0 text-primary font-medium" : ""
                )}>
                  <Lock className={cn("w-4 h-4", (passwordFocused || password) ? "hidden" : "block")} />
                  <span className={cn((passwordFocused || password) ? "" : "text-sm")}>Password</span>
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="h-10 bg-surface-elevated border-white/5 focus:border-primary/50 transition-all pl-3 pt-1 pr-10 text-sm"
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

              {/* Password Strength Meter */}
              <div className="space-y-1 -mt-1">
                <div className="flex justify-between items-center h-1.5">
                  {/* Segments for strength */}
                  <div className="flex gap-0.5 w-full h-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-full rounded-full flex-1 transition-all duration-300",
                          strengthScore >= level ? getStrengthColor(strengthScore) : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                </div>
                {(passwordFocused || password) && (
                  <div className="text-[10px] flex justify-between text-muted-foreground animate-fade-in">
                    <span>{strengthScore < 5 ? (passwordFeedback[0] || "Too weak") : "Strong password"}</span>
                    <span className={cn("font-medium", strengthScore === 5 ? "text-green-500" : "")}>{getStrengthLabel(strengthScore)}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative group">
                <div className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all duration-300 pointer-events-none flex items-center gap-2",
                  (confirmFocused || confirmPassword) ? "top-0 scale-75 -translate-y-[130%] left-0 text-primary font-medium" : ""
                )}>
                  <ShieldCheck className={cn("w-4 h-4", (confirmFocused || confirmPassword) ? "hidden" : "block")} />
                  <span className={cn((confirmFocused || confirmPassword) ? "" : "text-sm")}>Confirm Password</span>
                </div>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                  className={cn(
                    "h-10 bg-surface-elevated border-white/5 focus:border-primary/50 transition-all pl-3 pt-1 text-sm",
                    confirmPassword && password !== confirmPassword ? "border-destructive/50 focus:border-destructive" : ""
                  )}
                  required
                />
              </div>


              {/* Errors & Success */}
              {error && (
                <div className="text-destructive text-sm flex items-center gap-2 animate-fade-in bg-destructive/10 p-2 rounded-md border border-destructive/20">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="text-green-500 text-sm flex items-center gap-2 animate-fade-in bg-green-500/10 p-2 rounded-md border border-green-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Account created successfully!</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full h-10 font-semibold shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : success ? (
                  "Welcome Aboard"
                ) : (
                  "Create Account"
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
                onClick={handleGoogleSignUp}
                disabled={isLoading || success}
                className="w-full h-10 bg-white text-black hover:bg-gray-200 border-none font-semibold transition-all flex items-center justify-center gap-2"
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
                Sign up with Google
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <div className="pt-3 border-t border-white/5 flex gap-1 justify-center">
                <span>Already have an account?</span>
                <Link to="/signin" className="text-primary hover:underline font-medium focus:outline-none">
                  Login
                </Link>
              </div>
            </div>

            {/* Mobile Footer Text (Visible only on < lg screens) */}
            <div className="mt-8 text-center lg:hidden pb-8 px-4">
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                By continuing, you agree to our{" "}
                <Link to="/user-agreement" className="text-blue-500 underline hover:text-blue-400 transition-colors">
                  User Agreement
                </Link>{" "}
                and acknowledge our{" "}
                <Link to="/policies" className="text-blue-500 underline hover:text-blue-400 transition-colors">
                  Policies
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Index;
