"use client"

import Image from "next/image"
import type { CartItem } from "@/types"

interface CheckoutItemProps {
  item: CartItem
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const { book, quantity } = item
  const itemTotal = book.price * quantity

  return (
    <div className="checkout-item">
      <div className="checkout-item__image-container">
        <Image
          src={book.coverImage || "/placeholder.svg"}
          alt={book.title}
          width={80}
          height={120}
          className="checkout-item__image"
        />
      </div>

      <div className="checkout-item__details">
        <h3 className="checkout-item__title">{book.title}</h3>
        <p className="checkout-item__author">por {book.author}</p>
      </div>

      <div className="checkout-item__price">
        <p className="checkout-item__unit-price">
          {book.price.toFixed(2)} € x {quantity}
        </p>
        <p className="checkout-item__total">{itemTotal.toFixed(2)} €</p>
      </div>

      <style jsx>{`
        .checkout-item {
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid var(--border-color);
        }
        
        .checkout-item__image-container {
          flex: 0 0 80px;
          margin-right: 20px;
        }
        
        .checkout-item__details {
          flex: 1;
        }
        
        .checkout-item__title {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }
        
        .checkout-item__author {
          color: #666;
          font-size: 0.9rem;
        }
        
        .checkout-item__price {
          text-align: right;
          min-width: 120px;
        }
        
        .checkout-item__unit-price {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }
        
        .checkout-item__total {
          font-weight: 600;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  )
}
