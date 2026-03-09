-- ################################################
-- CONFIGURACIÓN DE BASE DE DATOS PARA BOUTIQUE BOUTIQUE
-- ################################################

-- 1. Tabla de Categorías
CREATE TABLE categories (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL
);

-- 2. Tabla de Productos
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  image_url TEXT,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Tabla de Ventas (Sales) con información de envío
CREATE TABLE sales (
  id PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  total DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'canceled'
  paypal_order_id TEXT,
  client_email TEXT,
  client_name TEXT,
  client_address TEXT,
  client_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. Tabla de items de la venta (Sale Items)
CREATE TABLE sale_items (
  id PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sale_id BIGINT REFERENCES sales(id) ON DELETE CASCADE,
  product_id BIGINT REFERENCES products(id),
  quantity INT NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);


-- Fin del esquema. No incluya datos de prueba aquí para evitar conflictos con la base de datos real.
