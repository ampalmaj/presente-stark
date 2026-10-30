import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Presente · constancia de participación verificable",
  description: "Asististe a una clase, un curso o un evento. Recibí la constancia en tu celular y mostrásela a quien quieras: se verifica sin pedirle nada a nadie.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-line bg-card/80 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-ink">✓</span>
              Presente
            </Link>
            <div className="flex items-center gap-0.5 text-sm whitespace-nowrap">
              <Link href="/emitir" className="rounded-lg px-2.5 py-2 hover:bg-background">Emitir</Link>
              <Link href="/mi" className="rounded-lg px-2.5 py-2 hover:bg-background"><span className="sm:hidden">Mías</span><span className="hidden sm:inline">Mis constancias</span></Link>
              <Link href="/verificar" className="rounded-lg px-2.5 py-2 hover:bg-background">Verificar</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-line py-6 text-center text-xs text-muted">
          Prototipo del equipo Stark · Hackathon EDU HU₿ · LABITCONF 2026 · Datos de <a className="underline" href="https://openarg.org" target="_blank" rel="noopener">OpenARG</a>
        </footer>
      </body>
    </html>
  );
}
