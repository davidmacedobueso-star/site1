import React from 'react';

interface CTAProps {
    content?: {
        title: string;
        subtitle: string;
    };
}

const CTA: React.FC<CTAProps> = ({ content }) => {
    const title = content?.title || "SUBSCREVA A NEWSLETTER";
    const subtitle = content?.subtitle || "Aproveite 15% de desconto na primeira compra.";

    return (
        <section className="py-12 bg-yellow-400">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-lg md:text-xl font-bold mb-2 text-black">{title}</h2>
                <p className="text-black mb-6 text-sm md:text-base">
                    {subtitle}
                </p>
                <a 
                    href="#subscribe"
                    onClick={(e) => { e.preventDefault(); alert('Funcionalidade de subscrição em breve!'); }}
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-bold text-xs uppercase border border-black hover:bg-gray-100 transition-colors duration-300"
                >
                    Subscrever
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default CTA;