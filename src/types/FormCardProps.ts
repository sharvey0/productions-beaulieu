import {ReactNode} from "react";

export type FormCardProps = {
    children: ReactNode,
    isLoading: boolean,
    isSuccess?: boolean,
    successMessage?: string,
    errors: Record<string, string>,
    title: string,
    subtitle: string
};