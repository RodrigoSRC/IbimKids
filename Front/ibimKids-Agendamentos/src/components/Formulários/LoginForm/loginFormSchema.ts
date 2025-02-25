import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .nonempty("Insira o email.")
        .email("Digite um email válido."),

    senha: z
        .string()
        .nonempty("Insira uma senha.")
})