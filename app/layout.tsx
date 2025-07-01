import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CartProvider } from "@/context/CartContext"

// 1) Importa el Toaster de sonner
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Relatos de Papel",
  description: "Tu librería online favorita",
}

/**
 * Componente de layout principal de la aplicación.
 * Envuelve toda la aplicación con el proveedor de contexto del carrito
 * y establece la estructura básica con header, main y footer.
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar dentro del layout
 * @returns {JSX.Element} Elemento JSX con la estructura principal de la aplicación
 */
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
      <body className={inter.className}>
      {/* 2) Monta el Toaster aquí, sólo una vez */}
      <Toaster position="top-right" />

      <CartProvider>
        <div className="app">
          <Header />
          <main className="app__main">{children}</main>
          <Footer />
        </div>
      </CartProvider>
      </body>
      </html>
  )
}
