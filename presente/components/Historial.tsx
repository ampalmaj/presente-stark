"use client";
/** Historial local del participante: se guarda en el navegador, no en el servidor. */
export interface ItemHistorial {
  code: string;
  actividad: string;
  tipo: string;
  emisor: string;
  emitida: string;
  demo?: boolean;
}

const KEY = "presente.historial.v1";

export function leerHistorial(): ItemHistorial[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

export function guardarEnHistorial(item: ItemHistorial) {
  try {
    const actual = leerHistorial().filter((x) => x.code !== item.code);
    localStorage.setItem(KEY, JSON.stringify([item, ...actual]));
  } catch {}
}

export function borrarHistorial() {
  try { localStorage.removeItem(KEY); } catch {}
}
