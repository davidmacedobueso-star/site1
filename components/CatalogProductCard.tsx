import React, { useState } from 'react';
import type { Product } from '../data/catalogProducts';

interface CatalogProductCardProps {
    product: Product;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden h-full flex flex-col group transition-all duration-300 hover:border-sky-400/30 hover:-translate-y-1">
            <div className={`aspect-video bg-[#0f0f0f] overflow-hidden ${isLoading ? 'animate-pulse' : ''}`}>
                <img 
                    src={`https://picsum.photos/seed/${product.imageUrlSeed}/400/225`} 
                    alt={product.name} 
                    className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-xs text-sky-400 font-mono mb-1">{product.code}</p>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                </div>
                <div>
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Especificações</h4>
                    <ul className="text-sm text-gray-300 space-y-1 font-mono">
                        {product.specs.map((spec, index) => (
                            <li key={index} className="flex items-center">
                                <span className="text-sky-400 mr-2">▪</span> {spec}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CatalogProductCard;