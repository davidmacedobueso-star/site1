export interface Product {
    id: number;
    name: string;
    code: string;
    imageUrlSeed: string;
    description: string;
    specs: string[];
}

export const catalogProducts: Product[] = [
    {
        id: 1,
        name: 'Injetor de Alta Pressão',
        code: 'PB-INJ-001',
        imageUrlSeed: 'injector',
        description: 'Componente de precisão para sistemas de injeção de combustível, com tolerâncias rigorosas e acabamento resistente.',
        specs: ['Material: PA66-GF30', 'Resistência Térmica: 220°C', 'Pressão Máx: 150 bar'],
    },
    {
        id: 2,
        name: 'Emblema Frontal Cromado',
        code: 'PB-CR-004',
        imageUrlSeed: 'emblem',
        description: 'Emblema para a indústria automóvel com acabamento em cromagem galvânica de alto brilho e durabilidade.',
        specs: ['Material: ABS/PC', 'Acabamento: Cromo Hexavalente', 'Resistência UV: 5 anos'],
    },
    {
        id: 3,
        name: 'Caixa para Eletrónica',
        code: 'PB-BOX-012',
        imageUrlSeed: 'electronics-box',
        description: 'Caixa robusta para alojamento de circuitos eletrónicos, com opções de pintura para blindagem EMI/RFI.',
        specs: ['Material: PC-ABS V0', 'Proteção: IP67', 'Blindagem: > 40dB @ 1GHz'],
    },
    {
        id: 4,
        name: 'Difusor de Ar Metalizado',
        code: 'PB-MET-007',
        imageUrlSeed: 'air-diffuser',
        description: 'Peça decorativa para interiores de veículos, com acabamento em metalização a vácuo com efeito de alumínio escovado.',
        specs: ['Material: ABS', 'Acabamento: PVD Alumínio', 'Textura: Escovado Fino'],
    },
    {
        id: 5,
        name: 'Conector Selado',
        code: 'PB-CON-031',
        imageUrlSeed: 'sealed-connector',
        description: 'Conector elétrico de alta performance com sobreinjeção de TPE para garantir selagem contra humidade e poeira.',
        specs: ['Material: PBT + TPE', 'Proteção: IP68', 'Voltagem Máx: 600V'],
    },
    {
        id: 6,
        name: 'Lente para Sensor Ótico',
        code: 'PB-LNS-002',
        imageUrlSeed: 'optic-lens',
        description: 'Lente de policarbonato com elevada transparência e precisão ótica, moldada para sensores de presença.',
        specs: ['Material: PC Ótico', 'Transmissão Luz: >92%', 'Acabamento: Polido espelhado'],
    }
];