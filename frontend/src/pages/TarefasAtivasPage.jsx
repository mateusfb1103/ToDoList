import React, { useState, useEffect, useCallback } from 'react';
import { getTarefas } from '../services/tarefaService';
import TarefaItem from '../components/TarefaItem';
import TarefaForm from '../components/TarefaForm';
import FiltroBar from '../components/FiltroBar';

const TarefasAtivasPage = () => {
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [currentTarefa, setCurrentTarefa] = useState(null);
    const [currentFilters, setCurrentFilters] = useState({});

    const fetchTarefas = useCallback((filters = {}) => {
        setLoading(true);
        const statusFilter = filters.status || ['PENDENTE', 'EM_ANDAMENTO'];
        
        getTarefas({ ...filters, status: statusFilter })
            .then(response => {
                setTarefas(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar tarefas ativas:", error);
                alert("Falha ao carregar tarefas. Verifique se o Backend está rodando (porta 8081).");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchTarefas(); 
    }, [fetchTarefas]);

    const handleFilter = (filters) => {
        setCurrentFilters(filters);
        fetchTarefas(filters);
    };

    const handleEditStart = (tarefa) => {
        setCurrentTarefa(tarefa);
        setShowForm(true);
    };

    const handleSave = () => {
        fetchTarefas(currentFilters);
        setCurrentTarefa(null);
    };

    if (loading) return <div>Carregando tarefas...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Minhas Tarefas Ativas</h1>
            
            <div className="center-content">
                <button onClick={() => { setCurrentTarefa(null); setShowForm(true); }}>Criar Nova Tarefa</button>
            </div>

            {showForm && (
                <TarefaForm 
                    currentTarefa={currentTarefa} 
                    onSave={handleSave} 
                    onClose={() => setShowForm(false)} 
                />
            )}

            <FiltroBar onFilter={handleFilter} isConcluidasPage={false} />

            {tarefas.length === 0 ? (
                <p>Nenhuma tarefa ativa encontrada.</p>
            ) : (
                tarefas.map(tarefa => (
                    <TarefaItem 
                        key={tarefa.id} 
                        tarefa={tarefa} 
                        onUpdate={handleSave}
                        onEditStart={handleEditStart}
                    />
                ))
            )}
        </div>
    );
};

export default TarefasAtivasPage;