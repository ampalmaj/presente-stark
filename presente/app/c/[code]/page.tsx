import Link from "next/link";
import { notFound } from "next/navigation";
import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";
import { payloadVerificable } from "@/lib/constancias";
import { Tarjeta } from "./Tarjeta";

export default async function Page({ params, searchParams }: { params: Promise<{ code: string }>; searchParams: Promise<{ nueva?: string; ya?: string }> }) {
  const { code } = await params;
  const sp = await searchParams;
  const c = await getStore().constancia(code);
  if (!c) notFound();
  const emisor = emisorPorId(c.emisor_id);
  const payload = emisor ? payloadVerificable(c, emisor.pubkey) : "";

  return (
    <div className="mx-auto flex max-w-md flex-col gap-5">
      {sp.nueva && <div className="rounded-xl bg-ok/10 px-4 py-3 text-sm font-medium text-ok">Listo. Esta constancia es tuya y quedó guardada en este celular.</div>}
      {sp.ya && <div className="rounded-xl bg-warn/10 px-4 py-3 text-sm font-medium text-warn">Ya habías marcado presente en esta actividad. Esta es tu constancia.</div>}
      <Tarjeta c={c} payload={payload} />
      <div className="flex gap-3">
        <Link href="/mi" className="btn-ghost flex-1">Mis constancias</Link>
        <Link href={`/v/${c.code}`} className="btn-ghost flex-1">Ver cómo se verifica</Link>
      </div>
    </div>
  );
}
