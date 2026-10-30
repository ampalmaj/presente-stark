import * as ed from "@noble/ed25519";
import { sha256 } from "@noble/hashes/sha2.js";
import { sha512 } from "@noble/hashes/sha2.js";
import { hmac } from "@noble/hashes/hmac.js";
import { bytesToHex, hexToBytes, utf8ToBytes } from "@noble/hashes/utils.js";

ed.hashes.sha512 = sha512;

export { bytesToHex, hexToBytes };

export function sha256Hex(data: string | Uint8Array): string {
  const bytes = typeof data === "string" ? utf8ToBytes(data) : data;
  return bytesToHex(sha256(bytes));
}

export function hmacHex(key: string, msg: string): string {
  return bytesToHex(hmac(sha256, utf8ToBytes(key), utf8ToBytes(msg)));
}

/** JSON con claves ordenadas recursivamente: la misma estructura siempre da los mismos bytes. */
export function canonicalJson(value: unknown): string {
  return JSON.stringify(sortKeys(value));
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      out[k] = sortKeys((value as Record<string, unknown>)[k]);
    }
    return out;
  }
  return value;
}

export function pubkeyFromSeed(seedHex: string): string {
  return bytesToHex(ed.getPublicKey(hexToBytes(seedHex)));
}

export function sign(message: string, seedHex: string): string {
  return bytesToHex(ed.sign(utf8ToBytes(message), hexToBytes(seedHex)));
}

export function verify(message: string, firmaHex: string, pubkeyHex: string): boolean {
  try {
    return ed.verify(hexToBytes(firmaHex), utf8ToBytes(message), hexToBytes(pubkeyHex));
  } catch {
    return false;
  }
}

export function randomHex(bytes = 16): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return bytesToHex(arr);
}

/** Id corto legible para URLs: 8 caracteres sin ambigüedad (sin 0/O, 1/l). */
export function shortId(len = 8): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => alphabet[b % alphabet.length]).join("");
}
