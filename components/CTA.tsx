import React from 'react';

const CTA: React.FC = () => {
    return (
        <section className="py-20 bg-[#161616]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Explore a Nossa Gama Completa de Produtos</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-8">
                    Descubra as nossas soluções standard e as possibilidades de personalização. Veja o nosso catálogo detalhado para encontrar a peça perfeita para o seu projeto.
                </p>
                <a 
                    href="#catalogo" 
                    className="inline-block px-10 py-4 bg-white text-black font-bold text-sm uppercase rounded hover:bg-sky-400 transition-colors duration-300"
                >
                    Ver Catálogo de Produtos
                </a>
            </div>
        </section>
    );
};

export default CTA;