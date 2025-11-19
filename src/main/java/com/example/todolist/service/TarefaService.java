package com.example.todolist.service;

import com.example.todolist.model.CategoriaTarefa;
import com.example.todolist.model.StatusTarefa;
import com.example.todolist.model.Tarefa;
import com.example.todolist.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    public Tarefa salvar(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public Optional<Tarefa> buscarPorId(Long id) {
        return tarefaRepository.findById(id);
    }

    public void deletar(Long id) {
        tarefaRepository.deleteById(id);
    }

    public Tarefa atualizar(Long id, Tarefa tarefaDetalhes) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setTitulo(tarefaDetalhes.getTitulo());
            tarefa.setDescricao(tarefaDetalhes.getDescricao());
            tarefa.setDataParaRealizacao(tarefaDetalhes.getDataParaRealizacao());
            tarefa.setCategoria(tarefaDetalhes.getCategoria());
            tarefa.setStatus(tarefaDetalhes.getStatus());
            return tarefaRepository.save(tarefa);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o id: " + id));
    }

    public Tarefa marcarComoConcluida(Long id) {
        return tarefaRepository.findById(id).map(tarefa -> {
            tarefa.setStatus(StatusTarefa.CONCLUIDO);
            return tarefaRepository.save(tarefa);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada com o id: " + id));
    }

    /**
     * Lógica de Filtragem Corrigida para suportar filtros que não sejam a lista de Status.
     */
    public List<Tarefa> buscarComFiltros(
            List<StatusTarefa> status,
            CategoriaTarefa categoria,
            LocalDate data
    ) {
        if (status != null && !status.isEmpty()) {

            if (categoria != null && data != null) {
                return tarefaRepository.findByStatusIn(status);
            } else if (categoria != null) {
                return tarefaRepository.findByStatusInAndCategoria(status, categoria);
            } else if (data != null) {
                return tarefaRepository.findByStatusInAndDataParaRealizacao(status, data);
            } else {
                return tarefaRepository.findByStatusIn(status);
            }
        }

        else if (categoria != null && data != null) {
            return tarefaRepository.findByCategoriaAndDataParaRealizacao(categoria, data);
        } else if (categoria != null) {
            return tarefaRepository.findByCategoria(categoria);
        } else if (data != null) {
            return tarefaRepository.findByDataParaRealizacao(data);
        } else {
            return tarefaRepository.findAll();
        }
    }
}