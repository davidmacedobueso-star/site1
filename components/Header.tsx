import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Injeção e Acabamentos <br/>Premium em Braga</h1>
            <p className="text-gray-600 max-w-xl mx-auto">Soluções integradas de metalização e pintura para a indústria exigente.</p>
        </header>
    );
};

export default Header;