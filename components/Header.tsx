import React from 'react';
import { useContent } from '../src/hooks/useContent';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const { content, loading } = useContent();

    if (loading || !content) {
        return (
            <header className="bg-black min-h-screen flex items-center justify-center animate-pulse">
                <div className="h-12 bg-white/5 w-3/4"></div>
            </header>
        );
    }

    return (
        <header id="home" className="relative bg-black min-h-screen overflow-hidden flex flex-col md:flex-row">
            {/* Left Side: Text Content */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-start text-white p-8 md:p-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                >
                    <h1 className="text-6xl md:text-8xl font-light font-serif leading-tight tracking-tighter">
                        {content.header.title.split('\n').map((line, i) => (
                            <span key={i} className="block">{line}</span>
                        ))}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                    className="max-w-lg mt-8"
                >
                    <p className="text-lg text-white/60 leading-relaxed">
                        {content.header.subtitle}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                    className="mt-12"
                >
                     <a href="#produtos" className="inline-block text-sm font-medium text-white border border-white/20 rounded-full px-8 py-4 hover:bg-white/5 transition-colors">
                        Explorar Catálogo
                    </a>
                </motion.div>

                {/* Scroll Down Arrow */}
                <motion.a 
                    href="#produtos"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-24 md:-translate-x-0 text-white/50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </motion.a>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 h-full absolute md:relative top-0 right-0">
                <motion.div 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full"
                >
                    <img 
                        src={content.header.imageUrl || "https://picsum.photos/seed/bueso-dark/1200/1800"} 
                        alt="Product Showcase" 
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:bg-gradient-to-r"></div>
                </motion.div>
            </div>
        </header>
    );
};

export default Header;
