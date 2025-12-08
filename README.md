# GitHub Repository Management with OpenTofu

Este módulo de OpenTofu permite crear y gestionar repositorios de GitHub de manera automatizada.

## Características

- ✅ Creación de múltiples repositorios
- ✅ Configuración de visibilidad (público, privado, interno)
- ✅ Configuración de webhooks
- ✅ Gestión de colaboradores
- ✅ Aplicación de temas (topics)
- ✅ Uso de plantillas de repositorio
- ✅ Configuración de características del repositorio
- ✅ Variables de repositorio automáticas (DEPLOYMENT, ECR_REPOSITORY)
- ✅ Repositorios ECR automáticos en AWS
- ✅ Repositorios Helm automáticos en S3 (s3://ellibro-helm-charts/)
- ✅ Push automático de contenido skeleton

## Requisitos Previos

1. **OpenTofu** >= 1.0
2. **Token de GitHub** con permisos apropiados
3. **Cuenta de GitHub** o **organización**
4. **AWS CLI** configurado con credenciales apropiadas
5. **Cuenta de AWS** con permisos para ECR y S3
6. **Bucket S3** `ellibro-terraform` para almacenar el estado de OpenTofu
7. **Helm** con plugin S3 instalado (`helm plugin install https://github.com/hypnoglow/helm-s3.git`)

## Configuración

### 1. Token de GitHub

Crea un Personal Access Token en GitHub con los siguientes permisos:
- `repo` (acceso completo a repositorios)
- `admin:org` (si vas a crear repositorios en organizaciones)
- `admin:repo_hook` (para webhooks)

Configura el token de una de estas formas:

```bash
# Opción 1: Variable de entorno (recomendado)
export GITHUB_TOKEN="ghp_your_token_here"

# Opción 2: En el archivo terraform.tfvars
github_token = "ghp_your_token_here"
```

### 2. Configuración de AWS

Para crear repositorios ECR y usar S3 como backend, configura AWS CLI:

```bash
# Configurar AWS CLI
aws configure

# O usar variables de entorno
export AWS_ACCESS_KEY_ID="your_access_key"
export AWS_SECRET_ACCESS_KEY="your_secret_key"
export AWS_DEFAULT_REGION="us-east-1"
```

### 3. Backend de S3

Este proyecto utiliza S3 como backend para almacenar el estado de OpenTofu:

- **Bucket**: `ellibro-terraform`
- **Key**: `github/terraform.tfstate`
- **Región**: `us-east-1`

El backend se configura automáticamente en el archivo `backend.tf`. Asegúrate de que:

1. El bucket `ellibro-terraform` existe en tu cuenta de AWS
2. Tienes permisos de lectura/escritura en el bucket
3. El bucket tiene versionado habilitado (recomendado)

### 4. Configuración de Helm S3

Para crear repositorios Helm automáticamente, necesitas:

1. **Instalar Helm S3 plugin**:
   ```bash
   helm plugin install https://github.com/hypnoglow/helm-s3.git
   ```

2. **Configurar credenciales AWS** (si no están configuradas):
   ```bash
   aws configure
   ```

3. **Crear bucket para Helm charts** (si no existe):
   ```bash
   aws s3 mb s3://ellibro-helm-charts
   ```

### 5. Configuración de Repositorios

Copia el archivo de ejemplo y personalízalo:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edita `terraform.tfvars` con tus repositorios:

```hcl
repositories = {
  "mi-proyecto" = {
    description = "Descripción de mi proyecto"
    visibility  = "public"
    auto_init   = true
    
    # Características del repositorio
    has_issues      = true
    has_projects    = true
    has_wiki        = true
    has_downloads   = true
    
    # Configuración de merge
    allow_merge_commit    = true
    allow_squash_merge    = true
    allow_rebase_merge    = true
    delete_branch_on_merge = true
    
    
    # Temas
    topics = ["terraform", "github", "automation"]
    
    # Webhooks (opcional)
    webhooks = [
      {
        url          = "https://your-webhook-url.com/github"
        content_type = "json"
        secret       = "your-webhook-secret"
        insecure_ssl = false
        events       = ["push", "pull_request"]
      }
    ]
    
    # Colaboradores (opcional)
    collaborators = {
      username   = "usuario-colaborador"
      permission = "push"
    }
  }
}
```

## Uso

### Inicialización

```bash
cd terraform/github
tofu init
```

### Planificación

```bash
tofu plan
```

### Aplicación

```bash
tofu apply
```

### Destrucción

```bash
tofu destroy
```

### Usando el script de despliegue

```bash
# Inicializar
./deploy.sh init

# Planificar cambios
./deploy.sh plan

# Aplicar cambios
./deploy.sh apply

# Destruir recursos
./deploy.sh destroy
```

## Variables Disponibles

### Variables Principales

| Variable | Tipo | Descripción | Valor por Defecto |
|----------|------|-------------|-------------------|
| `github_token` | `string` | Token de GitHub | `null` |
| `repositories` | `map(object)` | Mapa de repositorios a crear | `{}` |
| `organization` | `string` | Nombre de la organización (opcional) | `null` |

### Configuración de Repositorio

| Variable | Tipo | Descripción | Valor por Defecto |
|----------|------|-------------|-------------------|
| `description` | `string` | Descripción del repositorio | `""` |
| `visibility` | `string` | Visibilidad (private, public, internal) | `"private"` |
| `auto_init` | `bool` | Inicializar con README | `true` |
| `has_issues` | `bool` | Habilitar issues | `true` |
| `has_projects` | `bool` | Habilitar proyectos | `true` |
| `has_wiki` | `bool` | Habilitar wiki | `true` |
| `has_downloads` | `bool` | Habilitar descargas | `true` |
| `topics` | `list(string)` | Lista de temas | `[]` |


## Outputs

El módulo proporciona los siguientes outputs:

- `repository_urls`: URLs de los repositorios creados
- `repository_ssh_urls`: URLs SSH para clonar
- `repository_https_urls`: URLs HTTPS para clonar
- `repository_ids`: IDs de los repositorios
- `repository_full_names`: Nombres completos (owner/repo)
- `repository_descriptions`: Descripciones de los repositorios
- `repository_visibility`: Visibilidad de los repositorios
- `repository_topics`: Temas de los repositorios
- `webhook_urls`: URLs de webhooks configurados
- `collaborator_info`: Información de colaboradores

## Ejemplos de Uso

### Repositorio Público Simple

```hcl
repositories = {
  "mi-proyecto-publico" = {
    description = "Un proyecto público"
    visibility  = "public"
    topics      = ["open-source", "javascript"]
  }
}
```

### Repositorio Privado

```hcl
repositories = {
  "proyecto-privado" = {
    description = "Proyecto privado"
    visibility  = "private"
    topics      = ["private", "internal"]
  }
}
```

### Repositorio con Webhook

```hcl
repositories = {
  "proyecto-con-webhook" = {
    description = "Proyecto con notificaciones"
    visibility  = "public"
    webhooks = [
      {
        url    = "https://mi-servidor.com/webhook"
        events = ["push", "pull_request"]
      }
    ]
  }
}
```

## Troubleshooting

### Error de Autenticación

Si recibes errores de autenticación:

1. Verifica que el token tenga los permisos correctos
2. Asegúrate de que la variable `GITHUB_TOKEN` esté configurada
3. Verifica que el token no haya expirado

### Error de Permisos

Si no puedes crear repositorios:

1. Verifica que tengas permisos de escritura en la organización (si aplica)
2. Asegúrate de que el token tenga el scope `repo` completo
3. Para organizaciones, verifica que tengas permisos de administrador

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.