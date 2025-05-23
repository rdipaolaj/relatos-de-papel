"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import type { Book } from "@/types"
import Button from "./Button"
import { useCart } from "@/hooks/useCart"

interface BookCardProps {
  book: Book & {
    originalPrice?: number
    discountPercentage?: number
    isNew?: boolean
  }
}

/**
 * Componente que muestra una tarjeta de libro con su información básica.
 * Permite añadir el libro al carrito y navegar a su página de detalle.
 *
 * @param {BookCardProps} props - Propiedades del componente
 * @param {Book} props.book - Datos del libro a mostrar
 * @returns {JSX.Element} Elemento JSX con la tarjeta del libro
 */
export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart()

  /**
   * Maneja el evento de añadir al carrito.
   * Previene la navegación por defecto del enlace.
   *
   * @param {React.MouseEvent} e - Evento del clic
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(book)
  }

  const hasDiscount = book.originalPrice && book.discountPercentage

  return (
    <div className="book-card">
      <Link href={`/book/${book.id}`} className="book-card__link">
        <div className="book-card__image-container">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            width={300}
            height={450}
            className="book-card__image"
          />

          {hasDiscount && <div className="book-card__discount">-{book.discountPercentage}%</div>}

          {book.isNew && <div className="book-card__badge book-card__badge--new">Nuevo</div>}
        </div>

        <div className="book-card__content">
          <h3 className="book-card__title">{book.title}</h3>
          <p className="book-card__author">{book.author}</p>

          <div className="book-card__price-container">
            {hasDiscount ? (
              <>
                <span className="book-card__original-price">{book.originalPrice?.toFixed(2)} €</span>
                <span className="book-card__price book-card__price--discounted">{book.price.toFixed(2)} €</span>
              </>
            ) : (
              <span className="book-card__price">{book.price.toFixed(2)} €</span>
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
          height: 300px;
          overflow: hidden;
          background-color: #f0f0f0;
        }
        
        .book-card__image {
          width: 100%;
          height: 100%;
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
        }
        
        .book-card__author {
          color: #666;
          margin-bottom: 10px;
          font-size: 0.9rem;
          height: 1.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
      `}</style>
    </div>
  )
}
