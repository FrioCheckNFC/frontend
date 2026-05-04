# ENTACIÓN TÉCNICA OFICIAL: ECOSISTEMA FRONTEND FRIACHECK

## 📋 Información del ento
*   **Proyecto:** FríoCheck (Frontend Web)
*   **Fecha de Emisión:** 29 de Abril, 2026
*   **Autor:** Antigravity AI (Coding Assistant)
*   **Versión:** 1.0 (Auditada y Estructurada)
*   **Estado:** Fase de Integración y Escalabilidad

---

## 1. INTRODUCCIÓN Y PROPÓSITO
Este ento constituye la guía maestra para el desarrollo, mantenimiento y escalabilidad del frontend de **FríoCheck**. Su objetivo es proporcionar a cualquier desarrollador (actual o futuro) una comprensión profunda de las decisiones arquitectónicas, el estado de las funcionalidades y los pasos necesarios para completar el producto.

---

## 2. ARQUITECTURA DEL SOFTWARE (EL ESQUELETO)
Se ha implementado una arquitectura modular y limpia, diseñada para separar la lógica de negocio de la interfaz de usuario.

### 2.1. Estructura de Directorios (`src/app/`)
La aplicación está dividida en capas de responsabilidad:

1.  **`core/` (El Corazón)**: 
    *   Servicios singleton (Auth, Filtros).
    *   Guards de seguridad (RBAC).
    *   Interceptores HTTP (Inyección de JWT).
2.  **`features/` (Lógica de Negocio)**: 
    *   Servicios que gestionan los datos de cada "feature" (ej. `UsersService`, `TicketsService`). No contienen UI.
3.  **`shared/` (Reutilización)**: 
    *   Componentes UI genéricos (Logos, Mapas, Diálogos de Confirmación).
    *   Directivas y Pipes globales.
4.  **`pages/` (Vistas)**: 
    *   Contenedores de páginas completos que orquestan los componentes y servicios.
5.  **`layouts/` (Marco Estructural)**: 
    *   Sidebar, Topbar y componentes de cambio de tema.
6.  **`models/` (Tipado)**: 
    *   Interfaces y tipos de datos para asegurar el contrato con el backend.

### 2.2. Alias de Ruta (Path Aliases)
Para mantener los archivos limpios y evitar "miedo a los puntos" (`../../../`), se han configurado los siguientes alias en `tsconfig.json`:
*   `@core/*`, `@shared/*`, `@features/*`, `@pages/*`, `@models/*`, `@layouts/*`, `@env/*`.

---

## 3. CORE DE LA APLICACIÓN (SEGURIDAD Y DATOS)

### 3.1. Flujo de Autenticación y Seguridad
*   **JWT (JSON Web Token)**: El sistema almacena el token en `sessionStorage`/`localStorage`.
*   **Auth Interceptor**: Captura cada petición HTTP y adjunta el token en el header `Authorization`.
*   **Guards (RBAC)**: Protegen las rutas según el rol del usuario:
    *   `authGuard`: Verifica si el usuario está logueado.
    *   `roleGuard`: Verifica si el usuario tiene el rol necesario (Admin, Support, SuperAdmin).

### 3.2. Manejo de Estado (Programación Reactiva)
No se usa una librería externa (como NgRx) para evitar sobrecarga. En su lugar, se utilizan **BehaviorSubjects** dentro de los servicios para mantener un estado reactivo y compartido entre componentes.

---

## 4. SISTEMA DE DISEÑO Y ESTILOS (UI/UX)

### 4.1. Angular Material + Custom SCSS
La aplicación utiliza Angular Material para los componentes base (Tablas, Cards, Inputs). Se ha creado un tema personalizado ubicado en `src/styles/themes/material-theme.scss`.

### 4.2. Variables CSS (Theming Dinámico)
Los colores y tokens de diseño están centralizados en `src/styles/base/colors.css`. 
*   **Modo Oscuro/Claro**: Se gestiona mediante el atributo `data-theme="dark"` en el elemento `html`.
*   **Consistencia**: Se utilizan variables como `--primary`, `--surface-low`, `--text-primary` para asegurar que un cambio de color afecte a toda la app instantáneamente.

---

## 5. INVENTARIO DE MÓDULOS Y ESTADO ACTUAL

| Módulo | Estado | Detalles de Implementación |
| :--- | :--- | :--- |
| **Auth** | ✅ 100% | Login, Logout y recuperación de contraseña funcional con API. |
| **Usuarios** | ✅ 100% | CRUD completo real. Creación, edición y desactivación conectada a base de datos. |
| **Tenants** | 🟡 70% | Listado y detalle real. Edición y Creación pendiente de conectar formulario. |
| **Tickets** | 🟡 60% | Visualización real. Pendiente formulario de "Nuevo Ticket". |
| **Dashboard** | 🟠 40% | Interfaz visual premium. **Datos simulados (Mock)** dinámicos. Falta conectar API real. |
| **Activos (NFC)** | 🟠 30% | Listado funcional. **Lógica NFC simulada**. Falta integración con hardware/API real. |
| **Visitas** | 🔴 20% | Interfaz 100% funcional. **Datos locales (No persistentes)**. Falta conectar `VisitsService`. |

---

## 6. GUÍA TÉCNICA PARA EL DESARROLLADOR

### 6.1. Configuración del Entorno
1.  **Node.js**: Versión 18 o superior.
2.  **Angular CLI**: `npm install -g @angular/cli`.
3.  **Instalación**: `npm install`.
4.  **Ejecución**: `npm start` (Corre en `localhost:4200`).

### 6.2. Patrones de Desarrollo
*   **Crear una nueva página**: 
    1. Definir la ruta en `app.routes.ts`.
    2. Crear el componente en `pages/`.
    3. Si requiere lógica de API, crear el servicio en `features/`.
*   **Confirmaciones**: Siguiendo el requerimiento del usuario, se utiliza el diálogo nativo `confirm()` para mantener la simplicidad y rapidez (estilo de la vista Visitas).

---

## 7. HOJA DE RUTA (ROADMAP) Y TAREAS PENDIENTES

### 🚨 Prioridad 1: Integración de Datos
*   **Conectar Dashboard**: Migrar de `DashboardRealtimeService` (Mock) a una integración real con el Backend.
*   **Persistencia de Visitas**: Conectar la interfaz de visitas al API para que los reportes se guarden.
*   **CRUD de Tenants**: Implementar el formulario de "Crear Tenant" para el rol de SuperAdmin.

### 🛠️ Prioridad 2: Calidad Técnica (Deuda Técnica)
*   **Notificaciones (Snackbars)**: Implementar `MatSnackBar` para mensajes de éxito/error flotantes.
*   **Validaciones**: Migrar de formularios basados en plantillas a **Reactive Forms**.
*   **Manejo de Errores**: Crear un interceptor global de errores para mostrar mensajes amigables al usuario en caso de falla del servidor (500).

---

## 8. CONCLUSIONES
El frontend de FríoCheck se encuentra en una etapa sólida. La infraestructura (seguridad, rutas, estilos, arquitectura) es robusta y está lista para recibir la integración total de datos. El enfoque de desarrollo ha priorizado la limpieza del código y la facilidad para que nuevos desarrolladores se sumen al proyecto sin una curva de aprendizaje pronunciada.

---

