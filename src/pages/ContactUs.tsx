import { useState, useEffect } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { BASE_URL } from "../utils/api";

export const ContactUsArr = [
  {
    icon: "flaticon-placeholder",
    title: "Localização",
  },
  {
    icon: "flaticon-telephone",
    title: "Numero de Telefone",
  },
  {
    icon: "flaticon-email-1",
    title: "Email",
  },
  {
    icon: "flaticon-clock-1",
    title: "Horario de Funcionamento",
  },
];

interface InformacoesUser {
  nomeProprietario: string;
  telefoneUm: string;
  telefoneDois: string;
  localizacaoMap: string;
  localizacao: string;
  horarioAbertura: string;
  horarioFechamento: string;
  diasAbertos: string;
}

const ContactUs = () => {
  const [informacoesUser, setInformacoesUser] = useState<InformacoesUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [addActive, setActive] = useState<number | null>(null);

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

  const combinedData = ContactUsArr.map((item) => ({
    ...item,
    ...informacoesUser, // Combine os dados do servidor com os dados locais correspondentes
  }));

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Contato"
        subtitle="Contato"
      />
      <section className="section-wrapper-8 content-inner-1">
        <div className="container">
          <div className="row inner-section-wrapper align-items-center">
            {combinedData.map((item, ind) => (
              <div className="col-lg-3 col-sm-6" key={ind}>
                <div
                  className={`icon-bx-wraper style-5 hover-aware box-hover ${addActive === ind ? "active" : ""}`}
                  onMouseEnter={() => {
                    setActive(ind);
                  }}
                >
                  <div className="icon-bx">
                    <div className="icon-cell">
                      <i className={item.icon}></i>
                    </div>
                  </div>
                  <div className="icon-content" style={{height:"230px"}}>
                    <h5 className="title">{item.title}</h5>
                    {item.title === "Localização" && <p>{item.localizacao}</p>}
                    {item.title === "Numero de Telefone" && (
                      <>
                        <p>{item.telefoneUm}</p>
                        <p>{item.telefoneDois}</p>
                      </>
                    )}
                    {item.title === "Email" && (
                      <>
                        <p>{item.localizacaoMap}</p>
                      </>
                    )}
                    {item.title === "Horario de Funcionamento" && (
                      <>
                        <p>{item.horarioAbertura} - {item.horarioFechamento}</p>
                        <p>{item.diasAbertos}</p>
                      </>
                    )}
                    <div className="effect bg-primary"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
