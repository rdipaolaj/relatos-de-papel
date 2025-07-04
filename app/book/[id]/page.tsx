"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import type { Book } from "@/types"
import { useCart } from "@/hooks/useCart"
import Button from "@/components/Button"
import BookList from "@/components/BookList"
import { toast } from "sonner"

export default function BookDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([])
  const { addToCart, getQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (!id) return

    async function load() {
      try {
        // 1) Carga el libro por su id dinámico usando el proxy
        const resBook = await fetch(`/api/books/find-by-id/${id}`, {
          headers: { "X-Api-Version": "1" },
        })

        if (!resBook.ok) throw new Error("No pude cargar el libro")
        const { data: dto } = (await resBook.json()) as { data: any }

        // 2) Mapea del DTO al tipo local
        const mapped: Book = {
          id: dto.id,
          title: dto.title,
          author: dto.author, // Cambié de dto.authorName a dto.author
          price: dto.price,
          coverImage: dto.coverImage, // Cambié de dto.coverImageUrl a dto.coverImage
          description: dto.description, // Cambié de dto.summary a dto.description
          isbn: dto.isbn,
          pages: dto.pages || 0, // Agregar fallback si no existe
          publishYear: new Date(dto.publicationDate).getFullYear(),
          category: dto.category, // Cambié de dto.categoryName a dto.category
          stock: dto.stock,
        }

        setBook(mapped)

        // 3) Trae recomendaciones por autor y categoría usando el proxy
        const [byAuthorRes, byCatRes] = await Promise.all([
          fetch(`/api/books/search?authorId=${dto.authorId}`, {
            headers: { "X-Api-Version": "1" },
          }),
          fetch(`/api/books/search?categoryId=${dto.categoryId}`, {
            headers: { "X-Api-Version": "1" },
          }),
        ])

        const [{ data: authList }, { data: catList }] = await Promise.all([byAuthorRes.json(), byCatRes.json()])

        // 4) Une ambos arrays, elimina duplicados y excluye el libro actual
        const combined = [...authList, ...catList] as any[]
        const uniq = new Map<string, Book>()
        combined.forEach((b) => {
          if (b.id !== id && !uniq.has(b.id)) {
            uniq.set(b.id, {
              id: b.id,
              title: b.title,
              author: b.author, // Cambié de b.authorName a b.author
              price: b.price,
              coverImage: b.coverImage, // Cambié de b.coverImageUrl a b.coverImage
              description: b.description, // Cambié de b.summary a b.description
              isbn: b.isbn,
              pages: b.pages || 0,
              publishYear: new Date(b.publicationDate).getFullYear(),
              category: b.category, // Cambié de b.categoryName a b.category
              stock: b.stock,
            })
          }
        })

        // 5) Toma los primeros 4
        setRelatedBooks(Array.from(uniq.values()).slice(0, 4))
      } catch (err) {
        console.error(err)
        setErrorMsg("Error cargando datos. Intenta de nuevo más tarde.")
      }
    }

    load()
  }, [id])

  // Resetear el estado de addedToCart después de un tiempo
  useEffect(() => {
    if (addedToCart) {
      const t = setTimeout(() => setAddedToCart(false), 3000)
      return () => clearTimeout(t)
    }
  }, [addedToCart])

  if (!book) {
    return (
      <div className="book-detail__loading">
        <div className="book-detail__loading-spinner" />
        <p>Cargando información del libro…</p>
      </div>
    )
  }

  const handleAddToCart = async () => {
    if (!book) return

    try {
      // 1) Traigo el stock más reciente del servidor usando el proxy
      const res = await fetch(`/api/books/catalogue/find-by-id/${book.id}`, {
        headers: {
          "X-Api-Version": "1",
        },
      })

      if (!res.ok) throw new Error("No pude validar el stock")
      console.log(res)
      const { data: fresh } = (await res.json()) as { data: Book }
      const latestStock = fresh.stock

      // 2) ¿Cuánto llevo ya en el carrito?
      const already = getQuantity(book.id)
      console.log(latestStock)
      console.log(already)
      console.log(quantity)

      // 3) Validación
      if (already + quantity > latestStock) {
        toast.error(`Superaste el maximo del stock ${quantity}, las unidades disponibles son ${latestStock}.`)
        return
      }

      // 4) Si cabe, lo meto en el carrito en memoria
      for (let i = 0; i < quantity; i++) {
        await addToCart(book)
      }
      toast.success("¡Producto añadido al carrito!")
    } catch (err) {
      console.error(err)
      toast.error("Error validando stock. Intenta de nuevo.")
    }
  }

  const hasDiscount = "originalPrice" in book && "discountPercentage" in book

  return (
    <div className="book-detail-page">
      {addedToCart && (
        <div className="book-detail__notification">
          <div className="book-detail__notification-content">
            <span className="book-detail__notification-icon">✓</span>
            <span>Producto añadido al carrito</span>
          </div>
        </div>
      )}

      <div className="book-detail">
        <div className="book-detail__image-container">
          <Image
            src={book.coverImage || "/placeholder.svg"}
            alt={book.title}
            width={400}
            height={600}
            style={{ width: "100%", height: "auto" }}
            priority
            className="book-detail__image"
          />

          {hasDiscount && <div className="book-detail__discount">-{book.discountPercentage}% DESCUENTO</div>}

          {book.isNew && <div className="book-detail__badge book-detail__badge--new">Nuevo Lanzamiento</div>}
        </div>

        <div className="book-detail__content">
          <h1 className="book-detail__title">{book.title}</h1>
          <p className="book-detail__author">por {book.author}</p>

          <div className="book-detail__price-container">
            {hasDiscount ? (
              <>
                <span className="book-detail__original-price">{book.originalPrice?.toFixed(2)} €</span>
                <span className="book-detail__price book-detail__price--discounted">{book.price?.toFixed(2)} €</span>
                <span className="book-detail__saving">
                  Ahorras: {((book.originalPrice || 0) - book.price).toFixed(2)} €
                </span>
              </>
            ) : (
              <span className="book-detail__price">{book.price?.toFixed(2)} €</span>
            )}
          </div>

          <div className="book-detail__description">
            <h3 className="book-detail__section-title">Descripción:</h3>
            <p>{book.description}</p>
          </div>

          <div className="book-detail__info">
            <div className="book-detail__info-item">
              <span className="book-detail__info-label">ISBN:</span>
              <span>{book.isbn}</span>
            </div>
            <div className="book-detail__info-item">
              <span className="book-detail__info-label">Páginas:</span>
              <span>{book.pages}</span>
            </div>
            <div className="book-detail__info-item">
              <span className="book-detail__info-label">Año de publicación:</span>
              <span>{book.publishYear}</span>
            </div>
            {book.category && (
              <div className="book-detail__info-item">
                <span className="book-detail__info-label">Categoría:</span>
                <span>{book.category}</span>
              </div>
            )}
          </div>

          <div className="book-detail__actions">
            <div className="book-detail__quantity">
              <button
                className="book-detail__quantity-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="book-detail__quantity-value">{quantity}</span>
              <button className="book-detail__quantity-btn" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>

            <Button variant="primary" onClick={handleAddToCart} className="book-detail__add-button">
              Añadir al carrito
            </Button>
          </div>

          <div className="book-detail__delivery">
            <div className="book-detail__delivery-icon">🚚</div>
            <div className="book-detail__delivery-info">
              <p className="book-detail__delivery-title">Envío gratis</p>
              <p className="book-detail__delivery-text">En pedidos superiores a 30€</p>
            </div>
          </div>
        </div>
      </div>

      {relatedBooks.length > 0 && (
        <div className="book-detail__related">
          <h2 className="book-detail__related-title">También te puede interesar</h2>
          <BookList books={relatedBooks} />
        </div>
      )}

      <style jsx>{`
        .book-detail-page {
          margin-top: 30px;
          position: relative;
        }
        
        .book-detail__notification {
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 1000;
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .book-detail__notification-content {
          background-color: var(--success-color);
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .book-detail__notification-icon {
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .book-detail {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }
        
        .book-detail__image-container {
          position: relative;
        }
        
        .book-detail__image {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .book-detail__discount {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: var(--error-color);
          color: white;
          padding: 8px 15px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 1rem;
          transform: rotate(5deg);
        }
        
        .book-detail__badge {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 8px 15px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .book-detail__badge--new {
          background-color: var(--secondary-color);
          color: var(--text-color);
        }
        
        .book-detail__content {
          display: flex;
          flex-direction: column;
        }
        
        .book-detail__title {
          font-size: 2rem;
          margin-bottom: 10px;
          color: var(--primary-color);
        }
        
        .book-detail__author {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 20px;
        }
        
        .book-detail__price-container {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        
        .book-detail__price {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .book-detail__price--discounted {
          color: var(--error-color);
        }
        
        .book-detail__original-price {
          text-decoration: line-through;
          color: #999;
          font-size: 1.2rem;
        }
        
        .book-detail__saving {
          background-color: rgba(46, 204, 113, 0.1);
          color: var(--success-color);
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .book-detail__section-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: var(--primary-color);
        }
        
        .book-detail__description {
          margin-bottom: 25px;
          line-height: 1.6;
        }
        
        .book-detail__info {
          margin-bottom: 30px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        
        .book-detail__info-item {
          display: flex;
          flex-direction: column;
        }
        
        .book-detail__info-label {
          font-weight: 600;
          color: #666;
          font-size: 0.9rem;
        }
        
        .book-detail__actions {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .book-detail__quantity {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .book-detail__quantity-btn {
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .book-detail__quantity-btn:hover {
          background-color: #f0f0f0;
        }
        
        .book-detail__quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .book-detail__quantity-value {
          width: 40px;
          text-align: center;
          font-weight: 600;
        }
        
        .book-detail__add-button {
          flex: 1;
        }
        
        .book-detail__delivery {
          display: flex;
          align-items: center;
          gap: 15px;
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
        }
        
        .book-detail__delivery-icon {
          font-size: 1.8rem;
        }
        
        .book-detail__delivery-title {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .book-detail__delivery-text {
          font-size: 0.9rem;
          color: #666;
        }
        
        .book-detail__related {
          margin-top: 60px;
        }
        
        .book-detail__related-title {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 30px;
          text-align: center;
        }
        
        .book-detail__loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
          color: #666;
        }
        
        .book-detail__loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid var(--primary-color);
          border-radius: 50%;
          margin-bottom: 20px;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .book-detail {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .book-detail__title {
            font-size: 1.5rem;
          }
          
          .book-detail__price {
            font-size: 1.5rem;
          }
          
          .book-detail__info {
            grid-template-columns: 1fr;
          }
          
          .book-detail__notification {
            top: 70px;
            left: 20px;
            right: 20px;
          }
        }
      `}</style>
    </div>
  )
}
