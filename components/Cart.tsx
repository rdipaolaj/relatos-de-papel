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

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, totalPrice, clearCart, isLoading } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    onClose()
    router.push("/checkout")
  }

  const handleClearCart = async () => {
    if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
      try {
        await clearCart()
      } catch (error) {
        console.error("Error clearing cart:", error)
      }
    }
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
        {isLoading && cart.length === 0 ? (
          <div className="cart__loading">
            <div className="cart__loading-spinner"></div>
            <p>Cargando carrito...</p>
          </div>
        ) : cart.length === 0 ? (
          <p className="cart__empty">Tu carrito está vacío</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.book.id} item={item} />
            ))}
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart__footer">
          <div className="cart__total">
            <span>Total:</span>
            <span>{totalPrice.toFixed(2)} €</span>
          </div>

          <div className="cart__actions">
            <Button
              variant="outline"
              onClick={handleClearCart}
              disabled={isLoading}
              className="cart__clear-button bg-transparent"
            >
              Vaciar carrito
            </Button>
            <Button variant="primary" onClick={handleCheckout} disabled={isLoading} className="cart__checkout-button">
              Finalizar compra
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
        .cart__loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          color: #666;
        }
        
        .cart__loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid var(--primary-color);
          border-radius: 50%;
          margin-bottom: 15px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .cart__actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .cart__clear-button {
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  )
}
