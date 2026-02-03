"use client"

import { useState } from "react"
import {
    Zap,
    Sparkles,
    ArrowRight,
    Flame,
    User,
    PlayCircle,
    Rocket,
    Brain,
    MessageCircle,
    Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import { templates, categories } from "@/constants/templates"

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()

    const filteredTemplates = templates.filter(t => {
        const matchesCategory = activeCategory === "All" || t.category === activeCategory
        const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.hook.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const handleUseTemplate = (hook: string) => {
        const params = new URLSearchParams()
        params.set("template", hook)
        router.push(`/dashboard?${params.toString()}`)
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <h1 className="text-4xl font-black tracking-tight mb-2 uppercase italic">Viral Library</h1>
                    <p className="text-white/40 font-medium tracking-tight">Access 100+ proven frameworks used by Top 1% creators.</p>

                    <div className="relative w-full max-w-sm group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search frameworks..."
                            className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/5 overflow-x-auto scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-white/40 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, i) => (
                    <div key={i} className="glass-card hover-glow p-8 rounded-[2rem] flex flex-col h-full group transition-all duration-500">
                        <div className="flex items-start justify-between mb-8">
                            <div className={`p-3 rounded-2xl bg-white/5 ${template.color}`}>
                                <template.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">{template.category}</span>
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{template.title}</h3>
                        <p className="text-sm text-white/40 font-medium leading-relaxed mb-6 flex-grow">
                            {template.description}
                        </p>

                        <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-8">
                            <p className="text-xs font-bold text-white/60 italic leading-relaxed">
                                "{template.hook}"
                            </p>
                        </div>

                        <Button
                            className="w-full bg-white/5 hover:bg-primary hover:text-white text-white font-bold rounded-xl border-white/5 group/btn"
                            onClick={() => handleUseTemplate(template.hook)}
                        >
                            Use Template
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div className="glass-card p-12 rounded-[3rem] text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Zap className="w-64 h-64 text-primary" />
                </div>
                <h2 className="text-3xl font-black">Want custom templates for your brand?</h2>
                <p className="text-white/40 font-medium max-w-lg mx-auto">
                    Our VIP members get 50+ fresh viral frameworks every month.
                </p>
                <Button className="h-12 px-8 rounded-xl font-black premium-gradient border-0">
                    Join VIP Waitlist
                </Button>
            </div>
        </div>
    )
}
