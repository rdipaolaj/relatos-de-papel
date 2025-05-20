"use client"

import { useCart } from "@/hooks/useCart"
import CartItem from "./CartItem"
import Button from "./Button"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Componente de carrito de compras.
 * Muestra los productos añadidos, permite modificar cantidades y navegar al checkout.
 *
 * @param {CartProps} props - Propiedades del componente
 * @param {boolean} props.isOpen - Si el carrito está abierto
 * @param {Function} props.onClose - Función para cerrar el carrito
 * @returns {JSX.Element} Elemento JSX con el carrito
 */
export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, totalPrice } = useCart()
  const router = useRouter()

  /**
   * Navega a la página de checkout y cierra el carrito.
   */
  const handleCheckout = () => {
    onClose()
    router.push("/checkout")
  }

  return (
    <div className={`cart ${isOpen ? "cart--open" : ""}`}>
      <div className="cart__header">
        <h2 className="cart__title">Tu carrito</h2>
        <button className="cart__close" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="cart__items">
        {cart.length === 0 ? (
          <p className="cart__empty">Tu carrito está vacío</p>
        ) : (
          cart.map((item) => <CartItem key={item.book.id} item={item} />)
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart__footer">
          <div className="cart__total">
            <span>Total:</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>
          <Button variant="primary" onClick={handleCheckout} className="cart__checkout-button">
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  )
}
