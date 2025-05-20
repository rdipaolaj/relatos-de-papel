"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import Button from "@/components/Button"
import CheckoutItem from "@/components/CheckoutItem"

export default function CheckoutPage() {
  const { cart, clearCart, totalPrice } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = () => {
    setIsProcessing(true)

    // Simulamos el proceso de pago
    setTimeout(() => {
      setIsProcessing(false)
      alert("¡Pedido realizado con éxito!")
      clearCart()
      router.push("/home")
    }, 1500)
  }

  if (cart.length === 0) {
    return (
      <div className="checkout checkout--empty">
        <h1 className="checkout__title">Checkout</h1>
        <p className="checkout__empty-message">Tu carrito está vacío</p>
        <Button variant="primary" onClick={() => router.push("/home")}>
          Volver a la tienda
        </Button>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Finalizar compra</h1>

      <div className="checkout__summary">
        <h2 className="checkout__summary-title">Resumen del pedido</h2>
        <div className="checkout__items">
          {cart.map((item) => (
            <CheckoutItem key={item.book.id} item={item} />
          ))}
        </div>
        <div className="checkout__total">
          <span>Total:</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
      </div>

      <div className="checkout__actions">
        <Button variant="outline" onClick={() => router.push("/home")}>
          Seguir comprando
        </Button>
        <Button variant="primary" onClick={handleCheckout} disabled={isProcessing}>
          {isProcessing ? "Procesando..." : "Realizar pedido"}
        </Button>
      </div>
    </div>
  )
}
