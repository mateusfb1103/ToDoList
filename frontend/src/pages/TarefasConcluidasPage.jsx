import React, { useState, useEffect, useCallback } from 'react';
import { getTarefas } from '../services/tarefaService';
import TarefaItem from '../components/TarefaItem';
import FiltroBar from '../components/FiltroBar';

const TarefasConcluidasPage = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentFilters, setCurrentFilters] = useState({});

    const fetchTarefasConcluidas = useCallback((filters = {}) => {
        setLoading(true);
        
        getTarefas({ ...filters, status: 'CONCLUIDO' })
            .then(response => {
                setTarefas(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar tarefas concluídas:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchTarefasConcluidas();
    }, [fetchTarefasConcluidas]);

    const handleFilter = (filters) => {
        setCurrentFilters(filters);
        fetchTarefasConcluidas(filters);
    };

    const handleSave = () => {
        fetchTarefasConcluidas(currentFilters);
    };
    

    if (loading) return <div>Carregando tarefas concluídas...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Tarefas Concluídas</h1>
            
            <FiltroBar onFilter={handleFilter} isConcluidasPage={true} />

            {tarefas.length === 0 ? (
                <p>Nenhuma tarefa concluída encontrada.</p>
            ) : (
                tarefas.map(tarefa => (
                    <TarefaItem 
                        key={tarefa.id} 
                        tarefa={tarefa} 
                        onUpdate={handleSave} 
                        onEditStart={() => { /*apenas reabrir/deletar */ }}
                    />
                ))
            )}
        </div>
    );
};

export default TarefasConcluidasPage;