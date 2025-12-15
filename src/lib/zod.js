import { object, string } from "zod";

export const SignIn = object({
  userName: string().min(1, "Username wajib diisi"),
  password: string().min(3, "Password minimal 3 karakter"),
});

export const RegisterSchema = object({
  userName: string().min(3, "Username minimal 3 karakter"),
  name: string().min(3, "Nama minimal 3 karakter"),
  password: string().min(6, "Password minimal 6 karakter"),
});
