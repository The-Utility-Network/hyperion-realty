'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { whitepaper_chapters, ChapterData, ChapterSection } from '@/data/whitepaper_chapters';

const DEFAULT_COLOR = '#d4af37'; // hr-gold

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function TableOfContents({ chapters, activeChapter, onChapterClick }: { chapters: ChapterData[], activeChapter: string, onChapterClick: (id: string) => void }) {
    return (
        <nav className="space-y-4">
            <div className="text-[10px] font-mono tracking-[0.2em] uppercase mb-6 text-gray-500 border-b border-white/10 pb-2">
                Manuscript Index
            </div>
            {chapters.map((chapter) => (
                <button
                    key={chapter.id}
                    onClick={() => onChapterClick(chapter.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 group ${activeChapter === chapter.id ? 'bg-white/5 border-l-2 shadow-[0_0_15px_rgba(212,175,55,0.05)]' : 'hover:bg-white/5'}`}
                    style={{ borderColor: activeChapter === chapter.id ? chapter.color : 'transparent' }}
                >
                    <div className="flex flex-col gap-1">
                        <span className={`text-[10px] font-mono tracking-widest ${activeChapter === chapter.id ? 'opacity-100' : 'opacity-40'}`} style={{ color: chapter.color }}>
                            PHASE {chapter.number}
                        </span>
                        <span className={`text-sm font-bold uppercase tracking-wide transition-colors ${activeChapter === chapter.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                            {chapter.title}
                        </span>
                    </div>
                </button>
            ))}
        </nav>
    );
}

function Section({ section, color }: { section: ChapterSection, color: string }) {
    const renderContent = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <motion.div variants={fadeInUp} className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-wide uppercase" style={{ color }}>
                {section.heading}
            </h3>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-light leading-relaxed">
                {section.content.trim().split('\n\n').map((paragraph, i) => {
                    const trimmedPara = paragraph.trim();

                    // Numbered list detection
                    if (/^\d+\./.test(trimmedPara)) {
                        const items = trimmedPara.split('\n').filter(line => line.trim());
                        return (
                            <div key={i} className="mb-8 pl-4 border-l-2" style={{ borderColor: `${color}30` }}>
                                {items.map((item, j) => {
                                    const listMatch = item.match(/^(\d+)\.\s*\*\*([^*]+)\*\*[:\.]?\s*([\s\S]*)$/);
                                    if (listMatch) {
                                        return (
                                            <div key={j} className="mb-4">
                                                <span className="font-bold" style={{ color }}>{listMatch[1]}. {listMatch[2]}</span>
                                                {listMatch[3] && <span className="text-gray-300"> {listMatch[3]}</span>}
                                            </div>
                                        );
                                    }
                                    return <p key={j} className="text-gray-300 mb-2">{renderContent(item)}</p>;
                                })}
                            </div>
                        );
                    }

                    return (
                        <p key={i} className="mb-6 text-lg">{renderContent(trimmedPara)}</p>
                    );
                })}
            </div>
        </motion.div>
    );
}

function Chapter({ chapter, index }: { chapter: ChapterData, index: number }) {
    const ref = useRef<HTMLElement>(null);

    return (
        <motion.section
            ref={ref}
            id={chapter.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="scroll-mt-40 mb-40"
        >
            <motion.div variants={fadeInUp} className="mb-16 border-l border-white/10 pl-8 relative">
                <div className="absolute top-0 -left-[1.5px] w-[3px] h-12 bg-gradient-to-b" style={{ from: chapter.color, to: 'transparent' }} />
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded border mb-6 bg-black shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ borderColor: `${chapter.color}40`, color: chapter.color }}>
                    <span className="font-mono text-[10px] tracking-widest font-bold">CHAPTER {chapter.number}</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6" style={{ background: `linear-gradient(135deg, ${chapter.color}, white)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {chapter.title}
                </h2>
                <p className="text-xl text-gray-400 font-light">
                    {chapter.subtitle}
                </p>
            </motion.div>

            {/* Chapter Hero Image */}
            {chapter.heroImage && (
                <motion.div variants={fadeInUp} className="mb-16 relative rounded-2xl overflow-hidden border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <div className="relative aspect-[21/9]">
                        <img 
                            src={chapter.heroImage} 
                            alt={chapter.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050914] to-transparent" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050914] to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050914] to-transparent" />
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050914]/60 to-transparent" />
                    </div>
                </motion.div>
            )}

            {chapter.sections.map((section, i) => (
                <Section key={i} section={section} color={chapter.color} />
            ))}

            <motion.blockquote variants={fadeInUp} className="my-24 py-16 px-12 border-l-2 relative bg-[#0a1122] rounded-r-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" style={{ borderColor: chapter.color }}>
                <div className="absolute left-6 top-6 text-8xl font-serif select-none" style={{ color: chapter.color, opacity: 0.1 }}>"</div>
                <p className="text-2xl md:text-3xl font-light leading-relaxed relative z-10 pl-8 text-white italic">
                    {chapter.pullQuote}
                </p>
            </motion.blockquote>

            {index < whitepaper_chapters.length - 1 && (
                <div className="flex items-center justify-center gap-4 py-8">
                    <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            )}
        </motion.section>
    );
}

