"use client"

import type React from "react"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  onClick?: (e: React.MouseEvent) => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
}

/**
 * Componente de botón reutilizable con diferentes variantes.
 *
 * @param {ButtonProps} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} [props.variant="primary"] - Variante visual del botón (primary, secondary, outline)
 * @param {Function} [props.onClick] - Función a ejecutar al hacer clic
 * @param {string} [props.type="button"] - Tipo de botón HTML
 * @param {boolean} [props.disabled=false] - Si el botón está deshabilitado
 * @param {string} [props.className=""] - Clases CSS adicionales
 * @returns {JSX.Element} Elemento JSX con el botón
 */
export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button--${variant} ${className} ${disabled ? "button--disabled" : ""}`}
    >
      {children}

      <style jsx>{`
        .button {
          padding: 10px 20px;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .button--primary {
          background-color: var(--primary-color);
          color: var(--light-color);
        }
        
        .button--primary:hover:not(:disabled) {
          background-color: #143d25;
        }
        
        .button--secondary {
          background-color: var(--secondary-color);
          color: var(--text-color);
        }
        
        .button--secondary:hover:not(:disabled) {
          background-color: #e88a35;
        }
        
        .button--outline {
          background-color: transparent;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
        }
        
        .button--outline:hover:not(:disabled) {
          background-color: var(--primary-color);
          color: var(--light-color);
        }
        
        .button--disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </button>
  )
}
