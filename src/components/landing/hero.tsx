"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Smartphone, Globe, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingHero() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="hero-gradient" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">New: V2.0 AI Engine Live</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    Turn ordinary content <br />
                    into <span className="text-gradient">viral hooks</span>
                </h1>

                <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Stop fighting the algorithm. Let our AI-powered studio rewrite your scripts for Instagram, YouTube Shorts, and X in seconds.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <Link href="/signup">
                        <Button size="lg" className="h-16 px-10 text-lg font-black rounded-2xl shadow-2xl shadow-primary/40 group">
                            Get Started Free <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-black rounded-2xl border-white/10 hover:bg-white/5 transition-all">
                            Live Demo
                        </Button>
                    </Link>
                </div>

                {/* Social Proof */}
                <div className="mt-24 pt-10 border-t border-white/5 max-w-4xl mx-auto opacity-40 grayscale animate-in fade-in duration-1000 delay-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
                        <span className="text-2xl font-black italic">INSTAGRAM</span>
                        <span className="text-2xl font-black italic">YOUTUBE</span>
                        <span className="text-2xl font-black italic">TWITTER</span>
                        <span className="text-2xl font-black italic">REELS</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
