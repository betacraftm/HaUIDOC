/**
 * Session Utility Function
 *
 * A server-side utility function that retrieves and validates the current user session
 * from NextAuth.js. This function provides a consistent interface for checking
 * authentication status across server components and API routes.
 *
 * Features:
 * - Server-side session validation
 * - Consistent return format across the app
 * - Handles both authenticated and unauthenticated states
 * - Type-safe session data access
 *
 * Return Format:
 * - Authenticated: { isAuth: true, user: { id, name, email, role, ... } }
 * - Unauthenticated: { isAuth: false, user: null }
 *
 * @returns {Promise<Object>} Session object with auth status and user data
 */

import { auth } from "auth";

export const getSession = async () => {
  const session = await auth();

  if (!session?.user) {
    return { isAuth: false, user: null };
  }

  return { isAuth: true, user: session.user };
};
