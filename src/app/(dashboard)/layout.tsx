"use client"

import Sidebar from "@/components/dashboard/sidebar"
import DashboardNavbar from "@/components/dashboard/navbar"
import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect, useState } from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<User | null>(null)
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u)
        })
        return () => unsubscribe()
    }, [])

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
            <div className={`flex-grow transition-all duration-300 flex flex-col ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
                <DashboardNavbar user={user} />
                <main className="p-8">
                    {children}
                </main>
            </div>
            <Toaster position="bottom-right" theme="dark" />
        </div>
    )
}
