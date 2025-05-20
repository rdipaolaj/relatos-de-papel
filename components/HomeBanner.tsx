"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"

/**
 * Componente de banner principal para la página de inicio.
 * Muestra una imagen destacada y botones de llamada a la acción.
 *
 * @returns {JSX.Element} Elemento JSX con el banner principal
 */
export default function HomeBanner() {
  const router = useRouter()

  return (
    <div className="home-banner">
      <div className="home-banner__content">
        <h1 className="home-banner__title">Descubre mundos a través de las páginas</h1>
        <p className="home-banner__text">
          En Relatos de Papel encontrarás los mejores títulos de literatura clásica y contemporánea. Sumérgete en
          historias que transformarán tu perspectiva.
        </p>
        <div className="home-banner__buttons">
          <Button variant="primary" onClick={() => router.push("/categories")} className="home-banner__button">
            Explorar categorías
          </Button>
          <Button variant="outline" onClick={() => router.push("/new-releases")} className="home-banner__button">
            Novedades
          </Button>
        </div>
      </div>

      <div className="home-banner__image-container">
        <Image src="/home-banner.png" alt="Relatos de Papel" width={500} height={400} className="home-banner__image" />
      </div>

      <style jsx>{`
        .home-banner {
          display: flex;
          background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 40px;
        }
        
        .home-banner__content {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .home-banner__title {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 15px;
          line-height: 1.2;
        }
        
        .home-banner__text {
          margin-bottom: 25px;
          line-height: 1.6;
          color: #555;
        }
        
        .home-banner__buttons {
          display: flex;
          gap: 15px;
        }
        
        .home-banner__image-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        @media (max-width: 768px) {
          .home-banner {
            flex-direction: column-reverse;
          }
          
          .home-banner__content {
            padding: 30px;
          }
          
          .home-banner__title {
            font-size: 1.8rem;
          }
          
          .home-banner__buttons {
            flex-direction: column;
          }
          
          .home-banner__image-container {
            height: 250px;
          }
        }
      `}</style>
    </div>
  )
}
