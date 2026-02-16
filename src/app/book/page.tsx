"use client";

import * as React from "react";
import {useState} from "react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {Hero} from "@/components/HeroSection";
import {MdArrowDropDown} from "react-icons/md";
import {BookingType, BookingTypeLabels} from "@/enums/BookingType";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        type: "",
        date: "",
        duration: "",
        description: "",
    });

    const [error, setError] = useState("Une erreur est survenue. Veuillez réessayer ou nous contacter à l&#39;adresse productionsbeaulieu@gmail.com.");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    function onChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setStatus("sending");

        const response = await fetch('/api/send-booking-info', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(form)
        });

        const body = await response.json()

        if (body.error) {
            setError(body.error);
            return setStatus("error");
        }

        setStatus("sent");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>
            <Hero title="Réserver" subtitle="Vous avez une idée d'événement en tête ? Ça nous intéresse !" />

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="bg-zinc-900/40 border border-white/5 p-8 md:p-12 rounded-2xl">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-8">Réservation</h2>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name"
                                       className="text-xs uppercase tracking-widest font-bold text-zinc-400">Nom</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={onChange}
                                    className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                    placeholder="Votre nom"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email"
                                       className="text-xs uppercase tracking-widest font-bold text-zinc-400">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={onChange}
                                    className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="date"
                                       className="text-xs uppercase tracking-widest font-bold text-zinc-400">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    required
                                    value={form.date}
                                    onChange={onChange}
                                    className="appearance-none mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="duration"
                                       className="text-xs uppercase tracking-widest font-bold text-zinc-400">Durée approximative (h)</label>
                                <input
                                    type="number"
                                    id="duration"
                                    name="duration"
                                    min={1}
                                    max={50}
                                    required
                                    value={form.duration}
                                    onChange={onChange}
                                    className="[appearance:textfield] mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                    placeholder="3"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="type"
                                   className="text-xs uppercase tracking-widest font-bold text-zinc-400">Type d&#39;événement</label>
                            <div className="relative mt-2">
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    value={form.type}
                                    onChange={onChange}
                                    className="cursor-pointer appearance-none w-full text-white bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                >
                                    <option>Choisir</option>
                                    {Object.values(BookingType).map((type) => (
                                        <option key={type} value={type}>
                                            {BookingTypeLabels[type]}
                                        </option>
                                    ))}
                                </select>
                                <div
                                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4"
                                >
                                    <MdArrowDropDown size={32} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description"
                                   className="text-xs uppercase tracking-widest font-bold text-zinc-400">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={5}
                                value={form.description}
                                onChange={onChange}
                                className="mt-2 w-full bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
                                placeholder="Aidez-nous à comprendre votre événement"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className={`cursor-pointer w-full py-4 bg-[var(--accent)] text-white font-bold uppercase tracking-[0.2em] rounded-lg transition-all duration-300 hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 ${status === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {status === "sending" ? (
                                <>
                                    <div
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Envoi en cours...
                                </>
                            ) : status === "sent" ? (
                                "Message envoyé !"
                            ) : (
                                "Envoyer la demande"
                            )}
                        </button>

                        {status === "sent" && (
                            <p className="text-green-500 text-center text-sm font-medium">
                                Merci ! Votre message a été envoyé avec succès. Nous vous contacterons sous peu.
                            </p>
                        )}

                        {status === "error" && (
                            <p className="text-[var(--accent)] text-center text-sm font-medium">
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
