# Boutique Boutique - E-commerce Académico

Este proyecto es una tienda virtual de ropa moderna, construida con React (Vite), Supabase y PayPal.

## 🚀 Requisitos previos

1. **Supabase**:
   - Crea un proyecto en [Supabase](https://supabase.com/).
   - Ve al **SQL Editor** y pega el contenido del archivo `supabase_schema.sql` que se encuentra en la raíz de este proyecto. Esto creará las tablas de Categorías, Productos, Ventas e Items.
   - Obtén tu `SUPABASE_URL` y `SUPABASE_ANON_KEY` desde la configuración de API.

2. **PayPal**:
   - Crea una cuenta en [PayPal Developer](https://developer.paypal.com/).
   - Crea una App de tipo **Sandbox**.
   - Obtén tu **Client ID**.

3. **Variables de Entorno**:
   - Crea un archivo `.env` en la raíz (puedes copiar de `.env.example`).
   - Rellena con tus claves de Supabase y PayPal.

## 🛠️ Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📂 Estructura del Proyecto

- `src/services/supabase.js`: Cliente de conexión a la base de datos.
- `src/context/CartContext.jsx`: Manejo del carrito de compras y estado global.
- `src/components/Payment/PayPalButton.jsx`: Integración lógica con la API de PayPal y persistencia en Supabase.
- `src/styles/index.css`: Sistema de diseño con Glassmorphism y diseño premium.

## 💡 Notas Académicas

- El backend es manejado 100% por Supabase (BaaS).
- Las imágenes de productos se manejan como placeholders o URLs externas en la base de datos.
- El flujo de pago captura la orden en PayPal y, al ser exitoso, inserta el registro en la tabla `sales` de tu base de datos.
