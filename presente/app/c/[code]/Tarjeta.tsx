"use client";
import { useEffect, useState } from "react";
import { QR } from "@/components/QR";
import { guardarEnHistorial } from "@/components/Historial";
import type { Constancia } from "@/lib/types";

const TIPO: Record<string, string> = { clase: "Clase", curso: "Curso", evento: "Evento" };

export function Tarjeta({ c, payload, tomasPresente, tomasTotales }: { c: Constancia; payload: string; tomasPresente?: number[]; tomasTotales?: number }) {
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de window tras montar
    setOrigin(window.location.origin);
    guardarEnHistorial({ code: c.code, actividad: c.doc.actividad.nombre, tipo: c.doc.actividad.tipo, emisor: c.doc.emisor.nombre, emitida: c.doc.emitida });
  }, [c]);

  const urlVerif = `${origin}/v/${c.code}#${payload}`;
  const fecha = new Date(c.doc.emitida);

  return (
    <article className="card relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-1"><span className="pill bg-accent/10 text-accent">{TIPO[c.doc.actividad.tipo] ?? c.doc.actividad.tipo}</span><span className="pill bg-background text-muted">Toma {c.doc.toma}</span>{c.doc.modo === "docente" && <span className="pill bg-background text-muted">Marcado por quien dicta</span>}</div>
          <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight">{c.doc.actividad.nombre}</h1>
          <p className="text-muted">{c.doc.emisor.nombre}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-lg text-accent-ink">✓</span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div><dt className="text-muted">Participante</dt><dd className="font-semibold">{c.doc.participante.nombre}</dd></div>
        <div><dt className="text-muted">Fecha</dt><dd className="font-semibold">{fecha.toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })} · {fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</dd></div>
        <div><dt className="text-muted">Firma del emisor</dt><dd className="font-semibold text-ok">Ed25519 ✓</dd></div>
        <div><dt className="text-muted">Anclaje en Bitcoin</dt><dd className="font-semibold"><Anclaje estado={c.anclaje.estado} /></dd></div>
      </dl>
      {tomasTotales && tomasTotales > 1 && (
        <p className="mt-3 rounded-lg bg-background px-3 py-2 text-sm">Presente en <b>{tomasPresente?.length ?? 1} de {tomasTotales}</b> tomas de esta actividad{tomasPresente && tomasPresente.length > 0 && <span className="text-muted"> (tomas {tomasPresente.join(", ")})</span>}. <span className="text-muted">Según el registro del emisor; cada toma tiene su propia constancia firmada.</span></p>
      )}

      <div className="mt-5 flex flex-col items-center gap-2 rounded-xl bg-background p-4">
        {origin && <QR value={urlVerif} size={200} />}
        <p className="text-center text-xs text-muted">Quien escanee este código verifica la constancia sin pedirle nada a {c.doc.emisor.nombre.split(" · ")[0]}.</p>
      </div>

      <p className="mt-4 break-all font-mono text-[11px] text-muted">Código · {c.code}</p>
    </article>
  );
}

export function Anclaje({ estado }: { estado: string }) {
  if (estado === "enviado") return <span className="text-ok">Enviada a Bitcoin · confirma en horas</span>;
  if (estado === "confirmado") return <span className="text-ok">Confirmada en Bitcoin</span>;
  if (estado === "pendiente") return <span className="text-warn">Pendiente de envío</span>;
  return <span className="text-bad">Error</span>;
}
