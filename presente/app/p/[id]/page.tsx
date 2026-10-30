import { Participante } from "./Participante";

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ t?: string }> }) {
  const { id } = await params;
  const { t } = await searchParams;
  return <Participante id={id} token={t ?? ""} />;
}
