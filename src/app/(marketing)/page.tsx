import LandingHero from "@/components/landing/hero"
import LandingFeatures from "@/components/landing/features"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
    return (
        <>
            <LandingHero />
            <LandingFeatures />

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center glass-card p-16 rounded-[3rem] relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to go viral?</h2>
                    <p className="text-xl text-white/40 mb-12 font-medium">
                        Join 2,000+ creators who are using HookMaster AI to dominate the algorithm.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" className="h-16 px-12 text-lg font-black rounded-2xl premium-gradient border-0 shadow-2xl">
                            Start Creating Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </>
    )
}
