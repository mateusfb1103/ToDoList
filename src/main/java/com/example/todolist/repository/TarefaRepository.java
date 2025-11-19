package com.example.todolist.repository;

import com.example.todolist.model.CategoriaTarefa;
import com.example.todolist.model.StatusTarefa;
import com.example.todolist.model.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection; // Use Collection para findByStatusIn
import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    List<Tarefa> findByStatusIn(Collection<StatusTarefa> status);

    List<Tarefa> findByStatusInAndCategoria(Collection<StatusTarefa> status, CategoriaTarefa categoria);
    List<Tarefa> findByStatusInAndDataParaRealizacao(Collection<StatusTarefa> status, LocalDate dataParaRealizacao);

    List<Tarefa> findByCategoriaAndDataParaRealizacao(CategoriaTarefa categoria, LocalDate dataParaRealizacao);

    List<Tarefa> findByCategoria(CategoriaTarefa categoria);
    List<Tarefa> findByDataParaRealizacao(LocalDate dataParaRealizacao);
}