import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  const store = getStore();
  const c = await store.constancia(code);
  if (!c) return NextResponse.json({ error: "Constancia no encontrada" }, { status: 404 });
  const emisor = emisorPorId(c.emisor_id);
  const [a, tomas] = await Promise.all([store.actividad(c.actividad_id), store.tomasDe(c.actividad_id, c.doc.participante.hash)]);
  return NextResponse.json(
    { code: c.code, doc: c.doc, firma: c.firma, anclaje: c.anclaje, emisor_pubkey: emisor?.pubkey ?? null, tomas_presente: tomas, tomas_totales: a?.toma_actual ?? c.toma },
    { headers: { "Cache-Control": "no-store" } },
  );
}
