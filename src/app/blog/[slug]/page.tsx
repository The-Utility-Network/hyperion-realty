import { notFound } from 'next/navigation';
import { COMPARISONS } from '@/data/comparisons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return COMPARISONS.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = COMPARISONS.find((p) => p.slug === slug);

    if (!post) {
        return { title: 'Article Not Found | Hyperion Realty' };
    }

    return {
        title: `${post.title} | Hyperion Intelligence`,
        description: post.metaDescription,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = COMPARISONS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const related = COMPARISONS.filter(p => post.relatedSlugs.includes(p.slug));

    return (
        <div className="min-h-screen bg-[#050914] text-white selection:bg-hr-gold selection:text-black font-sans">
            <Navbar />

            <div className="relative pt-28 overflow-hidden pb-24">
                {/* Hero Cover with vignettes */}
                <div className="relative max-w-5xl mx-auto px-6">
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)] border border-white/5">
                        <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-auto object-cover max-h-[500px]"
                        />
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050914] to-transparent" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050914] to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050914] to-transparent" />
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050914]/80 to-transparent" />
                    </div>
                </div>

                <main className="max-w-4xl mx-auto relative z-10 px-6 mt-8">
                    <div className="mb-12">
                        <Link href="/blog" className="text-sm font-mono text-gray-500 hover:text-hr-gold transition-colors flex items-center gap-2 mb-8 uppercase tracking-widest">
                            ← Back to Journal
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {post.isHub && (
                                <span className="px-3 py-1 bg-hr-gold text-black text-[10px] font-mono tracking-wider rounded-full font-bold">
                                    FEATURED
                                </span>
                            )}
                            <span className="text-xs font-mono text-hr-gold tracking-widest uppercase border border-hr-gold/30 bg-hr-gold/5 px-2 py-1 rounded">{post.category}</span>
                            <span className="text-xs font-mono text-gray-500">{post.readTime}</span>
                            <span className="text-xs font-mono text-gray-600">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 pb-8 border-b border-white/10">
                            <div className="w-12 h-12 rounded-full bg-hr-gold/10 border border-hr-gold/30 flex items-center justify-center text-hr-gold font-bold text-lg shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <span className="text-base font-bold text-white tracking-wide uppercase">{post.author}</span>
                                <p className="text-xs text-hr-gold/60 font-mono tracking-widest">Hyperion Protocol Team</p>
                            </div>
                        </div>
                    </div>

                    {/* Article Body */}
                    <article className="prose prose-invert prose-lg max-w-none prose-p:font-light prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: post.content
                                    .replace(/^## (.+)$/gm, '<h2 class="text-3xl md:text-4xl font-bold text-hr-gold mt-20 mb-8 uppercase tracking-wide">$1</h2>')
                                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                                    .replace(/^- (.+)$/gm, '<div class="flex gap-3 items-start my-3"><span class="w-1.5 h-1.5 bg-hr-gold rounded-full mt-2.5 flex-shrink-0"></span><span>$1</span></div>')
                                    .replace(/^(\d+)\. \*\*(.+?)\*\*(.*)$/gm, '<div class="flex gap-3 items-start my-3"><span class="text-hr-gold font-mono text-sm font-bold min-w-[1.5rem]">$1.</span><span><strong class="text-white">$2</strong>$3</span></div>')
                                    .replace(/\n\n/g, '</p><p class="mb-8">')
                            }}
                        />
                    </article>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="mt-28 pt-16 border-t border-white/10">
                            <h3 className="text-sm font-bold tracking-widest text-hr-gold mb-8 uppercase">Related Intelligence</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                {related.map(rel => (
                                    <Link
                                        key={rel.slug}
                                        href={`/blog/${rel.slug}`}
                                        className="group bg-[#0a1122] rounded-xl p-8 border border-white/5 hover:border-hr-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-300 flex flex-col"
                                    >
                                        <span className="text-[10px] font-mono text-hr-gold/60 tracking-widest uppercase mb-3 block">{rel.category}</span>
                                        <h4 className="text-xl font-bold mb-3 text-white group-hover:text-hr-gold transition-colors leading-snug tracking-wide uppercase">
                                            {rel.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed flex-grow">{rel.excerpt}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Back to Hub */}
                    {!post.isHub && (
                        <div className="mt-16 mb-24 text-center">
                            <Link
                                href="/blog/hyperion-vs-traditional-reits"
                                className="inline-block px-10 py-5 bg-hr-gold/5 border border-hr-gold/40 rounded-xl text-hr-gold font-bold text-sm tracking-widest uppercase hover:bg-hr-gold hover:text-black transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                            >
                                Read Hub Article: Hyperion vs REITs
                            </Link>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}
