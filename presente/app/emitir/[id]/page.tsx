import { PantallaQR } from "./PantallaQR";

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ k?: string }> }) {
  const { id } = await params;
  const { k } = await searchParams;
  return <PantallaQR id={id} k={k ?? ""} />;
}
