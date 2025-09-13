# 🔐 GitHub Secrets Configuration - ATLAS Agro Industrial

## 📋 Secrets Requeridos para GitHub Actions

Para que el CI/CD funcione correctamente, necesitas configurar los siguientes secrets en GitHub:

### **🔑 AWS Credentials**

| Secret Name | Descripción | Valor |
|-------------|-------------|--------|
| `AWS_ACCESS_KEY_ID` | AWS Access Key ID | Tu AWS Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Access Key | Tu AWS Secret Key |
| `AWS_REGION` | Región de AWS | `sa-east-1` |

---

## 🛠️ Cómo Configurar los Secrets

### **1. Crear IAM User para GitHub Actions**

```bash
# Crear política IAM personalizada
aws iam create-policy \
  --policy-name AtlasGitHubActionsPolicy \
  --policy-document file://github-actions-policy.json

# Crear usuario IAM
aws iam create-user --user-name atlas-github-actions

# Adjuntar política al usuario
aws iam attach-user-policy \
  --user-name atlas-github-actions \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/AtlasGitHubActionsPolicy

# Crear access keys
aws iam create-access-key --user-name atlas-github-actions
```

### **2. Política IAM Mínima Requerida**

Crea un archivo `github-actions-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Access",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::atlas-production-*",
        "arn:aws:s3:::atlas-production-*/*"
      ]
    },
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:GetDistribution"
      ],
      "Resource": "*"
    },
    {
      "Sid": "TerraformStateAccess",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::atlas-terraform-state-sa-east-1",
        "arn:aws:s3:::atlas-terraform-state-sa-east-1/*"
      ]
    },
    {
      "Sid": "DynamoDBStateAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": "arn:aws:dynamodb:sa-east-1:*:table/atlas-terraform-locks"
    },
    {
      "Sid": "STSAccess",
      "Effect": "Allow",
      "Action": [
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
```

### **3. Configurar Secrets en GitHub**

1. **Ve a tu repositorio en GitHub**: `https://github.com/HCo-Innova/web-atlas`

2. **Ir a Settings → Secrets and variables → Actions**

3. **Crear New repository secret** para cada uno:

   #### **AWS_ACCESS_KEY_ID**
   ```
   Valor: AKIAXXXXXXXXXXXXXXXX
   ```

   #### **AWS_SECRET_ACCESS_KEY**
   ```
   Valor: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   #### **AWS_REGION**
   ```
   Valor: sa-east-1
   ```

---

## 🔧 Verificación de Configuración

### **1. Test Local de Credentials**
```bash
# Verificar que las credenciales funcionan
export AWS_ACCESS_KEY_ID="tu-access-key"
export AWS_SECRET_ACCESS_KEY="tu-secret-key"
export AWS_DEFAULT_REGION="sa-east-1"

# Test
aws sts get-caller-identity
```

### **2. Test de Permisos S3**
```bash
# Verificar acceso al bucket de Terraform state
aws s3 ls s3://atlas-terraform-state-sa-east-1/

# Verificar acceso al bucket de la web (después de terraform apply)
aws s3 ls s3://atlas-production-xxxxx/
```

### **3. Test de Permisos CloudFront**
```bash
# Listar distribuciones (después de terraform apply)
aws cloudfront list-distributions --query 'DistributionList.Items[?Comment==`ATLAS Website`]'
```

---

## 🚀 Workflow de CI/CD

### **Trigger Automático**
- ✅ **Push a `main`**: Deploy automático
- ✅ **Manual**: Workflow dispatch con opciones

### **Pasos del Pipeline**
1. **🏗️ Build**: Instalar deps, lint, type-check, build
2. **🚀 Deploy**: Subir a S3, invalidar CloudFront
3. **🧪 Test**: Verificar que el sitio responde
4. **📋 Summary**: Reporte detallado del deployment

### **Configuraciones Especiales**
- **Cache busting**: Assets con hash automático
- **Compression**: Gzip automático en S3
- **Headers**: Cache-Control optimizado para SPA
- **SPA Routing**: 404 → index.html para React Router

---

## 🛡️ Seguridad

### **Buenas Prácticas Implementadas**
- ✅ **Permisos mínimos**: IAM policy restrictiva
- ✅ **Secrets encriptados**: GitHub secrets seguros
- ✅ **Rotación**: Credenciales rotables
- ✅ **Auditoría**: CloudTrail registra todas las acciones

### **Recomendaciones Adicionales**
- 🔄 **Rotar credenciales** cada 90 días
- 🔍 **Monitorear CloudTrail** para actividad inusual
- 🚫 **No compartir** AWS credentials
- 📱 **Habilitar MFA** en cuenta AWS principal

---

## 🔄 Troubleshooting

### **Error: Access Denied en S3**
```bash
# Verificar política IAM
aws iam get-user-policy --user-name atlas-github-actions --policy-name AtlasGitHubActionsPolicy

# Verificar que el bucket existe
aws s3 ls | grep atlas
```

### **Error: CloudFront Invalidation Failed**
```bash
# Verificar distribución existe
aws cloudfront list-distributions --query 'DistributionList.Items[].{Id:Id,Comment:Comment}'

# Verificar permisos CloudFront
aws iam simulate-principal-policy \
  --policy-source-arn arn:aws:iam::YOUR_ACCOUNT:user/atlas-github-actions \
  --action-names cloudfront:CreateInvalidation \
  --resource-arns "*"
```

### **Error: Terraform State Lock**
```bash
# Verificar tabla DynamoDB
aws dynamodb describe-table --table-name atlas-terraform-locks

# Si hay lock stuck, forzar unlock
terraform force-unlock LOCK_ID
```

---

## 📊 Monitoreo del Pipeline

### **GitHub Actions**
- **Logs**: Cada paso registra progreso detallado
- **Artifacts**: Build files guardados por 7 días
- **Notifications**: Puedes configurar Slack/Discord

### **AWS CloudWatch**
- **Logs**: CloudFront access logs
- **Métricas**: S3 requests, CloudFront hits
- **Alertas**: Errores de deployment

### **Comandos Útiles**
```bash
# Ver últimos deployments
gh run list --workflow="deploy-production.yml"

# Ver logs de un deployment específico
gh run view RUN_ID --log

# Re-ejecutar deployment fallido
gh run rerun RUN_ID
```

---

## 🎯 Próximos Pasos

1. **Configurar secrets** siguiendo esta guía
2. **Hacer primer commit** a main para probar el pipeline
3. **Verificar deployment** en la URL temporal
4. **Configurar notificaciones** (opcional)

---

**¡Tu pipeline de CI/CD estará listo! 🚀**