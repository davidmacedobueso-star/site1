import React, { useState } from 'react';

interface ContactFormProps {
    onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        if (file) {
            formData.append('attachment', file);
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert('Obrigado pelo seu contacto! A nossa equipa responderá em breve para geral@bueso.pt.');
                onClose();
            } else {
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            alert('Erro ao conectar ao servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">Fale Connosco</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Preencha o formulário e a nossa equipa técnica entrará em contacto.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Nome</label>
                    <input type="text" id="name" name="name" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black dark:text-white" />
                </div>
                <div>
                    <label htmlFor="email" className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Email</label>
                    <input type="email" id="email" name="email" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black dark:text-white" />
                </div>
                <div>
                    <label htmlFor="subject" className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Assunto</label>
                    <input type="text" id="subject" name="subject" required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black dark:text-white" />
                </div>
                <div>
                    <label htmlFor="message" className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Mensagem</label>
                    <textarea id="message" name="message" rows={4} required className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-none mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black dark:text-white"></textarea>
                </div>
                <div>
                    <label htmlFor="attachment" className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Anexar Ficheiro (Opcional)</label>
                    <input 
                        type="file" 
                        id="attachment" 
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-none mt-1 p-2 text-xs text-gray-500 dark:text-gray-400 focus:outline-none" 
                    />
                </div>
                <div className="flex justify-end pt-4">
                     <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-yellow-400 text-black font-bold text-xs uppercase hover:bg-yellow-500 transition disabled:opacity-50"
                    >
                        {isSubmitting ? 'A enviar...' : 'Enviar Pedido'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;