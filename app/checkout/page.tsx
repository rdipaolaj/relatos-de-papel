"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import Button from "@/components/Button"
import CheckoutItem from "@/components/CheckoutItem"
import OrderReceipt from "@/components/OrderReceipt"

// Función para generar un número de pedido aleatorio
const generateOrderNumber = () => {
  const prefix = "RP"
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}-${timestamp}-${random}`
}

export default function CheckoutPage() {
  const { cart, clearCart, totalPrice } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [orderDate, setOrderDate] = useState<Date>(new Date())

  const handleCheckout = () => {
    setIsProcessing(true)

    // Simulamos el proceso de pago
    setTimeout(() => {
      setIsProcessing(false)

      // Generar datos del pedido
      const newOrderNumber = generateOrderNumber()
      setOrderNumber(newOrderNumber)
      setOrderDate(new Date())

      // Mostrar el comprobante
      setShowReceipt(true)
    }, 1500)
  }

  const handleCloseReceipt = () => {
    setShowReceipt(false)
    clearCart()
    router.push("/home")
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

      {showReceipt && (
        <OrderReceipt
          isOpen={showReceipt}
          onClose={handleCloseReceipt}
          orderItems={cart}
          orderTotal={totalPrice}
          orderNumber={orderNumber}
          orderDate={orderDate}
        />
      )}

      <style jsx>{`
        .checkout {
          max-width: 800px;
          margin: 0 auto;
        }
        
        .checkout__title {
          font-size: 2rem;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .checkout__summary {
          margin-bottom: 40px;
        }
        
        .checkout__summary-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 10px;
        }
        
        .checkout__items {
          margin-bottom: 30px;
        }
        
        .checkout__total {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          font-weight: 600;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        
        .checkout__actions {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }
        
        .checkout--empty {
          text-align: center;
          padding: 60px 0;
        }
        
        .checkout__empty-message {
          margin-bottom: 30px;
          font-size: 1.2rem;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .checkout__actions {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  )
}
