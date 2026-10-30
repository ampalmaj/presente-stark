"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Info { nombre: string; tipo: string; emisor: { nombre: string } }
const KEY = "presente.yo.v1";

export function Participante({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const [info, setInfo] = useState<Info | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "anclando">("idle");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de localStorage tras montar
    try { const yo = JSON.parse(localStorage.getItem(KEY) ?? "null"); if (yo) { setNombre(yo.nombre); setEmail(yo.email); } } catch {}
    fetch(`/api/actividades/${id}`).then(async (r) => { if (!r.ok) throw new Error(); setInfo(await r.json()); }).catch(() => setError("Esta actividad no existe."));
  }, [id]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setEstado("enviando");
    try { localStorage.setItem(KEY, JSON.stringify({ nombre, email })); } catch {}
    const timer = setTimeout(() => setEstado("anclando"), 1200);
    const r = await fetch("/api/presentes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actividad_id: id, token, nombre, email }) });
    clearTimeout(timer);
    const d = await r.json();
    if (!r.ok) { setEstado("idle"); setError(d.error ?? "No se pudo registrar"); return; }
    router.push(`/c/${d.code}${d.repetida ? "?ya=1" : "?nueva=1"}`);
  }

  if (!token) return <Aviso titulo="Falta el código" texto="Escaneá el QR que muestra quien dicta la actividad. El link tiene que incluir el código." />;
  if (error && !info) return <Aviso titulo="No encontrada" texto={error} />;
  if (!info) return <p className="text-muted">Cargando…</p>;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-muted">{info.emisor.nombre}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{info.nombre}</h1>
        <p className="mt-2 text-muted">Confirmá quién sos y te damos la constancia. Queda en tu celular.</p>
      </div>
      <form onSubmit={enviar} className="card flex flex-col gap-4">
        <div>
          <label className="label" htmlFor="nombre">Nombre y apellido</label>
          <input id="nombre" className="input" value={nombre} onChange={(e) => setNombre(e.target.value)} required autoComplete="name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Mail</label>
          <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" inputMode="email" />
          <p className="mt-1 text-xs text-muted">Tu mail no se publica: en la constancia va solo una huella.</p>
        </div>
        {error && <p className="text-sm text-bad">{error}</p>}
        <button className="btn-primary text-lg" disabled={estado !== "idle"}>
          {estado === "idle" ? "Estoy acá" : estado === "enviando" ? "Registrando…" : "Anclando en Bitcoin…"}
        </button>
      </form>
    </div>
  );
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return <div className="card mx-auto max-w-md"><h1 className="text-xl font-bold">{titulo}</h1><p className="mt-2 text-muted">{texto}</p></div>;
}
