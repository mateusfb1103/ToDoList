package com.example.todolist.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Data
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "America/Sao_Paulo") // Padrão brasileiro
    private LocalDate dataParaRealizacao;

    @Enumerated(EnumType.STRING)
    private CategoriaTarefa categoria;

    @Enumerated(EnumType.STRING)
    private StatusTarefa status = StatusTarefa.PENDENTE; // Status inicial padrão
}