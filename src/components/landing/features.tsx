import { Zap, Smartphone, Globe, ShieldCheck, History, Sparkles } from "lucide-react"

const features = [
    {
        title: "Platform Optimized",
        description: "Generate content specifically tailored for Instagram Reels, YouTube Shorts, or X formats.",
        icon: Smartphone
    },
    {
        title: "Viral Hook Engine",
        description: "Our proprietary algorithm crafts attention-grabbing hooks that stop the scroll instantly.",
        icon: Zap
    },
    {
        title: "Tone Transformation",
        description: "Easily switch between Professional, Bold, Casual, or Viral tones to match your brand.",
        icon: Sparkles
    },
    {
        title: "Unlimited History",
        description: "Never lose a great idea. Every generation is saved securely in your private vault.",
        icon: History
    },
    {
        title: "Global AI Models",
        description: "Powered by the latest large language models for unparalleled content creativity.",
        icon: Globe
    },
    {
        title: "Security & Privacy",
        description: "Your data is encrypted and private. We never use your content to train public models.",
        icon: ShieldCheck
    }
]

export default function Features() {
    return (
        <section id="features" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Features</h2>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                        Built for the next generation <br /> of content creators
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="glass-card p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                            <p className="text-white/40 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
