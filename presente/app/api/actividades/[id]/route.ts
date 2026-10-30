import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const a = await getStore().actividad(id);
  if (!a) return NextResponse.json({ error: "Actividad no encontrada" }, { status: 404 });
  const emisor = emisorPorId(a.emisor_id);
  return NextResponse.json({ id: a.id, nombre: a.nombre, tipo: a.tipo, creada: a.creada, emisor: emisor && { id: emisor.id, nombre: emisor.nombre } });
}
