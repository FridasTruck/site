import React, { useState, useEffect } from "react";
import Modal from "../pages/ModalEdit";
import { BASE_URL } from "../utils/api";
import ModalNovaCategoria from "./ModalNovaCategoria";
import ModalEditarCategoria from "./ModalEditarCategoria";

interface Props {
  show: boolean;
  handleClose: () => void;
}

export interface Categoria {
  ID: string;
  nomeCategoria: string;
  descricao: string;
  situacaoAtivo: boolean;
  prioridade: number;
}

const ModalCategorias: React.FC<Props> = ({ show, handleClose }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [_loading, setLoading] = useState<boolean>(true);
  const [showModalNovaCategoria, setShowModalNovaCategoria] = useState<boolean>(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categorias`);
      if (response.ok) {
        const data = await response.json();
        setCategorias(data.registros);
      } else {
        console.error("Erro ao buscar categorias:", response.statusText);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setLoading(false);
    }
  };

  const handleOpenModalNovaCategoria = () => {
    setShowModalNovaCategoria(true);
  };

  const handleCloseModalNovaCategoria = () => {
    setShowModalNovaCategoria(false);
  };

  const handleEditarCategoria = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
  };

  const handleSalvarEdicaoCategoria = async (categoriaEditada: Categoria) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/categorias/alterar/${categoriaEditada.ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(categoriaEditada),
      });

      if (response.ok) {
        await fetchCategorias();
        setCategoriaEditando(null);
      } else {
        console.error("Erro ao editar categoria:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  };

  const handleExcluirCategoria = async (id: string) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/categorias/deletar/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        await fetchCategorias();
      } else {
        console.error("Erro ao excluir categoria:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  const handleCreateCategoria = async () => {
    // Implementação da criação de categoria aqui, se necessário
  };

  return (
    <Modal show={show} handleClose={handleClose}>
      <div className="modal-content-container" style={{ display: "flex", flexDirection: "column" }}>
        <div className="modal-header">
          <h1 className="text-center">Categorias</h1>
          <div className="modal-header-buttons">
            <button
              className="btn btn-primary"
              style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '14px' }}
              onClick={handleOpenModalNovaCategoria}
            >
              Criar Categoria
            </button>
          </div>
        </div>
        <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <div className="list-group">
            {categorias.map((categoria) => (
              <div key={categoria.ID} className="list-group-item">
                <h5>{categoria.nomeCategoria}</h5>
                <p>{categoria.descricao}</p>
                <small>{categoria.situacaoAtivo ? "Ativo" : "Inativo"}</small>
                <div>
                  <button className="btn btn-green btn-hover-2" style={{ marginRight: "8px" }} onClick={() => handleEditarCategoria(categoria)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleExcluirCategoria(categoria.ID)}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {categoriaEditando && (
        <ModalEditarCategoria
          show={true}
          handleClose={() => setCategoriaEditando(null)}
          categoria={categoriaEditando}
          handleSalvarEdicao={handleSalvarEdicaoCategoria}
          fetchCategorias={fetchCategorias}
        />
      )}
      <ModalNovaCategoria
        show={showModalNovaCategoria}
        handleClose={handleCloseModalNovaCategoria}
        handleCreate={handleCreateCategoria}
        fetchCategorias={fetchCategorias}
      />
    </Modal>
  );
};

export default ModalCategorias;
