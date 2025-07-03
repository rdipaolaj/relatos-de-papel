/**
 * Interfaz que define la estructura de un libro.
 */
export interface Book {
  id: string
  title: string
  author: string
  price: number
  coverImage?: string
  description: string
  isbn: string
  pages: number
  publishYear: number
  category?: string
  categoryId?: string // ID de la categoría, opcional si no se usa
  stock: number        // stock disponible
  originalPrice?: number
  discountPercentage?: number
  isNew?: boolean
}

/**
 * Interfaz que define un ítem en el carrito de compras.
 */
export interface CartItem {
  book: Book
  quantity: number
}
