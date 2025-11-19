import React, { useState, useEffect } from 'react';
import { createTarefa, updateTarefa } from '../services/tarefaService';

const categorias = ["TAREFAS_DE_CASA", "TRABALHO", "PESSOAL"];
const statusOptions = ["PENDENTE", "EM_ANDAMENTO", "CONCLUIDO"];

const TarefaForm = ({ currentTarefa, onSave, onClose }) => {
    const [tarefa, setTarefa] = useState({
        titulo: '',
        descricao: '',
        dataParaRealizacao: '',
        categoria: categorias[0], 
        status: statusOptions[0],
    });

    useEffect(() => {
        if (currentTarefa) {
            const formattedDate = currentTarefa.dataParaRealizacao ? new Date(currentTarefa.dataParaRealizacao).toISOString().split('T')[0] : '';
            setTarefa({
                ...currentTarefa,
                dataParaRealizacao: formattedDate
            });
        }
    }, [currentTarefa]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarefa(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const serviceCall = currentTarefa 
            ? updateTarefa(currentTarefa.id, tarefa)
            : createTarefa(tarefa);

        serviceCall.then(() => {
            onSave(); 
            onClose(); 
        }).catch(error => {
            console.error("Erro ao salvar a tarefa:", error);
            alert("Erro ao salvar. Verifique se a API está rodando e as credenciais estão corretas.");
        });
    };

    return (
        <div className="form-container"> 
            <h2>{currentTarefa ? 'Editar Tarefa' : 'Criar Nova Tarefa'}</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                        type="text"
                        name="titulo"
                        value={tarefa.titulo}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                        style={{ flex: 1 }} 
                    />
                    <textarea
                        name="descricao"
                        value={tarefa.descricao}
                        onChange={handleChange}
                        placeholder="Descrição"
                        required
                        style={{ flex: 2, resize: 'none' }} 
                    />
                    <input
                        type="date"
                        name="dataParaRealizacao"
                        value={tarefa.dataParaRealizacao}
                        onChange={handleChange}
                        required
                        style={{ flex: 1 }} 
                    />
                    <select name="categoria" value={tarefa.categoria} onChange={handleChange} style={{ flex: 1 }}>
                        {categorias.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                    </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    
                    {currentTarefa && (
                        <select name="status" value={tarefa.status} onChange={handleChange}>
                            {statusOptions.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                        </select>
                    )}

                    <button type="submit">{currentTarefa ? 'Salvar Edição' : 'Criar Tarefa'}</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default TarefaForm;