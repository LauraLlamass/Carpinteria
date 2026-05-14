# Arquitectura del sistema de inventario

Nota sobre la práctica: Este proyecto no se ha inicializado de cero con `create-next-app` porque el inventario forma parte de la aplicación existente de la carpintería. La web pública se mantiene y la zona interna queda agrupada bajo `/inventario`.

```txt
Navegador (React)
|-- Web publica
|   |-- Inicio, servicios, proyectos, taller y contacto
|   `-- Dashboard de usuario autenticado
|-- Zona interna de inventario
|   |-- /inventario
|   |-- /inventario/productos
|   `-- /inventario/categorias
|-- Estado de UI
|   |-- Sidebar colapsado o expandido
|   |-- Menu movil con Sheet
|   `-- Filtros, busqueda y panel activo
`-- Estado del servidor
    `-- Productos y categorias obtenidos desde las API Routes

Servidor (Next.js App Router)
|-- Server Components
|   |-- Paginas renderizadas en el servidor
|   `-- Lectura de sesion para proteger zonas privadas
|-- Client Components
|   |-- Sidebar interactivo
|   |-- Botones de sesion
|   `-- Formularios y dialogos
|-- API Routes
|   |-- app/api/products
|   |-- app/api/products/[id]
|   `-- app/api/categories
`-- Capa de datos
    `-- Prisma Client para consultar y modificar la base de datos

Base de datos (PostgreSQL / Neon)
|-- categories
|   `-- Catalogo de categorias del taller
`-- products
    `-- Productos con nombre, descripción, precio, stock y categoria
```

## Capas principales

### Frontend

La interfaz esta construida con React dentro de Next.js App Router. Las páginas públicas siguen usando la navegación general de la web, mientras que el inventario tiene su propio layout con sidebar, enlaces a Productos y Categorias y un menú móvil implementado con `Sheet`.

La zona interna del inventario vive en:

```txt
app/inventario
|-- layout.tsx
|-- page.tsx
|-- productos/page.tsx
`-- categorias/page.tsx
```

### Servidor

Next.js App Router actua también como servidor de la aplicación. Las páginas pueden renderizarse en el servidor y las rutas dentro de `app/api/*` pueden recibir peticiones HTTP, validar datos, llamar a Prisma y devolver respuestas JSON.

### Base de datos

La base de datos es PostgreSQL en Neon. El modelo principal tiene dos tablas:

```txt
categories -> categorias del inventario
products   -> productos con precio, stock y relación con categoria
```

## Modelo de datos

```txt
Category
|-- id: identificador cuid
|-- name: nombre unico de la categoria
|-- description: descripción opciónal
|-- createdAt: fecha de creación
`-- products: relación con Product

Product
|-- id: identificador cuid
|-- name: nombre del producto
|-- description: descripción opcional
|-- price: precio decimal con 10 digitos y 2 decimales
|-- stock: unidades disponibles
|-- categoryId: categoria a la que pertenece
|-- createdAt: fecha de creación
|-- updatedAt: fecha de ultima actualización
`-- category: relación obligatoria con Category
```

La relación entre `Product` y `Category` usa `onDelete: Restrict`. Esto impide borrar una categoria si todavia tiene productos asociados. En un inventario esto evita dejar productos sin clasificación.

## Por que price usa Decimal y no Float

`price` usa `Decimal` porque los precios necesitan precision exacta. Un `Float` trabaja con aproximaciones binarias y puede producir errores como `0.1 + 0.2 = 0.30000000000000004`.

En un sistema de inventario ese error es concreto y peligroso: al calcular precios, totales de stock, margenes o importes de pedidos, los centimos podrian quedar mal redondeados. `Decimal(10, 2)` guarda cantidades monetarias con dos decimales de forma estable, por ejemplo `24.90` o `1450.00`.

## DATABASE_URL y DIRECT_URL en Neon

Neon proporciona dos tipos de conexión:

```txt
DATABASE_URL -> conexión pooled
DIRECT_URL   -> conexión directa
```

`DATABASE_URL` usa el pooler de Neon. Es la conexión adecuada para el servidor de Next.js porque reutiliza conexiones y evita abrir demasiadas a la base de datos cuando hay varias peticiones.

`DIRECT_URL` es la conexión directa. Prisma la usa para migraciones, porque las migraciones necesitan una conexión estable y directa para crear o modificar tablas, indices y relaciones.

## Por que no hace falta Express

No necesitamos un servidor Express separado porque Next.js con App Router ya incluye las piezas necesarias para la parte servidor:

- Las paginas pueden ejecutarse como Server Components.
- Las API Routes se crean directamente dentro de `app/api/*`.
- Cada `route.ts` puede implementar metodos HTTP como `GET`, `POST`, `PATCH` o `DELETE`.
- Desde esas rutas se puede usar Prisma para acceder a PostgreSQL/Neon.
- La autenticación se puede leer desde el propio servidor de Next.js.

Por eso la arquitectura queda más simple: el mismo proyecto contiene frontend, servidor y rutas API. Express solo seria necesario si quisieramos mantener un backend independiente, con otro despliegue y responsabilidades separadas.
