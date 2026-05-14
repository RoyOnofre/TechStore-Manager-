# 🚀 PROYECTO DE INGENIERÍA DE SOFTWARE – SIS324
# 💻 TechStore Manager
### Sistema de Gestión Integral para Tiendas de Tecnología

---

# 📌 Información General

| Campo | Información |
|---|---|
| **Carrera** | Ingeniería de Sistemas |
| **Materia** | SIS324 – Ingeniería de Software |
| **Grupo** | 17 |
| **Proyecto** | TechStore Manager |
| **Tipo de Sistema** | Aplicación Web Empresarial |
| **Arquitectura** | Cliente - Servidor |
| **Base de Datos** | PostgreSQL + Supabase |

---

# 👨‍💻 Integrantes del Equipo

| Integrante | Rol |
|---|---|
| **Coraite Yanaje Luz Clara** | Frontend Developer |
| **Muraña Pizarro Nayda Thatiana** | Database & QA |
| **Onofre Alanoca Roy** | Backend & Arquitectura |

---

# 🧠 Descripción del Proyecto

**TechStore Manager** es un sistema web empresarial desarrollado para optimizar la administración de tiendas tecnológicas.

La plataforma permite gestionar:

- 📦 Inventarios
- 🛒 Ventas
- 👥 Clientes
- 🔐 Usuarios
- 📊 Reportes
- 📈 Métricas de negocio
- 🧾 Facturación
- 🔍 Auditoría de acciones

El sistema fue diseñado utilizando tecnologías modernas y una arquitectura escalable enfocada en rendimiento, seguridad y experiencia de usuario.

---

# 🎯 Objetivos del Proyecto

## Objetivo General

Desarrollar un sistema integral para automatizar y optimizar los procesos administrativos y comerciales de tiendas tecnológicas.

## Objetivos Específicos

- Automatizar el control de inventario
- Mejorar la velocidad de atención
- Reducir errores manuales
- Centralizar información
- Generar reportes inteligentes
- Implementar seguridad avanzada
- Visualizar métricas en tiempo real

---

# 🏗️ Tecnologías Utilizadas

# 🔵 Frontend

| Tecnología | Uso |
|---|---|
| React 19 | Interfaces dinámicas |
| TypeScript | Tipado seguro |
| Vite | Compilación rápida |
| Tailwind CSS | Diseño moderno |
| Lucide React | Iconografía |
| Recharts | Gráficos y métricas |

---

# 🟣 Backend

| Tecnología | Uso |
|---|---|
| Python 3.x | Lógica del servidor |
| FastAPI | API REST |
| SQLAlchemy | ORM |
| Pydantic | Validación |
| BCrypt | Seguridad |
| ReportLab | Exportación PDF |

---

# 🟢 Base de Datos

| Tecnología | Uso |
|---|---|
| PostgreSQL | Motor relacional |
| Supabase | Infraestructura cloud |

---

# ⚙️ Arquitectura del Sistema

## 📊 Modelo Relacional Principal

```mermaid
erDiagram

USUARIO {
    int id_usuario
    string nombre
    string email
    string password
    string rol
}

CLIENTE {
    int id_cliente
    string nombre
    string telefono
    string nit
}

PRODUCTO {
    int id_producto
    string nombre
    string categoria
    float precio
    int stock
}

PROVEEDOR {
    int id_proveedor
    string empresa
    string telefono
}

VENTA {
    int id_venta
    date fecha
    float total
}

DETALLEVENTA {
    int id_detalle
    int cantidad
    float subtotal
}

MOVIMIENTOINVENTARIO {
    int id_movimiento
    string tipo
    int cantidad
}

AUDITORIA {
    int id_auditoria
    string accion
    date fecha
}

USUARIO ||--o{ VENTA : realiza
CLIENTE ||--o{ VENTA : compra
VENTA ||--|{ DETALLEVENTA : contiene
PRODUCTO ||--o{ DETALLEVENTA : vendido
PRODUCTO ||--o{ MOVIMIENTOINVENTARIO : registra
USUARIO ||--o{ AUDITORIA : genera
PROVEEDOR ||--o{ PRODUCTO : suministra
```

---

# 🧩 Módulos Principales

# 👤 Gestión de Usuarios

- CRUD completo
- Roles y permisos
- Protección de integridad
- Autenticación segura

---

# 📦 Gestión de Productos

- Registro de productos
- Control de stock
- Categorías
- Garantías

---

# 🛒 Punto de Venta (POS)

