"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import Cart from "./Cart"
import { ShoppingBag, Menu, X, Search } from "lucide-react"
import { mockBooks } from "@/data/mockBooks"
import type { Book } from "@/types"

/**
 * Componente de cabecera de la aplicación.
 * Incluye el logo, navegación principal, barra de búsqueda y acceso al carrito.
 *
 * @returns {JSX.Element} Elemento JSX con la cabecera
 */
export default function Header() {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  /**
   * Alterna la visibilidad del carrito.
   */
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  /**
   * Alterna la visibilidad del menú móvil.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isCartOpen) setIsCartOpen(false)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  /**
   * Alterna la visibilidad de la barra de búsqueda.
   */
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchTerm("")
      setSearchResults([])
    }
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
    if (isCartOpen) setIsCartOpen(false)
  }

  /**
   * Navega a la ruta especificada y cierra el menú móvil.
   *
   * @param {string} path - Ruta a la que navegar
   */
  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMobileMenuOpen(false)
  }

  // Detectar scroll para cambiar el estilo del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMobileMenuOpen])

  /**
   * Maneja el cambio en el input de búsqueda y filtra los resultados.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.trim() === "") {
      setSearchResults([])
      return
    }

    const term = value.toLowerCase()
    const results = mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.toLowerCase().includes(term),
    )

    setSearchResults(results)
  }

  /**
   * Navega a la página de detalle del libro seleccionado.
   *
   * @param {string} bookId - ID del libro seleccionado
   */
  const handleBookClick = (bookId: string) => {
    router.push(`/book/${bookId}`)
    setIsSearchOpen(false)
    setSearchTerm("")
    setSearchResults([])
  }

  /**
   * Determina si una ruta está activa.
   *
   * @param {string} path - Ruta a comprobar
   * @returns {string} Clase CSS para marcar la ruta activa
   */
  const isActive = (path: string) => {
    return pathname === path ? "header__nav-link--active" : ""
  }

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__container">
        <div className="header__logo-container">
          <Link href="/home" className="header__logo-link">
            <div className="header__logo-wrapper">
              <Image
                src="/book-logo.png"
                alt="Relatos de Papel"
                width={40}
                height={40}
                className="header__logo"
                priority
              />
            </div>
            <h1 className="header__title">Relatos de Papel</h1>
          </Link>
        </div>

        <div className={`header__search ${isSearchOpen ? "header__search--open" : ""}`} ref={searchRef}>
          <div className="header__search-form">
            <input
              type="text"
              placeholder="Buscar por título, autor o ISBN..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="header__search-input"
              onFocus={() => setIsSearchOpen(true)}
            />
            <button type="button" className="header__search-button" onClick={() => setIsSearchOpen(true)}>
              <Search size={18} />
            </button>
          </div>

          {isSearchOpen && searchResults.length > 0 && (
            <div className="header__search-results">
              {searchResults.map((book) => (
                <div key={book.id} className="header__search-result" onClick={() => handleBookClick(book.id)}>
                  <div className="header__search-result-image">
                    <Image src={book.coverImage || "/placeholder.svg"} alt={book.title} width={40} height={60} />
                  </div>
                  <div className="header__search-result-info">
                    <h4 className="header__search-result-title">{book.title}</h4>
                    <p className="header__search-result-author">{book.author}</p>
                  </div>
                  <div className="header__search-result-price">{book.price.toFixed(2)} €</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className={`header__nav ${isMobileMenuOpen ? "header__nav--mobile-open" : ""}`}>
          <button className="header__nav-item" onClick={() => handleNavigation("/home")}>
            <span className={`header__nav-link ${isActive("/home")}`}>Inicio</span>
          </button>

          <button className="header__nav-item" onClick={() => handleNavigation("/categories")}>
            <span className={`header__nav-link ${isActive("/categories")}`}>Categorías</span>
          </button>

          <button className="header__nav-item" onClick={() => handleNavigation("/new-releases")}>
            <span className={`header__nav-link ${isActive("/new-releases")}`}>Novedades</span>
          </button>

          <button className="header__nav-item" onClick={() => handleNavigation("/offers")}>
            <span className={`header__nav-link ${isActive("/offers")}`}>Ofertas</span>
          </button>
        </nav>

        <div className="header__actions">
          <button className="header__search-toggle" onClick={toggleSearch} aria-label="Buscar">
            <Search size={24} />
          </button>
          <button className="header__cart-button" onClick={toggleCart} aria-label="Ver carrito">
            <ShoppingBag size={24} />
            {cart.length > 0 && <span className="header__cart-count">{cart.length}</span>}
          </button>

          <button className="header__mobile-menu-button" onClick={toggleMobileMenu} aria-label="Menú">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {(isCartOpen || isMobileMenuOpen) && (
        <div
          className="overlay overlay--visible"
          onClick={() => {
            setIsCartOpen(false)
            setIsMobileMenuOpen(false)
          }}
        />
      )}

      <style jsx>{`
        .header {
          background-color: var(--light-color);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.3s ease;
          height: var(--header-height);
        }
        
        .header--scrolled {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header__container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
        }
        
        .header__logo-container {
          display: flex;
          align-items: center;
          min-width: 200px;
        }
        
        .header__logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--text-color);
          z-index: 101;
          flex-direction: row;
        }
        
        .header__logo-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          flex-shrink: 0;
        }
        
        .header__logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        
        .header__title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          padding: 0;
          white-space: nowrap;
        }
        
        .header__search {
          flex: 1;
          max-width: 500px;
          margin: 0 20px;
          position: relative;
        }
        
        .header__search-form {
          display: flex;
          width: 100%;
        }
        
        .header__search-input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 0.9rem;
          width: 100%;
        }
        
        .header__search-button {
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 0 15px;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .header__search-results {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: white;
          border-radius: 0 0 4px 4px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-height: 400px;
          overflow-y: auto;
          z-index: 200;
        }
        
        .header__search-result {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        
        .header__search-result:hover {
          background-color: #f9f9f9;
        }
        
        .header__search-result:last-child {
          border-bottom: none;
        }
        
        .header__search-result-image {
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .header__search-result-info {
          flex: 1;
        }
        
        .header__search-result-title {
          font-size: 0.9rem;
          margin-bottom: 3px;
        }
        
        .header__search-result-author {
          font-size: 0.8rem;
          color: #666;
        }
        
        .header__search-result-price {
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .header__nav {
          display: flex;
          gap: 30px;
        }
        
        .header__nav-item {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font: inherit;
          position: relative;
          z-index: 1002;
        }
        
        .header__nav-link {
          text-decoration: none;
          color: var(--text-color);
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
          padding: 5px 0;
        }
        
        .header__nav-link:hover,
        .header__nav-link--active {
          color: var(--primary-color);
        }
        
        .header__nav-link--active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--primary-color);
        }
        
        .header__actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .header__cart-button,
        .header__search-toggle {
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 101;
        }
        
        .header__search-toggle {
          display: none;
        }
        
        .header__cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--secondary-color);
          color: var(--text-color);
          font-size: 0.75rem;
          font-weight: 700;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .header__mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 101;
        }
        
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
          display: none;
        }
        
        .overlay--visible {
          display: block;
        }
        
        @media (max-width: 992px) {
          .header__search {
            max-width: 300px;
          }
        }
        
        @media (max-width: 768px) {
          .header__logo-container {
            flex-direction: row;
            align-items: center;
          }
          
          .header__logo-link {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          
          .header__title {
            font-size: 1.2rem;
          }
          
          .header__search {
            display: none;
          }
          
          .header__search--open {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 10px;
            background-color: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 200;
          }
          
          .header__search-toggle {
            display: flex;
          }
          
          .header__nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: var(--light-color);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 100;
          }
          
          .header__nav--mobile-open {
            transform: translateX(0);
            z-index: 1001;
          }
          
          .header__nav-item {
            width: auto;
            padding: 10px 20px;
            border-radius: 4px;
            transition: background-color 0.3s ease;
            margin: 5px 0;
            display: block;
            width: 80%; /* Ancho definido */
            text-align: center; /* Centrar texto */
          }
          
          .header__nav-item:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
          
          .header__nav-link {
            font-size: 1.5rem;
            display: block;
            width: 100%;
            text-align: center;
            padding: 10px 0;
          }
          
          .header__mobile-menu-button {
            display: block;
          }
        }
      `}</style>
    </header>
  )
}
