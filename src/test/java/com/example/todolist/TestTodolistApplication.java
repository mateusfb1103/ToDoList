package com.example.todolist;

import org.springframework.boot.SpringApplication;

public class TestTodolistApplication {

	public static void main(String[] args) {
		SpringApplication.from(TarefaApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
