import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";

interface MenuItem {
  id: string;
  Nome: string;
  Preco: string;
  Descricao: string;
  Imagem: string;
}

const Home3OurMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/produtos`);
        const data = await response.json();
        console.log(data); // Verifique os dados recebidos no console
        setMenuItems(data.registros);
        setLoading(false); // Marca o carregamento como completo após receber os dados
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false); // Mesmo em caso de erro, finaliza o carregamento
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading menu items...</div>;
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-12 wow fadeInUp">
          <div className="site-filters style-1 clearfix">
            <ul className="filters">
              {/* Aqui você pode adicionar filtros se necessário */}
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-12 text-lg-end d-lg-block d-none wow fadeInUp">
        </div>
      </div>
      <div className="clearfix">
        <ul id="masonry" className="row dlab-gallery-listing gallery">
          {menuItems.map(({ Nome, Preco, Descricao, Imagem }, ind) => (
            <li
              className="card-container col-lg-4 col-md-6 m-b30 All drink pizza burger wow fadeInUp"
              key={ind}
            >
              <div className="dz-img-box style-7">
                <div className="dz-media">
                  <img src={Imagem} alt="/" /> {/* Utiliza a propriedade Imagem do MenuItem */}
                  <div className="dz-meta">
                    {/* <ul>
                      <li className="seller">Mais Vendido</li>
                      <li className="rating">
                        <i className="fa-solid fa-star"></i> 4.5
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className="dz-content">
                  <h5 className="title">
                    <Link to="/product-detail">{Nome}</Link>
                  </h5>
                  <p>
                    {Descricao}
                  </p>
                  <span className="price">R${Preco}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home3OurMenu;
