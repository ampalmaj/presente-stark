"use client";
import { useEffect, useState } from "react";
import { QR } from "@/components/QR";

interface Info { nombre: string; tipo: string; emisor: { nombre: string } }
interface Estado { token: string; expira_en: number; presentes: number; ultimos: { nombre: string; creado: string }[] }

export function PantallaQR({ id }: { id: string }) {
  const [info, setInfo] = useState<Info | null>(null);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [origin, setOrigin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de window tras montar
    setOrigin(window.location.origin);
    fetch(`/api/actividades/${id}`).then(async (r) => { if (!r.ok) throw new Error(); setInfo(await r.json()); }).catch(() => setError("Actividad no encontrada"));
  }, [id]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let alive = true;
    async function tick() {
      try {
        const r = await fetch(`/api/actividades/${id}/estado`, { cache: "no-store" });
        if (alive && r.ok) setEstado(await r.json());
      } catch {}
      if (alive) t = setTimeout(tick, 3000);
    }
    tick();
    return () => { alive = false; clearTimeout(t); };
  }, [id]);

  if (error) return <p className="text-bad">{error}</p>;
  if (!info || !estado) return <p className="text-muted">Cargando…</p>;

  const url = `${origin}/p/${id}?t=${estado.token}`;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div>
        <p className="text-sm uppercase tracking-wide text-muted">{info.emisor.nombre}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{info.nombre}</h1>
        <p className="mt-1 text-muted">Escaneá con la cámara de tu celular para marcar presente.</p>
      </div>

      <div className="card flex flex-col items-center gap-3 p-4">
        <QR value={url} size={320} />
        <div className="flex items-center gap-2 text-sm text-muted">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
          El código cambia en {estado.expira_en} s
        </div>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="card">
          <div className="text-5xl font-bold text-accent">{estado.presentes}</div>
          <div className="text-muted">presentes</div>
        </div>
        <div className="card text-left">
          <div className="mb-2 text-sm font-semibold text-muted">Últimos en llegar</div>
          {estado.ultimos.length === 0 ? <p className="text-sm text-muted">Todavía nadie.</p> : (
            <ul className="flex flex-col gap-1 text-sm">
              {estado.ultimos.map((u, i) => <li key={i} className="flex justify-between"><span>{u.nombre}</span><span className="text-muted">{new Date(u.creado).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</span></li>)}
            </ul>
          )}
        </div>
      </div>
      <p className="text-xs text-muted">Link de esta pantalla: {origin}/emitir/{id}</p>
    </div>
  );
}
