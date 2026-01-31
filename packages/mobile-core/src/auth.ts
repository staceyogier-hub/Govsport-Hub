export type AuthSession = {
  accessToken: string;
  expiresAt: number;
};

export async function signIn(): Promise<AuthSession> {
  return {
    accessToken: "stub-token",
    expiresAt: Date.now() + 60 * 60 * 1000
  };
}

export async function signOut(): Promise<void> {
  return Promise.resolve();
}
