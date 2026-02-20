import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initial data if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    const initialData = [
        {
            id: 1,
            name: 'Injetor de Alta Pressão',
            code: 'PB-INJ-001',
            imageUrl: 'https://picsum.photos/seed/injector/800/600',
            description: 'Componente de precisão para sistemas de injeção de combustível, com tolerâncias rigorosas e acabamento resistente.',
            specs: ['Material: PA66-GF30', 'Resistência Térmica: 220°C', 'Pressão Máx: 150 bar'],
            material: 'PA66-GF30',
            finishType: 'Injeção',
        },
        {
            id: 2,
            name: 'Emblema Frontal Cromado',
            code: 'PB-CR-004',
            imageUrl: 'https://picsum.photos/seed/emblem/800/600',
            description: 'Emblema para a indústria automóvel com acabamento em cromagem galvânica de alto brilho e durabilidade.',
            specs: ['Material: ABS/PC', 'Acabamento: Cromo Hexavalente', 'Resistência UV: 5 anos'],
            material: 'ABS/PC',
            finishType: 'Cromagem',
        },
        {
            id: 3,
            name: 'Caixa para Eletrónica',
            code: 'PB-BOX-012',
            imageUrl: 'https://picsum.photos/seed/electronics-box/800/600',
            description: 'Caixa robusta para alojamento de circuitos eletrónicos, com opções de pintura para blindagem EMI/RFI.',
            specs: ['Material: PC-ABS V0', 'Proteção: IP67', 'Blindagem: > 40dB @ 1GHz'],
            material: 'PC-ABS V0',
            finishType: 'Pintura',
        },
        {
            id: 4,
            name: 'Difusor de Ar Metalizado',
            code: 'PB-MET-007',
            imageUrl: 'https://picsum.photos/seed/air-diffuser/800/600',
            description: 'Peça decorativa para interiores de veículos, com acabamento em metalização a vácuo com efeito de alumínio escovado.',
            specs: ['Material: ABS', 'Acabamento: PVD Alumínio', 'Textura: Escovado Fino'],
            material: 'ABS',
            finishType: 'Metalização',
        },
        {
            id: 5,
            name: 'Conector Selado',
            code: 'PB-CON-031',
            imageUrl: 'https://picsum.photos/seed/sealed-connector/800/600',
            description: 'Conector elétrico de alta performance com sobreinjeção de TPE para garantir selagem contra humidade e poeira.',
            specs: ['Material: PBT + TPE', 'Proteção: IP68', 'Voltagem Máx: 600V'],
            material: 'PBT + TPE',
            finishType: 'Injeção',
        },
        {
            id: 6,
            name: 'Lente para Sensor Ótico',
            code: 'PB-LNS-002',
            imageUrl: 'https://picsum.photos/seed/optic-lens/800/600',
            description: 'Lente de policarbonato com elevada transparência e precisão ótica, moldada para sensores de presença.',
            specs: ['Material: PC Ótico', 'Transmissão Luz: >92%', 'Acabamento: Polido espelhado'],
            material: 'PC Ótico',
            finishType: 'Injeção',
        }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static(UPLOADS_DIR));

    // API Routes
    app.get('/api/products', (req, res) => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        res.json(data);
    });

    app.post('/api/admin/login', (req, res) => {
        const { username, password } = req.body;
        const adminUser = process.env.ADMIN_USERNAME || 'admin';
        const adminPass = process.env.ADMIN_PASSWORD || 'boeso2024';

        if (username === adminUser && password === adminPass) {
            res.json({ success: true, token: 'fake-jwt-token' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    });

    app.post('/api/admin/products', upload.single('image'), (req, res) => {
        // In a real app, we'd verify the token here
        const { name, code, description, material, finishType, specs } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        const newProduct = {
            id: data.length > 0 ? Math.max(...data.map((p: any) => p.id)) + 1 : 1,
            name,
            code,
            description,
            material,
            finishType,
            imageUrl,
            specs: specs ? JSON.parse(specs) : []
        };

        data.push(newProduct);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({ success: true, product: newProduct });
    });

    // Vite middleware for development
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        app.use(express.static(path.join(process.cwd(), 'dist')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
        });
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
