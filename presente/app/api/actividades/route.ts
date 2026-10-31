import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";
import { randomHex, shortId } from "@/lib/crypto";
import type { Actividad, TipoActividad } from "@/lib/types";

const TIPOS: TipoActividad[] = ["clase", "curso", "evento"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const nombre = String(body.nombre ?? "").trim().slice(0, 120);
  const tipo = TIPOS.includes(body.tipo) ? (body.tipo as TipoActividad) : "clase";
  const emisor = emisorPorId(String(body.emisor_id ?? ""));
  if (!nombre) return NextResponse.json({ error: "Falta el nombre de la actividad" }, { status: 400 });
  if (!emisor) return NextResponse.json({ error: "Emisor no registrado" }, { status: 400 });

  const actividad: Actividad = {
    id: shortId(),
    nombre,
    tipo,
    emisor_id: emisor.id,
    secreto: randomHex(32),
    clave_admin: randomHex(12),
    toma_actual: 1,
    creada: new Date().toISOString(),
  };
  await getStore().crearActividad(actividad);
  // La clave de organizador se devuelve una sola vez: va en la URL de la pantalla del QR, nunca en el QR.
  return NextResponse.json({ id: actividad.id, clave_admin: actividad.clave_admin, nombre, tipo, emisor: { id: emisor.id, nombre: emisor.nombre } });
}
