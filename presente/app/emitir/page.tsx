"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Emisor { id: string; nombre: string }

export default function EmitirPage() {
  const router = useRouter();
  const [emisores, setEmisores] = useState<Emisor[]>([]);
  const [emisorId, setEmisorId] = useState("");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("clase");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetch("/api/emisores").then((r) => r.json()).then((d) => { setEmisores(d.emisores); if (d.emisores[0]) setEmisorId(d.emisores[0].id); });
  }, []);

  async function crear(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true); setError("");
    const r = await fetch("/api/actividades", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nombre, tipo, emisor_id: emisorId }) });
    const d = await r.json();
    setCargando(false);
    if (!r.ok) { setError(d.error ?? "No se pudo crear"); return; }
    router.push(`/emitir/${d.id}?k=${d.clave_admin}`);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Abrir una actividad</h1>
        <p className="mt-2 text-muted">Se genera un código QR para proyectar. Quien lo escanee recibe su constancia al instante.</p>
      </div>
      <form onSubmit={crear} className="card flex flex-col gap-4">
        <div>
          <label className="label" htmlFor="emisor">Emisor</label>
          <select id="emisor" className="input" value={emisorId} onChange={(e) => setEmisorId(e.target.value)}>
            {emisores.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="tipo">Tipo</label>
          <div className="grid grid-cols-3 gap-2">
            {[["clase", "Clase"], ["curso", "Curso"], ["evento", "Evento"]].map(([v, l]) => (
              <button type="button" key={v} onClick={() => setTipo(v)} className={`rounded-xl border px-3 py-2 text-sm font-medium ${tipo === v ? "border-accent bg-accent/10 text-accent" : "border-line"}`}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="label" htmlFor="nombre">Nombre de la actividad</label>
          <input id="nombre" className="input" placeholder="Informática II · Clase 12" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-bad">{error}</p>}
        <button className="btn-primary" disabled={cargando}>{cargando ? "Creando…" : "Generar código QR"}</button>
      </form>
    </div>
  );
}
