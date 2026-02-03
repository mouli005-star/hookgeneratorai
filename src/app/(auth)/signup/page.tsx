"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chrome, ArrowLeft, Check } from "lucide-react"
import { toast } from "sonner"

import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            toast.success("Account created successfully!")
            router.push("/dashboard")
        } catch (error: any) {
            toast.error(error.message || "Failed to create account")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setIsLoading(true)
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider)
            toast.success("Successfully signed up with Google!")
            router.push("/dashboard")
        } catch (error: any) {
            toast.error(error.message || "Google signup failed")
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
                        <img src="/logo.png" alt="HookMaster Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Create an account</h1>
                    <p className="text-white/40 font-medium leading-relaxed">Join 2,000+ creators building viral content with AI.</p>
                </div>

                <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                    <form onSubmit={handleSignup} className="space-y-4">
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-12 rounded-xl bg-white/5 border-white/5 focus:border-primary/50 transition-all font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest pl-1 pt-1">Min. 8 characters with numbers</p>
                        </div>
                        <Button className="w-full h-12 rounded-xl font-bold text-lg premium-gradient border-0 shadow-lg shadow-primary/20" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Get Started Free"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-white/20 font-black">Or join via</span></div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl border-white/5 bg-white/5 font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 488 512" xmlns="http://www.w3.org/2000/svg"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor" /></svg>
                        Sign up with Google
                    </Button>

                    <p className="text-center text-sm font-medium text-white/40 pt-2">
                        Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Login</Link>
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-white/20">
                        <Check className="w-3 h-3 text-primary" /> <span>No credit card</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-white/20">
                        <Check className="w-3 h-3 text-primary" /> <span>Cancel anytime</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
