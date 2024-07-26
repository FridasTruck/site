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

  // Ordenar os itens do menu em ordem alfabética pela descrição
  const sortedMenuItems = [...menuItems].sort((a, b) => a.Descricao.localeCompare(b.Descricao));

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
          {sortedMenuItems.map(({ Nome, Preco, Descricao, Imagem }, ind) => (
            <li
              className="card-container col-lg-4 col-md-6 m-b30 All drink pizza burger wow fadeInUp"
              key={ind}
            >
              <div className="dz-img-box style-7" style={{ padding: "10px" }}>
                <div 
                  className="dz-media" 
                  style={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    width: "100%", 
                    height: "200px", 
                    overflow: "hidden", 
                    position: "relative" 
                  }}>
                  <img 
                    src={Imagem} 
                    alt="/" 
                    style={{ 
                      width: "70%", 
                      height: "auto", 
                      objectFit: "cover" 
                    }} 
                  /> {/* Utiliza a propriedade Imagem do MenuItem */}
                </div>
                <div className="dz-content" style={{ padding: "10px" }}>
                  <h5 className="title" style={{ fontSize: "16px", margin: "10px 0" }}>
                    <Link to="/product-detail">{Nome}</Link>
                  </h5>
                  <p style={{ fontSize: "14px", margin: "10px 0" }}>
                    {Descricao}
                  </p>
                  <span className="price" style={{ fontSize: "14px", fontWeight: "bold" }}>R${Preco}</span>
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
