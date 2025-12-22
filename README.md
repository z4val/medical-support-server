# Medical Support Server

Este repositorio contiene el backend para la aplicación de **Soporte Médico con IA**. Es una API RESTful construida con **NestJS** que proporciona servicios para la gestión de pacientes, indicadores médicos, consultas, autenticación de usuarios y funcionalidades potenciadas por Inteligencia Artificial.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura](#arquitectura)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Documentación de la API](#documentación-de-la-api)
  - [Autenticación](#autenticación)
  - [Usuarios](#usuarios)
  - [Pacientes](#pacientes)
  - [Indicadores](#indicadores)
  - [Consultas (Inquiries)](#consultas-inquiries)
  - [Dashboard](#dashboard)
  - [IA](#ia)
- [Estructura del Proyecto](#estructura-del-proyecto)

## 🚀 Descripción General

El servidor `medical-support-server` actúa como el núcleo de la lógica de negocio, gestionando la persistencia de datos en PostgreSQL y exponiendo endpoints seguros para el frontend. Integra servicios de IA a través de OpenRouter para asistir en el análisis médico y soporte a la toma de decisiones.

## 🛠 Tecnologías Utilizadas

- **Framework Principal**: [NestJS](https://nestjs.com/) (Node.js)
- **Lenguaje**: TypeScript
- **Base de Datos**: PostgreSQL
- **ORM**: TypeORM
- **Autenticación**: Passport, JWT, Google OAuth2
- **IA**: OpenRouter SDK
- **Testing**: Jest

## 🏗 Arquitectura

El proyecto sigue una arquitectura modular basada en los principios de NestJS, organizando el código en:

- **Domain**: Módulos centrales del dominio de negocio (User, Patient, Indicators).
- **Modules**: Módulos de características y soporte (Auth, AI, Dashboard, Inquiries).
- **Infra**: Configuración de infraestructura y proveedores externos (Database, OpenRouter).

## 📋 Requisitos Previos

- Node.js (v18 o superior recomendado)
- npm o yarn
- PostgreSQL

## 🔧 Instalación

1.  Clonar el repositorio:
    ```bash
    git clone <url-del-repositorio>
    cd medical-support-server
    ```

2.  Instalar dependencias:
    ```bash
    npm install
    ```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DATABASE=medical_support_db
DB_AUTOLOAD=true
DB_SYNCH=true # Usar false en producción
DB_LOG=true

# Autenticación JWT
JWT_SECRET=tu_secreto_jwt

# Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Configuración de Cookies y Frontend
COOKIE_MODE=development # o production
COOKIE_DOMAIN=localhost
FRONTEND_URL=http://localhost:5173

# IA (OpenRouter)
OPENROUTER_API_KEY=tu_api_key_openrouter
```

## ▶️ Ejecución

```bash
# Desarrollo
npm run start

# Desarrollo (Watch mode)
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📡 Documentación de la API

### Autenticación
Base URL: `/auth`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/register` | Registrar un nuevo usuario. |
| `POST` | `/login` | Iniciar sesión con credenciales. |
| `GET` | `/google` | Iniciar flujo de autenticación con Google. |
| `GET` | `/google/callback` | Callback de Google OAuth. |
| `GET` | `/me` | Obtener perfil del usuario autenticado (Requiere JWT). |

### Usuarios
Base URL: `/user`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/` | Crear un usuario. |
| `GET` | `/` | Listar todos los usuarios. |
| `GET` | `/:id` | Obtener un usuario por ID. |
| `PATCH` | `/:id` | Actualizar un usuario. |
| `DELETE` | `/:id` | Eliminar un usuario. |

### Pacientes
Base URL: `/patient`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/` | Crear un paciente. |
| `GET` | `/` | Listar todos los pacientes. |
| `GET` | `/:id` | Obtener un paciente por ID. |
| `PATCH` | `/:id` | Actualizar un paciente. |
| `DELETE` | `/:id` | Eliminar un paciente. |

### Indicadores
Base URL: `/indicators`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/` | Crear un indicador médico. |
| `GET` | `/` | Listar indicadores (acepta query `q` para búsqueda). |
| `GET` | `/:id` | Obtener un indicador por ID. |
| `PATCH` | `/:id` | Actualizar un indicador. |
| `DELETE` | `/:id` | Eliminar un indicador. |

### Consultas (Inquiries)
Base URL: `/inquiries`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/` | Crear una nueva consulta médica. |
| `GET` | `/` | Listar consultas. Filtros: `patientId`, `patient_state`, `type_diagnosis`. |
| `GET` | `/patient/:patientId/history` | Obtener historial de consultas de un paciente. |
| `GET` | `/:id` | Obtener una consulta por ID. |
| `PATCH` | `/:id` | Actualizar una consulta. |
| `DELETE` | `/:id` | Eliminar una consulta. |

### Dashboard
Base URL: `/dashboard`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/recent-patients` | Obtener lista de pacientes recientes. |
| `GET` | `/monthly-patient-resume` | Estadísticas mensuales de pacientes. |
| `GET` | `/monthly-inquiry-resume` | Estadísticas mensuales de consultas. |
| `GET` | `/monthly-inquiry-chart` | Datos para gráfico mensual de consultas (query `year`). |
| `GET` | `/monthly-ai-chart` | Datos para gráfico mensual de uso de IA (query `year`). |

### IA
Base URL: `/ai`

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/AI-response` | Obtener respuesta de la IA. Body: `{ "model": "...", "prompt": "..." }`. |

## 📂 Estructura del Proyecto

```
src/
├── app.module.ts           # Módulo raíz
├── main.ts                 # Punto de entrada
├── domain/                 # Lógica de dominio
│   ├── indicators/         # Gestión de indicadores
│   ├── patient/            # Gestión de pacientes
│   └── user/               # Gestión de usuarios
├── infra/                  # Infraestructura
│   ├── database.config.ts  # Configuración de BD
│   └── openRouter.provider.ts # Proveedor de IA
└── modules/                # Módulos de características
    ├── ai/                 # Controlador y servicio de IA
    ├── auth/               # Autenticación (JWT, Google)
    ├── dashboard/          # Datos para el dashboard
    └── inquiries/          # Gestión de consultas médicas
```
