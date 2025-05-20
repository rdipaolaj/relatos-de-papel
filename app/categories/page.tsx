"use client"

import { useState, useEffect } from "react"
import { mockBooks } from "@/data/mockBooks"
import BookList from "@/components/BookList"
import CategoryFilter from "@/components/CategoryFilter"
import type { Book } from "@/types"

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

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredBooks, setFilteredBooks] = useState<(Book & { category: string })[]>(booksWithCategories)

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredBooks(booksWithCategories)
    } else {
      const filtered = booksWithCategories.filter((book) => book.category === selectedCategory)
      setFilteredBooks(filtered)
    }
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

      {filteredBooks.length > 0 ? (
        <BookList books={filteredBooks} />
      ) : (
        <p className="categories-page__no-results">No hay libros disponibles en esta categoría</p>
      )}

      <style jsx>{`
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
        
        .categories-page__no-results {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>
    </div>
  )
}
