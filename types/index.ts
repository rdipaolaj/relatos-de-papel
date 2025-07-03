import { Book } from "./book"

/**
 * Interfaz que define un ítem en el carrito de compras.
 */
export interface CartItem {
  book: Book
  quantity: number
}
