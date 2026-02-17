import {Header} from "@/components/Header";
import * as React from "react";
import {Footer} from "@/components/Footer";

export default function ConfidentialityPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <main className="py-48 px-6">
                <div className="mx-auto max-w-3xl ">
                    <h1 className="text-4xl font-bold mb-4">
                        Conditions d’utilisation
                    </h1>
                    <p className="text-sm text-gray-500 mb-12">
                        Dernière mise à jour : 17 février 2026
                    </p>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            1. Objet
                        </h2>
                        <p>
                            Les présentes conditions régissent l’utilisation du site web de Productions Beaulieu.
                            En accédant au site ou en soumettant une demande de réservation,
                            vous acceptez d’être lié par les présentes conditions.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            2. Nature du service
                        </h2>
                        <p>
                            Le site permet uniquement de transmettre une demande de réservation
                            pour des services de prestations musicales.
                        </p>
                        <p className="mt-4">
                            Une demande envoyée via le formulaire ne constitue pas une réservation
                            ferme ni un contrat. Une réservation devient valide uniquement après
                            confirmation écrite par Productions Beaulieu.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            3. Âge minimum
                        </h2>
                        <p>
                            L’utilisateur doit être âgé d’au moins 18 ans pour soumettre une
                            demande de réservation via le site.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            4. Disponibilité et force majeure
                        </h2>
                        <p>
                            Productions Beaulieu ne garantit pas la disponibilité pour une date
                            donnée tant qu’une confirmation écrite n’a pas été émise.
                        </p>
                        <p className="mt-4">
                            L’entreprise ne pourra être tenue responsable en cas d’impossibilité
                            d’exécution du service en raison d’un cas de force majeure, incluant
                            notamment maladie, accident, conditions météorologiques extrêmes,
                            événements imprévus ou toute situation hors de son contrôle raisonnable.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            5. Limitation de responsabilité
                        </h2>
                        <p>
                            Productions Beaulieu ne pourra être tenue responsable des dommages
                            indirects, accessoires ou consécutifs résultant de l’utilisation
                            du site.
                        </p>
                        <p className="mt-4">
                            L’entreprise décline toute responsabilité en cas d’erreur technique,
                            d’indisponibilité temporaire du site ou d’utilisation inadéquate
                            par l’utilisateur.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            6. Propriété intellectuelle
                        </h2>
                        <p>
                            Le contenu du site, incluant notamment les textes, images, logos, musiques,
                            éléments graphiques et structure, est protégé par les lois applicables.
                        </p>
                        <p className="mt-4">
                            Toute reproduction, modification, distribution ou utilisation
                            non autorisée du contenu est strictement interdite sans consentement écrit.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            7. Modification du site et des conditions
                        </h2>
                        <p>
                            Productions Beaulieu se réserve le droit de modifier le site,
                            son contenu ou les présentes conditions d’utilisation en tout temps,
                            sans préavis.
                        </p>
                        <p className="mt-4">
                            La version applicable est celle publiée sur le site au moment de son utilisation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">
                            8. Droit applicable
                        </h2>
                        <p>
                            Les présentes conditions sont régies par les lois applicables
                            dans la province de Québec et au Canada.
                        </p>
                        <p className="mt-4">
                            Tout litige sera soumis aux tribunaux compétents du district judiciaire de Québec.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}