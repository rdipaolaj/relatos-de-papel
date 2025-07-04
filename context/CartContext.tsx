"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { Book, CartItem } from "@/types"
import * as cartService from "@/services/cartService"

interface CartContextType {
  cart: CartItem[]
  addToCart: (book: Book) => Promise<void>
  removeFromCart: (bookId: string) => Promise<void>
  updateQuantity: (bookId: string, quantity: number) => Promise<void>
  decrementItem: (bookId: string) => Promise<void>
  clearCart: () => Promise<void>
  getQuantity: (bookId: string) => number
  totalPrice: number
  isLoading: boolean
  customerId: string
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: async () => { },
  removeFromCart: async () => { },
  updateQuantity: async () => { },
  decrementItem: async () => { },
  clearCart: async () => { },
  getQuantity: () => 0,
  totalPrice: 0,
  isLoading: false,
  customerId: "",
})

interface CartProviderProps {
  children: ReactNode
}

// Generar un GUID v4 válido aleatorio
const generateGUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const createHash = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

const generateDeterministicGUID = (seed: string): string => {
  const hash = createHash(seed)

  let seedValue = hash
  const random = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280
    return seedValue / 233280
  }

  // Generación GUID v4 válido
  const hex = () => Math.floor(random() * 16).toString(16)

  // Formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return [
    // 8 caracteres
    hex() + hex() + hex() + hex() + hex() + hex() + hex() + hex(),
    // 4 caracteres
    hex() + hex() + hex() + hex(),
    // 4 caracteres empezando con '4'
    "4" + hex() + hex() + hex(),
    // 4 caracteres empezando con '8', '9', 'a' o 'b'
    ["8", "9", "a", "b"][Math.floor(random() * 4)] + hex() + hex() + hex(),
    // 12 caracteres
    hex() + hex() + hex() + hex() + hex() + hex() + hex() + hex() + hex() + hex() + hex() + hex(),
  ].join("-")
}

// Obtener fingerprint del navegador
const getBrowserFingerprint = (): string => {
  if (typeof window === "undefined") return "server-side"

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + "x" + screen.height,
    new Date().getTimezoneOffset().toString(),
    navigator.platform,
  ].join("|")

  return fingerprint
}

const getPublicIP = async (): Promise<string> => {
  try {
    // Servicio gratuito para obtener la IP pública
    const response = await fetch("https://api.ipify.org?format=json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log("IP obtenida:", data.ip)
      return data.ip
    }
  } catch (error) {
    console.log("No se pudo obtener la IP pública, usando fingerprint del navegador:", error)
  }

  // Fallback al fingerprint del navegador
  const fingerprint = getBrowserFingerprint()
  console.log("Usando fingerprint del navegador:", fingerprint)
  return fingerprint
}

// Generar o recuperar customerId del localStorage
const getCustomerId = async (): Promise<string> => {
  if (typeof window === "undefined") return ""

  let customerId = localStorage.getItem("customerId")

  if (!customerId) {
    try {
      // Obtener identificador único (IP)
      const clientIdentifier = await getPublicIP()

      customerId = generateDeterministicGUID(clientIdentifier)
      localStorage.setItem("customerId", customerId)

      console.log("Generated new customerId:", customerId)
    } catch (error) {
      console.error("Error generating customer ID:", error)
      customerId = generateGUID()
      localStorage.setItem("customerId", customerId)
    }
  } else {
    console.log("Using existing customerId:", customerId)
  }

  // Validación de que el customerId sea un GUID válido
  const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!guidRegex.test(customerId)) {
    console.warn("Invalid GUID detected, generating new one:", customerId)
    customerId = generateGUID()
    localStorage.setItem("customerId", customerId)
    console.log("Generated new valid customerId:", customerId)
  }

  return customerId
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [customerId, setCustomerId] = useState("")

  // Inicializar customerId
  useEffect(() => {
    const initCustomerId = async () => {
      const id = await getCustomerId()
      setCustomerId(id)
    }
    initCustomerId()
  }, [])

  // Cargar carrito desde la API al iniciar
  useEffect(() => {
    if (customerId) {
      fetchCart()
    }
  }, [customerId])

  const fetchCart = async () => {
    if (!customerId) return

    try {
      setIsLoading(true)
      console.log("Fetching cart for customer:", customerId)

      const result = await cartService.getCart(customerId)
      console.log("Fetch cart result:", result)

      if (result.success && result.data) {
        const cartItems: CartItem[] = result.data.items.map((item) => ({
          book: {
            id: item.bookId,
            title: item.title || `Libro ${item.bookId}`,
            author: "Autor desconocido",
            price: item.unitPrice,
            coverImage: item.coverImage || "/placeholder.svg",
            description: "",
            isbn: "",
            pages: 0,
            publishYear: 0,
            stock: 10,
          },
          quantity: item.quantity,
        }))

        setCart(cartItems)
        setTotalPrice(result.data.total)
      } else {
        // Si no hay datos, inicializa carrito vacío
        setCart([])
        setTotalPrice(0)
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
      // En caso de error, se mantiene el carrito vacío
      setCart([])
      setTotalPrice(0)
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = async (book: Book) => {
    if (!customerId) {
      console.error("No customerId available")
      return
    }

    try {
      setIsLoading(true)
      console.log("Adding to cart - Customer:", customerId, "Book:", book.id)

      const result = await cartService.addItemToCart(customerId, {
        bookId: book.id,
        quantity: 1,
      })

      console.log("Add to cart result:", result)

      if (result.success) {
        // Actualizar el estado local con la respuesta de la API
        await fetchCart() // Recargar el carrito completo
      } else {
        console.error("API returned success: false", result)
        throw new Error(`API Error: ${result.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (bookId: string) => {
    if (!customerId) return

    try {
      setIsLoading(true)
      console.log("Removing from cart - Customer:", customerId, "Book:", bookId)

      const result = await cartService.removeItemFromCart(customerId, bookId)
      console.log("Remove from cart result:", result)

      if (result.success) {
        await fetchCart() // Recargar el carrito
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(bookId)
      return
    }

    try {
      setIsLoading(true)
      const result = await cartService.addItemToCart(customerId, {
        bookId: bookId,
        quantity: quantity,
      })

      if (result.success) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const decrementItem = async (bookId: string) => {
    if (!customerId) return

    try {
      setIsLoading(true)
      const result = await cartService.decrementItemInCart(customerId, bookId)

      if (result.success) {
        await fetchCart()
      }
    } catch (error) {
      console.error("Error decrementing item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    if (!customerId) return

    try {
      setIsLoading(true)
      const result = await cartService.clearCart(customerId)

      if (result.success) {
        setCart([])
        setTotalPrice(0)
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getQuantity = (bookId: string): number => {
    const item = cart.find((item) => item.book.id === bookId)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        decrementItem,
        clearCart,
        getQuantity,
        totalPrice,
        isLoading,
        customerId,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
