import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    return new Response(JSON.stringify({ isAuthenticated: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ isAuthenticated: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}
