import { useState, useEffect } from "react";

//@ts-ignore
//Destaques API
interface MenuItem {
  id: string;
  Nome: string;
  Preco: string;
  Descricao: string;
  img: string;
  Imagem: string;
}

const HomeSpacialMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addActive, setActive] = useState<number | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("https://backend-production-f652.up.railway.app/produtos/produto/destaques");
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
        {menuItems.map(({ id, Nome, Preco, Descricao, Imagem }, ind) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 m-b30 wow fadeInUp"
            key={id}
          >
            <div
              onMouseEnter={() => {
                setActive(ind);
              }}
              className={`dz-img-box style-2 box-hover ${addActive === ind ? "active" : ""
                }`}
            >
              <div className="dz-media">
                <img src={Imagem} alt="/" /> {/* Utilizando a imagem importada estaticamente */}
              </div>
              <div className="dz-content">
                <h4 className="dz-title">{Nome}</h4>
                <p>{Descricao}</p>
                <h5 className="dz-price text-primary">R${Preco}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeSpacialMenu;
