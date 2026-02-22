import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
    onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
    const socialLinks = [
        { icon: <Facebook size={18} />, href: '#' },
        { icon: <Instagram size={18} />, href: '#' },
        { icon: <Linkedin size={18} />, href: '#' },
    ];

    return (
        <footer id="contacto" className="bg-black text-white">
            <div className="max-w-screen-xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-4">
                        <h3 className="font-serif text-2xl">Plásticos Bueso</h3>
                        <p className="text-white/60 mt-4 text-sm leading-relaxed max-w-xs">
                            Excelência em injeção, metalização e cromagem de plásticos desde 1999.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="md:col-span-2">
                        <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm text-white/80">Menu</h4>
                        <ul className="space-y-3 text-white/60 text-sm">
                            <li><a href="#produtos" className="hover:text-white transition-colors">Produtos</a></li>
                            <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
                            <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-3">
                        <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm text-white/80">Contacto</h4>
                        <div className="text-white/60 space-y-3 text-sm">
                            <p>+351 253 695 164</p>
                            <p>geral@bueso.pt</p>
                            <p>R. António Alberto de Sousa 38, Pav. 2,<br/>4705-133 Ferreiros, Braga</p>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="md:col-span-3">
                        <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm text-white/80">Siga-nos</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.href} className="text-white/60 hover:text-white transition-colors">
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
                    <p>&copy; {new Date().getFullYear()} Plásticos Bueso. Todos os direitos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white/60 transition-colors">Política de Privacidade</a>
                        <a href="#" className="hover:text-white/60 transition-colors">Termos de Uso</a>
                        <button onClick={onAdminClick} className="hover:text-white/60 transition-colors">Gestão</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;