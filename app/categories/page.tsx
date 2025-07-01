"use client"

import { useState, useEffect } from "react"
import { mockBooks } from "@/data/mockBooks"
import BookList from "@/components/BookList"
import CategoryFilter from "@/components/CategoryFilter"
import type { Book } from "@/types"
import { API_BASE_URL } from "@/config/utils"

const CATEGORIES_URL = `${API_BASE_URL}/v1/api/categories/find-all`
// Categorías disponibles
const categories = [
  { id: "all", name: "Todas" },
  { id: "fiction", name: "Ficción" },
  { id: "classic", name: "Clásicos" },
  { id: "fantasy", name: "Fantasía" },
  { id: "romance", name: "Romance" },
  { id: "mystery", name: "Misterio" },
]

// Asignar categorías a los libros mock
const booksWithCategories = mockBooks.map((book) => {
  let category = "fiction"

  if (book.title.includes("Harry Potter")) {
    category = "fantasy"
  } else if (book.title.includes("Quijote") || book.title.includes("Orgullo") || book.title.includes("Crimen")) {
    category = "classic"
  } else if (book.title.includes("Orgullo")) {
    category = "romance"
  } else if (book.title.includes("sombra") || book.title.includes("1984")) {
    category = "mystery"
  }

  return {
    ...book,
    category,
  }
})

/**
 * Página de categorías que muestra libros filtrados por categoría.
 *
 * @returns {JSX.Element} Elemento JSX con la página de categorías
 */
export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredBooks, setFilteredBooks] = useState<(Book & { category: string })[]>(booksWithCategories)
  const [isLoading, setIsLoading] = useState(true)

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([
    { id: "all", name: "Todas" }
  ])
  const [loadingCategories, setLoadingCategories] = useState(true)


  useEffect(() => {
    setLoadingCategories(true)
    fetch(CATEGORIES_URL, {
      headers: {
        "X-Api-version": "1"
      }
    })
      .then(res => res.json())
      .then(data => {
        // Ajusta esto según la estructura real de tu respuesta
        console.log("Data del API",data)
        const apiCategories = Array.isArray(data)
          ? data.map((cat: any) => ({
              id: cat.id?.toString() ?? cat._id ?? cat.slug ?? "",
              name: cat.name ?? cat.title ?? ""
            }))
          : []
        setCategories([{ id: "all", name: "Todas" }, ...apiCategories])
      })
      .catch(() => {
        setCategories([{ id: "all", name: "Todas" }])
      })
      .finally(() => setLoadingCategories(false))
  }, [])

  console.log("Categories:", categories)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      if (selectedCategory === "all") {
        setFilteredBooks(booksWithCategories)
      } else {
        const filtered = booksWithCategories.filter((book) => book.category === selectedCategory)
        setFilteredBooks(filtered)
      }
      setIsLoading(false)
    }, 100)
  }, [selectedCategory])

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



      {isLoading ? (
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
