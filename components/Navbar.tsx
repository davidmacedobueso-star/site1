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
        { href: "#produtos", label: "Produtos" },
        { href: "#servicos", label: "Serviços" },
        { href: "#faq", label: "FAQ" },
        { href: "#catalogo", label: "Catálogo" },
        { href: "#ambiente", label: "Sustentabilidade" },
        { href: "#sobre", label: "Sobre Nós" },
    ];

    return (
                <nav className={`fixed w-full z-50 transition-all duration-300 bg-white border-b border-gray-200 py-4 shadow-sm`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="text-xl font-black tracking-tighter">
                                        <a href="#home" className="flex items-center gap-2 text-zinc-900">
                        <span>PLÁSTICOS</span> 
                        <span className="text-yellow-500">BUESO</span>
                    </a>
                </div>
                


                                <button id="menu-btn" className="focus:outline-none z-[60] relative h-6 w-6 text-zinc-900" onClick={toggleMenu} aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
                </button>
            </div>
            
            {/* Mobile Menu Overlay & Panel */}
            <div
                className={`fixed inset-0 z-[51] transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!isMenuOpen}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
                    onClick={toggleMenu}
                ></div>

                {/* Menu Panel */}
                <div
                    className={`relative ml-auto h-full w-4/5 max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 pt-24 flex flex-col text-left space-y-6">
                         {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={handleMobileLinkClick} className="text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-yellow-600 transition-colors">{link.label}</a>
                         ))}
                         <button onClick={() => {
                             onContactClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-4 text-sm font-bold uppercase tracking-widest border border-zinc-900 w-full py-4 text-center hover:bg-zinc-50 transition-colors"
                         >Contacto</button>
                         <button onClick={() => {
                             onAdminClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-2 text-sm font-bold uppercase tracking-widest bg-zinc-900 text-white w-full py-4 text-center hover:bg-zinc-800 transition-colors"
                         >Gestão</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
