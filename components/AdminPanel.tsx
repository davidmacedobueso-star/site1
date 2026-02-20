import React, { useState } from 'react';

interface AdminPanelProps {
    onClose: () => void;
    onProductAdded: () => void;
    onContentUpdated: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onProductAdded, onContentUpdated }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'content'>('add');
    const [products, setProducts] = useState<any[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));

    const [siteContent, setSiteContent] = useState<any>(null);
    const [isSavingContent, setIsSavingContent] = useState(false);

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

    const fetchSiteContent = async () => {
        try {
            const response = await fetch('/api/content');
            const data = await response.json();
            setSiteContent(data);
        } catch (err) {
            console.error('Error fetching content:', err);
        }
    };

    React.useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
            fetchProducts();
            fetchSiteContent();
        }
    }, [token]);

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
                const fakeToken = 'fake-jwt-token';
                localStorage.setItem('adminToken', fakeToken);
                setToken(fakeToken);
                setIsLoggedIn(true);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
        setIsLoggedIn(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem a certeza que deseja remover este produto?')) return;

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setProducts(products.filter(p => p.id !== id));
                onProductAdded(); // Refresh catalog
            } else {
                alert('Erro ao remover produto: ' + (data.message || 'Erro desconhecido'));
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
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
        
        const specsArray = specs.split('\n').filter(s => s.trim() !== '');
        formData.append('specs', JSON.stringify(specsArray));

        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                alert('Produto adicionado com sucesso!');
                onProductAdded();
                onClose();
            } else {
                setError('Erro ao adicionar produto: ' + (data.message || 'Erro desconhecido'));
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContentSave = async () => {
        setIsSavingContent(true);
        try {
            const response = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(siteContent),
            });
            const data = await response.json();
            if (data.success) {
                alert('Conteúdo atualizado com sucesso!');
                onContentUpdated();
            } else {
                alert('Erro ao atualizar conteúdo');
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
        } finally {
            setIsSavingContent(false);
        }
    };

    const handleSectionImageUpload = async (section: string, index: number | null, file: File) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                const newContent = { ...siteContent };
                if (index !== null && Array.isArray(newContent[section].gallery)) {
                    newContent[section].gallery[index].imageUrl = data.imageUrl;
                } else {
                    newContent[section].imageUrl = data.imageUrl;
                }
                setSiteContent(newContent);
            }
        } catch (err) {
            alert('Erro ao carregar imagem');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="p-6 bg-white dark:bg-gray-900 transition-colors duration-300">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest text-black dark:text-white">Acesso Restrito</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Utilizador</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Palavra-passe</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-800 dark:hover:bg-gray-200 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setActiveTab('add')}
                    className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'add' ? 'border-b-2 border-yellow-400 text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                >
                    Adicionar
                </button>
                <button 
                    onClick={() => setActiveTab('manage')}
                    className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'manage' ? 'border-b-2 border-yellow-400 text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                >
                    Gerir ({products.length})
                </button>
                <button 
                    onClick={() => setActiveTab('content')}
                    className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === 'content' ? 'border-b-2 border-yellow-400 text-black dark:text-white' : 'text-gray-400 hover:text-black dark:hover:text-white'}`}
                >
                    Conteúdo
                </button>
                <button 
                    onClick={handleLogout}
                    className="pb-2 px-4 text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 ml-auto"
                >
                    Sair
                </button>
            </div>

            {activeTab === 'add' ? (
                <>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-black dark:text-white">Novo Produto</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Nome do Produto</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Código (Referência)</label>
                                <input 
                                    type="text" 
                                    value={code} 
                                    onChange={e => setCode(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Descrição</label>
                            <textarea 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Material</label>
                                <input 
                                    type="text" 
                                    value={material} 
                                    onChange={e => setMaterial(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Tipo de Acabamento</label>
                                <select 
                                    value={finishType} 
                                    onChange={e => setFinishType(e.target.value)}
                                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="Injeção">Injeção</option>
                                    <option value="Cromagem">Cromagem</option>
                                    <option value="Pintura">Pintura</option>
                                    <option value="Metalização">Metalização</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Especificações (uma por linha)</label>
                            <textarea 
                                value={specs} 
                                onChange={e => setSpecs(e.target.value)}
                                placeholder="Ex: Material: ABS&#10;Resistência: 100°C"
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Imagem do Produto</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
                                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex space-x-4 pt-4">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="flex-1 border border-black dark:border-gray-700 text-black dark:text-white font-bold py-3 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-black dark:text-white">Gestão de Produtos</h2>
                    {isLoadingProducts ? (
                        <p className="text-center py-8 text-black dark:text-white">A carregar produtos...</p>
                    ) : products.length === 0 ? (
                        <p className="text-center py-8 text-gray-500 dark:text-gray-400">Nenhum produto encontrado.</p>
                    ) : (
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {products.map(product => (
                                <div key={product.id} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{product.code}</p>
                                            <h4 className="font-bold text-sm text-black dark:text-white">{product.name}</h4>
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
                            className="w-full border border-black dark:border-gray-700 text-black dark:text-white font-bold py-3 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-black dark:text-white">Gestão de Conteúdo</h2>
                    
                    {siteContent ? (
                        <div className="space-y-10">
                            {/* Header Section */}
                            <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-500">Cabeçalho (Header)</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.header.title} 
                                        onChange={e => setSiteContent({ ...siteContent, header: { ...siteContent.header, title: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={siteContent.header.subtitle} 
                                        onChange={e => setSiteContent({ ...siteContent, header: { ...siteContent.header, subtitle: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Imagem de Fundo (Opcional)</label>
                                    <div className="space-y-2">
                                        {siteContent.header.backgroundImage && (
                                            <div className="aspect-video w-32 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                <img src={siteContent.header.backgroundImage} alt="Fundo" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={e => e.target.files && handleSectionImageUpload('header', null, e.target.files[0])}
                                            className="text-[10px] w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Products Section */}
                            <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-500">Produtos em Destaque</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.products.title} 
                                        onChange={e => setSiteContent({ ...siteContent, products: { ...siteContent.products, title: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={siteContent.products.subtitle} 
                                        onChange={e => setSiteContent({ ...siteContent, products: { ...siteContent.products, subtitle: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* Services Section */}
                            <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-500">Serviços</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.services.title} 
                                        onChange={e => setSiteContent({ ...siteContent, services: { ...siteContent.services, title: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={siteContent.services.subtitle} 
                                        onChange={e => setSiteContent({ ...siteContent, services: { ...siteContent.services, subtitle: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Imagens dos Serviços</label>
                                    <div className="grid grid-cols-3 gap-4 mt-2">
                                        {['injection', 'vacuum', 'chrome'].map((key) => (
                                            <div key={key} className="space-y-2">
                                                <p className="text-[10px] uppercase font-bold text-gray-500">{key === 'injection' ? 'Injeção' : key === 'vacuum' ? 'Metalização' : 'Cromagem'}</p>
                                                <div className="aspect-video bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                    <img src={siteContent.services.images?.[key] || `https://picsum.photos/seed/${key}-process/800/450`} alt={key} className="w-full h-full object-cover" />
                                                </div>
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        if (e.target.files) {
                                                            const file = e.target.files[0];
                                                            const formData = new FormData();
                                                            formData.append('image', file);
                                                            try {
                                                                const response = await fetch('/api/admin/upload', {
                                                                    method: 'POST',
                                                                    headers: { 'Authorization': `Bearer ${token}` },
                                                                    body: formData,
                                                                });
                                                                const data = await response.json();
                                                                if (data.success) {
                                                                    const newContent = { ...siteContent };
                                                                    if (!newContent.services.images) newContent.services.images = {};
                                                                    newContent.services.images[key] = data.imageUrl;
                                                                    setSiteContent(newContent);
                                                                }
                                                            } catch (err) {
                                                                alert('Erro ao carregar imagem');
                                                            }
                                                        }
                                                    }}
                                                    className="text-[10px] w-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* About Us Section */}
                            <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-500">Sobre Nós</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.about.title} 
                                        onChange={e => setSiteContent({ ...siteContent, about: { ...siteContent.about, title: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={siteContent.about.subtitle} 
                                        onChange={e => setSiteContent({ ...siteContent, about: { ...siteContent.about, subtitle: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Texto Principal 1</label>
                                    <textarea 
                                        value={siteContent.about.text1} 
                                        onChange={e => setSiteContent({ ...siteContent, about: { ...siteContent.about, text1: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Texto Principal 2</label>
                                    <textarea 
                                        value={siteContent.about.text2} 
                                        onChange={e => setSiteContent({ ...siteContent, about: { ...siteContent.about, text2: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-32 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Galeria de Imagens</label>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        {siteContent.about.gallery.map((img: any, idx: number) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="aspect-square bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                                    <img src={img.imageUrl || `https://picsum.photos/seed/${img.seed}/400/400`} alt={img.alt} className="w-full h-full object-cover" />
                                                </div>
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={e => e.target.files && handleSectionImageUpload('about', idx, e.target.files[0])}
                                                    className="text-[10px] w-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Environment Section */}
                            <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-500">Compromisso Ambiental</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.environment.title} 
                                        onChange={e => setSiteContent({ ...siteContent, environment: { ...siteContent.environment, title: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={siteContent.environment.subtitle} 
                                        onChange={e => setSiteContent({ ...siteContent, environment: { ...siteContent.environment, subtitle: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
                                <h3 className="font-bold text-sm uppercase tracking-wider text-yellow-500">Newsletter (CTA)</h3>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.cta.title} 
                                        onChange={e => setSiteContent({ ...siteContent, cta: { ...siteContent.cta, title: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Subtítulo</label>
                                    <input 
                                        type="text" 
                                        value={siteContent.cta.subtitle} 
                                        onChange={e => setSiteContent({ ...siteContent, cta: { ...siteContent.cta, subtitle: e.target.value } })}
                                        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button 
                                    onClick={onClose}
                                    className="flex-1 border border-black dark:border-gray-700 text-black dark:text-white font-bold py-3 uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleContentSave}
                                    disabled={isSavingContent}
                                    className="flex-1 bg-yellow-400 text-black font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition disabled:opacity-50"
                                >
                                    {isSavingContent ? 'A guardar...' : 'Guardar Alterações'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center py-8 text-black dark:text-white">A carregar conteúdo...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
