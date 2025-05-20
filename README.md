# Relatos de Papel - Tienda de Libros Online

## Descripción del Proyecto

"Relatos de Papel" es una aplicación web de comercio electrónico especializada en la venta de libros. Desarrollada con Next.js 15 y React, ofrece una experiencia de usuario fluida y responsive para la compra de libros en línea.

## Características Principales

- **Diseño Responsive**: Adaptado para funcionar en dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva**: Sistema de rutas basado en Next.js App Router
- **Carrito de Compras**: Funcionalidad completa para añadir, eliminar y modificar productos
- **Búsqueda Dinámica**: Búsqueda en tiempo real por título, autor o ISBN
- **Categorización**: Filtrado de libros por categorías
- **Secciones Especiales**: Novedades, ofertas y libros destacados

## Tecnologías Utilizadas

- **Frontend**: React 18+, Next.js 15 (App Router)
- **Estilos**: CSS con metodología BEM
- **Gestión de Estado**: React Context API y hooks personalizados
- **Iconos**: Lucide React

## Estructura del Proyecto

```plaintext
relatos_de_papel/
├── app/                    # Rutas y páginas (Next.js App Router)
│   ├── book/[id]/          # Página de detalle de libro
│   ├── categories/         # Página de categorías
│   ├── checkout/           # Página de checkout
│   ├── home/               # Página principal
│   ├── new-releases/       # Página de novedades
│   ├── offers/             # Página de ofertas
│   ├── globals.css         # Estilos globales
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de landing
├── components/             # Componentes reutilizables
│   ├── ui/                 # Componentes de UI básicos
│   ├── BookCard.tsx        # Tarjeta de libro
│   ├── BookList.tsx        # Lista de libros
│   ├── Cart.tsx            # Componente de carrito
│   └── ...                 # Otros componentes
├── context/                # Contextos de React
│   └── CartContext.tsx     # Contexto para el carrito de compras
├── data/                   # Datos mock
│   └── mockBooks.ts        # Datos de libros para desarrollo
├── hooks/                  # Hooks personalizados
│   └── useCart.tsx         # Hook para gestionar el carrito
├── public/                 # Archivos estáticos
│   ├── book-logo.png       # Logo de la tienda
│   └── ...                 # Imágenes de portadas de libros
└── types/                  # Definiciones de tipos TypeScript
    └── index.ts            # Tipos principales
```

## Flujo de Datos

1. **Datos de Libros**: Actualmente se utilizan datos mock en `data/mockBooks.ts`. En un entorno de producción, estos datos vendrían de una API.
2. **Estado del Carrito**: Gestionado a través de `CartContext` y almacenado en localStorage para persistencia.
3. **Navegación**: Implementada con Next.js App Router, permitiendo navegación entre páginas sin recargar.

## Componentes Principales

### Layout Principal

El componente `app/layout.tsx` define la estructura básica de la aplicación, incluyendo el `CartProvider` para gestionar el estado del carrito en toda la aplicación.

### Páginas

- **Landing Page**: Página de bienvenida con redirección automática
- **Home**: Página principal con libros destacados y catálogo
- **Book Detail**: Página de detalle de un libro específico
- **Categories**: Filtrado de libros por categoría
- **New Releases**: Muestra los lanzamientos más recientes
- **Offers**: Muestra libros con descuentos
- **Checkout**: Proceso de finalización de compra

### Componentes Reutilizables

- **Header**: Barra de navegación con búsqueda global
- **Footer**: Pie de página con enlaces y contacto
- **BookCard**: Tarjeta para mostrar información resumida de un libro
- **BookList**: Cuadrícula de libros
- **Cart**: Carrito de compras desplegable
- **Button**: Componente de botón reutilizable

## Hooks Personalizados

### useCart

Hook personalizado que proporciona acceso al contexto del carrito y sus funciones.

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias: `pnpm install`
3. Ejecutar en modo desarrollo: `pnpm run dev`
4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Despliegue

El proyecto está configurado para ser desplegado en Vercel:

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno necesarias
3. Desplegar automáticamente

## Mejoras Futuras

- Integración con una API real para obtener datos de libros
- Implementación de autenticación de usuarios
- Sistema de reseñas y valoraciones
- Modo oscuro
- Filtros avanzados de búsqueda
- Integración con pasarelas de pago
