import React from 'react';
import { useContent } from '../src/hooks/useContent';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTA: React.FC<{ onContactClick: () => void; }> = ({ onContactClick }) => {
    const { content, loading } = useContent();

    if (loading || !content) return <section className="py-20 bg-gray-900 animate-pulse"><div className="h-24 bg-gray-800/50 w-full"></div></section>;

    return (
        <section className="bg-black">
            <motion.div 
                className="max-w-screen-xl mx-auto px-6 py-20 md:py-28 text-center text-white relative isolate"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(https://picsum.photos/seed/cta-bg/1920/1080)` }}
                    role="presentation"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/70"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">{content.cta.title}</h2>
                    <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                        {content.cta.subtitle}
                    </p>
                    <button 
                        onClick={onContactClick}
                        className="group inline-flex items-center gap-3 text-sm font-medium text-black px-8 py-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition-colors"
                    >
                        {content.cta.buttonText}
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default CTA;