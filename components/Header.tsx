import React from 'react';

interface HeaderProps {
    content?: {
        title: string;
        subtitle: string;
    };
}

const Header: React.FC<HeaderProps> = ({ content }) => {
    const title = content?.title || "Injeção e Acabamentos Premium em Braga";
    const subtitle = content?.subtitle || "Soluções integradas de metalização e pintura para a indústria exigente.";

    return (
        <header className="bg-white dark:bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center transition-colors duration-300">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black dark:text-white" dangerouslySetInnerHTML={{ __html: title }}></h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">{subtitle}</p>
        </header>
    );
};

export default Header;