"use client";

import {FormCard} from "@/components/FormCard";
import {FormInput} from "@/components/FormInput";
import {addCategory, deleteCategory, loadAllCategories, updateCategory} from "@/database/CategoryDAO";
import {addDemo, deleteDemo, loadAllDemo, updateDemo} from "@/database/DemoDAO";
import {uploadFile} from "@/lib/supabase/storage";
import {Category} from "@/types/Category";
import {Demo} from "@/types/Demo";
import * as React from "react";
import {SubmitEventHandler, useEffect, useState} from "react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {MdLibraryMusic, MdRefresh, MdCategory, MdDelete, MdEdit} from "react-icons/md";

export default function DashboardPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [demos, setDemos] = useState<Demo[]>([]);
    const [activeTab, setActiveTab] = useState<'demos' | 'categories'>('demos');

    const [newDemo, setNewDemo] = useState({
        name: "",
        category: ""
    });
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [newCategoryLabel, setNewCategoryLabel] = useState("");
    const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
    const [categorySuccessMessage, setCategorySuccessMessage] = useState("");

    const [editingDemo, setEditingDemo] = useState<Demo | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    async function refreshData() {
        const [cats, dms] = await Promise.all([
            loadAllCategories(),
            loadAllDemo()
        ]);
        setCategories(cats || []);
        setDemos(dms || []);
    }

    useEffect(() => {
        const fetchData = async () => {
            await refreshData();
        };
        fetchData();
    }, []);

    const handleAddDemo: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!audioFile || !imageFile || !newDemo.category || !newDemo.name) {
            setErrorMessage("Veuillez remplir tous les champs et sélectionner les fichiers.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const { url: audio_url, error: audioError } = await uploadFile(audioFile, 'demo-bucket', 'audio');
            if (audioError) new Error("Erreur lors de l'upload de l'audio: " + audioError.message);

            const { url: img_url, error: imageError } = await uploadFile(imageFile, 'demo-bucket', 'img');
            if (imageError) new Error("Erreur lors de l'upload de l'image: " + imageError.message);
            
            const { error } = await addDemo({
                name: newDemo.name,
                category: newDemo.category,
                audio_url: audio_url!,
                img_url: img_url!,
                created_at: new Date().toISOString()
            });

            if (error) return error;

            setSuccessMessage("Démo ajoutée avec succès !");
            setNewDemo({ name: "", category: "" });
            setAudioFile(null);
            setImageFile(null);
            await refreshData();
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err: unknown) {
            console.error(err);
            setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue lors de l'ajout de la démo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAddCategory: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!newCategoryLabel.trim()) return;
        setIsSubmittingCategory(true);
        const { error } = await addCategory(newCategoryLabel.trim());
        setIsSubmittingCategory(false);
        if (!error) {
            setCategorySuccessMessage("Catégorie ajoutée avec succès !");
            setNewCategoryLabel("");
            refreshData();
            setTimeout(() => setCategorySuccessMessage(""), 3000);
        }
    };

    const handleDeleteDemo = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette démo ?")) return;
        const { error } = await deleteDemo(id);
        if (!error) refreshData();
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;
        const { error } = await deleteCategory(id);
        if (!error) refreshData();
    };

    const handleUpdateDemo: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!editingDemo) return;
        
        setIsSubmitting(true);
        try {
            let audio_url = editingDemo.audio_url;
            let img_url = editingDemo.img_url;

            if (audioFile) {
                const { url, error } = await uploadFile(audioFile, 'demo-bucket', 'audio');
                if (error) return error;
                audio_url = url!;
            }

            if (imageFile) {
                const { url, error } = await uploadFile(imageFile, 'demo-bucket', 'img');
                if (error) return error;
                img_url = url!;
            }

            const { error } = await updateDemo(editingDemo.id, {
                name: editingDemo.name,
                category: editingDemo.category,
                audio_url,
                img_url
            });

            if (error) return error;

            setSuccessMessage("Démo mise à jour avec succès !");
            setEditingDemo(null);
            setAudioFile(null);
            setImageFile(null);
            refreshData();
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err: unknown) {
            console.error(err);
            setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateCategory: SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!editingCategory) return;
        setIsSubmittingCategory(true);
        const { error } = await updateCategory(editingCategory.id, editingCategory.label);
        setIsSubmittingCategory(false);
        if (!error) {
            setCategorySuccessMessage("Catégorie mise à jour !");
            setEditingCategory(null);
            refreshData();
            setTimeout(() => setCategorySuccessMessage(""), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Tableau de bord Admin</h1>
                    <button 
                        onClick={refreshData}
                        className="cursor-pointer p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        title="Rafraîchir les données"
                    >
                        <MdRefresh size={24} />
                    </button>
                </div>

                <div className="flex space-x-4 mb-8 border-b border-white/10 overflow-x-auto whitespace-nowrap pb-1">
                    <button 
                        onClick={() => setActiveTab('demos')}
                        className={`cursor-pointer pb-4 px-2 flex items-center space-x-2 ${activeTab === 'demos' ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]' : 'text-zinc-400'}`}
                    >
                        <MdLibraryMusic /> <span>Démos</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('categories')}
                        className={`cursor-pointer pb-4 px-2 flex items-center space-x-2 ${activeTab === 'categories' ? 'border-b-2 border-[var(--accent)] text-[var(--accent)]' : 'text-zinc-400'}`}
                    >
                        <MdCategory /> <span>Catégories</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    
                    {activeTab === 'demos' && (
                        <div className="space-y-8">
                            <FormCard
                                title="Ajouter une nouvelle démo"
                                subtitle="Ajouter une nouvelle démo musicale au catalogue"
                                isLoading={isSubmitting}
                                isSuccess={!!successMessage}
                                successMessage={successMessage}
                                errors={errorMessage ? { api: errorMessage } : undefined}
                            >
                                <form onSubmit={editingDemo ? handleUpdateDemo : handleAddDemo} className="space-y-4">
                                    <FormInput
                                        title="Nom de la démo"
                                        id="name"
                                        value={editingDemo ? editingDemo.name : newDemo.name}
                                        onChange={(e) => editingDemo ? setEditingDemo({...editingDemo, name: e.target.value}) : setNewDemo({...newDemo, name: e.target.value})}
                                        placeholder="ex: Summer Hits 2026"
                                    />
                                    <div>
                                        <label className="text-sm font-medium text-white mb-1 block">Fichier Audio {editingDemo && "(laisser vide pour conserver l'actuel)"}</label>
                                        <input 
                                            type="file" 
                                            accept="audio/*"
                                            onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                                            className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-white mb-1 block">Image de Couverture {editingDemo && "(laisser vide pour conserver l'actuel)"}</label>
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-white mb-1 block">Catégorie</label>
                                        <select 
                                            value={editingDemo ? editingDemo.category : newDemo.category}
                                            onChange={(e) => editingDemo ? setEditingDemo({...editingDemo, category: e.target.value}) : setNewDemo({...newDemo, category: e.target.value})}
                                            className="w-full rounded-lg border border-white/20 bg-black px-3 py-2 text-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                        >
                                            <option value="">Sélectionnez une catégorie</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id.toString()}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="cursor-pointer flex-1 bg-[var(--accent)] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                        >
                                            {editingDemo ? "Mettre à jour" : "Ajouter la démo"}
                                        </button>
                                        {editingDemo && (
                                            <button 
                                                type="button"
                                                onClick={() => {
                                                    setEditingDemo(null);
                                                    setErrorMessage("");
                                                }}
                                                className="px-4 py-2 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition-colors"
                                            >
                                                Annuler
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </FormCard>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4">Démos existantes ({demos.length})</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="py-3 px-4">Nom</th>
                                                <th className="py-3 px-4">Catégorie</th>
                                                <th className="py-3 px-4">Date de création</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {demos.map((demo, idx) => (
                                                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="py-3 px-4">{demo.name}</td>
                                                    <td className="py-3 px-4">
                                                        {categories.find(c => c.id.toString() === demo.category)?.label || demo.category}
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-zinc-400">{new Date(demo.created_at).toLocaleDateString()}</td>
                                                    <td className="py-3 px-4 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button 
                                                                onClick={() => {
                                                                    setEditingDemo(demo);
                                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                                }}
                                                                className="cursor-pointer p-2 text-zinc-400 hover:text-white transition-colors"
                                                                title="Modifier"
                                                            >
                                                                <MdEdit size={18} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteDemo(demo.id)}
                                                                className="cursor-pointer p-2 text-zinc-400 hover:text-[var(--accent)] transition-colors"
                                                                title="Supprimer"
                                                            >
                                                                <MdDelete size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'categories' && (
                        <div className="space-y-8">
                            <FormCard 
                                title={editingCategory ? "Modifier la catégorie" : "Ajouter une nouvelle catégorie"} 
                                subtitle={editingCategory ? "Modifier le nom de la catégorie existante" : "Créer une nouvelle catégorie pour classer les démos"}
                                isLoading={isSubmittingCategory}
                                isSuccess={!!categorySuccessMessage}
                                successMessage={categorySuccessMessage}
                            >
                                <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory} className="space-y-4">
                                    <FormInput 
                                        title="Nom de la catégorie" 
                                        id="category_label" 
                                        value={editingCategory ? editingCategory.label : newCategoryLabel} 
                                        onChange={(e) => editingCategory ? setEditingCategory({...editingCategory, label: e.target.value}) : setNewCategoryLabel(e.target.value)}
                                        placeholder="ex: Jazz, Rock, Événementiel"
                                    />
                                    <div className="flex gap-2">
                                        <button 
                                            type="submit"
                                            disabled={isSubmittingCategory}
                                            className="flex-1 bg-[var(--accent)] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                                        >
                                            {editingCategory ? "Mettre à jour" : "Ajouter la catégorie"}
                                        </button>
                                        {editingCategory && (
                                            <button 
                                                type="button"
                                                onClick={() => setEditingCategory(null)}
                                                className="px-4 py-2 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition-colors"
                                            >
                                                Annuler
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </FormCard>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h2 className="text-xl font-semibold mb-4">Catégories existantes ({categories.length})</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.map((cat) => (
                                        <div key={cat.id} className="p-3 bg-white/5 border border-white/10 rounded-lg flex justify-between items-center group">
                                            <span>{cat.label}</span>
                                            <div className="flex gap-1 transition-opacity">
                                                <button 
                                                    onClick={() => {
                                                        setEditingCategory(cat);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="cursor-pointer p-1 text-zinc-400 hover:text-white transition-colors"
                                                    title="Modifier"
                                                >
                                                    <MdEdit size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCategory(cat.id)}
                                                    className="cursor-pointer p-1 text-zinc-400 hover:text-[var(--accent)] transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <MdDelete size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}