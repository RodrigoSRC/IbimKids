import { FormEvent } from "react"
import { z } from "zod"

export const agendamentoSchema = z.object({
    crianca_nome: z.string(),
    crianca_idade: z.string(),
    observacao: z.string(),
    responsavel_nome: z.string(),
    telefone: z.string()
    .max(15, "Necessário no máximo 10 digitos").min(10, "Necessário no mínimo 10 digitos")
})

export type TAgendamentoSchema = z.infer<typeof agendamentoSchema>



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