import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Actividad, Constancia, Presente } from "./types";

export interface ResumenActividad {
  id: string;
  nombre: string;
  tipo: string;
  emisor_id: string;
  toma_actual: number;
  creada: string;
  presentes: number; // personas distintas
  marcas: number; // total de marcas (sumando tomas)
}

export interface Store {
  crearActividad(a: Actividad): Promise<void>;
  actividad(id: string): Promise<Actividad | null>;
  nuevaToma(id: string): Promise<number>;
  contarPresentes(actividadId: string, toma?: number): Promise<number>;
  ultimosPresentes(actividadId: string, n: number): Promise<Pick<Presente, "nombre" | "creado" | "toma" | "modo">[]>;
  yaPresente(actividadId: string, emailHash: string, toma: number): Promise<Constancia | null>;
  tomasDe(actividadId: string, emailHash: string): Promise<number[]>;
  crearPresente(p: Presente): Promise<void>;
  crearConstancia(c: Constancia): Promise<void>;
  constancia(code: string): Promise<Constancia | null>;
  actualizarAnclaje(code: string, anclaje: Constancia["anclaje"]): Promise<void>;
  resumen(): Promise<ResumenActividad[]>;
}

/* ---------- Memoria: para desarrollo local. En Vercel no persiste entre invocaciones. ---------- */

class MemoryStore implements Store {
  private actividades = new Map<string, Actividad>();
  private presentes: Presente[] = [];
  private constancias = new Map<string, Constancia>();

  async crearActividad(a: Actividad) { this.actividades.set(a.id, a); }
  async actividad(id: string) { return this.actividades.get(id) ?? null; }
  async nuevaToma(id: string) {
    const a = this.actividades.get(id);
    if (!a) throw new Error("Actividad no encontrada");
    a.toma_actual += 1;
    return a.toma_actual;
  }
  async contarPresentes(id: string, toma?: number) {
    const ps = this.presentes.filter((p) => p.actividad_id === id && (toma === undefined || p.toma === toma));
    return new Set(ps.map((p) => p.email_hash)).size;
  }
  async ultimosPresentes(id: string, n: number) {
    return this.presentes.filter((p) => p.actividad_id === id).slice(-n).reverse().map(({ nombre, creado, toma, modo }) => ({ nombre, creado, toma, modo }));
  }
  async yaPresente(id: string, emailHash: string, toma: number) {
    for (const c of this.constancias.values()) {
      if (c.actividad_id === id && c.doc.participante.hash === emailHash && c.toma === toma) return c;
    }
    return null;
  }
  async tomasDe(id: string, emailHash: string) {
    return [...new Set(this.presentes.filter((p) => p.actividad_id === id && p.email_hash === emailHash).map((p) => p.toma))].sort();
  }
  async crearPresente(p: Presente) { this.presentes.push(p); }
  async crearConstancia(c: Constancia) { this.constancias.set(c.code, c); }
  async constancia(code: string) { return this.constancias.get(code) ?? null; }
  async actualizarAnclaje(code: string, anclaje: Constancia["anclaje"]) {
    const c = this.constancias.get(code);
    if (c) c.anclaje = anclaje;
  }
  async resumen() {
    return [...this.actividades.values()].map((a) => {
      const ps = this.presentes.filter((p) => p.actividad_id === a.id);
      return { id: a.id, nombre: a.nombre, tipo: a.tipo, emisor_id: a.emisor_id, toma_actual: a.toma_actual, creada: a.creada, presentes: new Set(ps.map((p) => p.email_hash)).size, marcas: ps.length };
    }).sort((x, y) => (x.creada < y.creada ? 1 : -1));
  }
}

/* ---------- Supabase: producción. Usa la service role key, solo en el servidor. ---------- */

class SupabaseStore implements Store {
  constructor(private sb: SupabaseClient) {}

