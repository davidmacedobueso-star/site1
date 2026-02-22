import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface ContactFormProps {
    onClose: () => void;
}

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; value: string; href?: string }> = ({ icon, title, value, href }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-semibold text-gray-500">{title}</h4>
            <a href={href} className="text-black text-base hover:underline">{value}</a>
        </div>
    </div>
);

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Obrigado pelo seu contacto! A nossa equipa responderá em breve.');
                onClose();
            } else {
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Ocorreu um erro de rede. Por favor, verifique a sua ligação.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-12 p-4">
            {/* Contact Info */}
            <div className="bg-white rounded-lg p-8">
                <h2 className="text-3xl font-serif mb-4 text-black">Fale Connosco</h2>
                <p className="text-gray-600 mb-8">Estamos disponíveis para qualquer questão ou para discutir o seu próximo projeto.</p>
                <div className="space-y-6">
                    <ContactInfoItem icon={<Mail size={20} />} title="Email" value="geral@bueso.pt" href="mailto:geral@bueso.pt" />
                    <ContactInfoItem icon={<Phone size={20} />} title="Telefone" value="+351 253 695 164" href="tel:+351253695164" />
                    <ContactInfoItem icon={<MapPin size={20} />} title="Morada" value="R. António Alberto de Sousa 38, Pav. 2, 4705-133 Ferreiros, Braga" />
                </div>
            </div>

            {/* Form */}
            <div>
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="name" className="text-xs font-medium text-gray-500">Nome</label>
                            <input type="text" id="name" name="name" required className="w-full bg-gray-50 border-b-2 border-gray-200 mt-1 p-3 focus:outline-none focus:border-black transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-xs font-medium text-gray-500">Email</label>
                            <input type="email" id="email" name="email" required className="w-full bg-gray-50 border-b-2 border-gray-200 mt-1 p-3 focus:outline-none focus:border-black transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="text-xs font-medium text-gray-500">Assunto</label>
                        <input type="text" id="subject" name="subject" required className="w-full bg-gray-50 border-b-2 border-gray-200 mt-1 p-3 focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-xs font-medium text-gray-500">Mensagem</label>
                        <textarea id="message" name="message" rows={4} required className="w-full bg-gray-50 border-b-2 border-gray-200 mt-1 p-3 focus:outline-none focus:border-black transition-colors"></textarea>
                    </div>
                     <div>
                        <label htmlFor="attachment" className="text-xs font-medium text-gray-500">Anexo (Opcional)</label>
                        <input type="file" id="attachment" name="attachment" className="w-full bg-gray-50 border-b-2 border-gray-200 mt-1 p-2 text-sm focus:outline-none focus:border-black transition-colors" />
                    </div>
                    <div className="flex justify-end pt-4">
                         <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`group inline-flex items-center gap-3 text-sm font-medium text-white px-8 py-4 bg-black rounded-full shadow-lg hover:bg-gray-800 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'A enviar...' : 'Enviar Pedido'}
                            {!isSubmitting && <Send size={16} />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;