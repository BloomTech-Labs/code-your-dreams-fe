import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Auth0Provider({
      profile: function profile(profile) {
        return {
          id: profile.sub,
          name: profile.nickname,
          email: profile.email,
          image: profile.picture,
          roles: profile.userRoles
        };
      },
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
  ],
  callbacks: {
    jwt: async function jwt({ token, account, user }) {
      if(account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.id = token.sub;
      }
      if (user) {
        token.roles = user.roles;
      }

      return token;
    },
    session: async function session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.user.id = token.id;
      session.roles = token.roles;

      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions };