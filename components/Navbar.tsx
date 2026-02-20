import React, { useState, useEffect } from 'react';

interface NavbarProps {
    onContactClick: () => void;
    onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContactClick, onAdminClick }) => {
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

    const navLinks = [
        { href: "#servicos", label: "Serviços" },
        { href: "#produtos", label: "Produtos" },
        { href: "#catalogo", label: "Catálogo" },
        { href: "#sobre", label: "Sobre Nós" },
        { href: "#ambiente", label: "Sustentabilidade" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold tracking-tighter">
                    <a href="#home" className="flex items-center gap-2 text-black">
                        <span>PLÁSTICOS</span> 
                        <span>BUESO</span>
                    </a>
                </div>
                
                <div className="hidden md:flex items-center space-x-6 text-sm">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="hover:underline">{link.label}</a>
                    ))}
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onContactClick();
                        }}
                        className="hover:underline"
                    >Contacto</button>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onAdminClick();
                        }}
                        className="bg-black text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 transition"
                    >Gestão</button>
                </div>

                <button id="menu-btn" className="md:hidden text-black focus:outline-none z-[60] relative h-6 w-6" onClick={toggleMenu} aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
                </button>
            </div>
            
            {/* Mobile Menu Overlay & Panel */}
            <div
                className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!isMenuOpen}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-black/20"
                    onClick={toggleMenu}
                ></div>

                {/* Menu Panel */}
                <div
                    className={`relative ml-auto h-full w-4/5 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 pt-24 flex flex-col text-left space-y-6">
                         {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={handleMobileLinkClick} className="text-lg hover:underline">{link.label}</a>
                         ))}
                         <button onClick={() => {
                             onContactClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-4 text-lg border border-black w-full py-3 text-center hover:bg-gray-100"
                         >Contacto</button>
                         <button onClick={() => {
                             onAdminClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-2 text-lg bg-black text-white w-full py-3 text-center hover:bg-gray-800"
                         >Gestão</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;