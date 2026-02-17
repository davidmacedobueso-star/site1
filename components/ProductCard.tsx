import React from 'react';

interface ProductCardProps {
    title: string;
    description: string;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, onClick }) => {
    return (
        <div className="min-w-[300px] md:min-w-[350px] snap-start group">
            <div className="aspect-square bg-[#1a1a1a] border border-white/5 rounded-2xl mb-4 overflow-hidden relative">
                <img 
                    src={`https://picsum.photos/seed/${title}/350/350`} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-sky-400/10 opacity-0 group-hover:opacity-100 transition"></div>
            </div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{description}</p>
            <button 
                onClick={onClick} 
                className="inline-block text-xs font-bold uppercase tracking-widest text-sky-400 border-b border-sky-400 hover:text-white transition"
            >
                Saber Mais
            </button>
        </div>
    );
};

export default ProductCard;