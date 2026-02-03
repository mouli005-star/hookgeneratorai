import { useState, useRef, useEffect } from "react"
import { User } from "firebase/auth"
import { Bell, Search, Sparkles, LogOut, Settings, User as UserIcon, ChevronDown } from "lucide-react"
import { auth } from "@/lib/firebase"
import { toast } from "sonner"

interface DashboardNavbarProps {
    user: User | null
}

export default function DashboardNavbar({ user }: DashboardNavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        try {
            await auth.signOut()
            window.location.href = "/"
            toast.success("Signed out successfully")
        } catch (error: any) {
            toast.error("Error signing out")
        }
    }

    return (
        <nav className="h-20 border-b border-white/5 bg-background/50 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-xl">
            <div className="flex items-center bg-white/5 rounded-xl px-4 py-2 border border-white/5 w-96 group focus-within:border-primary/50 transition-all">
                <Search className="w-4 h-4 text-white/20 group-focus-within:text-primary" />
                <input
                    type="text"
                    placeholder="Search generations..."
                    className="bg-transparent border-none focus:ring-0 text-sm font-medium w-full ml-3 text-white placeholder:text-white/20"
                />
            </div>

            <div className="flex items-center space-x-6">
                <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <Bell className="w-5 h-5 text-white/40" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-background"></span>
                </button>

                <div className="h-8 w-px bg-white/5" />

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center hover:bg-white/5 p-1 rounded-2xl transition-all group"
                    >
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                alt="Avatar"
                                className="w-10 h-10 rounded-xl border-2 border-white/5 shadow-xl group-hover:border-primary/50 transition-colors"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 border border-white/5">
                                <ChevronDown className={`w-3 h-3 text-white/40 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                            <div className="p-3 border-b border-white/5 mb-1">
                                <p className="text-xs font-black uppercase text-white/20 tracking-widest">Account</p>
                                <p className="text-sm font-bold truncate">{user?.email}</p>
                            </div>

                            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                                <UserIcon className="w-4 h-4" />
                                <span>Profile Settings</span>
                            </button>

                            <button className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                                <Settings className="w-4 h-4" />
                                <span>Preferences</span>
                            </button>

                            <div className="h-px bg-white/5 my-1" />

                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
