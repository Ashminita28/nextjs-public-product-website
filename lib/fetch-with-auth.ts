import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
 
export async function fetchWithAuth<T>(path: string): Promise<T> {
  const session = await getServerSession(authOptions);

  if (!session?.jwt) {
    throw new Error("Unauthorized");
  }

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.jwt}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
}
 