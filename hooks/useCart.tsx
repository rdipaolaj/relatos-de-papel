"use client"

import { useContext } from "react"
import { CartContext } from "@/context/CartContext"

/**
 * Hook personalizado para acceder al contexto del carrito.
 * Proporciona acceso al estado del carrito y sus funciones.
 *
 * @returns {CartContextType} Objeto con el estado del carrito y funciones para manipularlo
 * @throws {Error} Si se utiliza fuera de un CartProvider
 */
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }

  return context
}
