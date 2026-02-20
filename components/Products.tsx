import React, { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import Modal from './Modal';
import { productsData } from '../data/productsData';
import type { DetailedProduct } from '../data/productsData';


interface ProductsProps {
    content?: {
        title: string;
        subtitle: string;
    };
}

const Products: React.FC<ProductsProps> = ({ content }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<DetailedProduct | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const title = content?.title || "Produtos em Destaque";
    const subtitle = content?.subtitle || "Excelência técnica em cada componente produzido.";

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 300;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    const handleProductClick = (product: DetailedProduct) => {
        setCurrentImageIndex(0);
        setSelectedProduct(product);
    };

    const productImages = selectedProduct ? [
        `https://picsum.photos/seed/${selectedProduct.id}-1/600/338`,
        `https://picsum.photos/seed/${selectedProduct.id}-2/600/338`,
        `https://picsum.photos/seed/${selectedProduct.id}-3/600/338`,
        `https://picsum.photos/seed/${selectedProduct.id}-4/600/338`,
    ] : [];

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
    };

    return (
        <>
        <section id="produtos" className="py-24 bg-neutral-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold uppercase tracking-wider text-black dark:text-white">{title}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto">{subtitle}</p>
                    <div className="flex justify-center space-x-2 mt-6">
                        <button onClick={() => scroll('left')} className="px-4 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition text-lg rounded-full">←</button>
                        <button onClick={() => scroll('right')} className="px-4 py-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition text-lg rounded-full">→</button>
                    </div>
                </div>

                <div ref={carouselRef} className="flex overflow-x-auto space-x-8 no-scrollbar snap-x pb-8 px-2">
                    {productsData.map(product => (
                        <ProductCard 
                            key={product.id} 
                            title={product.title} 
                            description={product.description}
                            onClick={() => handleProductClick(product)}
                        />
                    ))}
                </div>
            </div>
        </section>
        <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
            {selectedProduct && (
                <div>
                    <div className="mb-6">
                        <div className="relative aspect-video bg-gray-100 group">
                             <img 
                                key={currentImageIndex}
                                src={productImages[currentImageIndex]} 
                                alt={`${selectedProduct.title} - vista ${currentImageIndex + 1}`} 
                                className="w-full h-full object-cover animate-fade-in"
                                loading="lazy"
                                decoding="async"
                            />

                            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition opacity-0 group-hover:opacity-100" aria-label="Imagem anterior">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                             <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition opacity-0 group-hover:opacity-100" aria-label="Próxima imagem">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        <div className="flex justify-center space-x-3 mt-4">
                            {productImages.map((src, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-16 h-10 overflow-hidden cursor-pointer border-2 ${currentImageIndex === index ? 'border-yellow-400' : 'border-gray-300'} hover:border-yellow-400/50 transition`}
                                    aria-label={`Ver imagem ${index + 1}`}
                                >
                                    <img 
                                        src={src.replace('/600/338', '/160/100')} 
                                        alt={`miniatura ${index + 1}`} 
                                        className="w-full h-full object-cover" 
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{selectedProduct.title}</h2>
                    <p className="text-gray-600 mb-6">{selectedProduct.detailedDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <h4 className="font-semibold uppercase tracking-wider mb-2 text-gray-500">Aplicações Típicas</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {selectedProduct.applications.map((app, i) => <li key={i}>{app}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold uppercase tracking-wider mb-2 text-gray-500">Especificações</h4>
                            <div className="space-y-2">
                                {selectedProduct.specs.map((spec, i) => (
                                    <div key={i} className="flex justify-between border-b border-gray-200 pb-1">
                                        <span className="text-gray-600">{spec.key}</span>
                                        <span className="font-mono text-black">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <style>{`
                        @keyframes fade-in {
                            0% { opacity: 0.5; }
                            100% { opacity: 1; }
                        }
                        .animate-fade-in {
                            animation: fade-in 0.3s ease-in-out;
                        }
                    `}</style>
                </div>
            )}
        </Modal>
        </>
    );
};

export default Products;