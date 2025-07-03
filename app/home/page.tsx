"use client"

import { useState, useEffect } from "react"
import BookList from "@/components/BookList"
import HomeBanner from "@/components/HomeBanner"
import FeaturedBooks from "@/components/FeaturedBooks"
import Newsletter from "@/components/Newsletter"
import Testimonials from "@/components/Testimonials"
import type { Book } from "@/types/book"
import { searchBooks } from "@/services/bookService"

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 8

  useEffect(() => {
  const loadBooks = async () => {
    setIsLoading(true)
    try {
      const searchRequest = {                 
        visible: true,               
      }

      const pageResponse = await searchBooks(searchRequest, page, pageSize)
      setBooks(pageResponse.content)
      setTotalPages(pageResponse.totalPages)
    } catch (error) {
      console.error("Error searching books:", error)
    } finally {
      setIsLoading(false)
    }
  }

  loadBooks()
}, [page])


  function renderPagination() {
    const maxVisible = 5
    const pages = []
    let startPage = Math.max(0, page - 2)
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(0, endPage - maxVisible + 1)
    }

    if (startPage > 0) {
      pages.push(<span key="start-ellipsis">...</span>)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`page-button ${page === i ? "active" : ""}`}
        >
          {i + 1}
        </button>
      )
    }

    if (endPage < totalPages - 1) {
      pages.push(<span key="end-ellipsis">...</span>)
    }

    return pages
  }

  return (
    <div className="home-page">
      <HomeBanner />
      <FeaturedBooks books={books.slice(0, 4)} />

      <div className="home-page__catalog">
        <h2 className="home-page__section-title">Catálogo completo</h2>

        {isLoading ? (
          <div className="home-page__loading">Cargando libros...</div>
        ) : (
          <>
            <BookList books={books} />

            <div className="pagination-controls">
              <button onClick={() => setPage(0)} disabled={page === 0}>
                ⏮ Primera
              </button>
              <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>
                ◀ Anterior
              </button>

              {renderPagination()}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                disabled={page + 1 === totalPages}
              >
                Siguiente ▶
              </button>
              <button
                onClick={() => setPage(totalPages - 1)}
                disabled={page + 1 === totalPages}
              >
                Última ⏭
              </button>
            </div>
          </>
        )}
      </div>

      <Testimonials />
      <Newsletter />

      <style jsx>{`
        .home-page__catalog {
          margin: 60px 0;
          text-align: center;
        }

        .home-page__section-title {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 30px;
        }

        .home-page__loading {
          padding: 40px;
          font-size: 1.2rem;
          color: #666;
        }

        .pagination-controls {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          align-items: center;
        }

        button {
          padding: 8px 16px;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          background-color: #eee;
          font-weight: bold;
        }

        button:hover:not(:disabled) {
          background-color: #ddd;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .page-button.active {
          background-color: var(--primary-color);
          color: white;
        }

        .page-button {
          min-width: 40px;
        }

        span {
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .home-page__catalog {
            margin: 40px 0;
          }

          .home-page__section-title {
            font-size: 1.5rem;
            margin-bottom: 20px;
          }

          .pagination-controls {
            gap: 6px;
          }

          button {
            padding: 6px 10px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  )
}
