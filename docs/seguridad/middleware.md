# Proteccion de rutas con Proxy

En este apartado se protege la ruta privada `/dashboard` antes de renderizar la página. La proteccion esta en:

```txt
proxy.ts
```

## Como funciona la proteccion

Cuando alguien intenta entrar en:

```txt
/dashboard
```

el `proxy.ts` se ejecuta antes de que Next.js renderice la página. En ese punto se consulta el token de sesion de NextAuth usando `getToken()`.

Si existe un token válido, la petición continua y el usuario puede ver el dashboard.

Si no existe sesión, la petición se redirige a:

```txt
/login?callbackUrl=/dashboard
```

El parametro `callbackUrl` guarda la página a la que el usuario queria acceder. Así, después de iniciar sesion con Google, NextAuth puede devolverlo automaticamente al dashboard.

## Middleware/Proxy frente a useEffect en cliente

Proteger una ruta en el Proxy ocurre en el servidor, antes de enviar la página al navegador. Esto evita que el usuario no autenticado reciba el contenido privado.

En cambio, proteger una ruta solo con `useEffect()` ocurre demasiado tarde. Primero el navegador descarga y ejecuta la página, y después React decide redirigir al usuario si no hay sesion.

Ese enfoque tiene varios riesgos:

- El contenido privado puede llegar al navegador antes de la redirección.
- Un usuario podria ver información sensible durante unos instantes.
- El JavaScript del cliente se puede inspeccionar o manipular.
- Si la protección depende solo del cliente, no es una barrera real de seguridad.

Por eso `useEffect()` puede servir para mejorar la experiencia visual, pero no debe ser la unica protección de una ruta privada. La comprobacion importante debe hacerse antes de renderizar o devolver el contenido protegido.

