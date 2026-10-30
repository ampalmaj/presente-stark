import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { tokenValido } from "@/lib/token";
import { emitirConstancia, hashEmail } from "@/lib/constancias";
import { anclarHash } from "@/lib/anchor";
import { randomHex } from "@/lib/crypto";
import type { Presente } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const actividadId = String(body.actividad_id ?? "");
  const token = String(body.token ?? "");
  const nombre = String(body.nombre ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);

  if (!nombre || !email.includes("@")) return NextResponse.json({ error: "Completá nombre y mail" }, { status: 400 });

  const store = getStore();
  const actividad = await store.actividad(actividadId);
  if (!actividad) return NextResponse.json({ error: "La actividad no existe" }, { status: 404 });
  if (!tokenValido(actividad.secreto, token)) {
    return NextResponse.json({ error: "El código QR venció. Pedile a quien dicta que lo muestre de nuevo y volvé a escanear." }, { status: 410 });
  }

  const emailHash = hashEmail(email);
  const previa = await store.yaPresente(actividadId, emailHash);
  if (previa) return NextResponse.json({ code: previa.code, repetida: true });

  const presente: Presente = { id: randomHex(8), actividad_id: actividadId, nombre, email, email_hash: emailHash, creado: new Date().toISOString() };
  const constancia = emitirConstancia(actividad, nombre, emailHash);

  await store.crearPresente(presente);
  await store.crearConstancia(constancia);

  // Anclaje en Bitcoin: se espera hasta 6 s; si los calendarios no responden, queda pendiente y se declara.
  const anclaje = await anclarHash(constancia.code);
  await store.actualizarAnclaje(constancia.code, anclaje);

  return NextResponse.json({ code: constancia.code, anclaje: anclaje.estado });
}
