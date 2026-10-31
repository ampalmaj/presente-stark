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
  secreto: string; // nunca sale del servidor: firma los tokens del QR
  clave_admin: string; // la tiene quien dicta: habilita estado, nueva toma y marcado manual
  toma_actual: number; // 1, 2, 3… cada vez que quien dicta vuelve a tomar
  creada: string; // ISO
}

export interface Presente {
  id: string;
  actividad_id: string;
  nombre: string;
  email: string;
  email_hash: string;
  toma: number;
  modo: "qr" | "docente"; // se marcó sola con el QR, o la marcó quien dicta
  creado: string;
}

export interface ConstanciaDoc {
  v: 1;
  emisor: { id: string; nombre: string };
  actividad: { id: string; nombre: string; tipo: TipoActividad };
  participante: { nombre: string; hash: string };
  toma: number;
  modo: "qr" | "docente";
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
  toma: number;
  doc: ConstanciaDoc;
  firma: string; // hex ed25519
  anclaje: Anclaje;
  creada: string;
}
