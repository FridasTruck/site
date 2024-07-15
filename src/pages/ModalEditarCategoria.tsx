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

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriaEditada({ ...categoriaEditada, descricao: e.target.value });
  };

  const handleSituacaoAtivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoriaEditada({ ...categoriaEditada, situacaoAtivo: e.target.checked });
  };

  const handleSalvarEdicaoCategoriaLocal = async () => {
    await handleSalvarEdicao(categoriaEditada);
    handleClose();
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
          <div className="form-group">
            <label>Descrição</label>
            <input
              type="text"
              className="form-control"
              value={categoriaEditada.descricao}
              onChange={handleDescricaoChange}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={categoriaEditada.situacaoAtivo}
              onChange={handleSituacaoAtivoChange}
            />
            <label className="form-check-label">Ativo</label>
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
