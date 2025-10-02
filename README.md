# 🤖 AI Platform - Sistema de Inteligencia Artificial

Una plataforma integral para el desarrollo, entrenamiento y despliegue de modelos de inteligencia artificial, construida con tecnologías modernas y mejores prácticas de desarrollo.

## 🚀 Características Principales

### 🎯 Funcionalidades Core
- **Dashboard Interactivo**: Panel de control completo con métricas en tiempo real
- **Gestión de Modelos IA**: Crear, entrenar y gestionar modelos de machine learning
- **Carga de Datos**: Sistema de upload con validación y procesamiento
- **Analytics Avanzados**: Visualización de métricas y rendimiento
- **Autenticación Segura**: Sistema de login/registro con JWT
- **Responsive Design**: Interfaz adaptable a todos los dispositivos

### 🛠️ Tecnologías Implementadas

#### Frontend
- **React 18** - Biblioteca de UI moderna
- **TypeScript** - Tipado estático para mayor robustez
- **Bootstrap 5** - Framework CSS responsive
- **React Router** - Navegación SPA
- **Recharts** - Gráficos y visualizaciones
- **React Icons** - Iconografía moderna
- **React Toastify** - Notificaciones elegantes

#### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **TypeScript** - Tipado estático
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Hashing seguro de contraseñas
- **CORS** - Configuración de políticas de origen cruzado
- **Helmet** - Seguridad HTTP

### 📊 Modelos de IA Soportados
- **CNN** - Redes Neuronales Convolucionales
- **RNN/LSTM** - Redes Neuronales Recurrentes
- **Transformer/BERT** - Modelos de atención
- **GAN** - Redes Generativas Adversarias
- **ResNet/VGG** - Arquitecturas de visión computacional

## 🏗️ Arquitectura del Sistema

```
ai-platform/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Servicios API
│   │   └── styles.css      # Estilos personalizados
│   └── package.json
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── routes/         # Rutas de la API
│   │   ├── middleware/     # Middleware personalizado
│   │   ├── db.ts          # Base de datos en memoria
│   │   └── index.ts       # Servidor principal
│   └── package.json
└── package.json            # Configuración del workspace
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm 9+

### Instalación Rápida
```bash
# Clonar el repositorio
git clone <repository-url>
cd ai-platform

# Instalar dependencias
npm install

# Configurar el proyecto
npm run setup

# Ejecutar en modo desarrollo
npm run dev
```

### Instalación Manual
```bash
# Instalar dependencias del workspace
npm install

# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install

# Volver al directorio raíz
cd ..

# Ejecutar ambos servicios
npm run dev
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:5175 (o el puerto que Vite asigne automáticamente)
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/api/health

## 👥 Usuarios de Prueba

### Administrador
- **Email**: admin@aiplatform.com
- **Contraseña**: admin123
- **Rol**: Administrador

### Usuario Demo
- **Email**: user@aiplatform.com
- **Contraseña**: user123
- **Rol**: Usuario

### Investigador
- **Email**: researcher@aiplatform.com
- **Contraseña**: user123
- **Rol**: Investigador

## 📱 Páginas y Funcionalidades

### 🏠 Página Principal
- Hero section con animaciones de red neuronal
- Estadísticas en tiempo real
- Características principales de la plataforma
- Call-to-action para registro

### 🔐 Autenticación
- **Login**: Validación de credenciales con manejo de errores
- **Registro**: Formulario completo con validación de campos
- **Protección de rutas**: Middleware de autenticación JWT

### 📊 Dashboard
- Métricas de modelos activos
- Gráficos de rendimiento
- Lista de datasets recientes
- Distribución de tipos de modelos
- Acciones rápidas (entrenar, ver, editar)

### 🤖 Modelos de IA
- Lista de modelos con filtros
- Crear nuevos modelos
- Entrenar modelos existentes
- Visualizar métricas de precisión
- Gestión de parámetros

### 📁 Carga de Datos
- Drag & drop de archivos
- Validación de formatos (CSV, JSON, TXT, XLSX)
- Progreso de carga en tiempo real
- Procesamiento de datasets
- Historial de cargas

### 📈 Analytics
- Gráficos de tendencias de rendimiento
- Comparación de modelos
- Análisis de errores
- Uso de recursos (CPU, GPU, Memoria)
- Exportación de datos

## 🔧 API Endpoints

### Autenticación
```
POST /api/auth/register    # Registro de usuario
POST /api/auth/login       # Inicio de sesión
GET  /api/auth/profile     # Perfil del usuario
POST /api/auth/logout      # Cerrar sesión
```

### Modelos de IA
```
GET    /api/ai-models           # Listar modelos
POST   /api/ai-models           # Crear modelo
GET    /api/ai-models/:id       # Obtener modelo
PUT    /api/ai-models/:id       # Actualizar modelo
DELETE /api/ai-models/:id       # Eliminar modelo
POST   /api/ai-models/:id/train # Entrenar modelo
```

### Datos
```
GET  /api/data/datasets         # Listar datasets
POST /api/data/upload           # Subir dataset
GET  /api/data/:id              # Obtener dataset
POST /api/data/:id/process      # Procesar dataset
```

### Analytics
```
GET /api/analytics/metrics              # Métricas generales
GET /api/analytics/models/:id/performance # Rendimiento de modelo
GET /api/analytics/usage                # Uso de recursos
```

