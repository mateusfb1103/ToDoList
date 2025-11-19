package com.example.todolist.controller;

import com.example.todolist.model.CategoriaTarefa;
import com.example.todolist.model.StatusTarefa;
import com.example.todolist.model.Tarefa;
import com.example.todolist.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @GetMapping
    public List<Tarefa> buscarTarefas(
            @RequestParam(required = false) List<StatusTarefa> status,
            @RequestParam(required = false) CategoriaTarefa categoria,
            @RequestParam(required = false) LocalDate dataParaRealizacao) {

        return tarefaService.buscarComFiltros(status, categoria, dataParaRealizacao);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarefa criarTarefa(@RequestBody Tarefa tarefa) {
        return tarefaService.salvar(tarefa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @RequestBody Tarefa tarefaDetalhes) {
        try {
            Tarefa tarefaAtualizada = tarefaService.atualizar(id, tarefaDetalhes);
            return ResponseEntity.ok(tarefaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarTarefa(@PathVariable Long id) {
        tarefaService.deletar(id);
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Tarefa> marcarConcluida(@PathVariable Long id) {
        try {
            Tarefa tarefaConcluida = tarefaService.marcarComoConcluida(id);
            return ResponseEntity.ok(tarefaConcluida);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}