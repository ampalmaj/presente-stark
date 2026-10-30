import { pubkeyFromSeed, sha256Hex } from "./crypto";
import type { Emisor } from "./types";

/**
 * Registro de emisores. En el prototipo son dos, precargados.
 * Las claves privadas viven en la variable de entorno EMISOR_KEYS como JSON { id: seedHex }.
 * Si no está definida (desarrollo local), se derivan de una semilla fija y se marcan como "dev".
 */
const BASE: Array<Omit<Emisor, "pubkey">> = [
  { id: "uni-demo", nombre: "Universidad Demo · Facultad de Ingeniería", tipo: "universidad" },
  { id: "eduhub", nombre: "EDU HU₿ · LABITCONF 2026", tipo: "organizacion" },
];

function seeds(): Record<string, string> {
  const raw = process.env.EMISOR_KEYS;
  if (raw) {
    try {
      return JSON.parse(raw) as Record<string, string>;
    } catch {
      console.warn("EMISOR_KEYS no es JSON válido; usando claves de desarrollo");
    }
  }
  const dev: Record<string, string> = {};
  for (const e of BASE) dev[e.id] = sha256Hex(`presente-dev-seed-${e.id}`);
  return dev;
}

export const usandoClavesDev = !process.env.EMISOR_KEYS;

export function listarEmisores(): Emisor[] {
  const s = seeds();
  return BASE.filter((e) => s[e.id]).map((e) => ({ ...e, pubkey: pubkeyFromSeed(s[e.id]) }));
}

export function emisorPorId(id: string): Emisor | undefined {
  return listarEmisores().find((e) => e.id === id);
}

/** Solo servidor. */
export function seedDeEmisor(id: string): string | undefined {
  return seeds()[id];
}
