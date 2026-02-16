import {createResendClient} from "@/lib/resend/client";
import {NextRequest, NextResponse} from "next/server";
import {checkRateLimit} from "@/lib/simpleRateLimit";
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

        if (!data.subject || data.subject < 2 || data.subject > 100) {
            return NextResponse.json(
                { error: 'Mauvais sujet' },
                { status: 400 }
            );
        }

        if (!data.message || data.message < 10 || data.message > 2000) {
            return NextResponse.json(
                { error: 'Mauvais message' },
                { status: 400 }
            );
        }

        const dangerousPattern = /<script|javascript:|onerror=/i;
        if (dangerousPattern.test(data.subject) || dangerousPattern.test(data.nom) || dangerousPattern.test(data.message)) {
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
                id: 'question-notification',
                variables: {
                    name: sanitize(data.name),
                    email: data.email.toLowerCase().trim(),
                    subject: sanitize(data.subject),
                    message: sanitize(data.message)
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