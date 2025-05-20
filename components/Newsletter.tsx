"use client"

import type React from "react"

import { useState } from "react"
import Button from "./Button"

/**
 * Componente de formulario de suscripción a newsletter.
 * Permite a los usuarios suscribirse para recibir actualizaciones.
 *
 * @returns {JSX.Element} Elemento JSX con el formulario de newsletter
 */
export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  /**
   * Maneja el envío del formulario de suscripción.
   * Valida el email y muestra un mensaje de éxito.
   *
   * @param {React.FormEvent} e - Evento de envío del formulario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica de email
    if (!email || !email.includes("@")) {
      setError("Por favor, introduce un email válido")
      return
    }

    // Simulación de envío exitoso
    setIsSubmitted(true)
    setError("")
  }

  return (
    <div className="newsletter">
      <div className="newsletter__content">
        <h2 className="newsletter__title">Suscríbete a nuestro boletín</h2>
        <p className="newsletter__description">
          Recibe las últimas novedades, ofertas exclusivas y recomendaciones literarias directamente en tu correo.
        </p>

        {isSubmitted ? (
          <div className="newsletter__success">
            <div className="newsletter__success-icon">✓</div>
            <p className="newsletter__success-message">
              ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
            </p>
          </div>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__input-group">
              <input
                type="email"
                className={`newsletter__input ${error ? "newsletter__input--error" : ""}`}
                placeholder="Tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="secondary" className="newsletter__button">
                Suscribirse
              </Button>
            </div>
            {error && <p className="newsletter__error">{error}</p>}
          </form>
        )}
      </div>

      <style jsx>{`
        .newsletter {
          background-color: var(--light-color);
          border-radius: 12px;
          padding: 40px;
          margin: 60px 0;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .newsletter__content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .newsletter__title {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 15px;
        }
        
        .newsletter__description {
          color: #666;
          margin-bottom: 30px;
          line-height: 1.6;
        }
        
        .newsletter__form {
          width: 100%;
        }
        
        .newsletter__input-group {
          display: flex;
          gap: 10px;
        }
        
        .newsletter__input {
          flex: 1;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .newsletter__input--error {
          border-color: var(--error-color);
        }
        
        .newsletter__error {
          color: var(--error-color);
          font-size: 0.9rem;
          margin-top: 10px;
          text-align: left;
        }
        
        .newsletter__success {
          background-color: rgba(46, 204, 113, 0.1);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid var(--success-color);
        }
        
        .newsletter__success-icon {
          width: 40px;
          height: 40px;
          background-color: var(--success-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 15px;
        }
        
        .newsletter__success-message {
          color: var(--success-color);
          font-weight: 500;
        }
        
        @media (max-width: 768px) {
          .newsletter {
            padding: 30px 20px;
          }
          
          .newsletter__input-group {
            flex-direction: column;
          }
          
          .newsletter__button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
