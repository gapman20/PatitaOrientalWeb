import "./inicio.css";
import { Link } from "react-router-dom";

const Inicio = () => {
  return (
    <div>
      {/* Sección Banner */}
      <section className="p-5 banner-section d-flex align-items-center">
        <div className="banner-text d-flex flex-column justify-content-center p-4">
          <h1>
            <span className="first-text">
              La <span style={{ color: "#425184" }}>mejor</span> comida{" "}
            </span>
            <br />
            <span style={{ color: "#d579af" }}>Coreana</span> en México
          </h1>
          <div className="">
            <Link to="/Menu" className="btn btn-pink">
              Pedir ahora
            </Link>
          </div>
        </div>
      </section>
      <section className="decorative-lines-inicio">
        <div className="line-group-inicio justify-content-center">
          <span className="line-inicio short-inicio blue"></span>
          <span className="line-inicio medium-inicio blue"></span>
          <span className="line-inicio extra-long-inicio blue"></span>
        </div>
        <div className="line-group-inicio justify-content-center">
          <span className="line-inicio mediumlong-inicio blue"></span>
          <span className="line-inicio supershort-inicio blue"></span>
          <span className="line-inicio space-inicio"></span>
          <span className="line-inicio long-inicio pink"></span>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className=" container sobreNosotros ">
        <div className="container d-flex flex-column flex-md-row align-items-center">
          <div className="logo-section me-md-5 text-center">
            <img
              className="logo-img"
              src="./images/logo-patita-oriental/PatitaOriental_Azul_Completo.png"
              alt="Patita Oriental"
             
            />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center gap-2 mb-3">
            <div className="d-flex align-items-center justify-content-center gap-4 mb-3 titulo-sobre-nosotros">
              <img src="./images/home-icons/star-icon-start.png"
                className="star-icon"
                alt="star-start"
              />
              <h3
                className="fw-bold mb-0 text-center"
                style={{ color: "#d579af"}}
              >
                Sobre nosotros
              </h3>
              <img
                src="./images/home-icons/star-icon-end.png"
                className="star-icon"
                alt="star-end"
              />
            </div>
            <h5 className="justify-content-center">
              En cada platillo fusionamos tradición, creatividad y el sabor auténtico de
              Corea. Disfruta una experiencia única y deliciosa, llena de
              cultura, color y mucho K-style. En nuestra tienda encontrarás un
              pedacito de Corea… ¡sin salir de México!
            </h5>
            <Link to="/About" className="btn btn-pink-about">
              Descubre más
            </Link>
        
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="p-4 text-center align-items-center container d-flex flex-column">
        <div className="d-flex align-items-center justify-content-center gap-4 mb-4">
          <img
            src="./images/home-icons/star-icon-start.png"
            className="star-icon"
            alt="star-start"
            
          />
          <h3 className="fw-bold mb-0 text-center" style={{ color: "#d579af" }}>
            Solo la mejor calidad
          </h3>
          <img
            src="./images/home-icons/star-icon-end.png"
            className="star-icon"
            alt="star-end"
          />
        </div>
        <div className="row advantages-section text-white align-items-center mb-4">
          <div className="col-md-3 mb-4">
            <i>
              <img
                src="./images/home-icons/canasta-icon.png"
                className="icon"
              />
            </i>
            <p>Ingredientes frescos</p>
          </div>
          <div className="col-md-3 mb-4">
            <i>
              <img src="./images/home-icons/price-icon.png" className="icon" />
            </i>
            <p>Los mejores precios</p>
          </div>
          <div className="col-md-3 mb-4">
            <i>
              <img src="./images/home-icons/sarten-icon.png" className="icon" />
            </i>
            <p>Todo se cocina al instante</p>
          </div>
          <div className="col-md-3 mb-4">
            <i>
              <img src="./images/home-icons/car-icon.png" className="icon" />
            </i>
            <p>Te lo dejamos hasta tu puerta</p>
          </div>
        </div>
      </section>

     

      {/* Sección Temática */}
      <section className="p-5 tematica-section mb-0 d-flex align-items-center">
        <div className="tematica-text p-4 d-flex flex-column align-items-end">
          <Link to="/MenuTematico" className="Linkto">
            <h3
              className="display-6 fw-bold mb-3 text-end"
              style={{ color: "#425184" }}
            >
              Descubre nuestros <br />
              <span style={{ fontSize: "3.5rem" }}>
                Platillos <span style={{ color: "#d579af" }}>Temáticos</span>
              </span>
            </h3>
          </Link>
        </div>
      </section>
    </div>
  );
};

export { Inicio };