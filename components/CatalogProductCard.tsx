import React, { useState } from 'react';
import type { Product } from '../data/catalogProducts';

interface CatalogProductCardProps {
    product: any;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="bg-white border border-gray-200 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-default">
            <div className={`aspect-video bg-gray-100 ${isLoading ? 'animate-pulse' : ''}`}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-xs text-gray-500 mb-1 uppercase">{product.code}</p>
                    <h3 className="font-bold text-base mb-2">{product.name}</h3>
                </div>
                 <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            </div>
        </div>
    );
};

export default CatalogProductCard;