- Registro rápido de ventas
- Actualización automática de inventario
- Facturación
- Descuentos

---

# 📈 Dashboard Inteligente

- Ventas diarias
- Productos más vendidos
- Métricas financieras
- Alertas de stock

---

# 🔐 Auditoría y Seguridad

- Registro histórico
- Control de accesos
- Logs de acciones críticas

---

# 📉 Estadísticas del Sistema

## Ventas Mensuales

```text
Enero      ███████████ 45%
Febrero    ███████████████ 60%
Marzo      ███████████████████ 78%
Abril      ███████████████████████ 92%
Mayo       █████████████████████████ 100%
```

---

# 📊 Comparativa del Sistema

| Característica | Sistema Tradicional | TechStore Manager |
|---|---|---|
| Control Manual | ❌ | ✅ |
| Reportes Automáticos | ❌ | ✅ |
| Seguridad | Baja | Alta |
| Escalabilidad | Baja | Alta |
| Dashboard | ❌ | ✅ |
| Auditoría | ❌ | ✅ |

---

# 🔒 Seguridad Implementada

✅ Encriptación BCrypt  
✅ Validación con Pydantic  
✅ Integridad Relacional  
✅ Protección de usuarios  
✅ Auditoría avanzada  

---

# 🚀 Instalación del Proyecto

# 📋 Requisitos Previos

```bash
Node.js v18+
Python 3.10+
PostgreSQL
Cuenta Supabase
```

---

# ⚙️ Configuración del Backend

```bash
cd backend

pip install -r requirements.txt

python main.py
```

---

# 💻 Configuración del Frontend

```bash
npm install

npm run dev
```

---

# ▶️ Inicio Automático

```bash
Iniciar_TechStore.bat
```

Este archivo inicia automáticamente:

- Backend
- Frontend
- Servicios principales

---

# 📂 Estructura del Proyecto

```text
TechStore-Manager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── database/
│   └── main.py
│
├── src/
│   ├── screens/
│   ├── components/
│   ├── services/
│   └── api.ts
│
├── public/
│
└── Iniciar_TechStore.bat
```

---

# 📊 Flujo General del Sistema

```mermaid
graph TD

A[Cliente] --> B[Frontend React]
B --> C[FastAPI Backend]
C --> D[(PostgreSQL / Supabase)]

D --> E[Gestión de Inventario]
D --> F[Gestión de Ventas]
D --> G[Gestión de Usuarios]
D --> H[Auditoría]
D --> I[Dashboard]
```

---

# 📌 Metodología de Desarrollo

## 🔄 Metodología Ágil

El sistema fue desarrollado aplicando:

- Desarrollo incremental
- Arquitectura modular
- Iteraciones ágiles
- Testing continuo
- Buenas prácticas

---

# 🧪 Buenas Prácticas Implementadas

✅ Arquitectura escalable  
✅ Código modular  
✅ Componentización React  
✅ API REST estructurada  
✅ Seguridad avanzada  
✅ ORM relacional  

---

# 📈 Beneficios del Sistema

| Beneficio | Resultado |
|---|---|
| Automatización | Reduce errores |
| Dashboard | Mejora decisiones |
| Seguridad | Protege datos |
| Inventario | Mayor control |
| Escalabilidad | Crecimiento empresarial |

---

# 🔮 Futuras Mejoras

- 📱 Aplicación móvil
- 💳 Pagos QR
- 🤖 Inteligencia Artificial
- ☁️ Microservicios
- 📡 Notificaciones en tiempo real
- 📈 Business Intelligence

---

# 🏁 Conclusiones

TechStore Manager es una solución moderna y escalable orientada a mejorar la administración de tiendas tecnológicas.

El proyecto integra herramientas empresariales actuales bajo una arquitectura robusta y segura, permitiendo optimizar procesos operativos y mejorar la toma de decisiones mediante visualización inteligente de datos.

Además, permitió aplicar conocimientos de:

- Ingeniería de Software
- Arquitectura Web
- Desarrollo Full Stack
- Bases de Datos
- Seguridad Informática
- Sistemas Empresariales

---

# 📚 Proyecto Académico

Proyecto desarrollado para la materia:

# SIS324 – Ingeniería de Software

Aplicando:

- Arquitectura moderna
- Buenas prácticas
- Patrones de diseño
- Desarrollo ágil
- Sistemas empresariales reales

---

# ⭐ TechStore Manager
## “Tecnología, Control y Gestión Inteligente”
