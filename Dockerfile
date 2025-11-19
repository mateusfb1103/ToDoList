# Estágio de Build: Compila a aplicação
FROM eclipse-temurin:21-jdk-jammy as builder
WORKDIR /app
COPY . .

# Garante que o script do Maven Wrapper tenha permissão de execução
RUN chmod +x ./mvnw

# Usa o wrapper do Maven para construir o projeto, criando o JAR executável
RUN ./mvnw clean install -DskipTests

# Estágio de Execução: Executa a aplicação
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copia o JAR do estágio de build
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]