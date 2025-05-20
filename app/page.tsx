"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Button from "@/components/Button"

/**
 * Página de landing de la aplicación.
 * Muestra una pantalla de bienvenida con redirección automática a la página principal
 * después de un tiempo determinado, a menos que el usuario interactúe con la página.
 *
 * @returns {JSX.Element} Elemento JSX con la página de landing
 */
export default function LandingPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [userInteracted, setUserInteracted] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Efecto para manejar el contador de redirección
  useEffect(() => {
    if (userInteracted) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShouldRedirect(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Detectar interacción del usuario
    const handleInteraction = () => {
      setUserInteracted(true)
      clearInterval(timer)
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("keydown", handleInteraction)
    window.addEventListener("touchstart", handleInteraction)

    return () => {
      clearInterval(timer)
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }
  }, [userInteracted])

  // Efecto para manejar la redirección
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/home")
    }
  }, [shouldRedirect, router])

  return (
    <div className="landing">
      <div className="landing__content">
        <Image src="/book-logo.png" alt="Relatos de Papel Logo" width={150} height={150} className="landing__logo" />
        <h1 className="landing__title">Relatos de Papel</h1>
        <h2 className="landing__subtitle">Tu librería online favorita</h2>
        <p className="landing__redirect-text">{!userInteracted && `Redireccionando en ${countdown} segundos...`}</p>
        <Button variant="primary" onClick={() => router.push("/home")} className="landing__button">
          Entrar ahora
        </Button>
      </div>

      <div className="landing__background">
        <div className="landing__book landing__book--1">
          <Image src="/book-cover-1984.png" alt="Book" width={120} height={180} />
        </div>
        <div className="landing__book landing__book--2">
          <Image src="/el-principito-cover.png" alt="Book" width={100} height={150} />
        </div>
        <div className="landing__book landing__book--3">
          <Image src="/cien-anos-de-soledad-cover.png" alt="Book" width={110} height={165} />
        </div>
      </div>

      <style jsx>{`
        .landing {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          background-color: var(--light-color);
          position: relative;
          overflow: hidden;
        }
        
        .landing__content {
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
          max-width: 90%;
          width: 500px;
        }
        
        .landing__title {
          font-size: 3rem;
          margin-bottom: 20px;
          color: var(--primary-color);
        }
        
        .landing__subtitle {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--text-color);
        }
        
        .landing__redirect-text {
          margin-bottom: 20px;
          color: #666;
          font-style: italic;
        }
        
        .landing__button {
          min-width: 180px;
        }
        
        .landing__background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .landing__book {
          position: absolute;
          transform: rotate(var(--rotation));
          opacity: 0.7;
          transition: all 0.5s ease;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
        }
        
        .landing__book--1 {
          top: 15%;
          right: 15%;
          --rotation: 15deg;
        }
        
        .landing__book--2 {
          bottom: 20%;
          left: 10%;
          --rotation: -10deg;
        }
        
        .landing__book--3 {
          top: 60%;
          right: 20%;
          --rotation: 5deg;
        }
        
        @media (max-width: 768px) {
          .landing__title {
            font-size: 2.5rem;
          }
          
          .landing__subtitle {
            font-size: 1.2rem;
          }
          
          .landing__book {
            transform: scale(0.8) rotate(var(--rotation));
          }
        }
      `}</style>
    </div>
  )
}
