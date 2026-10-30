"use client";
import { useEffect, useState } from "react";
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha2.js";
import { sha256 } from "@noble/hashes/sha2.js";
import { bytesToHex, hexToBytes, utf8ToBytes } from "@noble/hashes/utils.js";
import { canonicalJson } from "@/lib/crypto";
import type { ConstanciaDoc, Anclaje as TAnclaje } from "@/lib/types";
import { Anclaje } from "@/app/c/[code]/Tarjeta";

ed.hashes.sha512 = sha512;

interface Emisor { id: string; nombre: string; pubkey: string }
interface Resultado {
  doc: ConstanciaDoc; firma: string; pub: string;
  hashOk: boolean; firmaOk: boolean; emisorRegistrado: Emisor | null;
  origen: "qr" | "servidor"; anclaje?: TAnclaje; servidorCoincide?: boolean;
}

export function Verificador({ code }: { code: string }) {
  const [r, setR] = useState<Resultado | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const emisores: Emisor[] = await fetch("/api/emisores").then((x) => x.json()).then((d) => d.emisores).catch(() => []);
        let doc: ConstanciaDoc | null = null, firma = "", pub = "", origen: Resultado["origen"] = "servidor";
        let anclaje: TAnclaje | undefined, servidorCoincide: boolean | undefined;

        const frag = window.location.hash.slice(1);
        if (frag) {
          try {
            const json = new TextDecoder().decode(Uint8Array.from(atob(frag.replace(/-/g, "+").replace(/_/g, "/")), (ch) => ch.charCodeAt(0)));
            const p = JSON.parse(json); doc = p.doc; firma = p.firma; pub = p.pub; origen = "qr";
          } catch {}
        }
        const srv = await fetch(`/api/constancias/${code}`, { cache: "no-store" }).then((x) => (x.ok ? x.json() : null)).catch(() => null);
        if (srv) {
          anclaje = srv.anclaje;
          if (!doc) { doc = srv.doc; firma = srv.firma; pub = srv.emisor_pubkey ?? ""; }
          else servidorCoincide = canonicalJson(srv.doc) === canonicalJson(doc) && srv.firma === firma;
        }
        if (!doc) { setError("No se encontró la constancia. El código puede estar mal copiado."); return; }

        const canon = canonicalJson(doc);
        const hashOk = bytesToHex(sha256(utf8ToBytes(canon))) === code;
        let firmaOk = false;
        try { firmaOk = pub ? ed.verify(hexToBytes(firma), utf8ToBytes(canon), hexToBytes(pub)) : false; } catch { firmaOk = false; }
        const emisorRegistrado = emisores.find((e) => e.pubkey === pub && e.id === doc!.emisor.id) ?? null;
        setR({ doc, firma, pub, hashOk, firmaOk, emisorRegistrado, origen, anclaje, servidorCoincide });
      } catch (e) {
        setError((e as Error).message);
      }
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, [code]);

  if (error) return <div className="card mx-auto max-w-md"><h1 className="text-xl font-bold text-bad">No verificable</h1><p className="mt-2 text-muted">{error}</p></div>;
  if (!r) return <p className="text-muted">Verificando…</p>;

  const valida = r.hashOk && r.firmaOk && !!r.emisorRegistrado;
  const fecha = new Date(r.doc.emitida);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5">
      <div className={`card border-2 ${valida ? "border-ok" : "border-bad"}`}>
        <div className="flex items-center gap-3">
          <span className={`grid h-12 w-12 place-items-center rounded-full text-2xl text-white ${valida ? "bg-ok" : "bg-bad"}`}>{valida ? "✓" : "✕"}</span>
          <div>
            <h1 className="text-2xl font-bold">{valida ? "Constancia válida" : "Constancia no válida"}</h1>
            <p className="text-sm text-muted">{r.origen === "qr" ? "Verificada con los datos del QR, sin consultar al emisor." : "Verificada con los datos del registro."}</p>
          </div>
        </div>
        <dl className="mt-5 grid gap-3 text-sm">
          <Fila k="Participante" v={r.doc.participante.nombre} />
          <Fila k="Actividad" v={`${r.doc.actividad.nombre}`} />
          <Fila k="Emisor" v={r.doc.emisor.nombre} />
          <Fila k="Fecha y hora" v={`${fecha.toLocaleDateString("es-AR")} · ${fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}`} />
        </dl>
      </div>

      <div className="card">
        <h2 className="mb-3 font-semibold">Qué se comprobó</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <Check ok={r.hashOk} t="El contenido no fue alterado" d="El código de la constancia es el hash SHA-256 de su contenido." />
          <Check ok={r.firmaOk} t="La firma del emisor es auténtica" d="Firma Ed25519 verificada en este navegador con la clave pública del emisor." />
          <Check ok={!!r.emisorRegistrado} t={r.emisorRegistrado ? `Emisor registrado: ${r.emisorRegistrado.nombre}` : "El emisor no figura en el registro"} d="La clave pública coincide con la publicada en el registro de emisores." />
          {r.anclaje && <li className="flex gap-2"><span className="mt-0.5 text-muted">₿</span><div><div className="font-medium">Anclaje en Bitcoin: <Anclaje estado={r.anclaje.estado} /></div><div className="text-muted">Vía OpenTimestamps. La huella se incluye en un bloque de Bitcoin en las horas siguientes a la emisión.</div></div></li>}
          {r.servidorCoincide !== undefined && <Check ok={r.servidorCoincide} t={r.servidorCoincide ? "Coincide con el registro del emisor" : "No coincide con el registro del emisor"} d="Comparación opcional: el QR ya alcanza para verificar." />}
        </ul>
      </div>
      <p className="break-all font-mono text-[11px] text-muted">Código · {code}</p>
    </div>
  );
}

function Fila({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between gap-4"><dt className="text-muted">{k}</dt><dd className="text-right font-semibold">{v}</dd></div>;
}
function Check({ ok, t, d }: { ok: boolean; t: string; d: string }) {
  return <li className="flex gap-2"><span className={`mt-0.5 font-bold ${ok ? "text-ok" : "text-bad"}`}>{ok ? "✓" : "✕"}</span><div><div className="font-medium">{t}</div><div className="text-muted">{d}</div></div></li>;
}
