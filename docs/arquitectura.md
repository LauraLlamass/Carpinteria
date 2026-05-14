# Arquitectura del sistema de inventario

Nota sobre la práctica: Este proyecto no se ha inicializado de cero con `create-next-app` porque el inventario forma parte de la aplicación existente de la carpinteria. La web pública se mantiene y la zona interna queda agrupada bajo `/inventario`.

```txt
Navegador (React)
├── Web pública
│   ├── Inicio, servicios, proyectos, taller y contacto
│   └── Dashboard de usuario autenticado
├── Zona interna de inventario
│   ├── /inventario
│   ├── /inventario/productos
│   └── /inventario/categorias
├── Estado de UI
│   ├── Sidebar colapsado o expandido
│   ├── Menu movil con Sheet
│   └── Filtros, busqueda y panel activo
└── Estado del servidor
    └── Productos y categorias obtenidos desde las API Routes

Servidor (Next.js App Router)
├── Server Components
│   ├── Paginas renderizadas en el servidor
│   └── Lectura de sesion para proteger zonas privadas
├── Client Components
│   ├── Sidebar interactivo
│   ├── Botones de sesion
│   └── Formularios y dialogos
├── API Routes
│   └── app/api/*
└── Capa de datos
    └── Prisma Client para consultar y modificar la base de datos

Base de datos (PostgreSQL / Neon)
├── categories
│   └── Catalogo de categorias del taller
└── products
    └── Productos con nombre, descripcion, precio, stock y categoria
```

## Capas principales

### Frontend

La interfaz esta construida con React dentro de Next.js App Router. Las páginas públicas siguen usando la navegación general de la web, mientras que el inventario tiene su propio layout con sidebar, enlaces a Productos y Categorias y un menú móvil implementado con `Sheet`.

La zona interna del inventario vive en:

```txt
app/inventario
├── layout.tsx
├── page.tsx
├── productos/page.tsx
└── categorias/page.tsx
```

### Servidor

Next.js App Router actua también como servidor de la aplicación. Las páginas pueden renderizarse en el servidor y las rutas dentro de `app/api/*` pueden recibir peticiones HTTP, validar datos, llamar a Prisma y devolver respuestas JSON.

### Base de datos

La base de datos sera PostgreSQL en Neon. El modelo principal tiene dos tablas:

```txt
categories -> categorias del inventario
products   -> productos con precio, stock y relacion con categoria
```

Neon proporciona dos conexiones:

```txt
DATABASE_URL -> conexion pooled para el servidor de Next.js
DIRECT_URL   -> conexion directa para migraciones de Prisma
```

## Por que no hace falta Express

No necesitamos un servidor Express separado porque Next.js con App Router ya incluye las piezas necesarias para la parte servidor:

- Las paginas pueden ejecutarse como Server Components.
- Las API Routes se crean directamente dentro de `app/api/*`.
- Cada `route.ts` puede implementar metodos HTTP como `GET`, `POST`, `PUT` o
  `DELETE`.
- Desde esas rutas se puede usar Prisma para acceder a PostgreSQL/Neon.
- La autenticacion se puede leer desde el propio servidor de Next.js.

Por eso la arquitectura queda más simple: el mismo proyecto contiene frontend, servidor y rutas API. Express solo sería necesario si quisieramos mantener un backend independiente, con otro despliegue y responsabilidades separadas.
