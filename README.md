
# 📝 Carpintería Las Artesanas

> Web corporativa para una carpintería artesanal especializada en muebles a medida, restauración y proyectos personalizados en madera.
Aplicación web desarrollada con Next.js para presentar los servicios, proyectos y canales de contacto de una carpintería artesanal. Incluye páginas públicas, autenticación de usuarios y un sistema básico de mensajes entre clientes y el taller.


Descripción breve

| Despliegue | URL |
|------------|-----|
| Frontend | [Vercel](https://carpinteria-six.vercel.app) |

---

## Características

- Página principal con presentación del taller, servicios destacados y proyectos recientes.
- Catálogo de servicios y proyectos con páginas de detalle.
- Sistema de contacto, autenticación y centro de mensajes para clientes y taller.


---

## Tecnologías

| Frontend | Uso |
|----------|-----|
| Next.js | Framework principal para rutas, páginas y renderizado |
| React | Creación de componentes reutilizables |
| Tailwind CSS | Estilos y diseño responsive |

| Backend | Uso |
|---------|-----|
| NextAuth | Gestión de sesiones e inicio de sesión |
| Firebase Authentication | Registro y login con credenciales |
| Server Actions | Validación del formulario de contacto |

| Auxiliares | Uso |
|------------|-----|
| TypeScript | Tipado del código |
| Lucide React | Iconos de la interfaz |
| Vercel | Despliegue de la aplicación |


---

## Estructura del proyecto

```text
project/
├── app/
│   ├── page.tsx                    # Página principal
│   ├── layout.tsx                  # Layout global, fuentes, metadatos y providers
│   ├── globals.css                 # Estilos globales y configuración visual
│   ├── contacto/
│   │   ├── page.tsx                # Página de contacto
│   │   └── actions.ts              # Validación y envío simulado del formulario
│   ├── servicios/
│   │   └── page.tsx                # Página de servicios
│   ├── proyectos/
│   │   ├── page.tsx                # Listado de proyectos
│   │   └── [slug]/
│   │       └── page.tsx            # Detalle dinámico de cada proyecto
│   ├── sobre-nosotros/
│   │   └── page.tsx                # Página informativa del taller
│   ├── login/
│   │   ├── page.tsx                # Página de inicio de sesión
│   │   └── LoginForm.tsx           # Formulario de login
│   ├── register/
│   │   ├── page.tsx                # Página de registro
│   │   └── RegisterForm.tsx        # Formulario conectado con Firebase
│   ├── dashboard/
│   │   └── page.tsx                # Área privada del usuario
│   ├── mensajes/
│   │   └── page.tsx                # Bandeja privada del taller
│   └── api/
│       └── auth/[...nextauth]/
│           └── route.ts            # Ruta API de NextAuth
│
├── components/
│   ├── Navbar.tsx                  # Navegación principal
│   ├── Footer.tsx                  # Pie de página
│   ├── Hero.tsx                    # Sección principal de la home
│   ├── ServiceGrid.tsx             # Grid de servicios
│   ├── ServiceCard.tsx             # Tarjeta individual de servicio
│   ├── ProjectGrid.tsx             # Grid de proyectos
│   ├── ProjectCard.tsx             # Tarjeta individual de proyecto
│   ├── ContactForm.tsx             # Formulario de contacto
│   ├── MessageCenter.tsx           # Centro de mensajes cliente/taller
│   ├── AuthButton.tsx              # Botón de sesión
│   ├── Providers.tsx               # Providers globales de la app
│   ├── Skeletons.tsx               # Estados de carga
│   └── ui/
│       └── button.tsx              # Componente base de botón
│
├── data/
│   ├── services.ts                 # Datos de los servicios
│   └── projects.ts                 # Datos de los proyectos
│
├── lib/
│   ├── auth.ts                     # Configuración de NextAuth
│   ├── firebase.ts                 # Configuración de Firebase Auth
│   └── utils.ts                    # Utilidades generales
│
├── public/
│   └── images/                     # Imágenes de proyectos, logos y taller
│
├── docs/
│   └── seguridad/                  # Documentación sobre OAuth, credenciales y middleware
│
├── proxy.ts                        # Protección de rutas y cabeceras de seguridad
├── package.json                    # Dependencias y scripts
├── tsconfig.json                   # Configuración de TypeScript
└── README.md                       # Documentación del proyecto
```


> La estructura está organizada siguiendo el sistema de rutas de Next.js. La carpeta `app` contiene las páginas principales de la web, como inicio, servicios, proyectos, contacto, login y registro. Dentro de `components` se encuentran los elementos reutilizables de la interfaz, como la barra de navegación, las tarjetas de proyectos, el formulario de contacto o el centro de mensajes. La carpeta `data` almacena la información estática de servicios y proyectos, mientras que `lib` contiene la configuración de autenticación, Firebase y utilidades generales. Por último, `public/images` guarda los recursos visuales y `proxy.ts` se encarga de proteger rutas privadas y añadir cabeceras de seguridad.

---

## Descargar y ejecutar

```bash
git clone https://github.com/LauraLlamass/Carpinteria.git
cd carpinteria
npm install
npm run dev
La aplicación estará disponible en http://localhost:3000
```

---

## Desplegar en Vercel

### Frontend

1. Subir el proyecto a GitHub.
2. Importar el repositorio desde Vercel.
3. Configurar las variables de entorno necesarias.
4. Ejecutar el despliegue.

### Backend

Este proyecto no tiene un backend separado. Usa funcionalidades integradas de Next.js, NextAuth y Firebase Authentication.


---
*Desarrollado durante las prácticas en [Corner Estudios](https://www.corner-estudios.com) — Laura Llamas — 2026*
