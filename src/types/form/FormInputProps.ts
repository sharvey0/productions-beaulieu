import {ChangeEventHandler} from "react";

export type FormInputProps = {
    title: string;
    id: string;
    type?: string;
    autoComplete?: string;
    value: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    error?: string;
    isPassword?: boolean;
};