"use client"

import { useState, useEffect, useMemo } from "react"
import { mockBooks } from "@/data/mockBooks"
import BookList from "@/components/BookList"
import CategoryFilter from "@/components/CategoryFilter"
import type { Book } from "@/types"
import { Princess_Sofia } from "next/font/google"

const CATEGORIES_URL = `${process.env.NEXT_PUBLIC_API_BASE_CATALOGUE}/v1/api/categories/find-all`
const BOOKS_URL = `${process.env.NEXT_PUBLIC_API_BASE_CATALOGUE}/v1/api/books/search`
/**
 * Página de categorías que muestra libros filtrados por categoría.
 *
 * @returns {JSX.Element} Elemento JSX con la página de categorías
 */
export default function CategoriesPage() {
  
  
  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([
    { id: "0", name: "Todas" }
  ])
  const [selectedCategory, setSelectedCategory] = useState("0")
  const [loadingCategories, setLoadingCategories] = useState(true)
  
  const [books, setBooks] = useState<Book[]>([])
  const [loadingBooks, setLoadingBooks] = useState(true)

  // Cargar categorías desde la API

  useEffect(() => {
    ;(async () => {

      try {
        setLoadingCategories(true)

        const res  = await fetch(CATEGORIES_URL, {
          headers: { "X-Api-version": "1" },
        })
        const body = await res.json()
        const apiCategories =
          Array.isArray(body?.data)
            ? body.data.map((cat: any) => ({
                id:  cat.id?.toString() ?? cat._id ?? cat.slug ?? "",
                name: cat.name ?? cat.title ?? "",
              }))
            : []
        
        setCategories([{ id: "0", name: "Todas" }, ...apiCategories])
      } catch (err) {
        // fallback: sólo categoría “Todas”
        setCategories([{ id: "0", name: "Todas" }])
        console.error("Error cargando categorías:", err)
      } finally {
        setLoadingCategories(false)
      }
    })  ()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        setLoadingBooks(true)
        const res  = await fetch(BOOKS_URL, { headers: { "X-Api-Version": "1" } })
        const data = await res.json()
        const apiBooks: Book[] = Array.isArray(data?.data) 
          ? data.data.map((b: any) => ({
              id         : b.id         ?? b._id,
              title      : b.title      ?? "",
              author     : b.authorName     ?? "",
              coverUrl   : b.coverUrl   ?? "",
              category   : b.categoryName ?? "",
              categoryId : b.categoryId?.toString() ?? b.categoryId ?? "0",
              price      : b.price      ?? 0,              
              // ...otros campos de Book
            }))
          : []
        setBooks(apiBooks)
      } catch (err) {
        console.error("Error cargando libros:", err)
        setBooks([])
      } finally {
        setLoadingBooks(false)
      }
    })()
  }, [])

  /* --------- Libros filtrados (memo = cache) ---------------------- */
  const filteredBooks = useMemo(() => {
    if (selectedCategory === "0") return books
    return books.filter((bk) => bk.categoryId === selectedCategory  )
    console.log("Libros filtrados:", books) //OK
  }, [books, selectedCategory])
  /* --------------------------------------------------------------- */
  return (
    <div className="categories-page">
      <div className="categories-page__header">
        <h1 className="categories-page__title">Categorías</h1>
        <p className="categories-page__description">Explora nuestra colección de libros por categorías</p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}        
      />



      {loadingBooks ? (
        <div className="categories-page__loading">Cargando libros...</div>
      ) : filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} />
      ) : (
        <p className="categories-page__no-results">No hay libros disponibles en esta categoría</p>
      )}

      <style jsx>{`
        .categories-page {
          padding-top: 20px;
        }
        
        .categories-page__header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .categories-page__title {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 10px;
        }
        
        .categories-page__description {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .categories-page__loading {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: #666;
        }
        
        .categories-page__no-results {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .categories-page__title {
            font-size: 2rem;
          }
          
          .categories-page__description {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
