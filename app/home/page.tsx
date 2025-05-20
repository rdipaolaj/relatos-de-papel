"use client"

import { useState, useEffect } from "react"
import BookList from "@/components/BookList"
import HomeBanner from "@/components/HomeBanner"
import FeaturedBooks from "@/components/FeaturedBooks"
import Newsletter from "@/components/Newsletter"
import Testimonials from "@/components/Testimonials"
import type { Book } from "@/types"
import { mockBooks } from "@/data/mockBooks"

/**
 * Página principal de la aplicación.
 * Muestra un banner principal, libros destacados, el catálogo completo,
 * testimonios de clientes y un formulario de newsletter.
 *
 * @returns {JSX.Element} Elemento JSX con la página principal
 */
export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 100))
      setBooks(mockBooks)
      setFilteredBooks(mockBooks)
      setIsLoading(false)
    }

    loadBooks()
  }, [])

  return (
    <div className="home-page">
      <HomeBanner />
      <FeaturedBooks books={books.slice(0, 4)} />

      <div className="home-page__catalog">
        <h2 className="home-page__section-title">Catálogo completo</h2>
        {isLoading ? <div className="home-page__loading">Cargando libros...</div> : <BookList books={books} />}
      </div>

      <Testimonials />
      <Newsletter />

      <style jsx>{`
        .home-page__catalog {
          margin: 60px 0;
        }
        
        .home-page__section-title {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 30px;
          text-align: center;
        }
        
        .home-page__loading {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .home-page__catalog {
            margin: 40px 0;
          }
          
          .home-page__section-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  )
}
