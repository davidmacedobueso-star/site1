import React from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Environment: React.FC = () => {
    return (
        <section id="ambiente" className="py-20 md:py-32 bg-[#F8F5F2]">
            <motion.div 
                className="max-w-screen-md mx-auto px-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-black/5 shadow-sm">
                        <Leaf size={32} className="text-black/70" />
                    </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Compromisso Ambiental</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Acreditamos numa indústria que inova de forma responsável. A sustentabilidade está no centro da nossa operação, desde a escolha de materiais reciclados à otimização dos nossos processos para uma maior eficiência energética.
                </p>
            </motion.div>
        </section>
    );
};

export default Environment;