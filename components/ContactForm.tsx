import React from 'react';

interface ContactFormProps {
    onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Obrigado pelo seu contacto! A nossa equipa responderá em breve.');
        onClose();
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-sky-400">Fale Connosco</h2>
            <p className="text-gray-500 mb-6 text-sm">Preencha o formulário e a nossa equipa técnica entrará em contacto.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="text-xs font-semibold uppercase text-gray-400">Nome</label>
                    <input type="text" id="name" name="name" required className="w-full bg-[#0f0f0f] border border-white/10 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase text-gray-400">Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-[#0f0f0f] border border-white/10 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div>
                    <label htmlFor="subject" className="text-xs font-semibold uppercase text-gray-400">Assunto</label>
                    <input type="text" id="subject" name="subject" required className="w-full bg-[#0f0f0f] border border-white/10 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
                </div>
                <div>
                    <label htmlFor="message" className="text-xs font-semibold uppercase text-gray-400">Mensagem</label>
                    <textarea id="message" name="message" rows={4} required className="w-full bg-[#0f0f0f] border border-white/10 rounded mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-sky-400"></textarea>
                </div>
                <div className="flex justify-end pt-4">
                     <button type="submit" className="px-8 py-3 bg-sky-400 text-black font-bold text-xs uppercase hover:bg-white transition rounded">
                        Enviar Pedido
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
