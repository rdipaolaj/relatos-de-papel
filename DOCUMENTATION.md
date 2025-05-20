# Documentación Técnica - Relatos de Papel

## Arquitectura del Proyecto

El proyecto "Relatos de Papel" sigue una arquitectura basada en componentes utilizando React y Next.js con el App Router. La aplicación está estructurada de la siguiente manera:

### Capas de la Aplicación

1. **Capa de Presentación**: Componentes React que manejan la interfaz de usuario.
2. **Capa de Estado**: Gestión de estado mediante Context API y hooks personalizados.
3. **Capa de Datos**: Actualmente utiliza datos mock, pero está preparada para integrarse con una API.

### Patrones de Diseño

- **Componentes Presentacionales y Contenedores**: Separación entre componentes que manejan la lógica y los que se encargan de la presentación.
- **Composición de Componentes**: Construcción de interfaces complejas mediante la composición de componentes más pequeños y reutilizables.
- **Context API**: Utilizado para compartir estado global (como el carrito de compras) entre componentes sin prop drilling.

## Flujo de Datos

### Carrito de Compras

1. El estado del carrito se gestiona a través del `CartContext`.
2. Los componentes acceden al carrito mediante el hook personalizado `useCart`.
3. Las acciones como añadir, eliminar o actualizar productos modifican el estado del contexto.
4. El estado del carrito se persiste en localStorage para mantenerlo entre sesiones.

### Búsqueda de Libros

1. La búsqueda se realiza en tiempo real mientras el usuario escribe en la barra de búsqueda.
2. Los resultados se filtran basándose en título, autor o ISBN.
3. Al seleccionar un resultado, se navega a la página de detalle del libro.

## Componentes Clave

### CartContext

El `CartContext` es fundamental para la gestión del carrito de compras. Proporciona:

- Estado actual del carrito (`cart`)
- Funciones para manipular el carrito (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`)
- Cálculo automático del precio total (`totalPrice`)

### Header

El componente `Header` es complejo y maneja múltiples responsabilidades:

- Navegación principal
- Búsqueda global
- Acceso al carrito
- Adaptación responsive (menú móvil)

### BookCard y BookList

Estos componentes son la base para mostrar los libros:

- `BookCard`: Muestra la información resumida de un libro y permite añadirlo al carrito.
- `BookList`: Organiza múltiples `BookCard` en una cuadrícula responsive.

## Hooks Personalizados

### useCart

Este hook encapsula la lógica de acceso al contexto del carrito, proporcionando una interfaz limpia para que los componentes interactúen con el carrito.

## Estilos

El proyecto utiliza CSS con metodología BEM (Block Element Modifier) para organizar los estilos:

- Cada componente tiene sus propios estilos encapsulados
- Se utilizan variables CSS para mantener consistencia en colores y espaciados
- Los estilos son responsive, adaptándose a diferentes tamaños de pantalla

## Rutas

La aplicación utiliza el sistema de rutas de Next.js App Router:

- `/`: Página de landing
- `/home`: Página principal
- `/book/[id]`: Página de detalle de libro
- `/categories`: Página de categorías
- `/new-releases`: Página de novedades
- `/offers`: Página de ofertas
- `/checkout`: Página de finalización de compra

## Consideraciones de Rendimiento

- **Lazy Loading de Imágenes**: Se utiliza el componente `Image` de Next.js para optimizar la carga de imágenes.
- **Componentes Cliente**: Se utiliza la directiva `"use client"` solo en los componentes que necesitan interactividad.
- **Memoización**: Se podría implementar `React.memo` y `useCallback` en componentes críticos para optimizar renderizados.

## Extensibilidad

El proyecto está diseñado para ser fácilmente extensible:

- **Nuevas Páginas**: Se pueden añadir nuevas rutas siguiendo el patrón existente.
- **Nuevos Componentes**: La estructura modular facilita la adición de nuevos componentes.
- **Integración con API**: La estructura de datos está preparada para ser reemplazada por datos reales de una API.

## Mejores Prácticas Implementadas

- **Tipado con TypeScript**: Interfaces claras para props y estado.
- **Componentes Reutilizables**: Diseño modular para maximizar la reutilización.
- **Accesibilidad**: Uso de atributos ARIA y estructura semántica.
- **Responsive Design**: Adaptación a diferentes tamaños de pantalla.
- **Documentación de Código**: Comentarios JSDoc para funciones y componentes principales.
