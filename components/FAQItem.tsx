import React from 'react';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    return (
        <details className="group bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] p-4 rounded-lg cursor-pointer">
            <summary className="flex justify-between items-center text-sm font-semibold uppercase tracking-tight list-none">
                {question}
                <span className="text-sky-400 transition-transform duration-300 group-open:rotate-45">
                    +
                </span>
            </summary>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                {answer}
            </p>
        </details>
    );
};

export default FAQItem;