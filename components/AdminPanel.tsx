import React, { useState } from 'react';

interface AdminPanelProps {
    onClose: () => void;
    onProductAdded: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onProductAdded }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [finishType, setFinishType] = useState('Injeção');
    const [image, setImage] = useState<File | null>(null);
    const [specs, setSpecs] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(true);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError('Por favor, selecione uma imagem');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('code', code);
        formData.append('description', description);
        formData.append('material', material);
        formData.append('finishType', finishType);
        formData.append('image', image);
        
        // Convert specs string to array
        const specsArray = specs.split('\n').filter(s => s.trim() !== '');
        formData.append('specs', JSON.stringify(specsArray));

        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert('Produto adicionado com sucesso!');
                onProductAdded();
                onClose();
            } else {
                setError('Erro ao adicionar produto');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Acesso Restrito</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Utilizador</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Palavra-passe</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-black text-white font-bold py-3 uppercase tracking-widest hover:bg-gray-800 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Adicionar Novo Produto</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nome do Produto</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Código (Referência)</label>
                        <input 
                            type="text" 
                            value={code} 
                            onChange={e => setCode(e.target.value)}
                            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Descrição</label>
                    <textarea 
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                        className="w-full border border-gray-300 p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Material</label>
                        <input 
                            type="text" 
                            value={material} 
                            onChange={e => setMaterial(e.target.value)}
                            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tipo de Acabamento</label>
                        <select 
                            value={finishType} 
                            onChange={e => setFinishType(e.target.value)}
                            className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="Injeção">Injeção</option>
                            <option value="Cromagem">Cromagem</option>
                            <option value="Pintura">Pintura</option>
                            <option value="Metalização">Metalização</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Especificações (uma por linha)</label>
                    <textarea 
                        value={specs} 
                        onChange={e => setSpecs(e.target.value)}
                        placeholder="Ex: Material: ABS&#10;Resistência: 100°C"
                        className="w-full border border-gray-300 p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Imagem do Produto</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
                        className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex space-x-4 pt-4">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="flex-1 border border-black text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-100 transition"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-1 bg-yellow-400 text-black font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition disabled:opacity-50"
                    >
                        {isSubmitting ? 'A guardar...' : 'Adicionar Produto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPanel;
