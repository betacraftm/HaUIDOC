import { auth } from "auth";

export const getSession = async () => {
  const session = await auth();

  if (!session?.user) {
    return { isAuth: false, user: null };
  }

  return { isAuth: true, user: session.user };
};
