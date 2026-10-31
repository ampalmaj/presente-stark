import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";

/** Dato agregado y anónimo: cuántas personas asistieron a qué, sin nombres. Lo que hoy no existe en ningún portal. */
export async function GET() {
  const filas = await getStore().resumen();
  const datos = filas.map((f) => ({ ...f, emisor: emisorPorId(f.emisor_id)?.nombre ?? f.emisor_id }));
  return NextResponse.json({ generado: new Date().toISOString(), actividades: datos }, { headers: { "Cache-Control": "no-store" } });
}
