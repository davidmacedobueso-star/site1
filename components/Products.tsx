import React, { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { DetailedProduct } from '../data/productsData';

import { motion } from 'framer-motion';

const Products: React.FC = () => {
    const [productsData, setProductsData] = useState<DetailedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch('/api/featured-products');
                const data = await response.json();
                setProductsData(data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };
    
    return (
        <section id="produtos" className="py-20 md:py-32 bg-white">
            <div className="max-w-screen-xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-serif">Produtos em Destaque</h2>
                        <p className="text-gray-500 mt-2 max-w-2xl">Excelência técnica em cada componente produzido.</p>
                    </div>
                    <a href="#catalogo" className="hidden md:inline-block text-sm font-medium text-black border-b border-black/30 hover:border-black transition-colors">
                        Ver Catálogo Completo
                    </a>
                </div>

                {loading ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-100 aspect-[4/5] rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {productsData.map(product => (
                            <a key={product.id} href={`#produto/${product.id}`}>
                                <ProductCard 
                                    title={product.title} 
                                    description={product.description}
                                    imageUrl={product.imageUrl}
                                />
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Products;
