"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { useCart } from "@/hooks/useCart"
import { useState, useEffect } from "react"
import { Book } from "@/types/book"

interface BookCardProps {
  book: Book & {
    originalPrice?: number
    discountPercentage?: number
    isNew?: boolean
  }
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart()
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [addedToCart])

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(book)
    setAddedToCart(true)
  }

  const hasDiscount = book.originalPrice && book.discountPercentage

  return (
    <div className="book-card">
      {addedToCart && (
        <div className="book-card__notification">
          <div className="book-card__notification-content">
            <span className="book-card__notification-icon">✓</span>
            <span>Añadido al carrito</span>
          </div>
        </div>
      )}

      <Link href={`/book/${book.id}`} className="book-card__link">
        <div className="book-card__image-container">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            fill
            className="book-card__image"
          />

          {hasDiscount && <div className="book-card__discount">-{book.discountPercentage}%</div>}
          {book.isNew && <div className="book-card__badge book-card__badge--new">Nuevo</div>}
        </div>

        <div className="book-card__content">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.authorName}</p>

          <div className="book-card__price-container">
            {hasDiscount ? (
              <>
                <span className="book-card__original-price">{book.originalPrice?.toFixed(2)} €</span>
                <span className="book-card__price book-card__price--discounted">{book.price?.toFixed(2)} €</span>
              </>
            ) : (
              <span className="book-card__price">{book.price?.toFixed(2)} €</span>
            )}
          </div>
        </div>
      </Link>

      <Button variant="primary" onClick={handleAddToCart} className="book-card__button">
        Añadir al carrito
      </Button>

      <style jsx>{`
        .book-card {
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: var(--light-color);
          height: 100%;
          width: 100%;
          position: relative;
        }

        .book-card__link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .book-card__image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 2 / 3;
          background-color: #f0f0f0;
          overflow: hidden;
        }

        .book-card__image {
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }

        .book-card:hover .book-card__image {
          transform: scale(1.05);
        }

        .book-card__discount {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--error-color);
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.9rem;
          z-index: 2;
        }

        .book-card__badge {
          position: absolute;
          top: 10px;
          left: 10px;
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.8rem;
          z-index: 2;
        }

        .book-card__badge--new {
          background-color: var(--secondary-color);
          color: var(--text-color);
        }

        .book-card__content {
          padding: 15px 15px 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .book-card__title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 5px;
          line-height: 1.3;
          height: 2.8rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-align: left;
        }

        .book-card__author {
          color: #666;
          margin-bottom: 10px;
          font-size: 0.9rem;
          height: 1.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
        }

        .book-card__price-container {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          height: 1.5rem;
        }

        .book-card__price {
          font-weight: 700;
          color: var(--primary-color);
          font-size: 1.1rem;
        }

        .book-card__price--discounted {
          color: var(--error-color);
        }

        .book-card__original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 0.9rem;
        }

        .book-card__button {
          margin: 0 15px 15px;
          width: calc(100% - 30px);
        }

        .book-card__notification {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none;
        }

        .book-card__notification-content {
          background-color: rgba(46, 204, 113, 0.9);
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          animation: fadeInOut 2s ease-in-out;
          white-space: nowrap;
        }

        .book-card__notification-icon {
          font-weight: bold;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.8); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
      `}</style>
    </div>
  )
}
