import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";

export async function GET(_req: Request, ctx: { params: Promise<{ code: string }> }) {
  const { code } = await ctx.params;
  const c = await getStore().constancia(code);
  if (!c) return NextResponse.json({ error: "Constancia no encontrada" }, { status: 404 });
  const emisor = emisorPorId(c.emisor_id);
  return NextResponse.json({ code: c.code, doc: c.doc, firma: c.firma, anclaje: c.anclaje, emisor_pubkey: emisor?.pubkey ?? null }, { headers: { "Cache-Control": "no-store" } });
}
