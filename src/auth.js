import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { SignIn } from "./lib/zod"
import { compareSync } from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session:{
      strategy:"jwt",
      maxAge:30 * 24 * 60 * 60
    },
    pages:{
      signIn: "/login"
    },
  providers: [
    Credentials({
      credentials:{
        userName:{},
        password:{}
      },
      authorize: async (credentials) =>{
          const validate = SignIn.safeParse(credentials)

          if(!validate.success){
            return null
          }

          const {userName, password} = validate.data

          const user = await prisma.user.findUnique({
            where:{userName}
          })

          if(!user || !user.password) {
            throw new Error("Nama pengguna tidak ditemukan")
          }

          const passwordMatch = compareSync(password, user.password)

          if (!passwordMatch) return null

          return user
      }
    })
  ],
})