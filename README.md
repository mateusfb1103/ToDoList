# Gerenciador de Tarefas Full-Stack (To-Do List)

Este é um projeto acadêmico de um Gerenciador de Tarefas completo (To-Do List) desenvolvido com uma arquitetura de três camadas (Java Spring Boot, React/Vite e PostgreSQL).

## Tecnologias Utilizadas

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend (API)** | **Java 17+** | Spring Boot, Spring Data JPA, Spring Web, Lombok. |
| **Frontend (UI)** | **React** | React Router DOM, Axios, Vite. |
| **Banco de Dados** | **PostgreSQL** | Persistência de dados das tarefas. |
| **Orquestração** | **Docker Compose** | Gerenciamento e inicialização simplificada do ambiente completo. |

---

## Pré-requisitos
1. **Docker** e **Docker Compose** (Versão 20.10+)
2. **Java JDK 17+**
3. **Node.js** e **npm**

---

### 1. Clonar o Repositório

```bash
git clone https://github.com/mateusfb1103/ToDoList
```
---

### 2. Executar a aplicação (backend + banco)
Na raiz do projeto (/todolist), execute o comando para construir as imagens, iniciar o banco de dados e a API REST em segundo plano:
```bash
docker-compose up -d
```
Após isso, execute a aplicação pela IDE.

---

### 3. Iniciando o frontend
Para iniciar o frontend:
```bash
cd frontend
npm i
npm run dev
