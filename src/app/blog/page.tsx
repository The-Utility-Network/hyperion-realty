import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { COMPARISONS } from '@/data/comparisons';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hyperion Intelligence | Research & Analysis',
    description: 'Institutional research, protocol mechanics, and strategic analysis from the Hyperion Trust. Deep-dive publications on tokenized real estate, dual-token architecture, and portfolio diversification.',
};

export default function BlogIndex() {
    const hub = COMPARISONS.find(p => p.isHub);
    const spokes = COMPARISONS.filter(p => !p.isHub);

    return (
        <div className="min-h-screen bg-[#050914] text-white selection:bg-hr-gold selection:text-black font-sans">
            <Navbar />

            <main className="pt-40 pb-24 max-w-7xl mx-auto">
                <div className="text-center px-6 mb-20">
                    <span className="text-[10px] font-mono tracking-[0.4em] text-hr-gold mb-4 block">HPR.INTELLIGENCE</span>
                    <h1 className="text-5xl md:text-8xl font-black mt-4 mb-8 leading-tight tracking-tight uppercase">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold via-yellow-200 to-hr-gold">Journal</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Research dispatches, protocol deep-dives, and strategic analysis from the Hyperion Trust.
                    </p>
                </div>

                {/* Hub Article — Featured */}
                {hub && (
                    <Link
                        href={`/blog/${hub.slug}`}
                        className="group block mx-6 mb-16 rounded-2xl overflow-hidden border border-white/5 hover:border-hr-gold/40 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-500"
                    >
                        <div className="relative aspect-[21/9] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${hub.coverImage})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-[#050914]/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-hr-gold text-black text-[10px] font-mono tracking-wider rounded-full font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                                        FEATURED
                                    </span>
                                    <span className="text-xs font-mono text-hr-gold bg-hr-gold/10 px-2 py-0.5 rounded border border-hr-gold/20">{hub.category}</span>
                                    <span className="text-xs font-mono text-gray-400">{hub.readTime}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black mb-4 text-white group-hover:text-hr-gold transition-colors leading-tight max-w-4xl tracking-wide uppercase">
                                    {hub.title}
                                </h2>
                                <p className="text-gray-300 max-w-3xl leading-relaxed text-lg hidden md:block">
                                    {hub.excerpt}
                                </p>
                            </div>
                        </div>
                    </Link>
                )}

                {/* Spoke Articles Grid */}
                <div className="grid md:grid-cols-2 gap-8 px-6">
                    {spokes.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group bg-[#0a1122] rounded-2xl overflow-hidden border border-white/5 hover:border-hr-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${post.coverImage})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] via-[#0a1122]/40 to-transparent" />
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="text-[10px] font-mono text-hr-gold tracking-widest uppercase border border-hr-gold/30 bg-hr-gold/5 px-2 py-1 rounded">{post.category}</span>
                                    <span className="text-[10px] font-mono text-gray-500">{post.readTime}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-hr-gold transition-colors leading-snug tracking-wide uppercase">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-mono text-gray-500 flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-hr-gold/20 flex items-center justify-center text-hr-gold text-[10px]">{post.author.charAt(0)}</div>
                                        {post.author}
                                    </span>
                                    <span className="text-xs font-mono text-gray-600">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
