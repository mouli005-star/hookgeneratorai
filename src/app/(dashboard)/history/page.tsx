"use client"

import { useEffect, useState } from "react"
import { db, auth } from "@/lib/firebase"
import { collection, query, where, limit, onSnapshot } from "firebase/firestore"
import { History as HistoryIcon, Clock, ChevronRight, MessageSquare, Copy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchHistory = async () => {
            const user = auth.currentUser
            if (!user) return

            try {
                const token = await user.getIdToken()
                const response = await fetch("/api/v1/history", {
                    headers: {
                        "X-FB-Token": token
                    }
                })

                if (!response.ok) {
                    throw new Error("Failed to load history")
                }

                const data = await response.json()
                setHistory(data.history)
            } catch (error: any) {
                console.error("History loading error:", error)
                toast.error("Could not load history")
            } finally {
                setIsLoading(false)
            }
        }

        fetchHistory()
    }, [])

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <div>
                <h1 className="text-4xl font-black tracking-tight mb-2 uppercase">Studio History</h1>
                <p className="text-white/40 font-medium">Revisit and reuse your previous viral generations.</p>
            </div>

            <div className="grid gap-6">
                {isLoading ? (
                    <div className="p-20 flex justify-center"><div className="w-8 h-8 border-4 border-dotted border-primary rounded-full animate-spin" /></div>
                ) : history.length > 0 ? history.map((item) => (
                    <div key={item.id} className="glass-card p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center gap-8 group hover:bg-white/10 transition-all border-white/5">
                        <div className="flex-grow space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.type}</span>
                                </div>
                                {item.platform && (
                                    <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.platform}</span>
                                    </div>
                                )}
                                {item.tone && (
                                    <div className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.tone}</span>
                                    </div>
                                )}
                                <div className="flex items-center space-x-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    <span>{item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold line-clamp-1">{item.prompt}</h3>
                            <p className="text-sm font-medium text-white/40 line-clamp-2 leading-relaxed">
                                {item.content}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="rounded-xl border-white/10 hover:bg-white/5 h-12 px-6 font-bold flex items-center gap-2"
                                onClick={() => {
                                    navigator.clipboard.writeText(item.content)
                                    toast.success("Copied to clipboard")
                                }}
                            >
                                <Copy className="w-4 h-4" /> Copy
                            </Button>
                            <Button
                                className="rounded-xl h-12 w-12 p-0 group-hover:scale-110 transition-transform"
                                onClick={() => {
                                    const params = new URLSearchParams()
                                    params.set("prompt", item.prompt)
                                    params.set("result", item.content)
                                    params.set("type", item.type)
                                    window.location.href = `/dashboard?${params.toString()}`
                                }}
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                )) : (
                    <div className="p-32 glass-card rounded-[3rem] text-center space-y-6">
                        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto opacity-20">
                            <HistoryIcon className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black uppercase tracking-widest text-white/40">No generations yet</h3>
                            <p className="text-sm text-white/20 font-medium max-w-xs mx-auto leading-relaxed">
                                Once you start generating content in the studio, your history will appear here.
                            </p>
                        </div>
                        <Button className="rounded-xl px-8 h-12 font-black uppercase tracking-widest text-xs" onClick={() => window.location.href = '/dashboard'}>
                            Start Creating
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
