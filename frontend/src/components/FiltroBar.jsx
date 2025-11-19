import React, { useState } from 'react';

const categorias = ["TAREFAS_DE_CASA", "TRABALHO", "PESSOAL"];
const statusAtivos = ["PENDENTE", "EM_ANDAMENTO"];

const FiltroBar = ({ onFilter, isConcluidasPage }) => {
    const [status, setStatus] = useState('');
    const [categoria, setCategoria] = useState('');
    const [data, setData] = useState('');

    const handleFilter = () => {
        onFilter({
            status: status || null,
            categoria: categoria || null,
            dataParaRealizacao: data || null
        });
    };

    return (
        <div className="filter-container">
            <h3>Filtrar Tarefas</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                
                {!isConcluidasPage && ( 
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Filtrar por Status</option>
                        {statusAtivos.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                    </select>
                )}

                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Filtrar por Categoria</option>
                    {categorias.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                </select>

                {/* <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                /> */}

                <button onClick={handleFilter}>Aplicar Filtros</button>
                
                <button onClick={() => {
                    setStatus('');
                    setCategoria('');
                    setData('');
                    onFilter({});
                }}>Limpar</button>
            </div>
        </div>
    );
};

export default FiltroBar;