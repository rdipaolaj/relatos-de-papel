"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Book, CartItem } from "@/types"

interface CartContextType {
  cart: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  clearCart: () => { },
  totalPrice: 0,
})

interface CartProviderProps {
  children: ReactNode
}

/**
 * Proveedor de contexto para el carrito de compras.
 * Gestiona el estado del carrito y proporciona funciones para manipularlo.
 *
 * @param {CartProviderProps} props - Propiedades del componente
 * @param {ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 * @returns {JSX.Element} Proveedor de contexto con el estado del carrito
 */
export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
    setTotalPrice(total)
  }, [cart])

  /**
   * Añade un libro al carrito.
   * Si el libro ya está en el carrito, incrementa su cantidad.
   *
   * @param {Book} book - Libro a añadir al carrito
   */
  const addToCart = (book: Book) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.book.id === book.id)

      if (existingItem) {
        return prevCart.map((item) => (item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { book, quantity: 1 }]
      }
    })
  }

  /**
   * Elimina un libro del carrito por su ID.
   *
   * @param {string} bookId - ID del libro a eliminar
   */
  const removeFromCart = (bookId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId))
  }

  /**
   * Actualiza la cantidad de un libro en el carrito.
   * Si la cantidad es 0 o menor, elimina el libro del carrito.
   *
   * @param {string} bookId - ID del libro a actualizar
   * @param {number} quantity - Nueva cantidad
   */
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.book.id === bookId ? { ...item, quantity } : item)))
  }

  /**
   * Vacía completamente el carrito.
   */
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
