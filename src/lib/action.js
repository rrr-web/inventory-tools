"use server";

import { signIn } from "@/auth";
import { SignIn } from "./zod"
import { AuthError } from "next-auth";



export const SignInCredentials = async (_prevState, formData) => {
    const validatedFields = SignIn.safeParse(
       Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { userName, password } = validatedFields.data
    try {
        await signIn("credentials", {
            userName,
            password,
            redirectTo: "/auth/dashboard",
        });
    } catch (error) {
       if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return {message: "Username atau Password salah",};           
                default:
                    return {message: "Silahkan coba lagi"};
            }
       }
       throw error;
    }
};