"use client"

interface Category {
  id: string
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

/**
 * Componente para filtrar libros por categoría.
 * Muestra una lista de botones para seleccionar diferentes categorías.
 *
 * @param {CategoryFilterProps} props - Propiedades del componente
 * @param {Category[]} props.categories - Lista de categorías disponibles
 * @param {string} props.selectedCategory - ID de la categoría actualmente seleccionada
 * @param {Function} props.onSelectCategory - Función a llamar cuando se selecciona una categoría
 * @returns {JSX.Element} Elemento JSX con los filtros de categoría
 */
export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <div className="category-filter__list">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-filter__item ${selectedCategory === category.id ? "category-filter__item--active" : ""
              }`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <style jsx>{`
        .category-filter {
          margin-bottom: 40px;
        }
        
        .category-filter__list {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        
        .category-filter__item {
          padding: 10px 20px;
          border-radius: 30px;
          background-color: #f0f0f0;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .category-filter__item:hover {
          background-color: #e0e0e0;
        }
        
        .category-filter__item--active {
          background-color: var(--primary-color);
          color: white;
        }
        
        @media (max-width: 768px) {
          .category-filter__list {
            gap: 10px;
          }
          
          .category-filter__item {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  )
}
