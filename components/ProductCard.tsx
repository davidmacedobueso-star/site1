import React from 'react';

import { motion } from 'framer-motion';

interface ProductCardProps {
    title: string;
    description: string;
    imageUrl?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.01, 0.05, 0.95]
    }
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ title, description, imageUrl }) => {
    return (
        <motion.div className="group cursor-pointer" variants={cardVariants}>
            <div className="bg-gray-100 overflow-hidden aspect-[4/5] relative">
                <img 
                    src={imageUrl || `https://picsum.photos/seed/${title}/800/1000`} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            <div className="pt-4">
                <h3 className="font-serif text-xl text-black">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;