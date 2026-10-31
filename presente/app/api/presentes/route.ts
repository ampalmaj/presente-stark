import { NextResponse } from "next/server";
import { getStore } from "@/lib/store";
import { tokenLinkValido, tokenVivoValido } from "@/lib/token";
import { emitirConstancia, hashEmail } from "@/lib/constancias";
import { anclarHash } from "@/lib/anchor";
import { randomHex } from "@/lib/crypto";
import type { Presente } from "@/lib/types";

/**
 * Registra un presente y emite su constancia. Dos modos:
 * - "qr": la persona se marca sola. Necesita el token del link (abre la página) y el token leído
 *   en vivo con la cámara al confirmar (prueba que está frente a la pantalla ahora).
 * - "docente": quien dicta marca a alguien sin celular. Necesita la clave de organizador.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const actividadId = String(body.actividad_id ?? "");
  const nombre = String(body.nombre ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 120);
  const modo: "qr" | "docente" = body.modo === "docente" ? "docente" : "qr";

  if (!nombre || !email.includes("@")) return NextResponse.json({ error: "Completá nombre y mail" }, { status: 400 });

  const store = getStore();
  const actividad = await store.actividad(actividadId);
  if (!actividad) return NextResponse.json({ error: "La actividad no existe" }, { status: 404 });

  if (modo === "docente") {
    if (String(body.k ?? "") !== actividad.clave_admin) return NextResponse.json({ error: "Clave de organizador inválida" }, { status: 403 });
  } else {
    const token = String(body.token ?? "");
    const tokenVivo = String(body.token_vivo ?? "");
    if (!tokenLinkValido(actividad.secreto, token)) {
      return NextResponse.json({ error: "El link venció. Volvé a escanear el código que muestra quien dicta." }, { status: 410 });
    }
    if (!tokenVivoValido(actividad.secreto, tokenVivo)) {
      return NextResponse.json({ error: "No pudimos confirmar que estás frente a la pantalla. Apuntá la cámara al código que se está mostrando ahora y volvé a intentar." }, { status: 412 });
    }
  }

  const toma = actividad.toma_actual;
  const emailHash = hashEmail(email);
  const previa = await store.yaPresente(actividadId, emailHash, toma);
  if (previa) return NextResponse.json({ code: previa.code, repetida: true, toma });

  const presente: Presente = { id: randomHex(8), actividad_id: actividadId, nombre, email, email_hash: emailHash, toma, modo, creado: new Date().toISOString() };
  const constancia = emitirConstancia(actividad, nombre, emailHash, toma, modo);

  await store.crearPresente(presente);
  await store.crearConstancia(constancia);

  const anclaje = await anclarHash(constancia.code);
  await store.actualizarAnclaje(constancia.code, anclaje);

  return NextResponse.json({ code: constancia.code, anclaje: anclaje.estado, toma });
}
