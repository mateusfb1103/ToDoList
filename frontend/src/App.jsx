import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TarefasAtivasPage from './pages/TarefasAtivasPage';
import TarefasConcluidasPage from './pages/TarefasConcluidasPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header style={{ padding: '10px', background: '#333', color: 'white' }}>
            <nav>
                <Link to="/" style={{ color: 'white', marginRight: '20px' }}>TAREFAS ATIVAS</Link>
                <Link to="/concluidas" style={{ color: 'white' }}>TAREFAS CONCLUÍDAS</Link>
            </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<TarefasAtivasPage />} />
          <Route path="/concluidas" element={<TarefasConcluidasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;