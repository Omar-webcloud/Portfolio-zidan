import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        
        // Hardcoded admin login as requested
        if (
          credentials.email === "zidansharma@gmail.com" && 
          credentials.password === "12345678"
        ) {
          return {
            id: "admin-id-1",
            email: "zidansharma@gmail.com",
          }
        }

        throw new Error("Invalid credentials")
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
}
