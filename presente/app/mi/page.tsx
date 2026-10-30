"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { borrarHistorial, guardarEnHistorial, leerHistorial, type ItemHistorial } from "@/components/Historial";

const TIPO: Record<string, string> = { clase: "Clase", curso: "Curso", evento: "Evento" };

export default function MiPage() {
  const [items, setItems] = useState<ItemHistorial[] | null>(null);
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

      {items.length === 0 ? (
        <div className="card flex flex-col items-start gap-3">
          <p className="text-muted">Todavía no tenés constancias. Escaneá el QR de una clase o evento para recibir la primera.</p>
          <button onClick={cargarEjemplo} className="btn-ghost text-sm">Cargar un ejemplo (demo)</button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <li key={it.code}>
              {it.demo ? <Item it={it} /> : <Link href={`/c/${it.code}`} className="block"><Item it={it} /></Link>}
            </li>
          ))}
        </ul>
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
