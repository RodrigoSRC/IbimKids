import { z } from "zod"
import { FormEvent } from "react"

export const userSchema = z.object({
    nome: z.string(),
    email: z.string(),
    telefone: z.string()
    .max(15, "Necessário no máximo 11 digitos").min(10, "Necessário no mínimo 10 digitos"),
    senha: z.string()
})

export type TUserSchema = z.infer<typeof userSchema>


export const handlePhone = (e: FormEvent<HTMLInputElement>) => {
    e.currentTarget.maxLength = 15
    let value = e.currentTarget.value

    value = value.replace(/\D/g, '').replace(/(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/, (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
        if (country)
            return `${country} (${
                ddd || dddWithZero
            }) ${prefixTel}-${suffixTel}`;
        if (ddd || dddWithZero)
            return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
        if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
        return value;
    })

    e.currentTarget.value = value
}