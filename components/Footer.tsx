import React from 'react';

interface FooterProps {
    onContactClick: () => void;
}

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);


const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
    return (
        <footer id="contacto" className="bg-black pt-16 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h4 className="text-sky-400 font-bold mb-6 italic uppercase tracking-widest">Onde estamos</h4>
                        {/* Static Map Representation to avoid Frame errors in AI environments */}
                        <div className="w-full h-64 rounded-xl overflow-hidden relative group border border-white/10 bg-[#111]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h5 className="font-bold text-white mb-2">Parque Industrial de Braga</h5>
                                <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Lote 42, 4700 Braga, Portugal</p>
                                <a 
                                    href="https://maps.google.com/?q=Braga+Portugal" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-sky-400 hover:text-black transition duration-300"
                                >
                                    Abrir no Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h4 className="text-white font-bold mb-4">Plásticos Boeso, Lda.</h4>
                        <p className="text-gray-500 text-sm mb-4">Parque Industrial de Braga</p>
                        <div className="text-gray-500 text-sm mb-6 space-y-2">
                            <a href="mailto:geral@plasticosboeso.pt" className="flex items-center hover:text-sky-400 transition-colors duration-300">
                                <MailIcon />
                                <span>geral@plasticosboeso.pt</span>
                            </a>
                            <div className="flex items-center">
                                <PhoneIcon />
                                <span>+351 253 000 000</span>
                            </div>
                        </div>

                        <button 
                            onClick={onContactClick}
                            className="w-fit px-8 py-3 bg-white text-black font-bold text-xs uppercase hover:bg-sky-400 transition"
                        >
                            Solicitar Reunião Técnica
                        </button>
                    </div>
                </div>
                <div className="pb-8 border-t border-white/5 pt-8 text-center text-gray-600">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-4">&copy; 2026 Boeso Precision Plastics. Professional Grade AI Collaboration.</p>
                    <div className="flex justify-center space-x-6 text-xs normal-case tracking-normal">
                        <a href="#" className="hover:text-sky-400 transition">Política de Privacidade</a>
                        <a href="#" className="hover:text-sky-400 transition">Termos de Uso</a>
                        <a href="#" className="hover:text-sky-400 transition">Política de Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;