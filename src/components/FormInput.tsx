import * as React from "react";
import {FormInputProps} from "@/types/FormInputProps";
import {useState} from "react";
import {Eye, EyeOff} from "geist-icons";

export function FormInput({ title, id, type, autoComplete, value, placeholder, onChange, error, isPassword }: FormInputProps) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function changePasswordVisibility() {
        setIsPasswordVisible((prev) => !prev);
    }

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-slate-900">
                {title}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                placeholder={placeholder}
            />

            { isPassword ?
                isPasswordVisible ?
                    <EyeOff className="relative -top-7.5 left-90 cursor-pointer text-slate-900" onClick={changePasswordVisibility} /> :
                    <Eye className="relative -top-7.5  left-90 cursor-pointer text-slate-900" onClick={changePasswordVisibility} />
                : null
            }

            {error ? (
                <p className={"text-sm text-red-600 " + (isPassword ? "-mt-4" : "mt-1")}>{error}</p>
            ) : null}
        </div>

    )
}