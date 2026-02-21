import React from 'react';
import { useContent } from '../src/hooks/useContent';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const { content, loading } = useContent();

    if (loading || !content) {
        return (
            <header className="bg-[#7a9eb1] min-h-[600px] flex items-center justify-center animate-pulse">
                <div className="h-12 bg-white/20 w-3/4"></div>
            </header>
        );
    }

    return (
        <header className="relative bg-[#7a9eb1] min-h-[600px] md:h-[80vh] overflow-hidden flex flex-col md:flex-row items-center">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-full relative flex items-end justify-center pt-20 md:pt-0">
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 w-full max-w-md md:max-w-none px-6"
                >
                    <img 
                        src={content.header.imageUrl || "https://picsum.photos/seed/bueso-chair/800/1000"} 
                        alt="Product Showcase" 
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        referrerPolicy="no-referrer"
                    />
                </motion.div>
                
                {/* Branding Overlay like in image */}
                <div className="absolute top-32 left-12 z-20 hidden md:block">
                    <div className="text-white/80 font-bold text-2xl tracking-tighter leading-none">
                        BUESO
                        <div className="text-[10px] tracking-[0.3em] font-normal mt-1">PRECISION</div>
                    </div>
                </div>
            </div>

            {/* Right Side: Text */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 py-16 md:py-0 text-white">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-8">
                        {content.header.title.replace('\n', ' ')}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-md leading-relaxed mb-10">
                        {content.header.subtitle}
                    </p>
                    
                    <div className="flex items-center gap-6">
                        <a href="#produtos" className="bg-white text-[#7a9eb1] px-8 py-4 font-bold uppercase text-xs tracking-widest hover:bg-gray-100 transition-colors">
                            Explorar Catálogo
                        </a>
                        <div className="hidden lg:block">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                                Din Studio
                                <div className="mt-0.5">©2026</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative background element */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        </header>
    );
};

export default Header;
