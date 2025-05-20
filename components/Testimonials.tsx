"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "María García",
    avatar: "/avatar-1.png",
    rating: 5,
    text: "Relatos de Papel se ha convertido en mi librería favorita. La selección de libros es excelente y el servicio es impecable. ¡Totalmente recomendado!",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    avatar: "/avatar-2.png",
    rating: 4,
    text: "Encontré títulos que llevaba tiempo buscando. La navegación por la web es muy intuitiva y los precios son competitivos.",
  },
  {
    id: 3,
    name: "Laura Martínez",
    avatar: "/avatar-3.png",
    rating: 5,
    text: "Me encanta la rapidez con la que llegan los pedidos y el cuidado con el que vienen empaquetados los libros. Sin duda, seguiré comprando aquí.",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <div className="testimonials">
      <h2 className="testimonials__title">Lo que dicen nuestros clientes</h2>

      <div className="testimonials__container">
        <button
          className="testimonials__arrow testimonials__arrow--prev"
          onClick={prevTestimonial}
          aria-label="Testimonio anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="testimonials__content">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonials__item ${index === activeIndex ? "testimonials__item--active" : ""}`}
            >
              <div className="testimonials__avatar">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="testimonials__avatar-img"
                />
              </div>

              <div className="testimonials__rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < testimonial.rating ? "#FFD700" : "none"}
                    stroke={i < testimonial.rating ? "#FFD700" : "#ccc"}
                  />
                ))}
              </div>

              <p className="testimonials__text">{testimonial.text}</p>
              <p className="testimonials__name">{testimonial.name}</p>
            </div>
          ))}
        </div>

        <button
          className="testimonials__arrow testimonials__arrow--next"
          onClick={nextTestimonial}
          aria-label="Siguiente testimonio"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="testimonials__dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonials__dot ${index === activeIndex ? "testimonials__dot--active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .testimonials {
          margin: 60px 0;
          padding: 40px 0;
          background-color: #f9f9f9;
          border-radius: 12px;
        }
        
        .testimonials__title {
          font-size: 1.8rem;
          color: var(--primary-color);
          margin-bottom: 30px;
          text-align: center;
        }
        
        .testimonials__container {
          display: flex;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }
        
        .testimonials__content {
          flex: 1;
          position: relative;
          height: 300px;
          overflow: hidden;
        }
        
        .testimonials__item {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.5s ease;
          visibility: hidden;
        }
        
        .testimonials__item--active {
          opacity: 1;
          transform: translateX(0);
          visibility: visible;
        }
        
        .testimonials__avatar {
          margin-bottom: 15px;
        }
        
        .testimonials__avatar-img {
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--primary-color);
        }
        
        .testimonials__rating {
          display: flex;
          gap: 5px;
          margin-bottom: 15px;
        }
        
        .testimonials__text {
          text-align: center;
          font-style: italic;
          margin-bottom: 20px;
          line-height: 1.6;
          color: #555;
        }
        
        .testimonials__name {
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .testimonials__arrow {
          background: none;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background-color: var(--light-color);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          z-index: 1;
        }
        
        .testimonials__arrow:hover {
          background-color: var(--primary-color);
          color: var(--light-color);
        }
        
        .testimonials__dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        
        .testimonials__dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ddd;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .testimonials__dot--active {
          background-color: var(--primary-color);
          transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
          .testimonials {
            padding: 30px 15px;
          }
          
          .testimonials__content {
            height: 350px;
          }
          
          .testimonials__text {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  )
}
