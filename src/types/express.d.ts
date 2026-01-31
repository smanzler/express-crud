declare global {
  namespace Express {
    interface Request {
      /** Set by requireAuth middleware. */
      user?: { sub: string };
      /** Set by requireRefreshToken middleware (from cookie). */
      refreshToken?: string;
    }
  }
}

export {};
