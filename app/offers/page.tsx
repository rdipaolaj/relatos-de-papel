"use client"

import { mockBooks } from "@/data/mockBooks"
import BookList from "@/components/BookList"
import OffersBanner from "@/components/OffersBanner"
import Newsletter from "@/components/Newsletter"

// Simular ofertas con descuentos
const booksWithOffers = mockBooks
  .map((book, index) => {
    // Aplicar descuentos a algunos libros
    if (index % 2 === 0) {
      const discountPercentage = 15 + (index % 3) * 5 // Descuentos de 15%, 20% o 25%
      const originalPrice = book.price
      const discountedPrice = originalPrice * (1 - discountPercentage / 100)

      return {
        ...book,
        originalPrice,
        price: Number.parseFloat(discountedPrice.toFixed(2)),
        discountPercentage,
      }
    }

    return book
  })
  .filter((book) => "discountPercentage" in book)

export default function OffersPage() {
  return (
    <div className="offers-page">
      <OffersBanner />

      <div className="offers-page__content">
        <h1 className="offers-page__title">Ofertas Especiales</h1>
        <p className="offers-page__description">
          Aprovecha nuestras ofertas por tiempo limitado en una selección de títulos
        </p>

        <div className="offers-page__timer">
          <div className="offers-page__timer-text">Las ofertas terminan en:</div>
          <div className="offers-page__timer-digits">
            <div className="offers-page__timer-digit">
              <span>2</span>
              <small>Días</small>
            </div>
            <div className="offers-page__timer-separator">:</div>
            <div className="offers-page__timer-digit">
              <span>18</span>
              <small>Horas</small>
            </div>
            <div className="offers-page__timer-separator">:</div>
            <div className="offers-page__timer-digit">
              <span>45</span>
              <small>Min</small>
            </div>
          </div>
        </div>

        <div className="offers-page__books">
          <BookList books={booksWithOffers} />
        </div>

        <Newsletter />
      </div>

      <style jsx>{`
        .offers-page__content {
          margin-top: 40px;
        }
        
        .offers-page__title {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 10px;
          text-align: center;
        }
        
        .offers-page__description {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 30px;
          color: #666;
          font-size: 1.1rem;
        }
        
        .offers-page__timer {
          background-color: var(--primary-color);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 40px;
          text-align: center;
        }
        
        .offers-page__timer-text {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        
        .offers-page__timer-digits {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        
        .offers-page__timer-digit {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 10px 15px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 70px;
        }
        
        .offers-page__timer-digit span {
          font-size: 2rem;
          font-weight: 700;
        }
        
        .offers-page__timer-digit small {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .offers-page__timer-separator {
          font-size: 2rem;
          font-weight: 700;
        }
        
        .offers-page__books {
          margin-bottom: 60px;
        }
        
        @media (max-width: 768px) {
          .offers-page__timer-digits {
            flex-wrap: wrap;
          }
          
          .offers-page__timer-digit {
            min-width: 60px;
          }
          
          .offers-page__timer-digit span {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
