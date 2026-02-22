import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import type { Service } from '../data/servicesData';
import { HardHat, Atom, ShieldCheck, ArrowRight } from 'lucide-react';

interface ServicesProps {
    onContactClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [servicesData, setServicesData] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                const data = await response.json();
                setServicesData(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const serviceIcons: { [key: string]: React.ReactNode } = {
        injection: <HardHat size={24} className="text-black/70" />,
        vacuum: <Atom size={24} className="text-black/70" />,
        chrome: <ShieldCheck size={24} className="text-black/70" />,
    };

    return (
        <>
        <section id="servicos" className="py-20 md:py-32 bg-[#F8F5F2]">
            <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Image Column */}
                <div className="relative h-[500px] md:h-full rounded-2xl overflow-hidden">
                     <img 
                        src={'https://picsum.photos/seed/bueso-services/800/1000'} 
                        alt="Serviços de precisão"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Content Column */}
                <div className="md:pl-12">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Serviços de Precisão</h2>
                    <p className="text-gray-600 max-w-lg mb-10 leading-relaxed">Do molde à peça final, garantimos qualidade e acabamentos de excelência que elevam o seu produto.</p>
                    
                    <div className="space-y-6 mb-12">
                        {servicesData.map(service => (
                            <div 
                                key={service.id}
                                className="flex items-start gap-6 p-6 bg-white/60 rounded-lg border border-black/5 cursor-pointer hover:border-black/10 hover:bg-white transition-all duration-300"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center border border-black/5">
                                    {serviceIcons[service.id]}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg font-serif">{service.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={onContactClick} className="group inline-flex items-center gap-3 text-sm font-medium text-black px-8 py-4 bg-white rounded-full shadow-sm border border-black/5 hover:bg-gray-50 transition-colors">
                        Pedir Orçamento
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </section>

        <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} size="lg">
            {selectedService && (
                 <div>
                    <div className="aspect-video bg-gray-100 mb-6 rounded-lg overflow-hidden">
                        <img 
                            src={(selectedService as any).imageUrl || 'https://picsum.photos/seed/service-detail/800/450'} 
                            alt={selectedService.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                    <h2 className="text-3xl font-serif mb-2">{selectedService.title}</h2>
                    <p className="text-gray-600 mb-8">{selectedService.detailedDescription}</p>
                    
                    <div className="space-y-4 text-sm">
                        <div>
                            <h4 className="font-semibold uppercase tracking-wider mb-2 text-gray-500 text-xs">Aplicações Comuns</h4>
                            <p className="text-gray-800">{selectedService.applications.join(', ')}.</p>
                        </div>
                         <div>
                            <h4 className="font-semibold uppercase tracking-wider mb-2 text-gray-500 text-xs">Materiais</h4>
                            <p className="text-gray-800">{selectedService.materials}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold uppercase tracking-wider mb-2 text-gray-500 text-xs">Benefícios Chave</h4>
                            <p className="text-gray-800">{selectedService.benefits}</p>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
        </>
    );
};

export default Services;