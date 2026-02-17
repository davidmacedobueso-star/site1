import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'md' | 'lg' | 'xl';
    padding?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'md', padding = true }) => {
    if (!isOpen) return null;

    const sizeClasses = {
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className={`bg-[#161616] border border-white/10 rounded-2xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto relative animate-fade-in-up`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10 bg-black/30 backdrop-blur-sm rounded-full p-1"
                    aria-label="Fechar modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className={padding ? "p-8" : ""}>
                    {children}
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Modal;
