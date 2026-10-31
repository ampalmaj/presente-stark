import { getStore } from "@/lib/store";
import { emisorPorId } from "@/lib/emisores";

export const dynamic = "force-dynamic";

const TIPO: Record<string, string> = { clase: "Clase", curso: "Curso", evento: "Evento" };

/** Dato agregado y anónimo de asistencia: lo que hoy no existe en ningún portal público. */
export default async function DatosPage() {
  const filas = await getStore().resumen();
  const total = filas.reduce((s, f) => s + f.presentes, 0);
  const marcas = filas.reduce((s, f) => s + f.marcas, 0);
  const porTipo = filas.reduce<Record<string, number>>((acc, f) => { acc[f.tipo] = (acc[f.tipo] ?? 0) + f.presentes; return acc; }, {});
  const csv = ["actividad_id,actividad,tipo,emisor,tomas,personas_presentes,marcas_totales,creada", ...filas.map((f) => [f.id, q(f.nombre), f.tipo, q(emisorPorId(f.emisor_id)?.nombre ?? f.emisor_id), f.toma_actual, f.presentes, f.marcas, f.creada].join(","))].join("\n");
  const href = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="pill bg-accent/10 text-accent">Dato abierto · agregado y anónimo</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Cuántos están</h1>
        <p className="mt-2 text-muted">Argentina sabe cuántos estudiantes se inscriben y cuántos egresan. Entre esos dos números no hay ningún dato público de asistencia. Este panel es ese dato: sin nombres, sin mails, solo cuántas personas asistieron a qué.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat n={total} t="personas presentes" s="en todas las actividades" />
        <Stat n={marcas} t="marcas de asistencia" s="sumando tomas" />
        <Stat n={filas.length} t="actividades" s={Object.entries(porTipo).map(([k, v]) => `${v} en ${TIPO[k]?.toLowerCase() ?? k}s`).join(" · ") || "todavía ninguna"} />
      </div>

      <div className="card overflow-x-auto">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-semibold">Por actividad</h2>
          <a href={href} download="presente-asistencia-agregada.csv" className="btn-ghost px-3 py-2 text-sm">Exportar como dato abierto (CSV)</a>
        </div>
        {filas.length === 0 ? <p className="text-sm text-muted">Todavía no hay actividades. Creá una en Emitir.</p> : (
          <table className="w-full text-sm">
            <thead className="text-left text-muted"><tr><th className="py-2 pr-3 font-medium">Actividad</th><th className="py-2 pr-3 font-medium">Tipo</th><th className="py-2 pr-3 font-medium">Emisor</th><th className="py-2 pr-3 text-right font-medium">Tomas</th><th className="py-2 text-right font-medium">Presentes</th></tr></thead>
            <tbody className="divide-y divide-line">
              {filas.map((f) => (
                <tr key={f.id}><td className="py-2 pr-3 font-medium">{f.nombre}</td><td className="py-2 pr-3">{TIPO[f.tipo] ?? f.tipo}</td><td className="py-2 pr-3 text-muted">{emisorPorId(f.emisor_id)?.nombre ?? f.emisor_id}</td><td className="py-2 pr-3 text-right">{f.toma_actual}</td><td className="py-2 text-right font-semibold">{f.presentes}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card">
        <h2 className="font-semibold">Qué vería ANSES con esto</h2>
        <p className="mt-2 text-sm text-muted">Hoy la condición de Progresar se verifica tres veces al año con una carga manual. Con asistencias firmadas por cada institución, este mismo panel, por jurisdicción y por programa, muestra cada mes quién sigue yendo y dónde se cae la gente, sin exponer a ninguna persona: la verificación nominal la hace ANSES con la constancia firmada; lo público es solo el agregado.</p>
      </div>
    </div>
  );
}

function q(s: string) { return `"${s.replace(/"/g, '""')}"`; }

function Stat({ n, t, s }: { n: number; t: string; s: string }) {
  return (
    <div className="card">
      <div className="text-4xl font-bold tracking-tight text-accent">{n.toLocaleString("es-AR")}</div>
      <div className="font-medium">{t}</div>
      <div className="text-sm text-muted">{s}</div>
    </div>
  );
}
