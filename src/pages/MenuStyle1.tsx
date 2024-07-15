import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { BASE_URL } from "../utils/api";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string; // Manter como string para corresponder ao JSON
  // Adicione outros campos conforme necessário
}

interface Categoria {
  id: number;
  nomeCategoria: string;
  produtos: Produto[];
}

const MenuStyle1 = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categorias/categoria/categoriasProdutos`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data.registros);
        console.log(data.registros);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.banner_bnr1} title="Cardápio" subtitle="Cardápio" />
      <section className="content-inner section-wrapper-7 overflow-hidden bg-white">
        <div className="container">
          {categories.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            categories.map((category) => (
              <div className="row inner-section-wrapper" key={category.id}>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <div className="menu-head">
                    <h4 className="title text-primary">{category.nomeCategoria}</h4>
                  </div>
                  {category.produtos.map((produto) => (
                    <div className="dz-shop-card style-2 m-b30 p-0 shadow-none" key={produto.id}>
                      <div className="dz-content">
                        <div className="dz-head">
                          <span className="header-text">
                            <Link to={`/shop-style-2/${produto.id}`}>{produto.nome}</Link>
                          </span>
                          <span className="img-line"></span>
                          <span className="header-price">{`R$${parseFloat(produto.preco).toFixed(2)}`}</span>
                        </div>
                        <p className="dz-body">{produto.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <img className="bg1 dz-move-down" src={IMAGES.background_pic12} alt="/" />
        <img className="bg2 dz-move-down" src={IMAGES.background_pic14} alt="/" />
      </section>
    </div>
  );
};

export default MenuStyle1;
