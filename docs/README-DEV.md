# 🚀 ATLAS Agro - Guía de Desarrollo

## **Configuración de Desarrollo con Docker**

### **Prerrequisitos**
- Docker Desktop instalado
- Docker Compose v3.8+
- Node.js 22.19.0 LTS (opcional, para desarrollo local)
- pnpm (gestor de paquetes utilizado en el proyecto)

### **Comandos Rápidos**

```bash
# 🏃‍♂️ Iniciar desarrollo con hot reload
docker-compose up atlas-dev

# 🔧 Rebuild de contenedores
docker-compose build --no-cache

# 🧪 Testing de producción local
docker-compose --profile production up atlas-prod

# 🛑 Detener todos los servicios
docker-compose down
```

### **Acceso a la Aplicación**

| Entorno | URL | Descripción |
|---------|-----|-------------|
| **Desarrollo** | `https://localhost` | Hot reload habilitado |
| **Vite Dev Server** | `http://localhost:5173` | Servidor de desarrollo directo |
| **Producción Local** | `https://localhost:8443` | Build optimizado |

### **Estructura de Archivos Docker**

```
atlas/
├── Dockerfile              # Producción (multi-stage)
├── Dockerfile.dev          # Desarrollo (hot reload)
├── docker-compose.yml      # Orquestación de servicios
├── Caddyfile              # Configuración del servidor web
├── .dockerignore          # Archivos excluidos del build
└── docs/
    ├── SRS.md             # Especificación de requisitos
    ├── SYSTEM_DESIGN.md   # Sistema de diseño
    ├── STACK_TECH.md      # Stack tecnológico
    └── README-DEV.md      # Esta guía
```

### **Arquitectura Docker**

#### **Servicios Disponibles**

| Servicio | Puerto | Descripción | Uso |
|----------|--------|-------------|-----|
| **atlas-dev** | 5173, 80, 443 | Desarrollo con hot reload | `docker-compose up atlas-dev` |
| **atlas-prod** | 8080, 8443 | Producción local | `docker-compose --profile production up atlas-prod` |

#### **Configuración de Desarrollo (atlas-dev)**
- **Base:** Node.js 22.19.0 Alpine
- **Servicios:** Caddy + Vite dev server
- **Hot Reload:** Automático sin rebuild
- **SSL:** Certificados auto-firmados
- **Volúmenes:** Código fuente montado directamente

#### **Configuración de Producción (atlas-prod)**
- **Base:** Multi-stage build (Node.js + Caddy)
- **Optimización:** Build minificado y comprimido
- **SSL:** Certificados auto-firmados (desarrollo)
- **Assets:** Archivos estáticos optimizados

### **Configuración de Volúmenes**

- **Código fuente:** Montaje directo para hot reload
- **node_modules:** Volumen anónimo para evitar conflictos
- **Configuración:** Caddyfile montado en contenedor

### **Variables de Entorno**

```bash
# Desarrollo
NODE_ENV=development
VITE_HMR_PORT=5173
VITE_API_URL=http://localhost:3000

# Producción
NODE_ENV=production
VITE_API_URL=https://api.atlasagro.com
```

### **Gestor de Paquetes**

- **pnpm**: Gestor de paquetes utilizado (más rápido que npm/yarn)
- **Lock file**: pnpm-lock.yaml para dependencias exactas
- **Instalación**: `npm install -g pnpm` o `corepack enable`

### **Troubleshooting**

#### **Problema: Hot reload no funciona**
```bash
# Verificar que el puerto 5173 esté expuesto
docker-compose ps

# Revisar logs del contenedor
docker-compose logs atlas-dev

# Verificar que Caddy esté ejecutándose
docker-compose exec atlas-dev ps aux | grep caddy
```

#### **Problema: Certificado SSL inválido**
```bash
# Aceptar certificado auto-firmado en navegador
# O usar HTTP en puerto 80
http://localhost
```

#### **Problema: Puerto ocupado**
```bash
# Cambiar puertos en docker-compose.yml
ports:
  - "5174:5173"  # Cambiar puerto local

# O detener procesos que usen el puerto
lsof -ti:5173 | xargs kill -9
lsof -ti:80 | xargs kill -9
lsof -ti:443 | xargs kill -9
```

#### **Problema: pnpm no encontrado**
```bash
# Instalar pnpm globalmente
npm install -g pnpm

# O usar corepack (recomendado)
corepack enable
corepack prepare pnpm@latest --activate
```

### **Comandos Útiles**

```bash
# 📊 Ver logs en tiempo real
docker-compose logs -f atlas-dev

# 🔍 Ejecutar comando en contenedor
docker-compose exec atlas-dev sh

# 🧹 Limpiar contenedores y volúmenes
docker-compose down -v --remove-orphans

# 📦 Ver tamaño de imágenes
docker images | grep atlas

# 🔄 Reinstalar dependencias
docker-compose exec atlas-dev pnpm install

# 🧪 Ejecutar tests (cuando estén implementados)
docker-compose exec atlas-dev pnpm test

# 📋 Ver estado de servicios
docker-compose ps

# 🐛 Debug de contenedor
docker-compose exec atlas-dev sh -c "ps aux"
```

### **Flujo de Desarrollo Recomendado**

1. **Clonar y configurar:**
   ```bash
   git clone <repository-url>
   cd atlas
   # Instalar pnpm si no lo tienes
   npm install -g pnpm
   ```

2. **Iniciar desarrollo:**
   ```bash
   docker-compose up atlas-dev
   ```

3. **Abrir navegador:**
   - `https://localhost` (HTTPS con Caddy + hot reload)
   - `http://localhost:5173` (Vite dev server directo)

4. **Desarrollar:**
   - Editar archivos localmente en tu IDE
   - Cambios se reflejan automáticamente
   - Hot reload funciona sin rebuild
   - Caddy maneja SSL automáticamente

5. **Testing de producción local:**
   ```bash
   docker-compose --profile production up atlas-prod
   # Acceder a https://localhost:8443
   ```

6. **Commit y push:**
   ```bash
   git add .
   git commit -m "feat: nueva funcionalidad"
   git push
   ```

7. **Limpiar recursos:**
   ```bash
   docker-compose down
   # O para limpiar todo
   docker-compose down -v --remove-orphans
   ```

---

**¡Happy Coding! 🎉**