  async crearActividad(a: Actividad) {
    const { error } = await this.sb.from("actividades").insert(a);
    if (error) throw error;
  }
  async actividad(id: string) {
    const { data } = await this.sb.from("actividades").select("*").eq("id", id).maybeSingle();
    return (data as Actividad) ?? null;
  }
  async nuevaToma(id: string) {
    const a = await this.actividad(id);
    if (!a) throw new Error("Actividad no encontrada");
    const nueva = a.toma_actual + 1;
    const { error } = await this.sb.from("actividades").update({ toma_actual: nueva }).eq("id", id);
    if (error) throw error;
    return nueva;
  }
  async contarPresentes(id: string, toma?: number) {
    let q = this.sb.from("presentes").select("email_hash").eq("actividad_id", id);
    if (toma !== undefined) q = q.eq("toma", toma);
    const { data } = await q;
    return new Set((data ?? []).map((r: { email_hash: string }) => r.email_hash)).size;
  }
  async ultimosPresentes(id: string, n: number) {
    const { data } = await this.sb.from("presentes").select("nombre, creado, toma, modo").eq("actividad_id", id).order("creado", { ascending: false }).limit(n);
    return (data ?? []) as Pick<Presente, "nombre" | "creado" | "toma" | "modo">[];
  }
  async yaPresente(id: string, emailHash: string, toma: number) {
    const { data } = await this.sb.from("constancias").select("*").eq("actividad_id", id).eq("participante_hash", emailHash).eq("toma", toma).maybeSingle();
    return data ? rowToConstancia(data) : null;
  }
  async tomasDe(id: string, emailHash: string) {
    const { data } = await this.sb.from("presentes").select("toma").eq("actividad_id", id).eq("email_hash", emailHash);
    return [...new Set((data ?? []).map((r: { toma: number }) => r.toma))].sort();
  }
  async crearPresente(p: Presente) {
    const { error } = await this.sb.from("presentes").insert(p);
    if (error) throw error;
  }
  async crearConstancia(c: Constancia) {
    const { error } = await this.sb.from("constancias").insert({
      code: c.code, actividad_id: c.actividad_id, emisor_id: c.emisor_id, toma: c.toma,
      participante_hash: c.doc.participante.hash, doc: c.doc, firma: c.firma, anclaje: c.anclaje, creada: c.creada,
    });
    if (error) throw error;
  }
  async constancia(code: string) {
    const { data } = await this.sb.from("constancias").select("*").eq("code", code).maybeSingle();
    return data ? rowToConstancia(data) : null;
  }
  async actualizarAnclaje(code: string, anclaje: Constancia["anclaje"]) {
    await this.sb.from("constancias").update({ anclaje }).eq("code", code);
  }
  async resumen() {
    const [{ data: acts }, { data: pres }] = await Promise.all([
      this.sb.from("actividades").select("id, nombre, tipo, emisor_id, toma_actual, creada").order("creada", { ascending: false }).limit(200),
      this.sb.from("presentes").select("actividad_id, email_hash"),
    ]);
    const porAct = new Map<string, { set: Set<string>; n: number }>();
    for (const p of (pres ?? []) as { actividad_id: string; email_hash: string }[]) {
      const e = porAct.get(p.actividad_id) ?? { set: new Set<string>(), n: 0 };
      e.set.add(p.email_hash); e.n++; porAct.set(p.actividad_id, e);
    }
    return ((acts ?? []) as Omit<ResumenActividad, "presentes" | "marcas">[]).map((a) => ({ ...a, presentes: porAct.get(a.id)?.set.size ?? 0, marcas: porAct.get(a.id)?.n ?? 0 }));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToConstancia(r: any): Constancia {
  return { code: r.code, actividad_id: r.actividad_id, emisor_id: r.emisor_id, toma: r.toma ?? 1, doc: r.doc, firma: r.firma, anclaje: r.anclaje, creada: r.creada };
}

/* ---------- Selección ---------- */

declare global {
  var __presenteStore: Store | undefined;
}

export function getStore(): Store {
  if (globalThis.__presenteStore) return globalThis.__presenteStore;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const store: Store = url && key
    ? new SupabaseStore(createClient(url, key, { auth: { persistSession: false } }))
    : new MemoryStore();
  globalThis.__presenteStore = store;
  return store;
}

export const usandoMemoria = !(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
