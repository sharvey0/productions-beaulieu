import * as React from "react";
import {useState} from "react";
import {FormInputProps} from "@/types/form/FormInputProps";
import {Eye, EyeOff} from "geist-icons";

export function FormInput({
                              title,
                              id,
                              type,
                              autoComplete,
                              value,
                              placeholder,
                              onChange,
                              error,
                              isPassword
                          }: FormInputProps) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function changePasswordVisibility() {
        setIsPasswordVisible((prev) => !prev);
    }

    return (
        <div className={isPassword ? "relative" : ""}>
            <label htmlFor={id} className="text-sm font-medium text-white">
                {title}
            </label>
            <div className="relative mt-1">
                <input
                    id={id}
                    name={id}
                    type={
                        isPassword ?
                            isPasswordVisible ? "text" : "password"
                            : type
                    }
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-white outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                    placeholder={placeholder}
                />

                {isPassword ?
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-zinc-400 hover:text-white transition-colors"
                        onClick={changePasswordVisibility}
                    >
                        {isPasswordVisible ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </div>
                    : null
                }
            </div>

            {error ? (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            ) : null}
        </div>

    )
}