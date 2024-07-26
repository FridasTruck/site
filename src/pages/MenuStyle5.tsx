import React, { useState, useEffect } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import OurMenuFilter from "../elements/OurMenuFilter";
import Modal from "../pages/ModalEdit";
import { BASE_URL } from "../utils/api";
import ModalCategorias from "../pages/ModalCategorias";
import novoProdutoIcon from "../assets/icons/fridastruck/novo.png";
import categoriasIcon from "../assets/icons/fridastruck/categorias.png";
import minhaEmpresaIcon from "../assets/icons/fridastruck/empresa.png";

interface MenuItem {
  id: string;
  Nome: string;
  Preco: string;
  Descricao: string;
  Imagem: string;
  Destaque: boolean;
  CategoriaID: string;
}

interface EmpresaContent {
  ID: number;
  nomeProprietario: string;
  telefoneUm: string;
  telefoneDois: string;
  localizacaoMap: string;
  localizacao: string;
  horarioAbertura: string;
  horarioFechamento: string;
  diasAbertos: string;
}

interface Categoria {
  ID: string;
  nomeCategoria: string;
}

const MenuStyle5: React.FC = () => {
  const [hoverActive, setHoverActive] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<MenuItem | null>(null);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [_imageBase64, setImageBase64] = useState<string>("");
  const [showEmpresaModal, setShowEmpresaModal] = useState<boolean>(false);
  const [empresaContent, setEmpresaContent] = useState<EmpresaContent | null>(null);
  const [showCategoriasModal, setShowCategoriasModal] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const authToken = localStorage.getItem("authToken");

  // Função para buscar os itens do menu
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/produtos`);
      const data = await response.json();
      setMenuItems(data.registros);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setLoading(false);
    }
  };

  // Hook para buscar os itens do menu quando o componente é montado
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Hook para buscar as categorias quando o componente é montado
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categorias`);
        const data = await response.json();
        setCategorias(data.registros);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategorias();
  }, []);

  //Loading Informações
  if (loading) {
    return <div>Carregando Informações...</div>;
  }

  // Função para abrir o modal
  const handleOpenModal = (item: MenuItem) => {
    setModalContent(item);
    setShowModal(true);
    setIsFavorited(item.Destaque); // Defina o estado inicial de isFavorited com base no item atual
    setSelectedCategoria(item.CategoriaID);
  };

  // Função para abrir o modal para adicionar um novo item
  const handleOpenModalNovo = () => {
    const newItem: MenuItem = {
      id: "", // Defina um valor padrão para id, ou você pode gerar um id único aqui
      Imagem: "",
      Nome: "",
      Preco: "",
      Descricao: "",
      Destaque: false, // Padrão Destaque
      CategoriaID: ""
    };
    setModalContent(newItem);
    setShowModal(true);
  };

  // Função para fechar o modal de edição/adição de item
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
    setImageBase64(""); // Limpar base64 da imagem ao fechar o modal
    setSelectedCategoria("");
  };

  // Função para fechar o modal de edição das informações da empresa
  const handleCloseEmpresaModal = () => {
    setShowEmpresaModal(false);
    setEmpresaContent(null);
  };

  // Função para alternar o estado de favorito de um item
  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  // Função para salvar as edições ou criar um novo item
  const handleSave = async () => {
    if (!modalContent?.Imagem) {
      alert("Por favor, adicione uma imagem antes de salvar.");
      return;
    }

    // Lógica de salvar as edições ou criar novo item
    if (window.confirm("Você tem certeza que deseja salvar este item?")) {
      if (modalContent?.id) {
        // Se modalContent.id existe, estamos editando um item existente
        await handleUpdateItem();
      } else {
        // Caso contrário, estamos criando um novo item
        await handleCreateItem();
      }
    }
  };

  // Função para excluir um item
  const handleDelete = async () => {
    if (window.confirm("Você tem certeza que deseja excluir este item?")) {
      try {
        const response = await fetch(
          `${BASE_URL}/produtos/deletar/${modalContent?.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.ok) {
          // Remova localmente o item do menu após a exclusão bem-sucedida
          setMenuItems(prevItems => prevItems.filter(item => item.id !== modalContent?.id));
          handleCloseModal();
          fetchMenuItems(); // Atualize os itens do menu após a exclusão
        } else {
          console.error("Failed to delete item");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  // Função para atualizar um item existente
  const handleUpdateItem = async () => {
    try {
      if (!modalContent) return;

      const response = await fetch(
        `${BASE_URL}/produtos/alterar/${modalContent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            Nome: modalContent.Nome,
            Descricao: modalContent.Descricao,
            Preco: modalContent.Preco,
            Imagem: modalContent.Imagem,
            Destaque: isFavorited, // Atualize o campo Destaque com o estado atual de isFavorited
            CategoriaID: selectedCategoria
          })
        });

      if (response.ok) {
        // Atualize localmente o item do menu após a atualização bem-sucedida
        const updatedItem = await response.json();
        setMenuItems(prevItems =>
          prevItems.map(item => (item.id === modalContent.id ? updatedItem : item))
        );
        handleCloseModal();
        fetchMenuItems(); // Atualize os itens do menu após a atualização
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Função para criar um novo item
  const handleCreateItem = async () => {
    try {
      if (!modalContent) return;

      const response = await fetch(
        `${BASE_URL}/produtos/cadastrar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            Nome: modalContent.Nome,
            Descricao: modalContent.Descricao,
            Preco: modalContent.Preco,
            Imagem: modalContent.Imagem,
            Destaque: isFavorited, // Aqui adicionamos o campo Destaque
            CategoriaID: selectedCategoria
          })
        });

      if (response.ok) {
        // Atualize localmente a lista de itens após o cadastro bem-sucedido
        const newItem = await response.json();
        setMenuItems(prevItems => [...prevItems, newItem]);
        handleCloseModal();
        fetchMenuItems(); // Atualize os itens do menu após a criação
      } else {
        console.error("Failed to create item");
      }
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  // Função para abrir o modal de edição das informações da empresa
  const handleOpenEmpresaModal = async () => {
    try {
      const response = await fetch(`${BASE_URL}/informacoes`);
      const data = await response.json();
      if (data.registros.length > 0) {
        const id = data.registros[0].ID; // Assumindo que o ID está disponível no primeiro registro
        setEmpresaContent({ ...data.registros[0], ID: id });
        setShowEmpresaModal(true);
      } else {
        console.error("Nenhum registro encontrado para editar.");
      }
    } catch (error) {
      console.error("Error fetching empresa information:", error);
    }
  };

  // Função para salvar as informações editadas da empresa
  const handleSaveEmpresa = async () => {
    if (window.confirm("Você tem certeza que deseja salvar as informações da empresa?")) {
      try {
        const id = empresaContent?.ID;
        if (!id) {
          console.error("ID da empresa não encontrado.");
          return;
        }

        const response = await fetch(
          `${BASE_URL}/informacoes/alterar/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(empresaContent) // Enviar todo o objeto empresaContent
          });

        if (response.ok) {
          handleCloseEmpresaModal();
        } else {
          const responseData = await response.json();
          console.error("Failed to update empresa information:", responseData);
        }
      } catch (error) {
        console.error("Error updating empresa information:", error);
      }
    }
  };

  // Verifica se um arquivo foi selecionado
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
      setModalContent({
        ...modalContent!,
        Imagem: reader.result as string
      });
    };
  };

  // Função para abrir o modal de categorias
  const handleOpenModalCategorias = () => {
    setShowCategoriasModal(true);
  };

  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.images_bnr5} title="Administrador" subtitle="Administrador" />

      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-12 text-end mb-3">
              <div className="d-flex flex-wrap justify-content-end">
                <button className="btn btn-primary btn-hover-2 me-3 mb-2" onClick={handleOpenModalNovo}>
                  <img src={novoProdutoIcon} alt="Novo Produto" className="me-2" />
                  Novo Produto
                </button>
                <button className="btn btn-primary btn-hover-2 me-3 mb-2" onClick={handleOpenModalCategorias}>
                  <img src={categoriasIcon} alt="Categorias" className="me-2" />
                  Categorias
                </button>
                <button className="btn btn-hover-2 mb-2" onClick={handleOpenEmpresaModal} style={{backgroundColor:"black"}}>
                  <img src={minhaEmpresaIcon} alt="Minha Empresa" className="me-2" />
                  Minha Empresa
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-12">
              <div className="site-filters style-1 clearfix">
                <ul className="filters">{/* Adicione seus filtros aqui, se necessário */}</ul>
              </div>
            </div>
            <OurMenuFilter />
          </div>

          <ul id="masonry" className="row">
            {menuItems.map((item, index) => (
              <li
                className="card-container col-lg-3 col-md-6 col-sm-6 m-b30"
                key={index}
                onMouseEnter={() => setHoverActive(index)}
              >
                <div className={`dz-img-box style-2 box-hover ${hoverActive === index ? "active" : ""}`}>
                  <div className="dz-media">
                    <img src={item.Imagem} alt="/" />
                  </div>
                  <div className="dz-content">
                    <h4 className="dz-title">{item.Nome}</h4>
                    <p className="dz-price text-primary">{item.Descricao}</p>
                    <h5 className="dz-price text-primary">R$ {item.Preco}</h5>
                    <button className="btn btn-green btn-hover-2" onClick={() => handleOpenModal(item)}>
                      Editar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Modal show={showModal} handleClose={handleCloseModal}>
        {modalContent && (
          <div>
            <div className="row justify-content-center">
              <h2 className="text-center">{modalContent.id ? "Editar Item" : "Novo Item"}</h2>
            </div>
            <div className="modal-content-container">
              <div className="form-container">
                <div className="form-group">
                  <label>Nome</label>
                  <input
                    type="text"
                    value={modalContent.Nome}
                    className="form-control"
                    onChange={(e) => setModalContent({ ...modalContent, Nome: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Preço</label>
                  <input
                    type="text"
                    value={modalContent.Preco}
                    className="form-control"
                    onChange={(e) => setModalContent({ ...modalContent, Preco: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Ingredientes</label>
                  <input
                    type="text"
                    value={modalContent.Descricao}
                    className="form-control large-input"
                    onChange={(e) => setModalContent({ ...modalContent, Descricao: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Categoria</label>
                  <select
                    value={selectedCategoria}
                    className="form-control"
                    onChange={(e) => setSelectedCategoria(e.target.value)}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.ID} value={categoria.ID}>
                        {categoria.nomeCategoria}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ marginBottom: '10px' }}>Adicionar Nova Imagem</label>
                  <br />
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className="button-container">
                  <button
                    className={`star-btn ${isFavorited ? "active" : ""}`}
                    onClick={handleFavorite}
                  >
                    ★
                  </button>
                  {modalContent.id && (
                    <button className="delete-btn" onClick={handleDelete}>
                      🗑️
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={handleSave}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal show={showEmpresaModal} handleClose={handleCloseEmpresaModal}>
        {empresaContent && (
          <div>
            <div className="row justify-content-center">
              <h2 className="text-center">Minha Empresa</h2>
            </div>
            <div className="modal-content-container">
              <div className="form-container">
                <div className="form-group">
                  <label>Nome do Proprietário</label>
                  <input
                    type="text"
                    value={empresaContent.nomeProprietario}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, nomeProprietario: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Telefone 1</label>
                  <input
                    type="text"
                    value={empresaContent.telefoneUm}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, telefoneUm: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Telefone 2</label>
                  <input
                    type="text"
                    value={empresaContent.telefoneDois}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, telefoneDois: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Localização no Mapa</label>
                  <input
                    type="text"
                    value={empresaContent.localizacaoMap}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, localizacaoMap: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Localização</label>
                  <input
                    type="text"
                    value={empresaContent.localizacao}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, localizacao: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Horário de Abertura</label>
                  <input
                    type="text"
                    value={empresaContent.horarioAbertura}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, horarioAbertura: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Horário de Fechamento</label>
                  <input
                    type="text"
                    value={empresaContent.horarioFechamento}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, horarioFechamento: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Dias Abertos</label>
                  <input
                    type="text"
                    value={empresaContent.diasAbertos}
                    className="form-control"
                    onChange={(e) => setEmpresaContent({ ...empresaContent, diasAbertos: e.target.value })}
                  />
                </div>
                <div className="button-container">
                  <button className="btn btn-primary" onClick={handleSaveEmpresa}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* Modal de Categorias */}
      <ModalCategorias show={showCategoriasModal} handleClose={() => setShowCategoriasModal(false)} />
    </div>
  );

};

export default MenuStyle5;