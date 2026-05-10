# OAuth 2.0 y NextAuth

En este apartado el inicio de sesión se ha configurado con NextAuth y Google como proveedor OAuth. La idea principal es que la aplicacion no gestiona la contraseña del usuario sino que delega la autenticacion en Google y recibe una confirmación segura cuando el usuario acepta.

## Flujo de inicio de sesión con Google

Cuando el usuario pulsa "Entrar con Google", el componente cliente llama a `signIn("google")`. NextAuth inicia el proceso y redirige el navegador a la página de autorizacion de Google.

En Google, el usuario inicia sesión con su cuenta si todavia no lo habia hecho. Despues Google muestra la pantalla de consentimiento, donde informa de que la aplicacion quiere usar esa cuenta para autenticar al usuario.

Si el usuario acepta, Google no devuelve la contraseña a nuestra web. En su lugar, redirige el navegador a la URL de callback configurada:

```txt
http://localhost:3000/api/auth/callback/google
```

En esa vuelta, Google entrega un codigo temporal. NextAuth recibe ese codigo en la ruta:

```txt
app/api/auth/[...nextauth]/route.ts
```

Despues, NextAuth intercambia ese codigo con Google usando el `GOOGLE_CLIENT_ID` y el `GOOGLE_CLIENT_SECRET` guardados en `.env.local`. Si Google valida la peticion, devuelve la informacion necesaria para identificar al usuario.

Con esa informacion, NextAuth crea una sesión para la aplicacion. La sesión queda asociada al navegador mediante cookies seguras y firmadas usando `NEXTAUTH_SECRET`.

A partir de ese momento, los componentes cliente pueden consultar el estado de autenticacion con `useSession()`. Por ejemplo, el navbar puede mostrar "Iniciar sesión" si no hay usuario conectado o "Cerrar sesión" si ya existe una sesión activa.

## Variables de entorno usadas

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

`NEXTAUTH_URL` indica la URL base de la aplicación durante el desarrollo. `NEXTAUTH_SECRET` se usa para firmar y proteger la sesión. `GOOGLE_CLIENT_ID` identifica la aplicación ante Google. `GOOGLE_CLIENT_SECRET` funciona como una clave privada entre nuestra aplicación y Google, por eso no debe publicarse ni subirse al repositorio.

