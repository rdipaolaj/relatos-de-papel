"use client"

import Image from "next/image"
import type { CartItem as CartItemType } from "@/types"
import { useCart } from "@/hooks/useCart"
import { Trash2, Plus, Minus } from "lucide-react"
import { useState } from "react"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { book, quantity } = item
  const { removeFromCart, addToCart, decrementItem, isLoading } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleIncrement = async () => {
    setIsUpdating(true)
    try {
      await addToCart(book)
    } catch (error) {
      console.error("Error incrementing item:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDecrement = async () => {
    setIsUpdating(true)
    try {
      await decrementItem(book.id)
    } catch (error) {
      console.error("Error decrementing item:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    setIsUpdating(true)
    try {
      await removeFromCart(book.id)
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <Image
          src={book.coverImage || "/placeholder.svg"}
          alt={book.title}
          width={60}
          height={90}
          className="cart-item__image"
        />
      </div>

      <div className="cart-item__details">
        <h3 className="cart-item__title">{book.title}</h3>
        <p className="cart-item__price">{book.price.toFixed(2)} €</p>
      </div>

      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <button
            className="cart-item__quantity-btn"
            onClick={handleDecrement}
            disabled={quantity <= 1 || isUpdating || isLoading}
          >
            <Minus size={16} />
          </button>
          <span className="cart-item__quantity-value">{isUpdating ? "..." : quantity}</span>
          <button className="cart-item__quantity-btn" onClick={handleIncrement} disabled={isUpdating || isLoading}>
            <Plus size={16} />
          </button>
        </div>

        <button className="cart-item__remove" onClick={handleRemove} disabled={isUpdating || isLoading}>
          <Trash2 size={18} />
        </button>
      </div>

      <style jsx>{`
        .cart-item {
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid var(--border-color);
          opacity: ${isUpdating || isLoading ? 0.6 : 1};
          transition: opacity 0.2s ease;
        }
        
        .cart-item__image-container {
          flex: 0 0 60px;
          margin-right: 15px;
        }
        
        .cart-item__details {
          flex: 1;
        }
        
        .cart-item__title {
          font-size: 0.9rem;
          margin-bottom: 5px;
        }
        
        .cart-item__price {
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .cart-item__actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
        }
        
        .cart-item__quantity {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .cart-item__quantity-btn {
          background: none;
          border: 1px solid var(--border-color);
          width: 24px;
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .cart-item__quantity-btn:hover:not(:disabled) {
          background-color: #f0f0f0;
        }
        
        .cart-item__quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .cart-item__quantity-value {
          margin: 0 8px;
          font-weight: 500;
          min-width: 20px;
          text-align: center;
        }
        
        .cart-item__remove {
          background: none;
          border: none;
          color: var(--error-color);
          cursor: pointer;
          padding: 5px;
          transition: opacity 0.2s ease;
        }
        
        .cart-item__remove:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}
