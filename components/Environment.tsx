import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-zinc-800 p-8 border border-zinc-700 hover:border-yellow-400/50 transition-colors">
        <h4 className="font-bold text-white mb-3 text-lg">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
);


interface EnvironmentProps {
    content?: {
        title: string;
        subtitle: string;
        cards: { title: string; text: string }[];
    };
}

const Environment: React.FC<EnvironmentProps> = ({ content }) => {
    const title = content?.title || "Compromisso Ambiental";
    const subtitle = content?.subtitle || "Acreditamos numa indústria que inova de forma responsável. A sustentabilidade está no centro da nossa operação, desde a escolha de materiais à otimização dos nossos processos produtivos.";
    const cards = content?.cards || [
        {
            title: "Materiais Reciclados",
            text: "Sempre que o projeto permite, especialmente em componentes não visíveis, utilizamos polímeros reciclados de alta qualidade (rPP, rABS, rPC). Garantimos que as propriedades mecânicas e a durabilidade cumprem os mais rigorosos padrões."
        },
        {
            title: "Eficiência Energética",
            text: "As nossas máquinas de injeção são de última geração, otimizadas para um baixo consumo energético. Monitorizamos o processo em tempo real para minimizar o desperdício de matéria-prima e garantir que cada ciclo é o mais eficiente possível."
        },
        {
            title: "Economia Circular",
            text: "Colaboramos com os nossos clientes desde a fase de concepção para desenvolver peças mais leves, duráveis e, sempre que possível, recicláveis. O nosso objetivo é prolongar o ciclo de vida dos produtos e facilitar a sua reintegração na cadeia de valor."
        }
    ];

    return (
        <section id="ambiente" className="py-24 bg-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto mb-16">
                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2 block">Sustentabilidade</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
                    {cards.map((card, index) => (
                        <InfoCard key={index} title={card.title}>
                            {card.text}
                        </InfoCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Environment;