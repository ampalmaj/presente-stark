"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Escaner } from "@/components/Escaner";

interface Info { nombre: string; tipo: string; emisor: { nombre: string } }
const KEY = "presente.yo.v1";

export function Participante({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const [info, setInfo] = useState<Info | null>(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [paso, setPaso] = useState<"datos" | "camara" | "enviando" | "anclando">("datos");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura de localStorage tras montar
    try { const yo = JSON.parse(localStorage.getItem(KEY) ?? "null"); if (yo) { setNombre(yo.nombre); setEmail(yo.email); } } catch {}
    fetch(`/api/actividades/${id}`).then(async (r) => { if (!r.ok) throw new Error(); setInfo(await r.json()); }).catch(() => setError("Esta actividad no existe."));
  }, [id]);

  function continuar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try { localStorage.setItem(KEY, JSON.stringify({ nombre, email })); } catch {}
    setPaso("camara");
  }

  const enviar = useCallback(async (tokenVivo: string) => {
    setPaso("enviando");
    const timer = setTimeout(() => setPaso("anclando"), 1200);
    const r = await fetch("/api/presentes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actividad_id: id, token, token_vivo: tokenVivo, nombre, email }) });
    clearTimeout(timer);
    const d = await r.json();
    if (!r.ok) { setPaso("datos"); setError(d.error ?? "No se pudo registrar"); return; }
    router.push(`/c/${d.code}${d.repetida ? "?ya=1" : "?nueva=1"}`);
  }, [id, token, nombre, email, router]);

  const errorCamara = useCallback((msg: string) => { setPaso("datos"); setError(msg); }, []);

  if (!token) return <Aviso titulo="Falta el código" texto="Escaneá el QR que muestra quien dicta la actividad. El link tiene que incluir el código." />;
  if (error && !info) return <Aviso titulo="No encontrada" texto={error} />;
  if (!info) return <p className="text-muted">Cargando…</p>;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <p className="text-sm uppercase tracking-wide text-muted">{info.emisor.nombre}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{info.nombre}</h1>
        <p className="mt-2 text-muted">{paso === "camara" ? "Último paso: apuntá la cámara al código de la pantalla." : "Confirmá quién sos y te damos la constancia. Queda en tu celular."}</p>
      </div>

      {paso === "datos" && (
        <form onSubmit={continuar} className="card flex flex-col gap-4">
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
          <button className="btn-primary text-lg">Estoy acá</button>
          <p className="text-center text-xs text-muted">Después te pedimos que apuntes la cámara a la pantalla: así confirmamos que estás ahí y no con una foto.</p>
        </form>
      )}

      {paso === "camara" && (
        <div className="card flex flex-col gap-3">
          <Escaner actividadId={id} onToken={enviar} onError={errorCamara} />
          <p className="text-center text-sm text-muted">El código de la pantalla cambia cada 10 segundos. Apenas lo leamos, listo.</p>
          <button onClick={() => setPaso("datos")} className="btn-ghost text-sm">Volver</button>
        </div>
      )}

      {(paso === "enviando" || paso === "anclando") && (
        <div className="card flex flex-col items-center gap-3 py-10 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-accent" />
          <p className="font-semibold">{paso === "enviando" ? "Registrando tu presencia…" : "Anclando en Bitcoin…"}</p>
        </div>
      )}
    </div>
  );
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return <div className="card mx-auto max-w-md"><h1 className="text-xl font-bold">{titulo}</h1><p className="mt-2 text-muted">{texto}</p></div>;
}
