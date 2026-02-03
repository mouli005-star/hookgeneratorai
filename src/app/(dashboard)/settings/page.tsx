"use client"

import { useState } from "react"
import {
    CreditCard,
    ShieldCheck,
    Zap,
    Crown,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
    "Unlimited AI Generations",
    "Priority Llama-3.2 V2 Access",
    "Custom Viral Frameworks",
    "Advanced Bulk Export",
    "Multi-Platform Presets",
    "Dedicated Account Manager"
]

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            <div>
                <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Account Settings</h1>
                <p className="text-white/40 font-medium">Manage your subscription, billing, and profile preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Plan Status */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-10 rounded-[2.5rem] border-primary/20 bg-primary/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                            <Crown className="w-40 h-40 text-primary" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-primary rounded-xl">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-primary">Active Subscription</span>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-3xl font-black italic">PRO ACCOUNT</h2>
                                <p className="text-white/40 font-medium">Next billing date: March 3, 2026</p>
                            </div>

                            <div className="flex items-center space-x-4 pt-4">
                                <Button className="premium-gradient font-black text-xs uppercase px-8 rounded-xl h-11 border-0">
                                    Manage Billing
                                </Button>
                                <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 font-black text-xs uppercase px-8 rounded-xl h-11 border-0">
                                    Cancel Plan
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black flex items-center gap-3 italic">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                                PLAN BENEFITS
                            </h3>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Everything Unlocked</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center space-x-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-xs font-bold text-white/80">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Info Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto border border-white/10">
                                <CreditCard className="w-8 h-8 text-white/20" />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-widest">Payment Method</h4>
                            <p className="text-xs font-medium text-white/40">Visa ending in •••• 4242</p>
                        </div>
                        <Button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest">
                            Update Card
                        </Button>
                    </div>

                    <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-4">
                        <h4 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            Usage Stats
                        </h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                <span className="text-white/40">Tokens Used</span>
                                <span>82%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[82%] shadow-[0_0_10px_#8b5cf6]" />
                            </div>
                        </div>
                        <p className="text-[9px] text-white/20 font-medium text-center italic">Resets in 12 days</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