export default function WhitepaperTreatise() {
    const [activeChapter, setActiveChapter] = useState(whitepaper_chapters[0].id);
    const [showToc, setShowToc] = useState(false);
    const [particles, setParticles] = useState<any[]>([]);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newParticles = [...Array(30)].map((_, i) => ({
            id: i,
            color: DEFAULT_COLOR,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: Math.random() * 100,
            top: Math.random() * 100,
            opacity: Math.random() * 0.3 + 0.05,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 2
        }));
        setParticles(newParticles);
    }, []);

    const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveChapter(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px' }
        );

        whitepaper_chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToChapter = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setShowToc(false);
        }
    };

    return (
        <main ref={mainRef} className="bg-[#050914] text-white min-h-screen relative font-sans selection:bg-hr-gold selection:text-black">
            <Navbar />

            {/* Scroll Progress Indicator */}
            <motion.div className="fixed top-0 left-0 h-1 z-50 bg-hr-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" style={{ width: progressWidth }} />

            {/* Mobile TOC Button */}
            <button onClick={() => setShowToc(!showToc)} className="fixed bottom-8 right-8 z-40 xl:hidden w-14 h-14 rounded-full shadow-2xl flex items-center justify-center bg-hr-gold text-black border border-hr-gold/50">
                <span className="font-mono text-xs font-bold w-full h-full flex items-center justify-center pt-0.5">TOC</span>
            </button>

            {showToc && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-40 xl:hidden">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowToc(false)} />
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} className="absolute right-0 top-0 h-full w-80 bg-[#050914] border-l border-white/10 p-8 overflow-y-auto">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                            <h3 className="text-[10px] font-mono tracking-widest text-hr-gold uppercase">Manuscript Navigation</h3>
                            <button onClick={() => setShowToc(false)} className="text-gray-400 hover:text-white pb-1 w-6 h-6 flex items-center justify-center border border-white/10 rounded">✕</button>
                        </div>
                        <TableOfContents chapters={whitepaper_chapters} activeChapter={activeChapter} onChapterClick={scrollToChapter} />
                    </motion.div>
                </motion.div>
            )}

            {/* Hero Splash Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10" style={{ backgroundImage: `url('/artifacts/luxury_exterior_light.png')` }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/80 via-[#050914]/90 to-[#050914]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hr-gold/5 blur-[150px] rounded-full pointer-events-none" />
                </div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{ backgroundColor: particle.color, width: particle.width, height: particle.height, left: `${particle.left}%`, top: `${particle.top}%`, opacity: particle.opacity }}
                            animate={{ y: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }}
                            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                        <div className="inline-block px-6 py-2 bg-[#0a1122] rounded-full border border-hr-gold/30 text-[10px] font-mono tracking-[0.2em] uppercase mb-8 text-hr-gold shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                            Institutional Whitepaper v1.2
                        </div>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-hr-gold via-yellow-200 to-hr-gold">Protocol</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                        A rigorous architectural specification for the democratization of tier-1 institutional real estate via the ERC721/ERC20 bridge protocol.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button onClick={() => scrollToChapter(whitepaper_chapters[0].id)} className="px-10 py-5 bg-hr-gold hover:bg-[#b5943b] text-black font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                            Begin Reading
                        </button>
                        <div className="text-[10px] text-hr-gold/50 font-mono border border-hr-gold/20 px-4 py-2 bg-hr-gold/5 rounded">
                            {whitepaper_chapters.length} CHAPTERS • EST. 45+ MIN
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Manuscript Framework */}
            <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
                <div className="flex gap-20 items-start">
                    
                    {/* Sticky Sidebar */}
                    <aside className="hidden xl:block w-72 shrink-0 sticky top-32">
                        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto pr-4">
                            <TableOfContents chapters={whitepaper_chapters} activeChapter={activeChapter} onChapterClick={scrollToChapter} />
                            
                            <div className="mt-12 p-6 rounded-xl border border-white/5 bg-[#0a1122]">
                                <div className="text-[9px] font-mono tracking-widest text-gray-500 mb-3 border-b border-white/5 pb-2">ACTIVE SECTION</div>
                                <div className="font-bold text-hr-gold text-lg leading-tight">
                                    {whitepaper_chapters.find(c => c.id === activeChapter)?.title || whitepaper_chapters[0].title}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Render */}
                    <article className="flex-1 max-w-4xl mx-auto xl:mx-0">
                        {whitepaper_chapters.map((chapter, index) => (
                            <Chapter key={chapter.id} chapter={chapter} index={index} />
                        ))}
                    </article>

                </div>
            </div>

            <Footer />
        </main>
    );
}
