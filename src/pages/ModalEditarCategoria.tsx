import React, { useState } from "react";
import Modal from "../pages/ModalEdit";

interface Props {
  show: boolean;
  handleClose: () => void;
  categoria: Categoria;
  handleSalvarEdicao: (categoriaEditada: Categoria) => Promise<void>;
  fetchCategorias: () => Promise<void>; // Definindo fetchCategorias como função assíncrona
}

export interface Categoria {
  ID: string;
  nomeCategoria: string;
  descricao: string;
  situacaoAtivo: boolean;
  prioridade: number;
}

const ModalEditarCategoria: React.FC<Props> = ({ show, handleClose, categoria, handleSalvarEdicao }) => {
  const [categoriaEditada, setCategoriaEditada] = useState<Categoria>({ ...categoria });

  const handleNomeCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriaEditada({ ...categoriaEditada, nomeCategoria: e.target.value });
  };

  const handleSalvarEdicaoCategoriaLocal = async () => {
    if (window.confirm("Tem certeza que deseja salvar as alterações?")) {
      await handleSalvarEdicao(categoriaEditada);
      handleClose();
    }
  };

  return (
    <Modal show={show} handleClose={handleClose}>
      <div>
        <div className="modal-header">
          <h5 className="modal-title">Editar Categoria</h5>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Nome da Categoria</label>
            <input
              type="text"
              className="form-control"
              value={categoriaEditada.nomeCategoria}
              onChange={handleNomeCategoriaChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={handleSalvarEdicaoCategoriaLocal}>
            Salvar Edição
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditarCategoria;
