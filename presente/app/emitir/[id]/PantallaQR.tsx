"use client";
import { useEffect, useState } from "react";
import { QR } from "@/components/QR";

interface Info { nombre: string; tipo: string; emisor: { nombre: string } }
interface Estado { token: string; expira_en: number; toma_actual: number; presentes: number; presentes_toma: number; ultimos: { nombre: string; creado: string; toma: number; modo: string }[] }

export function PantallaQR({ id, k }: { id: string; k: string }) {
  const [info, setInfo] = useState<Info | null>(null);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [origin, setOrigin] = useState("");
  const [error, setError] = useState("");
  const [manual, setManual] = useState(false);
  const [mNombre, setMNombre] = useState("");
  const [mEmail, setMEmail] = useState("");
  const [mMsg, setMMsg] = useState("");
  const [tomando, setTomando] = useState(false);

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
        const r = await fetch(`/api/actividades/${id}/estado?k=${encodeURIComponent(k)}`, { cache: "no-store" });
        if (alive && r.status === 403) { setError("Esta pantalla es de quien dicta: falta la clave de organizador en el link."); return; }
        if (alive && r.ok) setEstado(await r.json());
      } catch {}
      if (alive) t = setTimeout(tick, 2000);
    }
    tick();
    return () => { alive = false; clearTimeout(t); };
  }, [id, k]);

  async function nuevaToma() {
    setTomando(true);
    await fetch(`/api/actividades/${id}/toma`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ k }) });
    setTomando(false);
  }

  async function marcarManual(e: React.FormEvent) {
    e.preventDefault();
    setMMsg("");
    const r = await fetch("/api/presentes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actividad_id: id, modo: "docente", k, nombre: mNombre, email: mEmail }) });
    const d = await r.json();
    if (!r.ok) { setMMsg(d.error ?? "No se pudo marcar"); return; }
    setMMsg(d.repetida ? `${mNombre} ya estaba en esta toma.` : `${mNombre} marcado en la toma ${d.toma}. Su constancia queda emitida igual.`);
    setMNombre(""); setMEmail("");
  }

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
          El código cambia en {estado.expira_en} s · Toma {estado.toma_actual}
        </div>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="card">
          <div className="text-5xl font-bold text-accent">{estado.presentes_toma}</div>
          <div className="text-muted">presentes en la toma {estado.toma_actual}{estado.toma_actual > 1 && <span> · {estado.presentes} en total</span>}</div>
        </div>
        <div className="card text-left">
          <div className="mb-2 text-sm font-semibold text-muted">Últimos en llegar</div>
          {estado.ultimos.length === 0 ? <p className="text-sm text-muted">Todavía nadie.</p> : (
            <ul className="flex flex-col gap-1 text-sm">
              {estado.ultimos.map((u, i) => <li key={i} className="flex justify-between gap-2"><span className="truncate">{u.nombre}{u.modo === "docente" && <span className="ml-1 text-xs text-muted">(marcado por docente)</span>}</span><span className="shrink-0 text-muted">T{u.toma} · {new Date(u.creado).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</span></li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="flex w-full flex-wrap gap-3">
        <button onClick={nuevaToma} disabled={tomando} className="btn-primary flex-1">{tomando ? "…" : `Nueva toma (${estado.toma_actual + 1})`}</button>
        <button onClick={() => setManual((v) => !v)} className="btn-ghost flex-1">{manual ? "Cerrar" : "Marcar a alguien sin celular"}</button>
      </div>
      <p className="-mt-3 text-xs text-muted">Nueva toma: volvé a tomar asistencia durante o al final de la clase. Quien ya se marcó tiene que volver a escanear.</p>

      {manual && (
        <form onSubmit={marcarManual} className="card flex w-full flex-col gap-3 text-left">
          <h2 className="font-semibold">Marcar presente a quien no tiene celular</h2>
          <input className="input" placeholder="Nombre y apellido" value={mNombre} onChange={(e) => setMNombre(e.target.value)} required />
          <input className="input" type="email" placeholder="Mail de la persona" value={mEmail} onChange={(e) => setMEmail(e.target.value)} required />
          <button className="btn-primary">Marcar en la toma {estado.toma_actual}</button>
          {mMsg && <p className="text-sm text-muted">{mMsg}</p>}
          <p className="text-xs text-muted">La constancia sale igual, firmada por la institución y a nombre de la persona, indicando que la marcó quien dicta.</p>
        </form>
      )}

      <p className="text-xs text-muted">Esta pantalla es tuya: el link incluye tu clave de organizador. El QR no la incluye.</p>
    </div>
  );
}
