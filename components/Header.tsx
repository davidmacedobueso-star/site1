import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="relative pt-40 pb-28 md:pt-32 md:pb-20 px-6 text-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://picsum.photos/seed/factory-bg/1920/1080"
                    alt="Fundo industrial da fábrica"
                    className="w-full h-full object-cover opacity-10"
                    loading="eager"
                    decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-[#0f0f0f]"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Injeção e Acabamentos <br/><span className="text-sky-400">Premium em Braga</span></h1>
                <p className="text-gray-500 max-w-xl mx-auto">Soluções integradas de metalização e pintura para a indústria exigente.</p>
            </div>
        </header>
    );
};

export default Header;