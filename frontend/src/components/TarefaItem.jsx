import React from 'react';
import { deleteTarefa, markAsConcluida, updateStatus } from '../services/tarefaService';

const statusDisplay = {
    PENDENTE: 'Pendente',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDO: 'Concluído'
};

const TarefaItem = ({ tarefa, onUpdate, onEditStart }) => {
    
    const handleDelete = () => {
        if (window.confirm(`Tem certeza que deseja excluir a tarefa: "${tarefa.titulo}"?`)) {
            deleteTarefa(tarefa.id)
                .then(onUpdate) 
                .catch(err => console.error("Erro ao deletar:", err));
        }
    };

    const handleConcluir = () => {
        markAsConcluida(tarefa.id)
            .then(onUpdate) 
            .catch(err => console.error("Erro ao concluir:", err));
    };

    const handleStatusChange = (newStatus) => {
        updateStatus(tarefa.id, newStatus)
            .then(onUpdate) 
            .catch(err => console.error("Erro ao mudar status:", err));
    };

    return (
        <div style={{ border: '1px solid #eee', padding: '15px', margin: '10px 0', background: '#333' }}>
            <h4>{tarefa.titulo}</h4>
            <p><strong>Descrição:</strong> {tarefa.descricao}</p>
            <p><strong>Categoria:</strong> {tarefa.categoria.replace('_', ' ')}</p>
            <p><strong>Data:</strong> {new Date(tarefa.dataParaRealizacao + 'T00:00:00').toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</p>
            <p><strong>Status:</strong> {statusDisplay[tarefa.status]}</p>

            <button onClick={() => onEditStart(tarefa)}>Editar</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Excluir</button>
            
            {tarefa.status !== 'CONCLUIDO' ? (
                <>
                    <button onClick={handleConcluir} style={{ marginLeft: '10px', background: 'lightgreen' }}>Marcar como Concluída</button>
                    {tarefa.status === 'PENDENTE' && (
                        <button onClick={() => handleStatusChange('EM_ANDAMENTO')} style={{ marginLeft: '10px' }}>Mover para Em Andamento</button>
                    )}
                    {tarefa.status === 'EM_ANDAMENTO' && (
                        <button onClick={() => handleStatusChange('PENDENTE')} style={{ marginLeft: '10px' }}>Mover para Pendente</button>
                    )}
                </>
            ) : (
                <button onClick={() => handleStatusChange('PENDENTE')} style={{ marginLeft: '10px' }}>Reabrir Tarefa</button>
            )}
        </div>
    );
};

export default TarefaItem;