import { useState, useEffect } from "react";
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
      <section className="content-inner section-wrapper-7 overflow-hidden bg-white" style={{}}>
        <div className="container">
          {categories.length === 0 ? (
            <p>Carregando...</p>
          ) : (
            categories.map((category) => {
              // Ordenar os produtos da categoria pela descrição
              const sortedProdutos = category.produtos.sort((a, b) => 
                a.descricao.localeCompare(b.descricao)
              );
              return (
                <div className="row inner-section-wrapper" key={category.id}>
                  <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 mb-4 responsive-container">
                    <div className="menu-head">
                      <h4 className="title text-primary">{category.nomeCategoria}</h4>
                    </div>
                    {sortedProdutos.map((produto) => (
                      <div className="dz-shop-card style-2 mb-3 shadow-none" key={produto.id}>
                        <div className="dz-content p-3">
                          <div className="dz-head d-flex justify-content-between align-items-center">
                            <span className="header-text">
                              {produto.nome}
                            </span>
                            <span className="header-price">{`R$${parseFloat(produto.preco).toFixed(2)}`}</span>
                          </div>
                          <p className="dz-body">{produto.descricao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <img className="bg1 dz-move-down" src={IMAGES.background_pic12} alt="/" />
        <img className="bg2 dz-move-down" src={IMAGES.background_pic14} alt="/" />
      </section>
    </div>
  );
};

export default MenuStyle1;
