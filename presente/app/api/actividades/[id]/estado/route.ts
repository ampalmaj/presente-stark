import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { tokenActual } from "@/lib/token";

/** Pantalla de quien dicta: token vigente, toma actual, cuántos presentes, últimos nombres. Requiere la clave de organizador. */
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const k = new URL(req.url).searchParams.get("k") ?? "";
  const store = getStore();
  const a = await store.actividad(id);
  if (!a) return NextResponse.json({ error: "Actividad no encontrada" }, { status: 404 });
  if (k !== a.clave_admin) return NextResponse.json({ error: "Esta pantalla es de quien dicta la actividad" }, { status: 403 });
  const { token, expira_en } = tokenActual(a.secreto);
  const [presentes, presentes_toma, ultimos] = await Promise.all([
    store.contarPresentes(id),
    store.contarPresentes(id, a.toma_actual),
    store.ultimosPresentes(id, 6),
  ]);
  return NextResponse.json({ token, expira_en, toma_actual: a.toma_actual, presentes, presentes_toma, ultimos }, { headers: { "Cache-Control": "no-store" } });
}
