import {createResendClient} from "@/lib/resend/client";
import {NextRequest, NextResponse} from "next/server";
import {checkRateLimit} from "@/lib/simpleRateLimit";
import {BookingType} from "@/enums/BookingType";
import {sanitize} from "@/lib/sanitize";

const resendClient = createResendClient();

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown';

        if (!checkRateLimit(ip)) {
            console.warn(`Rate limit exceeded for IP: ${ip}`);
            return NextResponse.json(
                { error: 'Trop de tentatives. Réessayez dans 1 heure.' },
                { status: 429 }
            );
        }

        if (!data.name || data.name.length < 2 || data.name.length > 100) {
            return NextResponse.json(
                { error: 'Mauvais nom' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Mauvais email' },
                { status: 400 }
            );
        }

        if (!data.type || !Object.values(BookingType).includes(data.type as BookingType)) {
            return NextResponse.json(
                { error: 'Mauvais type' },
                { status: 400 }
            );
        }

        if (!data.date || data.date < Date.now().toString() || data.date > '2100-12-00') {
            return NextResponse.json(
                { error: 'Mauvaise date' },
                { status: 400 }
            );
        }

        if (!data.duration || data.duration < '1' || data.duration > '50') {
            return NextResponse.json(
                { error: 'Mauvaise durée' },
                { status: 400 }
            );
        }

        if (!data.description || data.description < 10 || data.description > 2000) {
            return NextResponse.json(
                { error: 'Mauvaise description' },
                { status: 400 }
            );
        }

        const dangerousPattern = /<script|javascript:|onerror=/i;
        if (dangerousPattern.test(data.description) || dangerousPattern.test(data.nom)) {
            return NextResponse.json(
                { error: 'Mauvaise description' },
                { status: 400 }
            );
        }

        if (!checkRateLimit(data.email)) {
            console.warn(`Disposable email detected: ${data.email}`);
            return NextResponse.json(
                { error: 'Veuillez utiliser une adresse email valide.' },
                { status: 400 }
            );
        }

        const { error } = await resendClient.emails.send({
            from: 'ProdBeaulieu Contact <contact@contact.prodbeaulieu.com>',
            to: ['samuelharvey06@gmail.com'],
            template: {
                id: 'booking-confirmation',
                variables: {
                    name: sanitize(data.name),
                    email: data.email.toLowerCase().trim(),
                    type: sanitize(data.type),
                    date: sanitize(data.date),
                    duration: sanitize(data.duration),
                    description: sanitize(data.description)
                }
            }
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}