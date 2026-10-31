import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";

/** Quien dicta vuelve a tomar asistencia en la misma actividad (durante o al final de la clase). */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const store = getStore();
  const a = await store.actividad(id);
  if (!a) return NextResponse.json({ error: "Actividad no encontrada" }, { status: 404 });
  if (String(body.k ?? "") !== a.clave_admin) return NextResponse.json({ error: "Clave de organizador inválida" }, { status: 403 });
  const toma = await store.nuevaToma(id);
  return NextResponse.json({ toma_actual: toma });
}
