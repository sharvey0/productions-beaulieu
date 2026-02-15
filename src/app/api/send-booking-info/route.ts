import {createResendClient} from "@/lib/resend/client";
import {NextRequest} from "next/server";

const resendClient = createResendClient();

export async function POST(request: NextRequest) {
    try {
        const infos = await request.json();

        if (!infos.name || !infos.email || !infos.type || !infos.date || !infos.duration || !infos.description) {
            return Response.json("Invalid request, missing parameters", { status: 500 });
        }

        const { data, error } = await resendClient.emails.send({
            from: 'Contact <contact@contact.prodbeaulieu.com>',
            to: ['samuelharvey06@gmail.com'],
            template: {
                id: 'booking-confirmation',
                variables: {
                    name: infos.name,
                    email: infos.email,
                    type: infos.type,
                    date: infos.date,
                    duration: infos.duration,
                    description: infos.description
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