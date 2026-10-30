import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Actividad, Constancia, Presente } from "./types";

export interface Store {
  crearActividad(a: Actividad): Promise<void>;
  actividad(id: string): Promise<Actividad | null>;
  contarPresentes(actividadId: string): Promise<number>;
  ultimosPresentes(actividadId: string, n: number): Promise<Pick<Presente, "nombre" | "creado">[]>;
  yaPresente(actividadId: string, emailHash: string): Promise<Constancia | null>;
  crearPresente(p: Presente): Promise<void>;
  crearConstancia(c: Constancia): Promise<void>;
  constancia(code: string): Promise<Constancia | null>;
  actualizarAnclaje(code: string, anclaje: Constancia["anclaje"]): Promise<void>;
}

/* ---------- Memoria: para desarrollo local. En Vercel no persiste entre invocaciones. ---------- */

class MemoryStore implements Store {
  private actividades = new Map<string, Actividad>();
  private presentes: Presente[] = [];
  private constancias = new Map<string, Constancia>();

  async crearActividad(a: Actividad) { this.actividades.set(a.id, a); }
  async actividad(id: string) { return this.actividades.get(id) ?? null; }
  async contarPresentes(id: string) { return this.presentes.filter((p) => p.actividad_id === id).length; }
  async ultimosPresentes(id: string, n: number) {
    return this.presentes.filter((p) => p.actividad_id === id).slice(-n).reverse().map(({ nombre, creado }) => ({ nombre, creado }));
  }
  async yaPresente(id: string, emailHash: string) {
    for (const c of this.constancias.values()) {
      if (c.actividad_id === id && c.doc.participante.hash === emailHash) return c;
    }
    return null;
  }
  async crearPresente(p: Presente) { this.presentes.push(p); }
  async crearConstancia(c: Constancia) { this.constancias.set(c.code, c); }
  async constancia(code: string) { return this.constancias.get(code) ?? null; }
  async actualizarAnclaje(code: string, anclaje: Constancia["anclaje"]) {
    const c = this.constancias.get(code);
    if (c) c.anclaje = anclaje;
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
  async contarPresentes(id: string) {
    const { count } = await this.sb.from("presentes").select("id", { count: "exact", head: true }).eq("actividad_id", id);
    return count ?? 0;
  }
  async ultimosPresentes(id: string, n: number) {
    const { data } = await this.sb.from("presentes").select("nombre, creado").eq("actividad_id", id).order("creado", { ascending: false }).limit(n);
    return (data ?? []) as Pick<Presente, "nombre" | "creado">[];
  }
  async yaPresente(id: string, emailHash: string) {
    const { data } = await this.sb.from("constancias").select("*").eq("actividad_id", id).eq("participante_hash", emailHash).maybeSingle();
    return data ? rowToConstancia(data) : null;
  }
  async crearPresente(p: Presente) {
    const { error } = await this.sb.from("presentes").insert(p);
    if (error) throw error;
  }
  async crearConstancia(c: Constancia) {
    const { error } = await this.sb.from("constancias").insert({
      code: c.code,
      actividad_id: c.actividad_id,
      emisor_id: c.emisor_id,
      participante_hash: c.doc.participante.hash,
      doc: c.doc,
      firma: c.firma,
      anclaje: c.anclaje,
      creada: c.creada,
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToConstancia(r: any): Constancia {
  return { code: r.code, actividad_id: r.actividad_id, emisor_id: r.emisor_id, doc: r.doc, firma: r.firma, anclaje: r.anclaje, creada: r.creada };
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
