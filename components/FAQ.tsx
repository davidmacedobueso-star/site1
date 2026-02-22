import React, { useState } from 'react';
import FAQItem from './FAQItem';

const faqData = [
    {
        question: "Cromagem vs Metalização: Qual escolher?",
        answer: "A cromagem galvânica oferece maior dureza superficial, enquanto a metalização por vácuo é excelente para estética complexa em plásticos sensíveis. A escolha depende dos requisitos de durabilidade e do material da peça."
    },
    {
        question: "Vocês aceitam prototipagem e pequenas séries?",
        answer: "Sim, a nossa estrutura flexível permite-nos acompanhar o projeto desde a fase de injeção de teste e prototipagem até à produção em pequena ou grande escala, garantindo sempre a máxima qualidade."
    },
    {
        question: "Quais os polímeros com que trabalham?",
        answer: "Trabalhamos com uma vasta gama de termoplásticos de engenharia, incluindo ABS, PC, PA6, PA66, PBT, e blends com reforço de fibra de vidro ou carbono, adaptando-nos às especificações de cada projeto."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 md:py-32 bg-white">
            <div className="max-w-screen-md mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">Perguntas Frequentes</h2>
                <div className="border-t border-black/10">
                    {faqData.map((item, index) => (
                        <FAQItem 
                            key={index} 
                            question={item.question} 
                            answer={item.answer} 
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;