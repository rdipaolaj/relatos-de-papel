"use client"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3 className="footer__title">Relatos de Papel</h3>
          <p className="footer__text">Tu librería online favorita con los mejores títulos y autores.</p>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Enlaces</h3>
          <ul className="footer__links">
            <li>
              <a href="#" className="footer__link">
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Política de privacidad
              </a>
            </li>
            <li>
              <a href="#" className="footer__link">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__section">
          <h3 className="footer__title">Contacto</h3>
          <p className="footer__text">Email: rdipaolaj@outlook.com</p>
          <p className="footer__text">Teléfono: +51 913754400</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.
        </p>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--primary-color);
          color: var(--light-color);
          padding: 40px 0 20px;
          margin-top: 60px;
        }
        
        .footer__container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .footer__title {
          font-size: 1.2rem;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .footer__text {
          margin-bottom: 10px;
          line-height: 1.5;
        }
        
        .footer__links {
          list-style: none;
          padding: 0;
        }
        
        .footer__link {
          color: var(--light-color);
          text-decoration: none;
          display: block;
          margin-bottom: 8px;
          transition: opacity 0.3s ease;
        }
        
        .footer__link:hover {
          opacity: 0.8;
        }
        
        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 30px;
          padding-top: 20px;
          text-align: center;
        }
        
        .footer__copyright {
          font-size: 0.9rem;
        }
      `}</style>
    </footer>
  )
}
