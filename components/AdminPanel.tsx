import React, { useState } from 'react';

interface AdminPanelProps {
    onClose: () => void;
    onProductAdded: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onProductAdded }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'content'>('add');
    const [products, setProducts] = useState<any[]>([]);
    const [content, setContent] = useState<any>(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
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

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    const fetchContent = async () => {
        setIsLoadingContent(true);
        try {
            const response = await fetch('/api/content');
            const data = await response.json();
            setContent(data);
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setIsLoadingContent(false);
        }
    };

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
                fetchProducts();
                fetchContent();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError('Por favor, selecione uma imagem.');
            return;
        }
        setIsSubmitting(true);
        setError('');

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

            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                onProductAdded();
                setName('');
                setCode('');
                setDescription('');
                setMaterial('');
                setFinishType('Injeção');
                setSpecs('');
                setImage(null);
                setActiveTab('manage');
                fetchProducts();
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao adicionar produto.');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContentUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content),
            });
            const data = await response.json();
            if (data.success) {
                alert('Conteúdo atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar conteúdo');
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem a certeza que deseja remover este produto?')) return;

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setProducts(products.filter(p => p.id !== id));
                onProductAdded(); // Refresh catalog
            } else {
                alert('Erro ao remover produto');
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
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
            <div className="flex border-b border-gray-200 mb-6">
                <button 
                    onClick={() => setActiveTab('add')}
                    className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'add' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Adicionar
                </button>
                <button 
                    onClick={() => setActiveTab('manage')}
                    className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'manage' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Gerir ({products.length})
                </button>
                <button 
                    onClick={() => setActiveTab('content')}
                    className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'content' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Conteúdo
                </button>
            </div>

            {activeTab === 'add' ? (
                <>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Novo Produto</h2>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
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
                </>
            ) : activeTab === 'manage' ? (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Gestão de Produtos</h2>
                    {isLoadingProducts ? (
                        <p className="text-center py-8">A carregar produtos...</p>
                    ) : products.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">Nenhum produto encontrado.</p>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {products.map(product => (
                                <div key={product.id} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 border border-gray-200 overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">{product.code}</p>
                                            <h4 className="font-bold text-sm">{product.name}</h4>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="pt-6">
                        <button 
                            onClick={onClose}
                            className="w-full border border-black text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-100 transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Editar Conteúdo do Site</h2>
                    {isLoadingContent || !content ? (
                        <p className="text-center py-8">A carregar conteúdo...</p>
                    ) : (
                        <form onSubmit={handleContentUpdate} className="space-y-8">
                            {/* Header Section */}
                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <h3 className="text-sm font-bold uppercase text-yellow-600">Cabeçalho (Hero)</h3>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título Principal</label>
                                    <input 
                                        type="text" 
                                        value={content.header.title} 
                                        onChange={e => setContent({...content, header: {...content.header, title: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={content.header.subtitle} 
                                        onChange={e => setContent({...content, header: {...content.header, subtitle: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-20 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">URL da Imagem de Destaque</label>
                                    <input 
                                        type="text" 
                                        value={content.header.imageUrl || ''} 
                                        onChange={e => setContent({...content, header: {...content.header, imageUrl: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <h3 className="text-sm font-bold uppercase text-yellow-600">Sobre Nós</h3>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={content.about.title} 
                                        onChange={e => setContent({...content, about: {...content.about, title: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={content.about.subtitle} 
                                        onChange={e => setContent({...content, about: {...content.about, subtitle: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-20 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Parágrafo 1</label>
                                    <textarea 
                                        value={content.about.content1} 
                                        onChange={e => setContent({...content, about: {...content.about, content1: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-32 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Parágrafo 2</label>
                                    <textarea 
                                        value={content.about.content2} 
                                        onChange={e => setContent({...content, about: {...content.about, content2: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-32 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold uppercase text-gray-400">Galeria (URLs das Imagens)</h4>
                                    {(content.about.gallery || []).map((url: string, idx: number) => (
                                        <div key={idx}>
                                            <label className="block text-[9px] text-gray-400 mb-1">Imagem {idx + 1}</label>
                                            <input 
                                                type="text" 
                                                value={url} 
                                                onChange={e => {
                                                    const newGallery = [...(content.about.gallery || [])];
                                                    newGallery[idx] = e.target.value;
                                                    setContent({...content, about: {...content.about, gallery: newGallery}});
                                                }}
                                                className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="space-y-4 pb-6">
                                <h3 className="text-sm font-bold uppercase text-yellow-600">Newsletter (CTA)</h3>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.title} 
                                        onChange={e => setContent({...content, cta: {...content.cta, title: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.subtitle} 
                                        onChange={e => setContent({...content, cta: {...content.cta, subtitle: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Texto do Botão</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.buttonText} 
                                        onChange={e => setContent({...content, cta: {...content.cta, buttonText: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">URL da Imagem de Fundo (Opcional)</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.bgImage || ''} 
                                        onChange={e => setContent({...content, cta: {...content.cta, bgImage: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                            </div>

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
                                    {isSubmitting ? 'A guardar...' : 'Atualizar Conteúdo'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
