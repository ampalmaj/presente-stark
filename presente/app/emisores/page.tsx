import { listarEmisores, usandoClavesDev } from "@/lib/emisores";

export default function EmisoresPage() {
  const emisores = listarEmisores();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Registro de emisores</h1>
        <p className="mt-2 text-muted">Quién puede firmar constancias y con qué clave pública. Cualquier verificador compara contra esta lista.</p>
      </div>
      {usandoClavesDev && <p className="rounded-xl bg-warn/10 px-4 py-3 text-sm text-warn">Claves de desarrollo: se derivan de una semilla fija. En producción se definen en la variable EMISOR_KEYS.</p>}
      <ul className="flex flex-col gap-3">
        {emisores.map((e) => (
          <li key={e.id} className="card">
            <div className="flex items-center gap-2"><span className="pill bg-background text-muted">{e.tipo}</span><span className="font-mono text-xs text-muted">{e.id}</span></div>
            <div className="mt-1 font-semibold">{e.nombre}</div>
            <div className="mt-2 break-all font-mono text-xs text-muted">Ed25519 · {e.pubkey}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
