import { useState, useEffect, useRef } from "react";
import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";

interface InformacoesUser {
  id: number;
  nomeProprietario: string;
  telefoneUm: string;
  telefoneDois: string;
  localizacaoMap: string;
  localizacao: string;
  horarioAbertura: string;
  horarioFechamento: string;
  diasAbertos: string;
}

const Footer4 = () => {
  const [informacoesUser, setInformacoesUser] = useState<InformacoesUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const heartRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fetchInformacoesUser = async () => {
      try {
        const response = await fetch("https://backend-production-f652.up.railway.app/informacoes");
        const data = await response.json();
        setInformacoesUser(data.registros[0]);
        setLoading(false); // Marca o carregamento como completo após receber os dados
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Mesmo em caso de erro, finaliza o carregamento
      }
    };

    fetchInformacoesUser();
  }, []);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (!informacoesUser) {
    return <div>No data available</div>;
  }

  return (
    <footer className="site-footer style-1 bg-dark" id="footer" style={{ textAlign: "center" }}>
      <div className="footer-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="widget widget_getintuch">
                <h5 className="footer-title" style={{ color: "#FFA500" }}>Informações</h5>
                <ul>
                  <li>
                    <i className="flaticon-placeholder"></i>
                    <p style={{ color: "#FFFFFF" }}>{informacoesUser.localizacao}</p>
                  </li>
                  <li>
                    <i className="flaticon-telephone"></i>
                    <p style={{ color: "#FFFFFF" }}>
                      {informacoesUser.telefoneUm}
                      <br />
                      {informacoesUser.telefoneDois}
                    </p>
                  </li>
                  <li>
                    <i className="flaticon-email-1"></i>
                    <p style={{ color: "#FFFFFF" }}>info@example.com</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-2 col-md-6 col-sm-6">
              <div className="widget widget_services">
                <h5 className="footer-title" style={{ color: "#FFA500" }}>Links</h5>
                <ul>
                  <li>
                    <Link to="/" style={{ color: "#FFFFFF" }}>
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/team" style={{ color: "#FFFFFF" }}>
                      <span>Team</span>
                    </Link>
                  </li> 
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 d-flex justify-content-center">
              {/* Espaço reservado para alinhar as seções "Informações" e "Help Center" */}
              <div className="widget widget_services">
                <h5 className="footer-title" style={{ color: "#FFA500" }}>Help Center</h5>
                <ul>
                  <li>
                    <Link to="/contact-us" style={{ color: "#FFFFFF" }}>
                      <span>Entrar em contato</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <p style={{ textAlign: "center", color: "#FFFFFF" }}>Copyright 2024 All rights reserved.</p>
              <span className="copyright-text" style={{ display: "inline-block", color: "#FFFFFF" }}>
                Crafted With{" "}
                <span
                  className="heart"
                  ref={heartRef}
                  onClick={() => {
                    heartRef.current?.classList.toggle("heart-blast");
                  }}
                ></span>{" "}
                by{" "}
                <Link to="https://appstechdev.com/" target="_blank" style={{ color: "#FFA500" }}>
                  AppsTechDev
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <img className="bg1 dz-move" src={IMAGES.background_pic5} alt="/" />
      <img className="bg2 dz-move" src={IMAGES.background_pic6} alt="/" />
    </footer>
  );
};

export default Footer4;
