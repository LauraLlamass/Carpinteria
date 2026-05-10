# Autenticacion con credenciales y Firebase

En esta parte el login con email y contraseña se integra con NextAuth mediante `CredentialsProvider`, pero la validación real de la contraseña se delega en Firebase Auth. La aplicación no compara contraseñas manualmente ni guarda contraseñas propias en una base de datos.

## Flujo implementado

El registro se realiza en `/register` con el SDK cliente de Firebase y `createUserWithEmailAndPassword`. Firebase crea el usuario y se encarga de almacenar la credencial de forma segura.

El inicio de sesión se realiza en `/login`. El formulario llama a `signIn("credentials", { email, password, redirect: false })`. NextAuth ejecuta la funcion `authorize` del `CredentialsProvider`, que envia el email y la contraseña a la REST API de Firebase Identity Toolkit. Si Firebase valida las credenciales, NextAuth crea la sesión de la aplicación.

## Por que nunca guardar contraseñas en texto plano

Guardar contraseñas en texto plano significa que la contraseña real queda escrita tal cual en la base de datos. Si alguien consigue acceso a esa base de datos podria leer inmediatamente las contraseñas de todos los usuarios.

El problema no afecta solo a esta aplicación. Muchas personas reutilizan la misma contraseña en varios servicios, asi que una filtracion podria permitir ataques contra correo, redes sociales, banca u otras cuentas. Por eso una aplicación profesional nunca debe poder recuperar la contraseña original de un usuario.

## bcrypt, Argon2 y salts

`bcrypt` es un algoritmo de hashing de contraseñas disenado para ser lento de forma configurable. Esa lentitud es intencionada: si un atacante roba hashes, cada intento de adivinar una contraseña cuesta más tiempo y recursos. bcrypt usa un factor de coste que se puede aumentar segun la capacidad del servidor.

`Argon2` es un algoritmo más moderno y ganó el Password Hashing Competition en 2015. La variante recomendada normalmente es `Argon2id`, porque combina protección frente a ataques por GPU y ciertos ataques de canal lateral. Además de tiempo de calculo, Argon2 puede exigir memoria, lo que encarece los ataques masivos.

Un `salt` es un valor aleatorio y unico que se añade a cada contraseña antes de calcular el hash. Gracias al salt, dos usuarios con la misma contraseña obtienen hashes distintos. Tambien evita que un atacante use tablas precalculadas, como rainbow tables, para comparar rapidamente hashes conocidos.

