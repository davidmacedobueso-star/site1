import React, { useState } from 'react';
import type { Product } from '../data/catalogProducts';

interface CatalogProductCardProps {
    product: any;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer ${isExpanded ? 'ring-2 ring-yellow-400' : ''}`}
        >
            <div className={`aspect-video bg-gray-100 dark:bg-gray-800 ${isLoading ? 'animate-pulse' : ''}`}>
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
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase">{product.code}</p>
                    <h3 className="font-bold text-base mb-2 text-black dark:text-white">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded uppercase font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {product.material}
                        </span>
                        <span className="text-[10px] bg-yellow-50 dark:bg-yellow-900/20 px-2 py-0.5 rounded uppercase font-semibold text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/30">
                            {product.finishType}
                        </span>
                    </div>
                </div>
                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{product.description}</p>
                 
                 {isExpanded && (
                     <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
                         <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">Especificações Técnicas</h4>
                         <ul className="space-y-1">
                             <li className="text-xs flex justify-between">
                                 <span className="text-gray-500 dark:text-gray-400">Material:</span>
                                 <span className="font-medium text-black dark:text-white">{product.material}</span>
                             </li>
                             <li className="text-xs flex justify-between">
                                 <span className="text-gray-500 dark:text-gray-400">Acabamento:</span>
                                 <span className="font-medium text-black dark:text-white">{product.finishType}</span>
                             </li>
                             {product.specs && product.specs.map((spec: string, index: number) => {
                                 const [label, value] = spec.includes(':') ? spec.split(':') : [spec, ''];
                                 return (
                                     <li key={index} className="text-xs flex justify-between">
                                         <span className="text-gray-500 dark:text-gray-400">{label.trim()}:</span>
                                         <span className="font-medium text-black dark:text-white">{value.trim()}</span>
                                     </li>
                                 );
                             })}
                         </ul>
                         <p className="text-[9px] text-yellow-600 dark:text-yellow-400 mt-4 italic">Clique para recolher</p>
                     </div>
                 )}
            </div>
        </div>
    );
};

export default CatalogProductCard;