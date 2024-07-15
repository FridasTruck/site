import { useEffect, useState } from "react";
import { IMAGES } from "../constent/theme";
import { BASE_URL } from "../utils/api";

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

const Home3BookTable = () => {
  const [informacoesUser, setInformacoesUser] = useState<InformacoesUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInformacoesUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/informacoes`);
        const data = await response.json();
        console.log(data); // Verifique os dados recebidos no console
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
    <div
      className="container contact-area bg-parallax"
      style={{
        backgroundImage: `url(${IMAGES.images_background_pic13})`,
        backgroundAttachment: "fixed",
        justifyContent: "center"
      }}
    >
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "50vh", display: "flex" }}>
        <div className="d-flex align-items-center justify-content-center">
          {/* Outros conteúdos da coluna esquerda, se houver */}
        </div>
        <div>
          <div className="widget widget_working wow fadeInUp">
            <div className="head">
              <h5 className="title text-white">Entre em Contato</h5>
            </div>
            <ul>
              <li>
                <i className="flaticon-placeholder"></i>
                <p>{informacoesUser.localizacao}</p>
              </li>
              <li>
                <i className="flaticon-telephone"></i>
                <p>
                  {informacoesUser.telefoneUm}
                  <br />
                  {informacoesUser.telefoneDois}
                </p>
              </li>
              <li>
                <i className="flaticon-email-1"></i>
                <p>
                  {informacoesUser.nomeProprietario}@example.com
                  <br />
                </p>
              </li>
              <li>
                <i className="flaticon-clock"></i>
                <p>
                  {informacoesUser.horarioAbertura} - {informacoesUser.horarioFechamento}
                </p>
              </li>
              <li>
                <i className="flaticon-calendar"></i>
                <p>{informacoesUser.diasAbertos}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home3BookTable;
