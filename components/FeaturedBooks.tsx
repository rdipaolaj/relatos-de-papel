"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Book } from "@/types"
import Button from "./Button"

interface FeaturedBooksProps {
  books: Book[]
}

export default function FeaturedBooks({ books }: FeaturedBooksProps) {
  const router = useRouter()

  // Asegurarse de que tenemos al menos un libro destacado
  const featuredBook = books.length > 0 ? books[0] : null

  if (!featuredBook) return null

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
        }
        
        .featured-books__main-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .featured-books__secondary {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
        }
        
        .featured-books__card-title {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: var(--text-color);
        }
        
        .featured-books__card-author {
          color: #666;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }
        
        .featured-books__card-price {
          font-weight: 700;
          color: var(--primary-color);
        }
        
        @media (max-width: 768px) {
          .featured-books__main {
            flex-direction: column;
          }
          
          .featured-books__main-image {
            flex: 0 0 auto;
            height: 300px;
          }
          
          .featured-books__main-title {
            font-size: 1.5rem;
          }
          
          .featured-books__secondary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
