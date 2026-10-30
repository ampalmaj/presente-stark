export type TipoActividad = "clase" | "curso" | "evento";

export interface Emisor {
  id: string;
  nombre: string;
  tipo: "universidad" | "organizacion";
  pubkey: string; // hex
}

export interface Actividad {
  id: string;
  nombre: string;
  tipo: TipoActividad;
  emisor_id: string;
  secreto: string; // nunca sale del servidor
  creada: string; // ISO
}

export interface Presente {
  id: string;
  actividad_id: string;
  nombre: string;
  email: string;
  email_hash: string;
  creado: string;
}

export interface ConstanciaDoc {
  v: 1;
  emisor: { id: string; nombre: string };
  actividad: { id: string; nombre: string; tipo: TipoActividad };
  participante: { nombre: string; hash: string };
  emitida: string; // ISO
  nonce: string;
}

export type EstadoAnclaje = "enviado" | "pendiente" | "confirmado" | "error";

export interface Anclaje {
  red: "bitcoin";
  metodo: "opentimestamps";
  estado: EstadoAnclaje;
  enviado_at?: string;
  ots_b64?: string;
  calendarios?: string[];
  detalle?: string;
}

export interface Constancia {
  code: string; // sha256 hex del doc canónico
  actividad_id: string;
  emisor_id: string;
  doc: ConstanciaDoc;
  firma: string; // hex ed25519
  anclaje: Anclaje;
  creada: string;
}
