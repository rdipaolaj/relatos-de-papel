"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"

export default function OffersBanner() {
  const router = useRouter()

  return (
    <div className="offers-banner">
      <div className="offers-banner__content">
        <div className="offers-banner__badge">Hasta 25% de descuento</div>
        <h2 className="offers-banner__title">Ofertas Especiales</h2>
        <p className="offers-banner__text">
          Aprovecha nuestras ofertas por tiempo limitado en una selección de títulos. ¡No te pierdas estas increíbles
          oportunidades!
        </p>
        <Button variant="secondary" onClick={() => router.push("/home")} className="offers-banner__button">
          Ver todas las ofertas
        </Button>
      </div>

      <div className="offers-banner__image-container">
        <div className="offers-banner__discount-tag">-25%</div>
        <Image
          src="/offers-banner.png"
          alt="Ofertas especiales"
          width={500}
          height={300}
          className="offers-banner__image"
        />
      </div>

      <style jsx>{`
        .offers-banner {
          display: flex;
          background: linear-gradient(135deg, #ff9a3c 0%, #ff7b00 100%);
          border-radius: 12px;
          overflow: hidden;
          color: var(--text-color);
          margin-bottom: 40px;
        }
        
        .offers-banner__content {
          flex: 1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        
        .offers-banner__badge {
          background-color: white;
          color: var(--primary-color);
          font-weight: 700;
          padding: 5px 15px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 15px;
          font-size: 0.9rem;
        }
        
        .offers-banner__title {
          font-size: 2rem;
          margin-bottom: 15px;
          color: white;
        }
        
        .offers-banner__text {
          margin-bottom: 25px;
          line-height: 1.6;
          color: white;
        }
        
        .offers-banner__button {
          align-self: flex-start;
          background-color: white;
          color: var(--primary-color);
        }
        
        .offers-banner__image-container {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .offers-banner__discount-tag {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: #e74c3c;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          z-index: 1;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
          .offers-banner {
            flex-direction: column;
          }
          
          .offers-banner__content {
            padding: 30px;
          }
          
          .offers-banner__title {
            font-size: 1.5rem;
          }
          
          .offers-banner__image-container {
            height: 200px;
          }
        }
      `}</style>
    </div>
  )
}
