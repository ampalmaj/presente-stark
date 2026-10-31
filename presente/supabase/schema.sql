-- Presente · esquema. Ejecutar en Supabase → SQL Editor.
-- El servidor usa la service role key, así que no hace falta RLS para el prototipo.

create table if not exists actividades (
  id text primary key,
  nombre text not null,
  tipo text not null check (tipo in ('clase','curso','evento')),
  emisor_id text not null,
  secreto text not null,
  clave_admin text not null,
  toma_actual integer not null default 1,
  creada timestamptz not null default now()
);

create table if not exists presentes (
  id text primary key,
  actividad_id text not null references actividades(id) on delete cascade,
  nombre text not null,
  email text not null,
  email_hash text not null,
  toma integer not null default 1,
  modo text not null default 'qr' check (modo in ('qr','docente')),
  creado timestamptz not null default now()
);
create index if not exists presentes_actividad_idx on presentes(actividad_id, creado desc);
create unique index if not exists presentes_unico_idx on presentes(actividad_id, email_hash, toma);

create table if not exists constancias (
  code text primary key,
  actividad_id text not null references actividades(id) on delete cascade,
  emisor_id text not null,
  toma integer not null default 1,
  participante_hash text not null,
  doc jsonb not null,
  firma text not null,
  anclaje jsonb not null,
  creada timestamptz not null default now()
);
create unique index if not exists constancias_unica_idx on constancias(actividad_id, participante_hash, toma);

-- Bloquear acceso anónimo directo (todo pasa por el servidor).
alter table actividades enable row level security;
alter table presentes enable row level security;
alter table constancias enable row level security;
