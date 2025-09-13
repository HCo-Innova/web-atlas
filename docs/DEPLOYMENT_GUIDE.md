# 🚀 Deployment Setup Guide - ATLAS Agro Industrial

## 📋 Quick Start

### **1. Requisitos Previos**
```bash
# Verificar que tienes estas herramientas instaladas
aws --version        # AWS CLI
terraform --version  # Terraform >= 1.5.0
node --version      # Node.js >= 18.x
npm --version       # NPM
```

### **2. Setup de AWS (Una sola vez)**
```bash
# Ejecutar setup inicial de AWS
./scripts/setup-aws.sh

# Esto crea:
# - S3 bucket para Terraform state
# - DynamoDB table para state locking
# - Configuración de encriptación
```

### **3. Desplegar Infraestructura**
```bash
# Ir al directorio de Terraform
cd terraform

# Inicializar Terraform
terraform init

# Ver plan de deployment
terraform plan

# Aplicar cambios
terraform apply
```

### **4. Deploy de la Aplicación**
```bash
# Desde la raíz del proyecto
./scripts/deploy.sh

# O con opciones específicas
./scripts/deploy.sh --skip-build        # Usar build existente
./scripts/deploy.sh --skip-invalidation # No invalidar cache
```

---

## 🌐 URLs y Acceso

### **Temporal (Disponible inmediatamente)**
```
https://d1234567890.cloudfront.net
```
- ✅ **Disponible**: Inmediatamente después del deployment
- ✅ **SSL**: Certificado incluido
- ✅ **CDN**: Distribución global
- ✅ **Funcional**: 100% igual al sitio final

### **Definitivo (Cuando DNS esté configurado)**
```
https://atlasaisa.com.py
https://www.atlasaisa.com.py
```

---

## 🔧 Configuración por Fases

### **Fase 1: Deployment Temporal (Ahora)**
```bash
# En terraform/terraform.tfvars
create_domain_resources = false
```

### **Fase 2: Migración a Dominio (Cuando DNS esté listo)**
```bash
# En terraform/terraform.tfvars
create_domain_resources = true

# Aplicar cambios
cd terraform
terraform apply

# El sitio seguirá funcionando en ambas URLs durante la transición
```

---

## 📁 Estructura de Archivos Creados

```
terraform/
├── main.tf                    # Configuración principal
├── variables.tf               # Variables de configuración
├── outputs.tf                 # Outputs del deployment
├── providers.tf               # Configuración de AWS
├── backend.tf                 # Estado de Terraform
├── terraform.tfvars           # Variables de producción
└── modules/
    ├── s3-website/           # Módulo S3
    ├── cloudfront/           # Módulo CloudFront
    ├── acm/                  # Módulo certificados SSL
    └── route53/              # Módulo DNS

scripts/
├── setup-aws.sh             # Setup inicial AWS ⚡
├── deploy.sh                 # Deployment completo 🚀
└── invalidate-cache.sh       # Limpiar cache CDN 🔄
```

---

## 🛠️ Comandos Útiles

### **Terraform**
```bash
# Ver estado actual
terraform show

# Ver outputs
terraform output

# Destruir infraestructura (¡CUIDADO!)
terraform destroy

# Formatear archivos
terraform fmt -recursive
```

### **Deployment**
```bash
# Deploy completo
./scripts/deploy.sh

# Solo invalidar cache
./scripts/invalidate-cache.sh

# Invalidar archivos específicos
./scripts/invalidate-cache.sh --paths "/index.html" --wait
```

### **AWS CLI**
```bash
# Ver contenido del bucket
aws s3 ls s3://atlas-production-xxxx/

# Sincronizar manualmente
aws s3 sync dist/ s3://atlas-production-xxxx/ --delete

# Ver distribuciones de CloudFront
aws cloudfront list-distributions
```

---

## 🔍 Verificación de Deployment

### **1. Verificar Terraform**
```bash
cd terraform
terraform output deployment_info
```

### **2. Verificar Sitio Web**
```bash
# Obtener URL temporal
terraform output cloudfront_url

# Abrir en navegador (macOS)
open "$(terraform output -raw cloudfront_url)"
```

### **3. Verificar S3**
```bash
# Ver archivos en bucket
aws s3 ls s3://$(terraform output -raw s3_bucket_name)/
```

### **4. Verificar CloudFront**
```bash
# Ver estado de distribución
aws cloudfront get-distribution --id $(terraform output -raw cloudfront_distribution_id)
```

---

## 🚨 Troubleshooting

### **Error: Bucket ya existe**
```bash
# Los nombres de bucket son globalmente únicos
# El script usa un sufijo aleatorio para evitar conflictos
# Si persiste, cambiar 'bucket_name' en terraform.tfvars
```

### **Error: AccessDenied en S3**
```bash
# Verificar permisos AWS
aws sts get-caller-identity

# Verificar región
aws configure get region
```

### **Error: CloudFront demora en propagarse**
```bash
# Normal: 5-15 minutos para propagación global
# Verificar estado:
aws cloudfront get-distribution --id <ID> --query 'Distribution.Status'
```

### **Error: Terraform state lock**
```bash
# Forzar unlock (¡CUIDADO!)
terraform force-unlock <LOCK_ID>
```

---

## 📊 Monitoreo y Logs

### **CloudWatch Logs**
```bash
# Ver logs de CloudFront
aws logs describe-log-groups --log-group-name-prefix "/aws/cloudfront"
```

### **Métricas de S3**
```bash
# Ver métricas de bucket
aws cloudwatch get-metric-statistics \
  --namespace AWS/S3 \
  --metric-name NumberOfObjects \
  --dimensions Name=BucketName,Value=atlas-production-xxxx \
  --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 3600 \
  --statistics Sum
```

---

## 💰 Estimación de Costos

### **Recursos Creados**
- **S3 Bucket**: ~$1-3/mes (storage + requests)
- **CloudFront**: ~$5-15/mes (data transfer)
- **Route53**: ~$0.50/mes (hosted zone)
- **ACM**: GRATIS (certificados SSL)
- **DynamoDB**: ~$1/mes (terraform locks)

### **Total Estimado: $6.50-19.50 USD/mes**

---

## 🔄 Migración Futura

### **Cuando el dominio `atlasaisa.com.py` esté listo:**

1. **Actualizar configuración**:
   ```bash
   # En terraform/terraform.tfvars
   create_domain_resources = true
   ```

2. **Aplicar cambios**:
   ```bash
   cd terraform
   terraform apply
   ```

3. **Configurar DNS** (en tu proveedor de dominio):
   ```bash
   # Obtener name servers
   terraform output -json route53_zone_id
   
   # Configurar en tu registrador de dominio
   ```

4. **Verificar migración**:
   ```bash
   # Ambas URLs funcionarán:
   curl -I https://d1234567890.cloudfront.net
   curl -I https://atlasaisa.com.py
   ```

---

## 📞 Soporte

### **Logs de Deployment**
- Scripts guardan logs detallados
- Revisar outputs de Terraform
- Verificar AWS CloudTrail para cambios

### **Rollback de Emergencia**
```bash
# Git rollback
git revert <commit-hash>
git push origin main

# Re-deploy automático via GitHub Actions
```

---

**¡Listo para el deployment! 🚀**