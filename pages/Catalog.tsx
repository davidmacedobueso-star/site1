import React from 'react';
import { catalogProducts } from '../data/catalogProducts';
import CatalogProductCard from '../components/CatalogProductCard';

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const Catalog: React.FC = () => {
    return (
        <main className="pt-24 pb-20 bg-[#0f0f0f] min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-white/10 pb-8 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold">Catálogo de Produtos</h1>
                        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Soluções standard e customizadas</p>
                    </div>
                    <div className="flex space-x-2 mt-6 md:mt-0">
                        <a href="#home" className="flex items-center justify-center px-4 py-2 bg-white/5 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest rounded hover:bg-sky-400 hover:text-black transition">
                            <BackIcon /> Voltar
                        </a>
                        <button 
                            onClick={() => alert('O download do catálogo PDF estará disponível brevemente.')} 
                            className="flex items-center justify-center px-4 py-2 bg-sky-400 text-black font-bold text-[10px] uppercase tracking-widest rounded hover:bg-white transition"
                        >
                            <DownloadIcon /> Catálogo PDF
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {catalogProducts.map(product => (
                        <CatalogProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Catalog;