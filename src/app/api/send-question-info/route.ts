import {createResendClient} from "@/lib/resend/client";
import {NextRequest} from "next/server";

const resendClient = createResendClient();

export async function POST(request: NextRequest) {
    try {
        const infos = await request.json();

        if (!infos.name || !infos.email || !infos.subject || !infos.message) {
            return Response.json("Invalid request, missing parameters", { status: 500 });
        }

        const { data, error } = await resendClient.emails.send({
            from: 'Contact <contact@contact.prodbeaulieu.com>',
            to: ['samuelharvey06@gmail.com'],
            template: {
                id: 'question-notification',
                variables: {
                    name: infos.name,
                    email: infos.email,
                    subject: infos.subject,
                    message: infos.message
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