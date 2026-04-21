
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Features from '@/components/Features';
import Process from '@/components/Process';
import DistilleryProcess from '@/components/DistilleryProcess';
import Roadmap from '@/components/Roadmap';
import Team from '@/components/Team';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import TargetProperties from '@/components/TargetProperties';

export default function Home() {
    return (
        <div className="relative min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-orange-500 selection:text-white">
            <Navbar />

            <main className="relative z-10 w-full overflow-hidden">
                <Hero />
                <div className="relative w-full overflow-hidden bg-[#03050a]/95 border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                    <Mission />
                    <Features />
                    <TargetProperties />
                    
                    {/* Process Integration */}
                    <div className="relative">
                        <Process />
                        <div className="hidden lg:block absolute bottom-0 right-0 w-1/3 h-full opacity-10 pointer-events-none bg-gradient-to-l from-[#d4af37] to-transparent" />
                    </div>
                    
                    <DistilleryProcess />
                    <Roadmap />
                    <Team />
                    <ContactForm />
                </div>
            </main>

            <Footer />
        </div>
    );
}
