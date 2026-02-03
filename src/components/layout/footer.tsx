import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary p-2 rounded-xl">
                                <span className="font-bold text-white text-lg">H</span>
                            </div>
                            <span className="text-xl font-black tracking-tight">HookMaster AI</span>
                        </div>
                        <p className="text-white/40 max-w-sm leading-relaxed">
                            Empowering creators with AI-driven content transformation. Turn ordinary ideas into viral sensations in seconds.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white/20 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="text-white/20 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="text-white/20 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Product</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">AI Studio</Link></li>
                            <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Legal</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 font-bold uppercase tracking-widest">
                    <p>© 2026 HookMaster AI. All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Built for the future of content</p>
                </div>
            </div>
        </footer>
    )
}
