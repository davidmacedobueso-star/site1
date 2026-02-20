import React from 'react';
import { useContent } from '../src/hooks/useContent';

const Header: React.FC = () => {
    const { content, loading } = useContent();

    if (loading || !content) return <header className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center animate-pulse"><div className="h-12 bg-gray-200 w-3/4 mx-auto mb-4"></div><div className="h-6 bg-gray-100 w-1/2 mx-auto"></div></header>;

    return (
        <header className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 whitespace-pre-line">{content.header.title}</h1>
            <p className="text-gray-600 max-w-xl mx-auto">{content.header.subtitle}</p>
        </header>
    );
};

export default Header;