# PROYECTO DE INGENIERÍA DE SOFTWARE - SIS324
## Sistema de Gestión: TechStore Manager

### Información del Grupo
*   **Carrera:** Ing. Sistemas
*   **Materia:** SIS324 – INGENIERÍA DE SOFTWARE
*   **Grupo:** 17
*   **Proyecto:** TechStore Manager - Sistema de Gestión Integral para Tiendas de Tecnología

### Integrantes
1.  **Coraite Yanaje Luz Clara**
2.  **Muraña Pizarro Nayda Thatiana**
3.  **Onofre Alanoca Roy**

---

## 1. Descripción del Proyecto
**TechStore Manager** es una aplicación web de nivel empresarial diseñada para optimizar las operaciones de tiendas especializadas en tecnología. El sistema integra la gestión de inventarios, ventas, clientes y usuarios bajo una arquitectura moderna y escalable, permitiendo un control preciso de stock, garantías y reportes financieros.

## 2. Tecnologías y Lenguajes
El proyecto utiliza un stack tecnológico de vanguardia para garantizar rendimiento y seguridad:

### **Front-End (Interfaz de Usuario)**
*   **Lenguajes:** JavaScript / TypeScript.
*   **Framework:** **React 19** (potenciado por **Vite** para compilación rápida).
*   **Estilos:** **Tailwind CSS** para un diseño moderno, responsivo y "glassmorphic".
*   **Iconografía:** Lucide-React.
*   **Gráficos:** Recharts para visualización de datos.

### **Back-End (Lógica de Servidor)**
*   **Lenguaje:** **Python 3.x**.
*   **Framework:** **FastAPI**. Elegido por su velocidad y manejo nativo de operaciones asíncronas.
*   **Seguridad:** Encriptación de contraseñas con **BCrypt** y validación de esquemas con Pydantic.
*   **Generación de Reportes:** ReportLab para exportación de PDF profesional.

### **Base de Datos e Infraestructura**
*   **Motor:** **PostgreSQL**.
*   **Servidor de Base de Datos:** **Supabase** (Base de datos relacional en la nube).
*   **ORM:** **SQLAlchemy** para el mapeo objeto-relacional.

---

## 3. Arquitectura del Sistema (Clases y Modelos)
El sistema se basa en un modelo relacional sólido definido en `models.py`:

*   **Usuario:** Gestiona perfiles de acceso (Admin, Cajero, Cliente) y estados de cuenta.
*   **Producto:** Controla SKU, categorías, precios y niveles de stock.
*   **Proveedor:** Registro de contactos y empresas que suministran los productos.
*   **Cliente:** Base de datos de clientes con información de facturación (NIT/RFC).
*   **Venta:** Cabecera de transacciones que registra totales, impuestos y métodos de pago.
*   **DetalleVenta:** Registro granular de productos vendidos, incluyendo **números de serie** y **garantías aplicadas**.
*   **MovimientoInventario:** Auditoría de entradas y salidas de stock.
*   **Auditoria:** Registro histórico de acciones sensibles en el sistema (Login, Eliminación, Edición).

---

## 4. Características Principales
1.  **Gestión de Usuarios (CRUD):** Control total de accesos con protección de integridad (no permite borrar usuarios con historial de ventas).
2.  **Punto de Venta (POS):** Interfaz fluida para realizar ventas en tiempo real con descuento automático de stock.
3.  **Control de Inventario:** Alertas de stock bajo y trazabilidad de movimientos.
4.  **Reportes Inteligentes:** Generación de facturas y reportes de inventario en PDF.
5.  **Dashboard de Métricas:** Visualización de ventas diarias y productos más vendidos.

---

## 5. Instalación y Configuración

### Requisitos Previos
*   Node.js (v18 o superior)
*   Python 3.10+
*   Acceso a Internet (para la base de datos en Supabase)

### Pasos para el Arranque
1.  **Clonar el repositorio.**
2.  **Configurar el Backend:**
    ```bash
    cd backend
    pip install -r requirements.txt
    python main.py
    ```
3.  **Configurar el Frontend:**
    ```bash
    npm install
    npm run dev
    ```
4.  **Acceso Maestro:** El sistema incluye un archivo `Iniciar_TechStore.bat` diseñado para Windows que arranca ambos servidores automáticamente con un solo clic.

---

## 6. Estructura de Carpetas
```text
TechStore-Manager/
├── backend/            # Lógica en Python (FastAPI, Models, DB)
├── src/                # Componentes y Pantallas en React
│   ├── screens/        # Vistas principales (POS, Usuarios, Dashboard)
│   ├── components/     # Elementos UI reutilizables
│   └── api.ts          # Cliente de conexión API
├── public/             # Activos estáticos
└── Iniciar_TechStore.bat # Lanzador maestro del sistema
```

---
*Este proyecto es parte de la materia Ingeniería de Software (SIS324), enfocado en aplicar patrones de diseño y buenas prácticas de desarrollo ágil.*
