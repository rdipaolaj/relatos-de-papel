"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Book } from "@/types"
import Button from "./Button"

interface FeaturedBooksProps {
  books: Book[]
}

/**
 * Componente que muestra libros destacados en la página principal.
 *
 * @param {FeaturedBooksProps} props - Propiedades del componente
 * @param {Book[]} props.books - Array de libros destacados
 * @returns {JSX.Element} Elemento JSX con los libros destacados
 */
export default function FeaturedBooks({ books }: FeaturedBooksProps) {
  const router = useRouter()

  const featuredBook = books.length > 0 ? books[0] : null

  if (!featuredBook) return null

  const handleAddToCart = (e: React.MouseEvent, bookId: string) => {
    e.preventDefault()
    e.stopPropagation()
    // Lógica para añadir al carrito
  }

  return (
    <div className="featured-books">
      <h2 className="featured-books__title">Destacados de la semana</h2>

      <div className="featured-books__main">
        <div className="featured-books__main-image">
          <Image
            src={featuredBook.coverImage || "/placeholder.svg"}
            alt={featuredBook.title}
            width={300}
            height={450}
            className="featured-books__cover"
          />
        </div>

        <div className="featured-books__main-content">
          <div className="featured-books__badge">Destacado</div>
          <h3 className="featured-books__main-title">{featuredBook.title}</h3>
          <p className="featured-books__main-author">por {featuredBook.author}</p>
          <p className="featured-books__main-description">{featuredBook.description}</p>
          <div className="featured-books__main-info">
            <div className="featured-books__main-price">{featuredBook.price.toFixed(2)} €</div>
            <Button variant="primary" onClick={() => router.push(`/book/${featuredBook.id}`)}>
              Ver detalles
            </Button>
          </div>
        </div>
      </div>

      <div className="featured-books__secondary">
        {books.slice(1, 4).map((book) => (
          <div key={book.id} className="featured-books__card" onClick={() => router.push(`/book/${book.id}`)}>
            <div className="featured-books__card-image">
              <Image
                src={book.coverImage || "/placeholder.svg"}
                alt={book.title}
                width={120}
                height={180}
                className="featured-books__card-cover"
              />
            </div>
            <div className="featured-books__card-content">
              <h4 className="featured-books__card-title">{book.title}</h4>
              <p className="featured-books__card-author">{book.author}</p>
              <p className="featured-books__card-price">{book.price.toFixed(2)} €</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .featured-books {
          margin-bottom: 60px;
        }
        
        .featured-books__title {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 30px;
          text-align: center;
        }
        
        .featured-books__main {
          display: flex;
          background-color: var(--light-color);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }
        
        .featured-books__main-image {
          flex: 0 0 300px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .featured-books__cover {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          max-width: 100%;
          height: auto;
        }
        
        .featured-books__main-content {
          flex: 1;
          padding: 30px;
          display: flex;
          flex-direction: column;
        }
        
        .featured-books__badge {
          background-color: var(--secondary-color);
          color: var(--text-color);
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 15px;
          align-self: flex-start;
        }
        
        .featured-books__main-title {
          font-size: 2rem;
          margin-bottom: 5px;
          color: var(--primary-color);
        }
        
        .featured-books__main-author {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
        
        .featured-books__main-description {
          margin-bottom: 30px;
          line-height: 1.6;
          flex: 1;
        }
        
        .featured-books__main-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .featured-books__main-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .featured-books__secondary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        
        .featured-books__card {
          display: flex;
          background-color: var(--light-color);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .featured-books__card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .featured-books__card-image {
          flex: 0 0 120px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .featured-books__card-content {
          flex: 1;
          padding: 15px;
          display: flex;
          flex-direction: column;
        }
        
        .featured-books__card-title {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: var(--text-color);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.8rem;
        }
        
        .featured-books__card-author {
          color: #666;
          margin-bottom: 10px;
          font-size: 0.9rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .featured-books__card-price {
          font-weight: 700;
          color: var(--primary-color);
          margin-top: auto;
        }
        
        @media (max-width: 992px) {
          .featured-books__main-image {
            flex: 0 0 250px;
          }
          
          .featured-books__secondary {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .featured-books__main {
            flex-direction: column;
          }
          
          .featured-books__main-image {
            flex: 0 0 auto;
            height: auto;
            padding: 20px 20px 0;
          }
          
          .featured-books__cover {
            max-height: 300px;
            width: auto;
            margin: 0 auto;
            display: block;
          }
          
          .featured-books__main-content {
            padding: 20px;
          }
          
          .featured-books__main-title {
            font-size: 1.5rem;
          }
          
          .featured-books__main-info {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .featured-books__main-info button {
            width: 100%;
          }
          
          .featured-books__secondary {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .featured-books__secondary {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .featured-books__card {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
