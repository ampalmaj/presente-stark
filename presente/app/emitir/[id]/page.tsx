import { PantallaQR } from "./PantallaQR";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PantallaQR id={id} />;
}
