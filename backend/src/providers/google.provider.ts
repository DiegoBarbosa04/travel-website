import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

export const verifyGoogleCredential = async (credential: string) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID!,
  });

  return ticket.getPayload();
};
