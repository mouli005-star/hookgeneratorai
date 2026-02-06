"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chrome, Mail, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast.success("Successfully logged in!")
            router.push("/dashboard")
        } catch (error: any) {
            toast.error(error.message || "Failed to login")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            toast.success("Successfully logged in with Google!")
            router.push("/dashboard")
        } catch (error: any) {
            toast.error(error.message || "Google login failed")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="hero-gradient opacity-10" />

            <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to home
            </Link>

            <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center space-y-4">
                    <div className="bg-primary/10 p-1 rounded-2xl w-24 h-24 mx-auto shadow-2xl shadow-primary/10 overflow-hidden flex items-center justify-center">
                        <img src="/logo.svg" alt="HookMaster Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Welcome back</h1>
                    <p className="text-white/40 font-medium leading-relaxed">Login to your AI Studio to continue creating content.</p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                className="h-12 rounded-xl bg-white/5 border-white/5 focus:border-primary/50 transition-all font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <button
                                    type="button"
                                    onClick={() => toast.info("Password reset feature coming soon!")}
                                    className="text-xs font-bold text-primary hover:underline transition-all"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-12 rounded-xl bg-white/5 border-white/5 focus:border-primary/50 transition-all font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button className="w-full h-12 rounded-xl font-bold text-lg" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-white/20 font-black">Or continue with</span></div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl border-white/5 bg-white/5 font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor" /></svg>
                        Sign in with Google
                    </Button>

                    <p className="text-center text-sm font-medium text-white/40 pt-2">
                        Don't have an account? <Link href="/signup" className="text-primary hover:underline font-bold">Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
