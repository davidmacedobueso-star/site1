import React from 'react';

interface HeaderProps {
    content?: {
        title: string;
        subtitle: string;
        backgroundImage?: string;
    };
}

const Header: React.FC<HeaderProps> = ({ content }) => {
    const title = content?.title || "Injeção e Acabamentos Premium em Braga";
    const subtitle = content?.subtitle || "Soluções integradas de metalização e pintura para a indústria exigente.";
    const backgroundImage = content?.backgroundImage;

    return (
        <header 
            className="relative bg-white dark:bg-gray-950 pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center transition-colors duration-300 overflow-hidden"
        >
            {backgroundImage && (
                <div className="absolute inset-0 z-0">
                    <img src={backgroundImage} alt="Background" className="w-full h-full object-cover opacity-10 dark:opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-gray-950/80 dark:via-gray-950/50 dark:to-gray-950"></div>
                </div>
            )}
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-black dark:text-white" dangerouslySetInnerHTML={{ __html: title }}></h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">{subtitle}</p>
            </div>
        </header>
    );
};

export default Header;