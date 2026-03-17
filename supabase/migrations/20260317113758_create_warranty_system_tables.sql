/*
  # Sistema de Termos de Garantia - Luryx Duty Free

  1. Novas Tabelas
    - `operators`
      - `id` (uuid, primary key)
      - `code` (text, unique) - Código do operador
      - `name` (text) - Nome do operador
      - `active` (boolean) - Se o operador está ativo
      - `created_at` (timestamptz)
    
    - `warranty_terms`
      - `id` (uuid, primary key)
      - `invoice_number` (text) - Número da nota fiscal
      - `operator_code` (text) - Código do operador que gerou
      - `operator_name` (text) - Nome do operador
      - `customer_name` (text) - Nome do cliente
      - `issue_date` (date) - Data de emissão
      - `entry_condition` (text) - Condição de entrada do equipamento
      - `services_performed` (text) - Serviços realizados
      - `created_at` (timestamptz)
    
    - `warranty_products`
      - `id` (uuid, primary key)
      - `warranty_term_id` (uuid, foreign key) - Referência ao termo
      - `brand` (text) - Marca do produto
      - `description` (text) - Descrição/modelo do produto
      - `barcode` (text) - Código de barras
      - `imei_serial` (text) - IMEI ou número de série
      - `created_at` (timestamptz)

  2. Segurança
    - Enable RLS em todas as tabelas
    - Políticas permitem leitura e escrita para usuários autenticados
*/

-- Tabela de operadores
CREATE TABLE IF NOT EXISTS operators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Tabela de termos de garantia
CREATE TABLE IF NOT EXISTS warranty_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text NOT NULL,
  operator_code text NOT NULL,
  operator_name text NOT NULL,
  customer_name text DEFAULT '',
  issue_date date DEFAULT CURRENT_DATE,
  entry_condition text DEFAULT '',
  services_performed text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Tabela de produtos nos termos
CREATE TABLE IF NOT EXISTS warranty_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  warranty_term_id uuid REFERENCES warranty_terms(id) ON DELETE CASCADE,
  brand text NOT NULL,
  description text NOT NULL,
  barcode text DEFAULT '',
  imei_serial text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE warranty_products ENABLE ROW LEVEL SECURITY;

-- Políticas para operators (público - leitura, sem autenticação necessária para este caso)
CREATE POLICY "Permitir leitura de operadores"
  ON operators FOR SELECT
  TO anon, authenticated
  USING (active = true);

CREATE POLICY "Permitir inserção de operadores"
  ON operators FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de operadores"
  ON operators FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para warranty_terms
CREATE POLICY "Permitir leitura de termos"
  ON warranty_terms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir inserção de termos"
  ON warranty_terms FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de termos"
  ON warranty_terms FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Políticas para warranty_products
CREATE POLICY "Permitir leitura de produtos"
  ON warranty_products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Permitir inserção de produtos"
  ON warranty_products FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Permitir atualização de produtos"
  ON warranty_products FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Inserir alguns operadores de exemplo
INSERT INTO operators (code, name) VALUES 
  ('001', 'Operador 1'),
  ('002', 'Operador 2'),
  ('297', 'Leonardo Ruben Romero')
ON CONFLICT (code) DO NOTHING;