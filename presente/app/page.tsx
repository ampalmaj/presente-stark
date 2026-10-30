import Link from "next/link";
import datos from "@/data/openarg.json";

const fmt = (n: number) => n.toLocaleString("es-AR");

export default function Home() {
  const e2023 = datos.educacion_superior.por_anio.find((x) => x.anio === 2023)!;
  const e2014 = datos.educacion_superior.por_anio.find((x) => x.anio === 2014)!;
  const progresar = datos.progresar.beneficiarios.at(-1)!;
  const publicas = datos.educacion_superior.anio_2023.tipo_universidad.publica.estudiantes;
  const tasaEgreso = ((e2023.egresados / e2023.estudiantes) * 100).toFixed(1).replace(".", ",");
  const crecimiento = Math.round(((e2023.estudiantes - e2014.estudiantes) / e2014.estudiantes) * 100);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-5 pt-4">
        <span className="pill w-fit bg-accent/10 text-accent">Nueva Educación · constancias de participación</span>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Estuviste. <span className="text-accent">Que conste.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Asistís a una clase, un curso o un evento, escaneás un código y recibís la constancia en tu celular.
          Es tuya, y cualquiera puede verificarla sin pedirle nada a quien la emitió.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/emitir" className="btn-primary">Dicto una clase o evento</Link>
          <Link href="/mi" className="btn-ghost">Mis constancias</Link>
          <Link href="/verificar" className="btn-ghost">Verificar una constancia</Link>
        </div>
      </section>

      <section className="card flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Por qué importa · datos de OpenARG</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat n={fmt(e2023.estudiantes)} t="estudiantes universitarios en Argentina (2023)" s={`${fmt(publicas)} en universidades públicas`} />
          <Stat n={`${tasaEgreso}%`} t="egresan cada año" s={`la matrícula creció ${crecimiento}% desde 2014, los egresos casi nada`} />
          <Stat n={fmt(progresar.valor)} t="cobran Progresar (oct 2025)" s="en nivel superior, la institución certifica regularidad 3 veces al año" />
        </div>
        <p className="text-xs text-muted">
          Fuentes vía <a className="underline" href="https://openarg.org" target="_blank" rel="noopener">OpenARG</a>: Educación superior (datos.gob.ar, 2014-2023) y Seguimiento físico-financiero de prestaciones de la seguridad social (datos.gob.ar). Totales recalculados desde el CSV oficial.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Paso n="1" t="Quien dicta abre la actividad" d="Aparece un código QR que cambia cada 30 segundos. Nadie puede mandarlo por WhatsApp a quien no está." />
        <Paso n="2" t="Quien asiste escanea" d="Con la cámara del celular, sin instalar nada. Nombre y mail una vez, y la constancia queda en su celular." />
        <Paso n="3" t="Quien necesita comprobar, verifica" d="Escanea la constancia y ve emisor, actividad y fecha, firmados y anclados en Bitcoin. Sin mails, sin llamar a nadie." />
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold">¿Por qué no alcanza con una planilla?</h2>
        <p className="mt-2 text-muted">
          Porque la planilla la tiene el profesor. Hoy una estudiante que viaja a LABITCONF se juega quedar libre porque la única prueba de que participó depende de un mail y de la buena voluntad de alguien.
          Con Presente la constancia es de la persona, la firma el emisor y su huella queda anclada en Bitcoin: se puede verificar dentro de cinco años aunque la institución ya no exista.
        </p>
      </section>
    </div>
  );
}

function Stat({ n, t, s }: { n: string; t: string; s: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-3xl font-bold tracking-tight text-accent">{n}</div>
      <div className="font-medium">{t}</div>
      <div className="text-sm text-muted">{s}</div>
    </div>
  );
}

function Paso({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="card flex flex-col gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-sm font-bold text-background">{n}</span>
      <h3 className="font-semibold">{t}</h3>
      <p className="text-sm text-muted">{d}</p>
    </div>
  );
}
