# ATLAS Agro Industrial - Makefile
# Comandos para desarrollo y build del proyecto

.PHONY: help build lint dev clean install test

# Variables
NODE_ENV ?= development
PORT ?= 5173
CONTAINER_NAME ?= atlas-container-dev
DOCKER_EXEC = docker exec -it $(CONTAINER_NAME)

# Colores para output
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Comando por defecto
help: ## Mostrar esta ayuda
	@echo "$(GREEN)ATLAS Agro Industrial - Comandos disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

install: ## Instalar dependencias en el contenedor
	@echo "$(GREEN)Instalando dependencias en el contenedor...$(NC)"
	$(DOCKER_EXEC) pnpm install
	@echo "$(GREEN)✅ Dependencias instaladas$(NC)"

dev: ## Iniciar servidor de desarrollo
	@echo "$(GREEN)Iniciando contenedor de desarrollo...$(NC)"
	docker-compose up atlas-dev

build: ## Compilar proyecto para producción en el contenedor
	@echo "$(GREEN)Compilando proyecto para producción en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && pnpm exec tsc && pnpm exec vite build"
	@echo "$(GREEN)✅ Build completado exitosamente$(NC)"

lint: ## Ejecutar linter en el contenedor
	@echo "$(GREEN)Ejecutando linter en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && pnpm exec eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
	@echo "$(GREEN)✅ Linting completado$(NC)"

lint-fix: ## Ejecutar linter con corrección automática en el contenedor
	@echo "$(GREEN)Ejecutando linter con corrección automática en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && pnpm exec eslint . --ext ts,tsx --fix"
	@echo "$(GREEN)✅ Linting con corrección completado$(NC)"

type-check: ## Verificar tipos de TypeScript en el contenedor
	@echo "$(GREEN)Verificando tipos de TypeScript en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && pnpm exec tsc --noEmit"
	@echo "$(GREEN)✅ Verificación de tipos completada$(NC)"

test: ## Ejecutar tests en el contenedor
	@echo "$(GREEN)Ejecutando tests en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && pnpm test"
	@echo "$(GREEN)✅ Tests completados$(NC)"

clean: ## Limpiar archivos generados en el contenedor
	@echo "$(GREEN)Limpiando archivos generados en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && rm -rf dist/ && rm -rf node_modules/.vite/"
	@echo "$(GREEN)✅ Limpieza completada$(NC)"

preview: ## Preview del build de producción en el contenedor
	@echo "$(GREEN)Iniciando preview del build en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh -c "cd /app && pnpm exec vite preview"

docker-build: ## Construir imágenes Docker
	@echo "$(GREEN)Construyendo imágenes Docker...$(NC)"
	docker-compose build --no-cache
	@echo "$(GREEN)✅ Imágenes Docker construidas$(NC)"

docker-up: ## Iniciar contenedores
	@echo "$(GREEN)Iniciando contenedores...$(NC)"
	docker-compose up -d atlas-dev
	@echo "$(GREEN)✅ Contenedores iniciados$(NC)"

docker-down: ## Detener contenedores
	@echo "$(GREEN)Deteniendo contenedores...$(NC)"
	docker-compose down
	@echo "$(GREEN)✅ Contenedores detenidos$(NC)"

docker-restart: ## Reiniciar contenedores
	@echo "$(GREEN)Reiniciando contenedores...$(NC)"
	docker-compose restart atlas-dev
	@echo "$(GREEN)✅ Contenedores reiniciados$(NC)"

docker-dev: docker-up ## Ejecutar en Docker para desarrollo (alias de docker-up)

docker-prod: ## Ejecutar en Docker para producción
	@echo "$(GREEN)Iniciando contenedor de producción...$(NC)"
	docker-compose --profile production up -d atlas-prod
	@echo "$(GREEN)✅ Contenedor de producción iniciado$(NC)"

docker-rebuild: docker-down docker-build docker-up ## Reconstruir completamente (down + build + up)
	@echo "$(GREEN)✅ Rebuild completo terminado$(NC)"

check-all: lint type-check build ## Ejecutar todas las verificaciones en el contenedor
	@echo "$(GREEN)✅ Todas las verificaciones completadas exitosamente$(NC)"

# Comandos de desarrollo rápido
quick-dev: docker-rebuild ## Rebuild completo y desarrollo

quick-build: clean install build ## Limpiar, instalar y build en el contenedor

# Comandos de utilidad
shell: ## Abrir shell en el contenedor
	@echo "$(GREEN)Abriendo shell en el contenedor...$(NC)"
	$(DOCKER_EXEC) sh

logs: ## Ver logs del contenedor
	@echo "$(GREEN)Mostrando logs del contenedor...$(NC)"
	docker-compose logs -f atlas-dev

# Información del proyecto
info: ## Mostrar información del proyecto
	@echo "$(GREEN)ATLAS Agro Industrial - Información del proyecto:$(NC)"
	@echo "  Node version: $(shell node --version)"
	@echo "  PNPM version: $(shell pnpm --version)"
	@echo "  NODE_ENV: $(NODE_ENV)"
	@echo "  Puerto dev: $(PORT)"
