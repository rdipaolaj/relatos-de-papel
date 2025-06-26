## Endpoints API para "Relatos de Papel"

Aquí tienes un listado completo de los endpoints necesarios para tu proyecto, organizados por funcionalidad:

### 📚 **LIBROS**

#### Obtener libros  --> RICARDO

```plaintext
GET /api/books
```

**Query Parameters:**

- `page` (int): Número de página (default: 1)
- `limit` (int): Elementos por página (default: 12)
- `category` (string): Filtrar por categoría
- `author` (int): Filtrar por ID de autor
- `is_new` (boolean): Filtrar novedades
- `has_discount` (boolean): Filtrar ofertas
- `sort` (string): Ordenar por (price_asc, price_desc, title, newest, oldest)

**Respuesta:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Cien años de soledad",
      "author": {
        "id": 1,
        "name": "Gabriel García Márquez"
      },
      "price": 19.99,
      "original_price": null,
      "discount_percentage": null,
      "cover_image": "/cien-anos-de-soledad-cover.png",
      "description": "Una de las obras más importantes...",
      "isbn": "978-0307474728",
      "pages": 417,
      "publish_year": 1967,
      "is_new": false,
      "stock": 50,
      "categories": ["Ficción", "Clásicos"],
      "average_rating": 4.5,
      "review_count": 12
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 60,
    "per_page": 12
  }
}
```

#### Obtener libro por ID  --> CARLOS

```plaintext
GET /api/books/{id}
```

#### Obtener libros destacados

```plaintext
GET /api/books/featured
```

#### Obtener novedades  --> CARLOS

```plaintext
GET /api/books/new-releases
```

#### Obtener ofertas

```plaintext
GET /api/books/offers
```

#### Obtener libros relacionados  --> CARLOS

```plaintext
GET /api/books/{id}/related
```

### 🔍 **BÚSQUEDA CON ELASTICSEARCH**   --> RICARDO

#### Búsqueda general

```plaintext
GET /api/search
```

**Query Parameters:**

- `q` (string): Término de búsqueda
- `page` (int): Número de página
- `limit` (int): Elementos por página
- `filters` (object): Filtros adicionales

**Respuesta:**

```json
{
  "query": "quijote",
  "results": [
    {
      "id": 4,
      "title": "Don Quijote de la Mancha",
      "author": {
        "id": 4,
        "name": "Miguel de Cervantes"
      },
      "price": 24.99,
      "cover_image": "/don-quijote-cover.png",
      "isbn": "978-8420412146",
      "highlight": {
        "title": "Don <em>Quijote</em> de la Mancha",
        "description": "...aventuras de un hidalgo que enloquece..."
      },
      "score": 0.95
    }
  ],
  "total": 1,
  "took": 15,
  "suggestions": ["quijote", "cervantes"]
}
```

#### Autocompletado

```plaintext
GET /api/search/autocomplete
```

**Query Parameters:**

- `q` (string): Término parcial

#### Sugerencias de búsqueda

```plaintext
GET /api/search/suggestions
```

**Query Parameters:**

- `q` (string): Término de búsqueda

### 📂 **CATEGORÍAS**

#### Obtener todas las categorías   --> OSCAR

```plaintext
GET /api/categories
```

#### Obtener categoría por slug   --> OSCAR

```plaintext
GET /api/categories/{slug}
```

#### Obtener libros de una categoría   --> OSCAR

```plaintext
GET /api/categories/{slug}/books
```

### ✍️ **AUTORES**   --> TRABAJARLO DESPUES DE ACABAR CON LOS PRINCIPALES

#### Obtener todos los autores

```plaintext
GET /api/authors
```

#### Obtener autor por ID

```plaintext
GET /api/authors/{id}
```

#### Obtener libros de un autor

```plaintext
GET /api/authors/{id}/books
```

### 🛒 **CARRITO Y PEDIDOS**   --> RENZO

#### Validar disponibilidad de productos

```plaintext
POST /api/cart/validate
```

**Body:**

```json
{
  "items": [
    {
      "book_id": 1,
      "quantity": 2
    },
    {
      "book_id": 3,
      "quantity": 1
    }
  ]
}
```

#### Crear pedido

```plaintext
POST /api/orders
```

**Body:**

```json
{
  "customer": {
    "name": "María García",
    "email": "maria@ejemplo.com",
    "phone": "611223344"
  },
  "shipping_address": {
    "address": "Calle Mayor 123",
    "city": "Madrid",
    "state": "Madrid",
    "postal_code": "28001",
    "country": "España"
  },
  "items": [
    {
      "book_id": 1,
      "quantity": 2,
      "unit_price": 19.99
    }
  ],
  "payment_method": "credit_card"
}
```