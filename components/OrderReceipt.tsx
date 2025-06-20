"use client"

import { useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Button from "./Button"
import type { CartItem } from "@/types"
import { Download, X, Printer } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface OrderReceiptProps {
    isOpen: boolean
    onClose: () => void
    orderItems: CartItem[]
    orderTotal: number
    orderNumber: string
    orderDate: Date
}

export default function OrderReceipt({
    isOpen,
    onClose,
    orderItems,
    orderTotal,
    orderNumber,
    orderDate,
}: OrderReceiptProps) {
    const router = useRouter()
    const receiptRef = useRef<HTMLDivElement>(null)

    if (!isOpen) return null

    const formattedDate = new Intl.DateTimeFormat("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(orderDate)

    const handleDownloadPDF = async () => {
        if (!receiptRef.current) return

        try {
            // Crear una copia del recibo para capturar (sin botones)
            const receiptContent = receiptRef.current.cloneNode(true) as HTMLElement
            const buttons = receiptContent.querySelectorAll(".receipt__buttons")
            buttons.forEach((button) => button.remove())

            // Añadir temporalmente al DOM para capturar
            receiptContent.style.position = "absolute"
            receiptContent.style.left = "-9999px"
            document.body.appendChild(receiptContent)

            // Capturar el contenido
            const canvas = await html2canvas(receiptContent, {
                scale: 2,
                backgroundColor: "#ffffff",
            })

            // Eliminar el elemento temporal
            document.body.removeChild(receiptContent)

            // Crear PDF
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            })

            // Añadir la imagen al PDF
            const imgData = canvas.toDataURL("image/png")
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
            pdf.save(`Comprobante_${orderNumber}.pdf`)
        } catch (error) {
            console.error("Error al generar el PDF:", error)
            alert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.")
        }
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="receipt-overlay">
            <div className="receipt-container">
                <div className="receipt" ref={receiptRef}>
                    <div className="receipt__header">
                        <div className="receipt__logo">
                            <Image src="/book-logo.png" alt="Relatos de Papel" width={60} height={60} />
                            <h2 className="receipt__store-name">Relatos de Papel</h2>
                        </div>
                        <div className="receipt__title">Comprobante de Compra</div>
                    </div>

                    <div className="receipt__info">
                        <div className="receipt__info-item">
                            <span className="receipt__label">Número de Pedido:</span>
                            <span className="receipt__value">{orderNumber}</span>
                        </div>
                        <div className="receipt__info-item">
                            <span className="receipt__label">Fecha:</span>
                            <span className="receipt__value">{formattedDate}</span>
                        </div>
                    </div>

                    <div className="receipt__items">
                        <table className="receipt__table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems.map((item) => (
                                    <tr key={item.book.id}>
                                        <td>
                                            <div className="receipt__product">
                                                <div className="receipt__product-image">
                                                    <Image
                                                        src={item.book.coverImage || "/placeholder.svg"}
                                                        alt={item.book.title}
                                                        width={40}
                                                        height={60}
                                                    />
                                                </div>
                                                <div className="receipt__product-info">
                                                    <div className="receipt__product-title">{item.book.title}</div>
                                                    <div className="receipt__product-author">{item.book.author}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.book.price.toFixed(2)} €</td>
                                        <td>{(item.book.price * item.quantity).toFixed(2)} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="receipt__summary">
                        <div className="receipt__summary-row">
                            <span>Subtotal:</span>
                            <span>{orderTotal.toFixed(2)} €</span>
                        </div>
                        <div className="receipt__summary-row">
                            <span>Envío:</span>
                            <span>{orderTotal >= 30 ? "Gratis" : "4.99 €"}</span>
                        </div>
                        <div className="receipt__summary-row receipt__summary-row--total">
                            <span>Total:</span>
                            <span>{(orderTotal >= 30 ? orderTotal : orderTotal + 4.99).toFixed(2)} €</span>
                        </div>
                    </div>

                    <div className="receipt__footer">
                        <p>¡Gracias por tu compra en Relatos de Papel!</p>
                        <p>Para cualquier consulta, contacta con nosotros en: rdipaolaj@outlook.com</p>
                    </div>

                    <div className="receipt__buttons">
                        <Button variant="outline" onClick={handlePrint} className="receipt__button">
                            <Printer size={16} />
                            <span>Imprimir</span>
                        </Button>
                        <Button variant="primary" onClick={handleDownloadPDF} className="receipt__button">
                            <Download size={16} />
                            <span>Descargar PDF</span>
                        </Button>
                        <Button variant="secondary" onClick={() => router.push("/home")} className="receipt__button">
                            Seguir comprando
                        </Button>
                    </div>
                </div>

                <button className="receipt__close" onClick={onClose}>
                    <X size={24} />
                </button>
            </div>

            <style jsx>{`
        .receipt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .receipt-container {
          position: relative;
          max-width: 800px;
          width: 100%;
          max-height: 90vh;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          overflow-y: auto;
        }
        
        .receipt {
          padding: 30px;
        }
        
        .receipt__header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .receipt__logo {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .receipt__store-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-left: 15px;
          color: var(--primary-color);
        }
        
        .receipt__title {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .receipt__info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .receipt__info-item {
          display: flex;
          flex-direction: column;
        }
        
        .receipt__label {
          font-weight: 600;
          color: #666;
          margin-bottom: 5px;
        }
        
        .receipt__value {
          font-size: 1.1rem;
        }
        
        .receipt__items {
          margin-bottom: 30px;
          overflow-x: auto;
        }
        
        .receipt__table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .receipt__table th {
          background-color: #f5f5f5;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #333;
        }
        
        .receipt__table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }
        
        .receipt__product {
          display: flex;
          align-items: center;
        }
        
        .receipt__product-image {
          margin-right: 15px;
        }
        
        .receipt__product-title {
          font-weight: 600;
          margin-bottom: 3px;
        }
        
        .receipt__product-author {
          font-size: 0.9rem;
          color: #666;
        }
        
        .receipt__summary {
          margin-bottom: 30px;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        .receipt__summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 1.1rem;
        }
        
        .receipt__summary-row--total {
          border-top: 1px solid #ddd;
          margin-top: 8px;
          padding-top: 15px;
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--primary-color);
        }
        
        .receipt__footer {
          text-align: center;
          margin-bottom: 30px;
          padding: 15px;
          border-top: 1px solid #eee;
          color: #666;
        }
        
        .receipt__buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        
        .receipt__button {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 160px;
        }
        
        .receipt__close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }
        
        .receipt__close:hover {
          background-color: #f0f0f0;
        }
        
        @media (max-width: 768px) {
          .receipt {
            padding: 20px;
          }
          
          .receipt__info {
            grid-template-columns: 1fr;
          }
          
          .receipt__buttons {
            flex-direction: column;
          }
          
          .receipt__button {
            width: 100%;
          }
        }
        
        @media print {
          .receipt-overlay {
            position: absolute;
            background-color: white;
          }
          
          .receipt-container {
            box-shadow: none;
          }
          
          .receipt__buttons,
          .receipt__close {
            display: none !important;
          }
        }
      `}</style>
        </div>
    )
}
