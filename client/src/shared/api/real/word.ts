import { API_BASE_URL } from "@/shared/api/real";

export async function postFoundWords(words: string[], accessToken: string) {
  const res = await fetch(`${API_BASE_URL}/word`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ words }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Fallo al enviar palabras encontradas");
  }
}
