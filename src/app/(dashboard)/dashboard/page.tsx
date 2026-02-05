"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Instagram,
    Youtube,
    Twitter,
    Sparkles,
    ArrowRight,
    Copy,
    RefreshCcw,
    Bookmark,
    ChevronDown,
    Zap
} from "lucide-react"
import { toast } from "sonner"
import { auth } from "@/lib/firebase"

const platforms = [
    { name: 'Instagram Reels', icon: Instagram, color: 'text-pink-500' },
    { name: 'YouTube Shorts', icon: Youtube, color: 'text-red-500' },
    { name: 'Twitter / X', icon: Twitter, color: 'text-blue-400' },
]

const tones = ['Professional', 'Bold', 'Casual', 'Viral', 'Humorous']
const outputs = ['Rewrite', 'Hooks', 'Hashtags']

function DashboardContent() {
    const searchParams = useSearchParams()
    const [prompt, setPrompt] = useState("")
    const [platform, setPlatform] = useState(platforms[0].name)
    const [tone, setTone] = useState(tones[0])
    const [outputType, setOutputType] = useState(outputs[0])
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)

    // Handle Template & History Pre-fill
    useEffect(() => {
        const template = searchParams.get("template")
        const promptParam = searchParams.get("prompt")
        const resultParam = searchParams.get("result")
        const typeParam = searchParams.get("type")
        const toneParam = searchParams.get("tone")

        if (template) {
            setPrompt(template)
            setOutputType("Hooks")
        } else if (promptParam) {
            setPrompt(promptParam)
        }

        if (resultParam) {
            setResult(resultParam)
        }

        if (typeParam) {
            // Capitalize first letter to match outputs array
            const capitalized = typeParam.charAt(0).toUpperCase() + typeParam.slice(1)
            setOutputType(capitalized)
        }

        if (toneParam) setTone(toneParam)
    }, [searchParams])

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error("Please enter some content first")
            return
        }

        setIsLoading(true)
        setResult(null)

        try {
            const user = auth.currentUser
            if (!user) throw new Error("Please sign in first")

            const token = await user.getIdToken()
            const response = await fetch("/api/v1/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-FB-Token": token
                },
                body: JSON.stringify({
                    prompt,
                    type: outputType.toLowerCase(),
                    platform,
                    tone
                }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Failed to generate (Status: ${response.status})`)
            }

            const data = await response.json()
            setResult(data.content)
            toast.success("Content generated successfully!")
        } catch (error: any) {
            console.error("Generation Error:", error)
            toast.error(error.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Generate Viral Content</h1>
                    <p className="text-white/40 font-medium">Transform your ideas into high-engagement platform-ready posts.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Column: Input Controls */}
                <div className="space-y-6">
                    <div className="glass-card p-10 rounded-[2.5rem] space-y-8 bg-white/5 border-white/5 shadow-2xl">
                        {/* Platform Selector */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Platform Target</label>
                            <div className="grid grid-cols-3 gap-3">
                                {platforms.map((p) => (
                                    <button
                                        key={p.name}
                                        onClick={() => setPlatform(p.name)}
                                        className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all ${platform === p.name
                                            ? 'bg-primary/10 border-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]'
                                            : 'bg-white/5 border-transparent text-white/40 hover:bg-white/10'
                                            }`}
                                    >
                                        <p.icon className={`w-5 h-5 mb-1.5 ${p.color}`} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">{p.name.split(' ')[0]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Textarea */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Original Content / Topic</label>
                            <Textarea
                                placeholder="Paste your script or describe your topic here..."
                                className="min-h-[300px] bg-white/5 border-white/5 rounded-3xl p-6 text-lg font-medium resize-none focus:ring-1 focus:ring-primary/30 focus:border-primary/50 transition-all placeholder:text-white/10 leading-relaxed"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Creative Tone</label>
                                <div className="relative group">
                                    <select
                                        className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-xs font-bold appearance-none cursor-pointer group-hover:bg-white/10 transition-all focus:outline-none focus:ring-1 focus:ring-primary/30"
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value)}
                                    >
                                        {tones.map(t => <option key={t} value={t} className="bg-background">{t}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Goal</label>
                                <div className="relative group">
                                    <select
                                        className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-xs font-bold appearance-none cursor-pointer group-hover:bg-white/10 transition-all focus:outline-none focus:ring-1 focus:ring-primary/30"
                                        value={outputType}
                                        onChange={(e) => setOutputType(e.target.value)}
                                    >
                                        {outputs.map(o => <option key={o} value={o} className="bg-background">{o}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Button
                            className="w-full h-16 rounded-2xl text-lg font-black premium-gradient border-0 shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all group overflow-hidden relative"
                            onClick={handleGenerate}
                            disabled={isLoading}
                        >
                            <div className="relative z-10 flex items-center justify-center space-x-3">
                                {isLoading ? (
                                    <>
                                        <RefreshCcw className="w-5 h-5 animate-spin" />
                                        <span>Engineering Magic...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span>Generate Viral Content</span>
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </Button>
                    </div>
                </div>

                {/* Right Column: Result Area (Sticky) */}
                <div className="lg:sticky lg:top-8 space-y-6">
                    {result ? (
                        <div className="glass-card p-10 rounded-[2.5rem] bg-primary/5 border-primary/20 space-y-6 animate-in slide-in-from-right-10 duration-700 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary block">Masterpiece READY</span>
                                        <p className="text-[9px] text-white/30 font-bold">Processed by Llama-3.2 V2</p>
                                    </div>
                                </div>
                                <div className="bg-primary/20 text-primary text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">Verified Viral</div>
                            </div>

                            <div className="bg-black/60 p-8 rounded-[2rem] border border-white/5 whitespace-pre-wrap leading-relaxed text-base font-medium text-white/90 max-h-[600px] overflow-y-auto custom-scrollbar shadow-inner">
                                {result}
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Button
                                    variant="outline"
                                    className="h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold flex items-center gap-2 border-0 shadow-lg text-xs"
                                    onClick={() => {
                                        navigator.clipboard.writeText(result)
                                        toast.success("Copied to clipboard")
                                    }}
                                >
                                    <Copy className="w-4 h-4 text-primary" /> Copy List
                                </Button>
                                <Button variant="outline" className="h-12 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 font-bold flex items-center gap-2 border-0 shadow-lg text-xs">
                                    <Bookmark className="w-4 h-4 text-primary" /> Save Preset
                                </Button>
                            </div>

                            <Button className="w-full h-12 bg-white text-black hover:bg-white/90 font-black rounded-xl text-xs uppercase tracking-widest" onClick={handleGenerate}>
                                <RefreshCcw className="w-4 h-4 mr-2" /> Regenerate Variations
                            </Button>
                        </div>
                    ) : (
                        <div className="glass-card p-12 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-8 min-h-[660px] bg-white/5 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                            <div className="relative z-10 space-y-8">
                                <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-xl font-black uppercase tracking-[0.2em] text-white/80">AI Content Studio</h3>
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest max-w-[240px] mx-auto leading-loose">
                                        Input your content on the left to activate the viral engine.
                                    </p>
                                </div>
                                <div className="flex items-center justify-center space-x-2 text-white/10">
                                    <div className="w-12 h-px bg-current" />
                                    <Zap className="w-4 h-4" />
                                    <div className="w-12 h-px bg-current" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    )
}
