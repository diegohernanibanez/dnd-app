-- Tabla principal de personajes D&D
CREATE TABLE IF NOT EXISTS personajes (
  id                  TEXT PRIMARY KEY,
  nombre              TEXT NOT NULL DEFAULT 'Sin nombre',
  clase               TEXT,
  nivel               INTEGER DEFAULT 1,
  datos               JSONB NOT NULL,
  fecha_creacion      TIMESTAMPTZ DEFAULT NOW(),
  fecha_modificacion  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-actualizar fecha_modificacion en cada UPDATE
CREATE OR REPLACE FUNCTION update_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fecha_modificacion = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_fecha_modificacion ON personajes;
CREATE TRIGGER trg_fecha_modificacion
  BEFORE UPDATE ON personajes
  FOR EACH ROW EXECUTE FUNCTION update_fecha_modificacion();

-- Row Level Security: permitir todas las operaciones para usuarios anónimos
-- (sin autenticación por ahora — se puede reforzar después con auth)
ALTER TABLE personajes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_all_anon" ON personajes;
CREATE POLICY "allow_all_anon" ON personajes
  FOR ALL
  USING (true)
  WITH CHECK (true);
