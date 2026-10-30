import { Verificador } from "./Verificador";

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <Verificador code={code} />;
}
