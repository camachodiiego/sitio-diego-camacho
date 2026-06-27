import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',      type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const adminEmail    = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD_HASH

        if (!adminEmail || !adminPassword) {
          console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH env vars not set')
          return null
        }

        if (credentials.email !== adminEmail) return null

        const passwordValid = await bcrypt.compare(
          credentials.password,
          adminPassword
        )

        if (!passwordValid) return null

        return {
          id:    '1',
          email: adminEmail,
          name:  'Admin',
          role:  'admin',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role
      return session
    },
  },
  pages: {
    signIn:  '/admin/login',
    error:   '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge:   60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
