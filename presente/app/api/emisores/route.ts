import { NextResponse } from "next/server";
import { listarEmisores, usandoClavesDev } from "@/lib/emisores";

/** Registro público de emisores: quién puede firmar constancias y con qué clave pública. */
export async function GET() {
  return NextResponse.json({ emisores: listarEmisores(), claves_dev: usandoClavesDev });
}
