import React, { useState, useEffect } from 'react';

interface NavbarProps {
    onContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const handleMobileLinkClick = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="fixed w-full z-50 bg-[#0f0f0f] border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold tracking-tighter">
                    <a href="#home" className="flex items-center gap-2">
                        <span className="text-sky-400">PLÁSTICOS</span> 
                        <span>BOESO</span>
                    </a>
                </div>
                
                <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-medium">
                    <a href="#servicos" className="hover:text-sky-400 transition">Serviços</a>
                    <a href="#produtos" className="hover:text-sky-400 transition">Produtos</a>
                    <a href="#catalogo" className="hover:text-sky-400 transition">Catálogo</a>
                    <a href="#sobre" className="hover:text-sky-400 transition">Sobre Nós</a>
                    <a href="#ambiente" className="hover:text-sky-400 transition">Sustentabilidade</a>
                    <a href="#faq" className="hover:text-sky-400 transition">FAQ</a>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onContactClick();
                        }}
                        className="text-sky-400 border border-sky-400/30 px-4 py-1 rounded hover:bg-sky-400 hover:text-black transition text-xs uppercase tracking-widest font-medium"
                    >Contacto</button>
                </div>

                <button id="menu-btn" className="md:hidden text-sky-400 focus:outline-none z-[60] relative h-6 w-6" onClick={toggleMenu} aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                </button>
            </div>
            
            {/* Mobile Menu Overlay & Panel */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!isMenuOpen}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={toggleMenu}
                ></div>

                {/* Menu Panel */}
                <div
                    className={`relative ml-auto h-full w-4/5 max-w-xs bg-[#161616] border-l border-white/10 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 pt-24 flex flex-col text-left space-y-8">
                         <a href="#servicos" onClick={handleMobileLinkClick} className="text-xl uppercase tracking-widest hover:text-sky-400 transition">Serviços</a>
                         <a href="#produtos" onClick={handleMobileLinkClick} className="text-xl uppercase tracking-widest hover:text-sky-400 transition">Produtos</a>
                         <a href="#catalogo" onClick={handleMobileLinkClick} className="text-xl uppercase tracking-widest hover:text-sky-400 transition">Catálogo</a>
                         <a href="#sobre" onClick={handleMobileLinkClick} className="text-xl uppercase tracking-widest hover:text-sky-400 transition">Sobre Nós</a>
                         <a href="#ambiente" onClick={handleMobileLinkClick} className="text-xl uppercase tracking-widest hover:text-sky-400 transition">Sustentabilidade</a>
                         <a href="#faq" onClick={handleMobileLinkClick} className="text-xl uppercase tracking-widest hover:text-sky-400 transition">FAQ</a>
                         <button onClick={() => {
                             onContactClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-4 text-xl uppercase tracking-widest text-sky-400 border border-sky-400/30 w-full py-4 rounded text-center"
                         >Contacto</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;