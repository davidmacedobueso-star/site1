import React, { useState, useEffect } from 'react';
import CatalogProductCard from '../components/CatalogProductCard';

export interface Product {
    id: number;
    name: string;
    code: string;
    imageUrl: string;
    description: string;
    specs: string[];
    material: string;
    finishType: 'Injeção' | 'Cromagem' | 'Pintura' | 'Metalização';
}

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
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [materialFilter, setMaterialFilter] = useState('all');
    const [finishFilter, setFinishFilter] = useState('all');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const materials = ['all', ...Array.from(new Set(products.map(p => p.material)))];
    const finishTypes = ['all', ...Array.from(new Set(products.map(p => p.finishType)))];

    const filteredProducts = products.filter(product => {
        const materialMatch = materialFilter === 'all' || product.material === materialFilter;
        const finishMatch = finishFilter === 'all' || product.finishType === finishFilter;
        return materialMatch && finishMatch;
    });

    return (
        <main className="pt-24 pb-20 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-black dark:text-white">Catálogo de Produtos</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm uppercase tracking-widest">Soluções standard e customizadas</p>
                    </div>
                    <div className="flex space-x-2 mt-6 md:mt-0">
                        <a href="#home" className="flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-900 border border-black dark:border-gray-700 text-black dark:text-white font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                            <BackIcon /> Voltar
                        </a>
                        <a 
                            href="/catalog.pdf" 
                            download="Catalogo_Plasticos_Boeso.pdf"
                            className="flex items-center justify-center px-4 py-2 bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition"
                        >
                            <DownloadIcon /> Catálogo PDF
                        </a>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="w-full md:w-1/2 lg:w-1/4">
                        <label htmlFor="material-filter" className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">Filtrar por Material</label>
                        <select 
                            id="material-filter" 
                            value={materialFilter} 
                            onChange={e => setMaterialFilter(e.target.value)} 
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            {materials.map(mat => (
                                <option key={mat} value={mat} className="bg-white dark:bg-gray-900">{mat === 'all' ? 'Todos os Materiais' : mat}</option>
                            ))}
                        </select>
                    </div>
                     <div className="w-full md:w-1/2 lg:w-1/4">
                        <label htmlFor="finish-filter" className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">Filtrar por Acabamento</label>
                        <select 
                            id="finish-filter" 
                            value={finishFilter} 
                            onChange={e => setFinishFilter(e.target.value)} 
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            {finishTypes.map(finish => (
                                <option key={finish} value={finish} className="bg-white dark:bg-gray-900">{finish === 'all' ? 'Todos os Acabamentos' : finish}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 dark:bg-gray-900 animate-pulse h-64 border border-gray-200 dark:border-gray-800"></div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <CatalogProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50">
                        <h3 className="text-lg font-semibold text-black dark:text-white">Nenhum produto encontrado</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Tente ajustar os filtros para encontrar o que procura.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Catalog;
