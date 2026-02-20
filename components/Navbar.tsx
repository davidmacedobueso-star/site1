import React, { useState, useEffect } from 'react';

interface NavbarProps {
    onContactClick: () => void;
    onAdminClick: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onContactClick, onAdminClick, isDarkMode, toggleDarkMode }) => {
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
        <nav className="fixed w-full z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold tracking-tighter">
                    <a href="#home" className="flex items-center gap-2 text-black dark:text-white">
                        <span>PLÁSTICOS</span> 
                        <span>BOESO</span>
                    </a>
                </div>
                
                <div className="hidden md:flex items-center space-x-6 text-sm">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="hover:underline dark:text-gray-300">{link.label}</a>
                    ))}
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onContactClick();
                        }}
                        className="hover:underline dark:text-gray-300"
                    >Contacto</button>
                    
                    <button 
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Alternar Tema"
                    >
                        {isDarkMode ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            onAdminClick();
                        }}
                        className="bg-black dark:bg-white dark:text-black text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition"
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
                    className={`relative ml-auto h-full w-4/5 max-w-xs bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-8 pt-24 flex flex-col text-left space-y-6">
                         {navLinks.map(link => (
                            <a key={link.href} href={link.href} onClick={handleMobileLinkClick} className="text-lg hover:underline text-black dark:text-gray-300">{link.label}</a>
                         ))}
                         <button onClick={() => {
                             onContactClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-4 text-lg border border-black dark:border-gray-700 w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white"
                         >Contacto</button>
                         
                         <button 
                            onClick={() => {
                                toggleDarkMode();
                                // Keep menu open to see change or close it? Let's keep it open.
                            }}
                            className="flex items-center justify-center gap-2 text-lg border border-gray-300 dark:border-gray-700 w-full py-3 text-center hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition-colors"
                         >
                            {isDarkMode ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
                                    </svg>
                                    <span>Modo Claro</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    <span>Modo Escuro</span>
                                </>
                            )}
                         </button>

                         <button onClick={() => {
                             onAdminClick();
                             handleMobileLinkClick();
                         }}
                         className="mt-2 text-lg bg-black dark:bg-white text-white dark:text-black w-full py-3 text-center hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                         >Gestão</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;