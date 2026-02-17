import React, { useState, useRef } from 'react';
import ProductCard from './ProductCard';
import Modal from './Modal';
import { productsData } from '../data/productsData';
import type { DetailedProduct } from '../data/productsData';


const Products: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<DetailedProduct | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        <section id="produtos" className="py-20 bg-[#161616]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold italic underline decoration-sky-400 underline-offset-8">Produtos em Destaque</h2>
                    <div className="flex space-x-2">
                        <button onClick={() => scroll('left')} className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] rounded-full text-sky-400 hover:bg-sky-400 hover:text-black transition">←</button>
                        <button onClick={() => scroll('right')} className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] rounded-full text-sky-400 hover:bg-sky-400 hover:text-black transition">→</button>
                    </div>
                </div>

                <div ref={carouselRef} className="flex overflow-x-auto space-x-6 no-scrollbar snap-x pb-4">
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
                        <div className="relative aspect-video bg-[#0f0f0f] rounded-lg overflow-hidden group">
                             <img 
                                key={currentImageIndex}
                                src={productImages[currentImageIndex]} 
                                alt={`${selectedProduct.title} - vista ${currentImageIndex + 1}`} 
                                className="w-full h-full object-cover animate-fade-in"
                                loading="lazy"
                                decoding="async"
                            />

                            <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition opacity-0 group-hover:opacity-100" aria-label="Imagem anterior">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                             <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition opacity-0 group-hover:opacity-100" aria-label="Próxima imagem">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        <div className="flex justify-center space-x-3 mt-4">
                            {productImages.map((src, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-16 h-10 rounded-md overflow-hidden cursor-pointer border-2 ${currentImageIndex === index ? 'border-sky-400' : 'border-white/20'} hover:border-sky-400/50 transition`}
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

                    <h2 className="text-2xl font-bold mb-2 text-sky-400">{selectedProduct.title}</h2>
                    <p className="text-gray-400 mb-6">{selectedProduct.detailedDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <h4 className="font-semibold uppercase tracking-widest mb-2 text-gray-500">Aplicações Típicas</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {selectedProduct.applications.map((app, i) => <li key={i}>{app}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-semibold uppercase tracking-widest mb-2 text-gray-500">Especificações</h4>
                            <div className="space-y-2">
                                {selectedProduct.specs.map((spec, i) => (
                                    <div key={i} className="flex justify-between border-b border-white/10 pb-1">
                                        <span className="text-gray-400">{spec.key}</span>
                                        <span className="font-mono text-white">{spec.value}</span>
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