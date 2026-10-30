import { createRequire } from "node:module";
import type { Anclaje } from "./types";

const CALENDARIOS = [
  "https://alice.btc.calendar.opentimestamps.org",
  "https://bob.btc.calendar.opentimestamps.org",
  "https://finney.calendar.eternitywall.com",
];

/**
 * Ancla un hash sha256 (hex) en Bitcoin vía OpenTimestamps.
 * Gratis, sin cuenta, sin billetera. Los calendarios agregan el hash a un árbol
 * que se incluye en un bloque de Bitcoin en las horas siguientes; la prueba .ots
 * se puede mejorar después para obtener la confirmación definitiva.
 */
export async function anclarHash(hashHex: string, timeoutMs = 6000): Promise<Anclaje> {
  const enviado_at = new Date().toISOString();
  try {
    const require = createRequire(import.meta.url);
    const OpenTimestamps = require("opentimestamps");
    const hash = Buffer.from(hashHex, "hex");
    const detached = OpenTimestamps.DetachedTimestampFile.fromHash(new OpenTimestamps.Ops.OpSHA256(), hash);
    await Promise.race([
      OpenTimestamps.stamp(detached),
      new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), timeoutMs)),
    ]);
    const ots: Uint8Array = detached.serializeToBytes();
    return {
      red: "bitcoin",
      metodo: "opentimestamps",
      estado: "enviado",
      enviado_at,
      ots_b64: Buffer.from(ots).toString("base64"),
      calendarios: CALENDARIOS,
    };
  } catch (e) {
    return {
      red: "bitcoin",
      metodo: "opentimestamps",
      estado: "pendiente",
      enviado_at,
      detalle: `No se pudo contactar a los calendarios (${(e as Error).message}). Se reintenta después.`,
    };
  }
}
