"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificarPage() {
  const [code, setCode] = useState("");
  const router = useRouter();
  function ir(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim();
    const m = c.match(/\/v\/([a-f0-9]{64})(#.*)?/i);
    if (m) { router.push(`/v/${m[1]}${m[2] ?? ""}`); return; }
    if (/^[a-f0-9]{64}$/i.test(c)) router.push(`/v/${c.toLowerCase()}`);
  }
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verificar una constancia</h1>
        <p className="mt-2 text-muted">Escaneá el QR de la constancia con la cámara, o pegá acá el código o el link.</p>
      </div>
      <form onSubmit={ir} className="card flex flex-col gap-3">
        <input className="input font-mono text-sm" placeholder="Código de 64 caracteres o link /v/…" value={code} onChange={(e) => setCode(e.target.value)} />
        <button className="btn-primary">Verificar</button>
      </form>
      <p className="text-sm text-muted">La verificación se hace en tu navegador: se comprueba el hash, la firma Ed25519 del emisor contra el registro público y el estado del anclaje en Bitcoin.</p>
    </div>
  );
}
