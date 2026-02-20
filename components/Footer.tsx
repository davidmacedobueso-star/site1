import React from 'react';

interface FooterProps {
    onContactClick: () => void;
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onContactClick, onAdminClick }) => {
    return (
        <footer id="contacto" className="bg-white dark:bg-gray-950 pt-16 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-black dark:text-white">Quem Somos</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                            <li><a href="#sobre" className="hover:underline">A Empresa</a></li>
                            <li><a href="#ambiente" className="hover:underline">Sustentabilidade</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-black dark:text-white">Apoio ao Cliente</h4>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                             <li><button onClick={onContactClick} className="hover:underline text-left">Contacto</button></li>
                             <li><a href="#faq" className="hover:underline">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold mb-4 uppercase text-black dark:text-white">Contactos</h4>
                        <div className="text-gray-600 dark:text-gray-400 space-y-2">
                            <p>+351 253 000 000</p>
                            <p>geral@plasticosboeso.pt</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 uppercase text-black dark:text-white">Onde Estamos</h4>
                        <div className="text-gray-600 dark:text-gray-400 space-y-2">
                            <p>Parque Industrial de Braga</p>
                            <p>Lote 42, 4700 Braga, Portugal</p>
                            <a 
                                href="https://www.google.com/maps/place/Parque+Industrial+de+Braga"
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                Ver no Mapa
                            </a>
                        </div>
                    </div>
                </div>

                <div className="my-16">
                    <div className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 overflow-hidden h-80 md:h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.489115865225!2d-8.45501868457531!3d41.5815619792468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd245258c89495ab%3A0x296766910a56382b!2sParque%20Industrial%20de%20Braga!5e0!3m2!1spt-PT!2spt!4v1678886412345!5m2!1spt-PT!2spt"
                            className="w-full h-full dark:invert dark:grayscale dark:opacity-80"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização da Plásticos Boeso no Google Maps"
                        ></iframe>
                    </div>
                </div>

                <div className="pb-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-gray-500 dark:text-gray-400 text-xs">
                    <p className="mb-4">&copy; 2026 Plásticos Boeso. Todos os direitos reservados.</p>
                     <div className="flex justify-center space-x-6">
                        <a href="#" className="hover:underline">Política de Privacidade</a>
                        <a href="#" className="hover:underline">Termos de Uso</a>
                        <button onClick={onAdminClick} className="hover:underline">Gestão</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;