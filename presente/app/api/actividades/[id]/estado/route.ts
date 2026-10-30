import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { tokenActual } from "@/lib/token";

/** Lo que consulta la pantalla del organizador cada pocos segundos: token vigente, cuántos presentes, últimos nombres. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const store = getStore();
  const a = await store.actividad(id);
  if (!a) return NextResponse.json({ error: "Actividad no encontrada" }, { status: 404 });
  const { token, expira_en } = tokenActual(a.secreto);
  const [presentes, ultimos] = await Promise.all([store.contarPresentes(id), store.ultimosPresentes(id, 6)]);
  return NextResponse.json({ token, expira_en, presentes, ultimos }, { headers: { "Cache-Control": "no-store" } });
}
