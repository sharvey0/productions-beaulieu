import {Resend} from "resend";

export function createResendClient() {
    if (!process.env.NEXT_PUBLIC_RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY is not defined");
    }

    return new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
}