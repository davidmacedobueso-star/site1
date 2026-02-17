import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="pt-32 pb-20 px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Injeção e Acabamentos <br/><span className="text-sky-400">Premium em Braga</span></h1>
            <p className="text-gray-500 max-w-xl mx-auto">Soluções integradas de metalização e pintura para a indústria exigente.</p>
        </header>
    );
};

export default Header;