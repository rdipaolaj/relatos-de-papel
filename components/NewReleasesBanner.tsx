"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"

export default function NewReleasesBanner() {
  const router = useRouter()

  return (
    <div className="new-releases-banner">
      <div className="new-releases-banner__content">
        <h2 className="new-releases-banner__title">Descubre las últimas novedades</h2>
        <p className="new-releases-banner__text">
          Explora los títulos más recientes que han llegado a nuestra librería. Mantente al día con las últimas
          tendencias literarias.
        </p>
        <Button variant="secondary" onClick={() => router.push("/home")} className="new-releases-banner__button">
          Ver todos los libros
        </Button>
      </div>

      <div className="new-releases-banner__image-container">
        <Image
          src="/new-releases-banner.png"
          alt="Nuevos lanzamientos"
          width={500}
          height={300}
          className="new-releases-banner__image"
        />
      </div>

      <style jsx>{`
        .new-releases-banner {
          display: flex;
          background: linear-gradient(135deg, var(--primary-color) 0%, #0f2e1b 100%);
          border-radius: 12px;
          overflow: hidden;
          color: white;
          margin-bottom: 40px;
        }
        
        .new-releases-banner__content {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .new-releases-banner__title {
          font-size: 2rem;
          margin-bottom: 15px;
        }
        
        .new-releases-banner__text {
          margin-bottom: 25px;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .new-releases-banner__button {
          align-self: flex-start;
        }
        
        .new-releases-banner__image-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        @media (max-width: 768px) {
          .new-releases-banner {
            flex-direction: column;
          }
          
          .new-releases-banner__content {
            padding: 30px;
          }
          
          .new-releases-banner__title {
            font-size: 1.5rem;
          }
          
          .new-releases-banner__image-container {
            height: 200px;
          }
        }
      `}</style>
    </div>
  )
}
