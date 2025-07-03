"use client"

import { Book } from "@/types/book"
import BookCard from "./BookCard"

interface BookListProps {
  books: Book[]
}

/**
 * Componente que muestra una lista de libros en formato de cuadrícula.
 *
 * @param {BookListProps} props - Propiedades del componente
 * @param {Book[]} props.books - Array de libros a mostrar
 * @returns {JSX.Element} Elemento JSX con la lista de libros
 */
export default function BookList({ books }: BookListProps) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-list__item">
          <BookCard book={book} />
        </div>
      ))}

      <style jsx>{`
        .book-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .book-list__item {
          display: flex;
          height: 100%;
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .book-list {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
        }
        
        @media (max-width: 480px) {
          .book-list {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }
      `}</style>
    </div>
  )
}
