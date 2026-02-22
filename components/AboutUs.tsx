import React from 'react';
import { useContent } from '../src/hooks/useContent';
import { motion } from 'framer-motion';

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div>
        <p className="text-4xl md:text-5xl font-serif text-black">{value}</p>
        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium mt-1">{label}</p>
    </div>
);

const AboutUs: React.FC = () => {
    const { content, loading } = useContent();

    if (loading || !content) return <section className="py-24 bg-white animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-10 bg-gray-200 w-1/2 mb-8"></div><div className="h-40 bg-gray-100 w-full"></div></div></section>;

    return (
        <section id="sobre" className="py-20 md:py-32 bg-white overflow-hidden">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                    {/* Image Column */}
                    <motion.div 
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img
                            src="https://picsum.photos/seed/bueso-about/800/1000"
                            alt="Fábrica da Plásticos Bueso"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </motion.div>

                    {/* Content Column */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">{content.about.title}</h2>
                        <p className="text-gray-500 text-lg mb-8 leading-relaxed">{content.about.subtitle}</p>
                        
                        <div className="space-y-4 text-gray-700 leading-relaxed mb-12">
                            <p>{content.about.content1}</p>
                            <p>{content.about.content2}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12">
                            <Stat value="+25" label="Anos de Experiência" />
                            <Stat value="+10M" label="Peças / Ano" />
                            <Stat value="IATF" label="Certificação" />
                        </div>

                        <div className="flex items-center gap-6 border-t border-black/10 pt-8">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex-shrink-0 border-4 border-white shadow-sm overflow-hidden">
                                <img src="https://picsum.photos/seed/founder/200/200" alt="Fundador" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div>
                                <p className="font-serif italic text-lg text-black">"O nosso compromisso é com a precisão e a inovação contínua."</p>
                                <p className="text-sm text-gray-500 mt-2">- Manuel Bueso, Fundador</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;