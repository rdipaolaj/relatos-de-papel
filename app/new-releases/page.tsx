"use client"

import { useState, useEffect } from "react"
import { mockBooks } from "@/data/mockBooks"
import BookList from "@/components/BookList"
import NewReleasesBanner from "@/components/NewReleasesBanner"

// Ordenar libros por año de publicación (simulando nuevos lanzamientos)
const newReleases = [...mockBooks]
  .sort((a, b) => b.publishYear - a.publishYear)
  .slice(0, 4)
  .map((book) => ({
    ...book,
    isNew: true,
  }))

/**
 * Página de nuevos lanzamientos.
 * Muestra los libros más recientes y próximos lanzamientos.
 *
 * @returns {JSX.Element} Elemento JSX con la página de nuevos lanzamientos
 */
export default function NewReleasesPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 100)
  }, [])

  return (
    <div className="new-releases-page">
      <NewReleasesBanner />

      <div className="new-releases-page__content">
        <h1 className="new-releases-page__title">Novedades Literarias</h1>
        <p className="new-releases-page__description">
          Descubre los últimos lanzamientos y las obras más recientes que han llegado a nuestra librería
        </p>

        <div className="new-releases-page__books">
          {isLoading ? (
            <div className="new-releases-page__loading">Cargando novedades...</div>
          ) : (
            <BookList books={newReleases} />
          )}
        </div>

        <div className="new-releases-page__coming-soon">
          <h2 className="new-releases-page__subtitle">Próximamente</h2>
          <div className="new-releases-page__coming-soon-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="new-releases-page__coming-soon-item">
                <div className="new-releases-page__coming-soon-image">
                  <span className="new-releases-page__coming-soon-label">Próximamente</span>
                </div>
                <h3 className="new-releases-page__coming-soon-title">Título por anunciar</h3>
                <p className="new-releases-page__coming-soon-date">Lanzamiento: {new Date().getFullYear() + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .new-releases-page {
          padding-top: 20px;
        }
        
        .new-releases-page__content {
          margin-top: 40px;
        }
        
        .new-releases-page__title {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 10px;
          text-align: center;
        }
        
        .new-releases-page__description {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 40px;
          color: #666;
          font-size: 1.1rem;
        }
        
        .new-releases-page__books {
          margin-bottom: 60px;
        }
        
        .new-releases-page__loading {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: #666;
        }
        
        .new-releases-page__subtitle {
          font-size: 1.8rem;
          margin-bottom: 30px;
          text-align: center;
          color: var(--primary-color);
        }
        
        .new-releases-page__coming-soon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .new-releases-page__coming-soon-item {
          background-color: var(--light-color);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .new-releases-page__coming-soon-item:hover {
          transform: translateY(-5px);
        }
        
        .new-releases-page__coming-soon-image {
          height: 300px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .new-releases-page__coming-soon-label {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: var(--secondary-color);
          color: var(--text-color);
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .new-releases-page__coming-soon-title {
          padding: 15px 15px 5px;
          font-size: 1.2rem;
        }
        
        .new-releases-page__coming-soon-date {
          padding: 0 15px 15px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .new-releases-page__title {
            font-size: 2rem;
          }
          
          .new-releases-page__description {
            font-size: 1rem;
          }
          
          .new-releases-page__coming-soon-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
        
        @media (max-width: 480px) {
          .new-releases-page__coming-soon-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  )
}
