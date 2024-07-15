import React, { useState } from "react";
import Modal from "../pages/ModalEdit";
import { BASE_URL } from "../utils/api";

interface Props {
    show: boolean;
    handleClose: () => void;
    handleCreate: (novaCategoria: NovaCategoria) => void;
    fetchCategorias: () => Promise<void>;
}

export interface NovaCategoria {
    nomeCategoria: string;
    descricao: string;
    situacaoAtivo: boolean;
    prioridade: number;
}

const ModalNovaCategoria: React.FC<Props> = ({ show, handleClose, handleCreate, fetchCategorias }) => {
    const [nomeCategoria, setNomeCategoria] = useState("");
    const [descricao, setDescricao] = useState("");
    const [situacaoAtivo, setSituacaoAtivo] = useState(true);
    const [prioridade, setPrioridade] = useState(1);

    const handleNomeCategoriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNomeCategoria(e.target.value);
    };

    const handleDescricaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescricao(e.target.value);
    };

    const handleSituacaoAtivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSituacaoAtivo(e.target.checked);
    };

/*     const handlePrioridadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrioridade(Number(e.target.value));
    }; */

    const handleCreateCategoria = async () => {
        const novaCategoria: NovaCategoria = {
            nomeCategoria,
            descricao,
            situacaoAtivo,
            prioridade,
        };

        try {
            const authToken = localStorage.getItem("authToken");

            const response = await fetch(`${BASE_URL}/categorias/cadastrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(novaCategoria),
            });

            if (response.ok) {
                await response.json();
                await fetchCategorias();
                handleClose();
                // Limpa os campos de input após a criação bem-sucedida
                setNomeCategoria("");
                setDescricao("");
                setSituacaoAtivo(true);
                setPrioridade(1);

                // Chama a função passada por props para criar a categoria
                handleCreate(novaCategoria);
            } else {
                console.error("Erro ao criar nova categoria:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao criar nova categoria:", error);
        }
    };

    return (
        <Modal show={show} handleClose={handleClose}>
            <div>
                <div className="modal-header">
                    <h5 className="modal-title">Criar Nova Categoria</h5>
                    {/* Removido o botão de fechar */}
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Nome da Categoria</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nomeCategoria}
                            onChange={handleNomeCategoriaChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            value={descricao}
                            onChange={handleDescricaoChange}
                        />
                    </div>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={situacaoAtivo}
                            onChange={handleSituacaoAtivoChange}
                        />
                        <label className="form-check-label">Ativo</label>
                    </div>
  {/*                   <div className="form-group mt-3">
                        <label>Prioridade</label>
                        <input
                            type="number"
                            className="form-control"
                            value={prioridade}
                            onChange={handlePrioridadeChange}
                        />
                    </div> */}
                </div>
                <div className="modal-footer">
                    {/* Removido o botão de fechar */}
                    <button type="button" className="btn btn-primary" onClick={handleCreateCategoria}>
                        Criar Categoria
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalNovaCategoria;
