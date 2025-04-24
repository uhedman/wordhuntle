import { API_BASE_URL } from "@/shared/api/real";

export async function postFoundWords(words: string[]) {
  const res = await fetch(`${API_BASE_URL}/api/word`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ words }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Fallo al enviar palabras encontradas");
  }
}
