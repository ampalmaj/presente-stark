import { canonicalJson, randomHex, sha256Hex, sign } from "./crypto";
import { emisorPorId, seedDeEmisor } from "./emisores";
import type { Actividad, Constancia, ConstanciaDoc } from "./types";

export function emitirConstancia(actividad: Actividad, nombre: string, emailHash: string, toma: number, modo: "qr" | "docente"): Constancia {
  const emisor = emisorPorId(actividad.emisor_id);
  const seed = seedDeEmisor(actividad.emisor_id);
  if (!emisor || !seed) throw new Error("Emisor no registrado");

  const doc: ConstanciaDoc = {
    v: 1,
    emisor: { id: emisor.id, nombre: emisor.nombre },
    actividad: { id: actividad.id, nombre: actividad.nombre, tipo: actividad.tipo },
    participante: { nombre, hash: emailHash },
    toma,
    modo,
    emitida: new Date().toISOString(),
    nonce: randomHex(8),
  };
  const canon = canonicalJson(doc);
  const code = sha256Hex(canon);
  const firma = sign(canon, seed);

  return {
    code,
    actividad_id: actividad.id,
    emisor_id: emisor.id,
    toma,
    doc,
    firma,
    anclaje: { red: "bitcoin", metodo: "opentimestamps", estado: "pendiente" },
    creada: doc.emitida,
  };
}

export function hashEmail(email: string): string {
  return sha256Hex(`presente:${email.trim().toLowerCase()}`);
}

/** Lo que viaja en el QR de la constancia para verificar sin servidor. */
export function payloadVerificable(c: Constancia, pubkey: string): string {
  const json = JSON.stringify({ doc: c.doc, firma: c.firma, pub: pubkey });
  return Buffer.from(json, "utf8").toString("base64url");
}
