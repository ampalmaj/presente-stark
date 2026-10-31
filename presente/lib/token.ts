import { hmacHex } from "./crypto";

/** El QR cambia cada 10 segundos. */
export const VENTANA_SEG = 10;
/** Un link escaneado sigue abriendo la página durante 10 minutos: da tiempo a cargar nombre y mail. */
const TOLERANCIA_LINK = 60;
/** La prueba de presencia en vivo tiene que ser de la ventana actual o la anterior (10 a 20 s). Una foto no la supera. */
const TOLERANCIA_VIVO = 1;

function ventana(now = Date.now()): number {
  return Math.floor(now / 1000 / VENTANA_SEG);
}

function tokenDe(secreto: string, w: number): string {
  return hmacHex(secreto, String(w)).slice(0, 10);
}

export function tokenActual(secreto: string, now = Date.now()): { token: string; expira_en: number } {
  return { token: tokenDe(secreto, ventana(now)), expira_en: VENTANA_SEG - (Math.floor(now / 1000) % VENTANA_SEG) };
}

function valido(secreto: string, token: string, tolerancia: number, now: number): boolean {
  const w = ventana(now);
  for (let i = 0; i <= tolerancia; i++) if (tokenDe(secreto, w - i) === token) return true;
  return false;
}

/** El token que vino en el link: abre la página. */
export function tokenLinkValido(secreto: string, token: string, now = Date.now()): boolean {
  return valido(secreto, token, TOLERANCIA_LINK, now);
}

/** El token leído con la cámara al confirmar: prueba que la persona está frente a la pantalla ahora. */
export function tokenVivoValido(secreto: string, token: string, now = Date.now()): boolean {
  return valido(secreto, token, TOLERANCIA_VIVO, now);
}
