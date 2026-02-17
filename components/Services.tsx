import React, { useState } from 'react';
import Modal from './Modal';
import { servicesData } from '../data/servicesData';
import type { Service } from '../data/servicesData';


const InjectionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const VacuumIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.75 4a9 9 0 0113.5 0M7.75 4a9 9 0 00-4.484 2.131M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6" />
    </svg>
);

const ChromeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onDetailsClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onDetailsClick }) => (
    <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 h-full flex flex-col group
                    hover:-translate-y-1 hover:border-sky-400/30 transition-all duration-300">
        <div className="mb-6 bg-sky-400/5 border border-sky-400/10 w-20 h-20 rounded-full flex items-center justify-center">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-500 text-sm mb-6 flex-grow">{description}</p>
        
        <button 
            onClick={onDetailsClick} 
            className="mt-auto text-xs font-bold uppercase tracking-widest text-sky-400 transition-colors duration-300 text-left hover:text-white"
        >
            Ver Detalhes →
        </button>
    </div>
);

interface ServicesProps {
    onContactClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const serviceIcons: { [key: string]: React.ReactNode } = {
        injection: <InjectionIcon />,
        vacuum: <VacuumIcon />,
        chrome: <ChromeIcon />,
    };

    const serviceImages: { [key: string]: string } = {
        injection: 'https://picsum.photos/seed/injection-process/800/450',
        vacuum: 'https://picsum.photos/seed/vacuum-chamber/800/450',
        chrome: 'https://picsum.photos/seed/chrome-plating-line/800/450',
    };

    return (
        <>
        <section id="servicos" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold mb-3">Serviços de Precisão</h2>
                     <p className="text-gray-500 max-w-2xl mx-auto">Do molde à peça final, garantimos qualidade e acabamentos de excelência que elevam o seu produto.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {servicesData.map(service => (
                        <ServiceCard 
                            key={service.id}
                            icon={serviceIcons[service.id]}
                            title={service.title}
                            description={service.description}
                            onDetailsClick={() => setSelectedService(service)}
                        />
                    ))}
                    <div className="bg-transparent p-8 rounded-2xl border border-dashed border-white/20 h-full flex flex-col justify-center items-center text-center hover:border-sky-400 hover:bg-[#1a1a1a] transition-all duration-300">
                        <h3 className="text-xl font-bold mb-3">Tem um Projeto Específico?</h3>
                        <p className="text-gray-500 text-sm mb-6">A nossa equipa técnica está pronta para analisar os seus requisitos e propor a melhor solução.</p>
                        <button onClick={onContactClick} className="w-fit px-8 py-3 bg-sky-400 text-black font-bold text-xs uppercase hover:bg-white transition rounded">Fale Connosco</button>
                    </div>
                </div>
            </div>
        </section>
        <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} size="lg">
            {selectedService && (
                 <div>
                    <div className="aspect-video bg-[#0f0f0f] rounded-lg overflow-hidden mb-6">
                        <img 
                            src={serviceImages[selectedService.id]} 
                            alt={selectedService.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-sky-400">{selectedService.title}</h2>
                    <p className="text-gray-400 mb-6">{selectedService.detailedDescription}</p>
                    
                    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] p-6 rounded-lg space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold uppercase tracking-widest mb-2 text-gray-500">Aplicações Comuns</h4>
                            <p className="text-gray-300">{selectedService.applications.join(', ')}.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold uppercase tracking-widest mb-2 text-gray-500">Materiais</h4>
                            <p className="text-gray-300">{selectedService.materials}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold uppercase tracking-widest mb-2 text-gray-500">Benefícios Chave</h4>
                            <p className="text-gray-300">{selectedService.benefits}</p>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
        </>
    );
};

export default Services;