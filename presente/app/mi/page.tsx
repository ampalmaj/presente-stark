"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { borrarHistorial, guardarEnHistorial, leerHistorial, type ItemHistorial } from "@/components/Historial";

const TIPO: Record<string, string> = { clase: "Clase", curso: "Curso", evento: "Evento" };

export default function MiPage() {
  const [items, setItems] = useState<ItemHistorial[] | null>(null);
  const [vista, setVista] = useState<"presente" | "miargentina">("presente");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de localStorage tras montar
    setItems(leerHistorial());
  }, []);

  function cargarEjemplo() {
    const ayer = new Date(); ayer.setDate(ayer.getDate() - 1); ayer.setHours(19, 5, 0, 0);
    guardarEnHistorial({ code: "demo-informatica-ii-clase-12", actividad: "Informática II · Clase 12", tipo: "clase", emisor: "Universidad Demo · Facultad de Ingeniería", emitida: ayer.toISOString(), demo: true });
    setItems(leerHistorial());
  }

  if (items === null) return <p className="text-muted">Cargando…</p>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis constancias</h1>
          <p className="mt-1 text-muted">Guardadas en este celular. Nadie más las ve hasta que vos las mostrás.</p>
        </div>
        {items.length > 0 && <button onClick={() => { borrarHistorial(); setItems([]); }} className="text-sm text-muted underline">Borrar</button>}
      </div>

      <div className="flex gap-1 rounded-xl bg-line/60 p-1 text-sm font-medium">
        <button onClick={() => setVista("presente")} className={`flex-1 rounded-lg px-3 py-2 ${vista === "presente" ? "bg-card shadow-sm" : "text-muted"}`}>En Presente</button>
        <button onClick={() => setVista("miargentina")} className={`flex-1 rounded-lg px-3 py-2 ${vista === "miargentina" ? "bg-card shadow-sm" : "text-muted"}`}>En Mi Argentina <span className="text-xs text-muted">(simulación)</span></button>
      </div>

      {items.length === 0 ? (
        <div className="card flex flex-col items-start gap-3">
          <p className="text-muted">Todavía no tenés constancias. Escaneá el QR de una clase o evento para recibir la primera.</p>
          <button onClick={cargarEjemplo} className="btn-ghost text-sm">Cargar un ejemplo (demo)</button>
        </div>
      ) : vista === "presente" ? (
        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <li key={it.code}>{it.demo ? <Item it={it} /> : <Link href={`/c/${it.code}`} className="block"><Item it={it} /></Link>}</li>
          ))}
        </ul>
      ) : (
        <MiArgentina items={items} />
      )}
      {items.length > 0 && items.every((i) => !i.demo) && <button onClick={cargarEjemplo} className="self-start text-xs text-muted underline">Agregar ejemplo de ayer (demo)</button>}
    </div>
  );
}

function Item({ it }: { it: ItemHistorial }) {
  const f = new Date(it.emitida);
  return (
    <div className="card flex items-center gap-4 transition hover:border-accent">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">✓</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2"><span className="pill bg-background text-muted">{TIPO[it.tipo] ?? it.tipo}</span>{it.demo && <span className="pill bg-warn/10 text-warn">ejemplo precargado</span>}</div>
        <div className="mt-1 truncate font-semibold">{it.actividad}</div>
        <div className="truncate text-sm text-muted">{it.emisor}</div>
      </div>
      <div className="shrink-0 text-right text-sm text-muted">{f.toLocaleDateString("es-AR", { day: "numeric", month: "short" })}<br />{f.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</div>
    </div>
  );
}

/** Cómo se vería la credencial de regularidad dentro de Mi Argentina. Simulación: la integración real requiere convenio con el Estado. */
function MiArgentina({ items }: { items: ItemHistorial[] }) {
  const ultimas = items.slice(0, 5);
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl bg-warn/10 px-4 py-3 text-sm text-warn"><b>Simulación.</b> Así se vería dentro de Mi Argentina, donde ya está el DNI de todas las personas inscriptas en Progresar. La integración real requiere convenio con la Secretaría de Innovación y ANSES.</div>
      <div className="overflow-hidden rounded-2xl border border-line bg-[#1e3a8a] text-white shadow-md">
        <div className="flex items-center justify-between px-5 py-3 text-sm">
          <span className="font-semibold tracking-tight">Mi Argentina</span>
          <span className="text-white/70">Credenciales</span>
        </div>
        <div className="bg-white p-5 text-foreground">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-muted">Credencial de regularidad · Progresar</div>
              <div className="mt-1 text-xl font-bold">Estudiante regular</div>
              <div className="text-sm text-muted">Período actual · {ultimas.length} {ultimas.length === 1 ? "asistencia certificada" : "asistencias certificadas"}</div>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ok text-white">✓</span>
          </div>
          <ul className="mt-4 divide-y divide-line text-sm">
            {ultimas.map((it) => (
              <li key={it.code} className="flex items-center justify-between gap-3 py-2">
                <div className="min-w-0"><div className="truncate font-medium">{it.actividad}</div><div className="truncate text-xs text-muted">{it.emisor}</div></div>
                <div className="shrink-0 text-xs text-muted">{new Date(it.emitida).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}</div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">Cada asistencia está firmada por la institución y anclada en Bitcoin. ANSES la verifica sin consultar a nadie. La persona ve exactamente lo que el Estado ve.</p>
        </div>
      </div>
    </div>
  );
}
