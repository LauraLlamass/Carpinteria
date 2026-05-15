# API del inventario

Todas las rutas viven dentro de `app/api` y devuelven JSON salvo las respuestas
`204`, que no tienen cuerpo.

## Categorias

### GET /api/categories

Lista todas las categorias ordenadas por nombre.

Respuesta `200`:

```json
[
  {
    "id": "clx...",
    "name": "Muebles",
    "description": "Mesas, estanterias y piezas de mobiliario a medida.",
    "createdAt": "2026-05-15T10:00:00.000Z",
    "_count": {
      "products": 3
    }
  }
]
```

### POST /api/categories

Crea una categoria nueva.

Cuerpo:

```json
{
  "name": "Restauracion",
  "description": "Piezas restauradas y reparaciones"
}
```

Respuesta `201`:

```json
{
  "id": "clx...",
  "name": "Restauracion",
  "description": "Piezas restauradas y reparaciones",
  "createdAt": "2026-05-15T10:00:00.000Z"
}
```

Errores:

- `400`: datos invalidos, por ejemplo nombre vacio.
- `409`: ya existe una categoria con ese nombre.

### PATCH /api/categories/[id]

Edita el nombre y/o descripcion de una categoria.

Cuerpo:

```json
{
  "name": "Muebles a medida",
  "description": "Mobiliario fabricado en el taller"
}
```

Respuesta `200`: categoria actualizada.

Errores:

- `400`: datos invalidos o cuerpo vacio.
- `404`: categoria no encontrada o nombre duplicado.

### DELETE /api/categories/[id]

Elimina una categoria solo si no tiene productos asociados.

Respuesta `204`: categoria eliminada.

Errores:

- `404`: categoria no encontrada.
- `409`: la categoria tiene productos asociados.

## Productos

### GET /api/products

Lista productos con filtros y ordenacion.

Query params opcionales:

```txt
search=mesa
categoryId=clx...
sortBy=name | price | stock | createdAt
sortOrder=asc | desc
```

Ejemplo:

```txt
/api/products?search=mesa&sortBy=price&sortOrder=asc
```

Respuesta `200`:

```json
[
  {
    "id": "clx...",
    "name": "Mesa de roble",
    "description": "Mesa artesanal de roble macizo para comedor.",
    "price": "780",
    "stock": 3,
    "categoryId": "clx...",
    "createdAt": "2026-05-15T10:00:00.000Z",
    "updatedAt": "2026-05-15T10:00:00.000Z",
    "category": {
      "id": "clx...",
      "name": "Muebles"
    }
  }
]
```

### POST /api/products

Crea un producto.

Cuerpo:

```json
{
  "name": "Mesa auxiliar",
  "description": "Mesa pequena de apoyo",
  "price": 180,
  "stock": 4,
  "categoryId": "clx..."
}
```

Respuesta `201`: producto creado con su categoria.

Errores:

- `400`: datos invalidos, precio no positivo, stock negativo o `categoryId`
  invalido.

### PATCH /api/products/[id]

Edita los datos generales de un producto. Este endpoint no se encarga del stock.

Cuerpo:

```json
{
  "name": "Mesa auxiliar de roble",
  "description": "Nueva descripcion",
  "price": 210,
  "categoryId": "clx..."
}
```

Respuesta `200`: producto actualizado.

Errores:

- `400`: datos invalidos o cuerpo vacio.
- `404`: producto no encontrado.

### DELETE /api/products/[id]

Elimina un producto.

Respuesta `204`: producto eliminado.

Errores:

- `404`: producto no encontrado.

### PATCH /api/products/[id]/stock

Actualiza solo el stock de un producto.

Cuerpo:

```json
{
  "stock": 12
}
```

Respuesta `200`: producto actualizado con su categoria.

Errores:

- `400`: stock invalido, no entero o negativo.
- `404`: producto no encontrado.

## Por que separar el endpoint de stock

El ajuste de stock es una accion frecuente y muy concreta dentro de un
inventario. Separarlo en `/api/products/[id]/stock` cumple mejor el principio de
responsabilidad unica: el endpoint general de producto edita datos descriptivos
como nombre, descripcion, precio o categoria, mientras que el endpoint de stock
solo modifica unidades disponibles.

Esta separacion tiene varias ventajas:

- Permite validar el stock con reglas especificas.
- Reduce el riesgo de cambiar otros campos por error al pulsar botones `+` o
  `-` en la interfaz.
- Facilita implementar optimizaciones o auditoria de movimientos de stock en el
  futuro.
- Hace que el frontend pueda llamar a una accion pequena y clara cuando solo
  necesita ajustar existencias.
