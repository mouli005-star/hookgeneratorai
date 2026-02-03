"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    History as HistoryIcon,
    Settings,
    LogOut,
    Zap,
    MessageSquare,
    Compass,
    ChevronLeft,
    Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'History', href: '/history', icon: HistoryIcon },
    { name: 'Templates', href: '/templates', icon: Compass },
    { name: 'Settings', href: '/settings', icon: Settings },
]

interface SidebarProps {
    isCollapsed: boolean
    onToggle: () => void
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={cn(
            "border-r border-white/5 bg-background/50 h-screen flex flex-col fixed left-0 top-0 transition-all duration-300 z-50",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className="p-6 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-3 group overflow-hidden">
                    <div className="bg-primary/10 p-1 rounded-xl flex-shrink-0 w-9 h-9 flex items-center justify-center overflow-hidden">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    {!isCollapsed && (
                        <span className="text-sm font-black tracking-tight uppercase whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-300">HookMaster AI</span>
                    )}
                </Link>
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                >
                    {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            <nav className="flex-grow px-4 space-y-1">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group overflow-hidden",
                            pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className={cn(
                            "w-5 h-5 flex-shrink-0 transition-colors",
                            pathname === item.href ? "text-primary" : "text-white/20 group-hover:text-white"
                        )} />
                        {!isCollapsed && (
                            <span className="whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">{item.name}</span>
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-4">
                <button
                    onClick={async () => {
                        await auth.signOut();
                        window.location.href = "/";
                        toast.success("Signed out successfully");
                    }}
                    className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-destructive hover:bg-destructive/10 transition-all group w-full overflow-hidden",
                        isCollapsed && "justify-center px-0"
                    )}
                >
                    <LogOut className="w-5 h-5 text-white/20 group-hover:text-destructive flex-shrink-0" />
                    {!isCollapsed && (
                        <span className="whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">Sign Out</span>
                    )}
                </button>
            </div>
        </aside>
    )
}
