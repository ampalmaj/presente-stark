import { hmacHex } from "./crypto";

export const VENTANA_SEG = 30;

function ventana(now = Date.now()): number {
  return Math.floor(now / 1000 / VENTANA_SEG);
}

export function tokenActual(secreto: string, now = Date.now()): { token: string; expira_en: number } {
  const w = ventana(now);
  const token = hmacHex(secreto, String(w)).slice(0, 10);
  const expira_en = VENTANA_SEG - (Math.floor(now / 1000) % VENTANA_SEG);
  return { token, expira_en };
}

/** Acepta la ventana actual y la anterior, así nadie queda afuera por escanear justo al cambio. */
export function tokenValido(secreto: string, token: string, now = Date.now()): boolean {
  const w = ventana(now);
  return [w, w - 1].some((x) => hmacHex(secreto, String(x)).slice(0, 10) === token);
}
