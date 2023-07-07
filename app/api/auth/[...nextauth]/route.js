import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
  ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions };