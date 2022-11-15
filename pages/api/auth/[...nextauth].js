import NextAuth from "next-auth/next";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const url =
      "https://api.procore.com/oauth/token?" +
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    {
      id: "procore",
      name: "Procore",
      type: "oauth",
      authorization: {
        url: "https://login.procore.com/oauth/authorize",
        params: {
          scope: " ",
        },
      },
      token: {
        url: "https://api.procore.com/oauth/token",
        params: {
          grant_type: "authorization_code",
        },
      },
      userinfo: {
        url: "https://api.procore.com/rest/v1.0/me",
        params: {
          comany_id: 10469,
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.login,
        };
      },
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
  ],
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
    maxAge: 4 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: false,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token, user }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;

        return session;
      }
    },
  },
};

export default NextAuth(authOptions);
