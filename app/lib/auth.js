import { cookies } from "next/headers";
import { decrypt } from "./session";
import { getUserById } from "./data";

export const getUserAuth = async () => {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session || !session.value) {
      return { isAuth: false, user: null };
    }
    const token = session.value;
    const payload = await decrypt(token);
    const user = await getUserById(payload.userId);
    if (!user) {
      return { isAuth: false, user: null };
    }

    return { isAuth: true, user };
  } catch (error) {
    console.error("Failed to fetch authentication status:", error);
    return { isAuth: false, user: null };
  }
};
