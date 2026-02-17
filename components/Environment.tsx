import React from 'react';

const EnvironmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" transform="scale(0.8) translate(3, 3)" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.76V22m0-20v.24a8.96 8.96 0 014.28 1.43l.18.11a2.6 2.6 0 002.5 0l.18-.11A9 9 0 0012 2v-.24c-2.3 1.25-3.46 3.5-3.5 5.76V8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.24V2m0 20v-.24a8.96 8.96 0 00-4.28-1.43l-.18-.11a2.6 2.6 0 01-2.5 0l-.18.11A9 9 0 0112 22v.24c2.3-1.25 3.46-3.5 3.5-5.76V16" transform="rotate(180 12 12)" />
    </svg>
);

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5">
        <h4 className="font-bold text-sky-400 mb-3">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{children}</p>
    </div>
);


const Environment: React.FC = () => {
    return (
        <section 
            id="ambiente" 
            className="py-20 bg-[#0f0f0f]"
            style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
                backgroundSize: '30px 30px',
            }}
        >
            <div className="max-w-7xl mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-block bg-sky-400/5 border border-sky-400/10 rounded-full p-4 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L12 12m0 0l-2.25 2.25M12 12l2.25 2.25M12 12l2.25-2.25M12 12l-2.25-2.25" opacity="0.4"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001.51 1H15a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.188 10.03A6 6 0 0112 15a6 6 0 01-3.188-4.97" />
                        </svg>

                    </div>
                    <h2 className="text-3xl font-bold mb-3">Compromisso Ambiental</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Acreditamos numa indústria que inova de forma responsável. A sustentabilidade está no centro da nossa operação, desde a escolha de materiais à otimização dos nossos processos produtivos.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto text-left">
                    <InfoCard title="Materiais Reciclados de Alta Performance">
                        Sempre que o projeto permite, especialmente em componentes não visíveis, utilizamos polímeros reciclados de alta qualidade (rPP, rABS, rPC). Garantimos que as propriedades mecânicas e a durabilidade cumprem os mais rigorosos padrões.
                    </InfoCard>
                    <InfoCard title="Eficiência Energética e Redução de Desperdício">
                        As nossas máquinas de injeção são de última geração, otimizadas para um baixo consumo energético. Monitorizamos o processo em tempo real para minimizar o desperdício de matéria-prima e garantir que cada ciclo é o mais eficiente possível.
                    </InfoCard>
                    <InfoCard title="Design para uma Economia Circular">
                        Colaboramos com os nossos clientes desde a fase de concepção para desenvolver peças mais leves, duráveis e, sempre que possível, recicláveis. O nosso objetivo é prolongar o ciclo de vida dos produtos e facilitar a sua reintegração na cadeia de valor.
                    </InfoCard>
                </div>
            </div>
        </section>
    );
};

export default Environment;