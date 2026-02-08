"use client";

import * as React from "react";
import {useState} from "react";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {MdEmail, MdLocationOn} from "react-icons/md";
import {FaInstagram} from "react-icons/fa";
import Link from "next/link";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        // Simulate form submission
        setTimeout(() => {
            setStatus("sent");
            setForm({name: "", email: "", subject: "", message: ""});
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header/>

            <main className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold uppercase tracking-wider mb-8">Coordonnées</h2>
                            <div className="space-y-6">
                                <a
                                    href="mailto:productionsbeaulieu@gmail.com"
                                    className="flex items-center gap-4 text-zinc-400 hover:text-[var(--accent)] transition-colors group"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                                        <MdEmail size={24} className="text-[var(--accent)]"/>
                                    </div>
                                    <div>
                                        <p className="text-white text-xs uppercase tracking-widest font-bold">Email</p>
                                        <p className="text-sm">productionsbeaulieu@gmail.com</p>
                                    </div>
                                </a>

                                <a
                                    href="https://www.instagram.com/productions_beaulieu/"
                                    target="_blank"
                                    className="flex items-center gap-4 text-zinc-400 hover:text-[var(--accent)] transition-colors group"
                                >
                                    <div
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
                                        <FaInstagram size={24} className="text-[var(--accent)]"/>
                                    </div>
                                    <div>
                                        <p className="text-white text-xs uppercase tracking-widest font-bold">Instagram</p>
                                        <p className="text-sm">@productions_beaulieu</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 text-zinc-400 group">
                                    <div
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-colors">
                                        <MdLocationOn size={24} className="text-[var(--accent)]"/>
                                    </div>
                                    <div>
                                        <p className="text-white text-xs uppercase tracking-widest font-bold">Localisation</p>
                                        <p className="text-sm">Québec, QC, Canada</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-[var(--accent)] rounded-2xl text-white">
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">Prêt à réserver ?</h3>
                            <p className="text-sm mb-6 opacity-90">
                                Si vous avez déjà une date en tête pour votre événement, utilisez notre outil de
                                réservation pour une réponse plus rapide.
                            </p>
                            <Link
                                href="/book"
                                className="inline-block w-full py-3 bg-white text-black text-center text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-colors"
                            >
                                Accéder au formulaire →
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-zinc-900/40 border border-white/5 p-8 md:p-12 rounded-2xl">
                        <h2 className="text-2xl font-bold uppercase tracking-wider mb-8">Envoyez un message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
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
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                        placeholder="votre@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject"
                                       className="text-xs uppercase tracking-widest font-bold text-zinc-400">Sujet</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    value={form.subject}
                                    onChange={onChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                                    placeholder="Sujet de votre message"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message"
                                       className="text-xs uppercase tracking-widest font-bold text-zinc-400">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={onChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none"
                                    placeholder="Comment pouvons-nous vous aider ?"
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
                                    "Envoyer le message"
                                )}
                            </button>

                            {status === "sent" && (
                                <p className="text-green-500 text-center text-sm font-medium animate-pulse">
                                    Merci ! Votre message a été envoyé avec succès. Nous vous contacterons sous peu.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