## 🛡️ Seguridad

### Implementaciones de Seguridad
- **JWT Tokens**: Autenticación stateless
- **bcrypt**: Hashing seguro de contraseñas
- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de políticas de origen
- **Validación de entrada**: Sanitización de datos
- **Rate limiting**: Protección contra ataques DDoS

### Validaciones
- Email con formato válido
- Contraseñas con mínimo 6 caracteres
- Archivos con tipos permitidos
- Tamaño máximo de archivos (100MB)
- Tokens JWT con expiración

## 🎨 Diseño y UX

### Características de Diseño
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Dark/Light Mode**: Soporte para modo oscuro
- **Animaciones**: Transiciones suaves y efectos hover
- **Iconografía**: React Icons para consistencia visual
- **Tipografía**: Inter font para mejor legibilidad
- **Colores**: Paleta moderna con gradientes

### Componentes Reutilizables
- Cards con efectos hover
- Botones con estados de carga
- Formularios con validación visual
- Modales responsivos
- Barras de progreso animadas
- Gráficos interactivos

## 🧪 Manejo de Errores y Concurrencia

### Frontend
- **Try/Catch**: Manejo de errores en llamadas async
- **AbortController**: Cancelación de peticiones
- **Loading States**: Estados de carga para UX
- **Error Boundaries**: Captura de errores de React
- **Toast Notifications**: Feedback visual de errores

### Backend
- **Error Middleware**: Manejo centralizado de errores
- **Validation**: Validación de entrada en todas las rutas
- **Logging**: Registro de errores para debugging
- **Graceful Degradation**: Respuestas de error consistentes

### Concurrencia
- **Promise.all**: Operaciones paralelas
- **Async/Await**: Manejo asíncrono moderno
- **Race Conditions**: Prevención de condiciones de carrera
- **Timeout Handling**: Manejo de timeouts en peticiones

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecutar frontend y backend
npm run dev:frontend # Solo frontend
npm run dev:backend  # Solo backend

# Construcción
npm run build        # Build de producción
npm run build:frontend
npm run build:backend

# Utilidades
npm run setup        # Instalar dependencias
npm run clean        # Limpiar archivos temporales
```

## 🔄 Flujo de Desarrollo

### 1. Desarrollo Local
```bash
npm run dev
```

### 2. Testing
- Probar autenticación con usuarios de prueba
- Verificar carga de archivos
- Validar formularios
- Comprobar responsividad

### 3. Build de Producción
```bash
npm run build
```

## 📚 Documentación Adicional

### Conceptos de IA Implementados
- **Machine Learning**: Algoritmos de aprendizaje supervisado
- **Deep Learning**: Redes neuronales profundas
- **Computer Vision**: Procesamiento de imágenes
- **Natural Language Processing**: Procesamiento de texto
- **Data Preprocessing**: Limpieza y preparación de datos

### Mejores Prácticas
- **Clean Code**: Código limpio y mantenible
- **TypeScript**: Tipado estático para robustez
- **Component Architecture**: Componentes reutilizables
- **Error Handling**: Manejo robusto de errores
- **Security First**: Seguridad desde el diseño

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Ingeniería de Sistemas** - Proyecto de Inteligencia Artificial

---

## 🎯 Checklist de Requisitos Técnicos

### ✅ Requisitos Cumplidos

- [x] **Plantilla visual profesional con Bootstrap 5**
- [x] **Menú de navegación (Navbar)**
- [x] **Slider/Carrusel en hero section**
- [x] **Header principal (Hero)**
- [x] **Sección de contenido**
- [x] **Footer completo**
- [x] **Diseño responsive y moderno**
- [x] **Login e inicio de sesión funcional**
- [x] **Validación de usuario y contraseña**
- [x] **Mensajes de error amigables**
- [x] **Dashboard con información del tema**
- [x] **HTML5 con estructura semántica**
- [x] **CSS3 con estilos visuales y responsividad**
- [x] **JavaScript ES8+ con fetch, async/await, try/catch**
- [x] **TypeScript para tipado estático**
- [x] **React Router para SPA (más de 3 rutas)**
- [x] **Node.js + Express para backend**
- [x] **Formularios de ingreso de datos**
- [x] **Validación de campos vacíos**
- [x] **Manejo de eventos y try/catch**
- [x] **Control de errores con try/catch**
- [x] **AbortController en peticiones HTTP**
- [x] **Simulación de concurrencia**
- [x] **Separación de capas frontend/backend**
- [x] **README explicativo**
- [x] **Scripts npm run dev**

### 🎨 Extras Implementados

- [x] **Animaciones suaves y efectos hover**
- [x] **Base de datos local con datos de prueba**
- [x] **Gráficos y estadísticas (Recharts)**
- [x] **Documentación del tema de IA**
- [x] **Sistema de notificaciones**
- [x] **Manejo de archivos con drag & drop**
- [x] **Estados de carga y progreso**
- [x] **Tema oscuro/claro**
- [x] **Iconografía moderna**
- [x] **Validación en tiempo real**

---

**🚀 ¡La plataforma está lista para usar!** 

Inicia el servidor con `npm run dev` y accede a http://localhost:5173 para comenzar a explorar la plataforma de IA.#
