"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="fixed w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="bg-primary/10 p-1 rounded-xl group-hover:scale-110 transition-transform overflow-hidden w-10 h-10 flex items-center justify-center">
                            <img src="/logo.svg" alt="HookMaster Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xl font-black tracking-tight uppercase">
                            HookMaster <span className="text-primary italic">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</Link>
                        <Link href="#pricing" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Pricing</Link>
                        <div className="h-6 w-px bg-white/10 mx-4" />
                        <Link href="/login">
                            <Button variant="ghost" className="text-sm font-bold">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20">Get Started Free</Button>
                        </Link>
                    </div>

                    {/* Mobile Button */}
                    <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 w-full bg-background border-b border-white/5 p-6 space-y-4 animate-in slide-in-from-top-4">
                    <Link href="#features" className="block text-lg font-bold">Features</Link>
                    <Link href="#pricing" className="block text-lg font-bold">Pricing</Link>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Link href="/login">
                            <Button variant="outline" className="w-full rounded-xl">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="w-full rounded-xl">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
