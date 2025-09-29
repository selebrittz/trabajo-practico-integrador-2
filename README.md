Blog API

Relaciones embebidas y referenciadas

Usuarios → Perfil (embebido)
El perfil (firstName, lastName, biography, etc.) se embebe dentro del documento usuario.
Ventajas: acceso rápido al perfil, se consulta todo en un solo documento.
Desventajas: si el perfil crece demasiado, puede volver el documento pesado.

Usuarios → Artículos (referenciado)
Los artículos se guardan en una colección separada y guardan el author como referencia al usuario.
Ventajas: los artículos pueden ser muy grandes y numerosos; conviene separarlos.
Desventajas: requiere populate para acceder al autor.

Artículos → Comentarios (referenciado)
Se referencia al article dentro del comentario.
Ventajas: los comentarios pueden crecer mucho, y así no se agranda el documento del artículo.
Desventajas: más consultas si queremos traer todo junto.

Artículos ↔ Etiquetas (referenciado, relación N:N)
Cada artículo guarda un array de tags, y cada etiqueta tiene un array de articles.
Ventajas: flexibilidad para relacionar múltiples artículos y etiquetas.
Desventajas: mayor complejidad en actualizaciones.

Instalación y configuración

Clonar el repositorio
Instalar dependencias:

npm install

Crear archivo .env en la raíz del proyecto con las variables:

PORT=
MONGODB_URI=mongodb://localhost:27017/....
JWT_SECRET=clave_super_secreta


Levantar el servidor en desarrollo:

npm run dev

El servidor quedará escuchando en:

http://localhost:PORT

Documentación de Endpoints

Auth

POST /api/auth/register → Registrar usuario.

{
  "username": "selena",
  "email": "selenab@mail.com",
  "password": "pass1234",
  "role": "admin",
  "profile": {
    "firstName": "Selena",
    "lastName": "Britez",
    "biography": "Me gusta mucho leer",
    "avatarUrl": "https://url.com/avatar.jpg",
    "birthDate": "2006-04-08"
  }
}


POST /api/auth/login → Login y obtiene JWT.
{
  "email": "selenab@mail.com",
  "password": "pass1234"
}


GET /api/auth/profile → Perfil del usuario logueado.
PUT /api/auth/profile → Actualizar perfil.
POST /api/auth/logout → Logout.

Users (solo admin)

GET /api/users → Listar todos los usuarios.
GET /api/users/:id → Obtener usuario por ID.
PUT /api/users/:id → Actualizar usuario.
DELETE /api/users/:id → Eliminar usuario.

Tags

POST /api/tags → Crear etiqueta (admin).
GET /api/tags → Listar todas las etiquetas.
GET /api/tags/:id → Obtener etiqueta con artículos asociados.
PUT /api/tags/:id → Actualizar etiqueta (admin).
DELETE /api/tags/:id → Eliminar etiqueta (admin).

Articles

POST /api/articles → Crear artículo (auth).
GET /api/articles → Listar artículos.
GET /api/articles/:id → Obtener artículo por ID.
PUT /api/articles/:id → Actualizar artículo (autor/admin).
DELETE /api/articles/:id → Eliminar artículo (autor/admin).


Comments

POST /api/comments → Crear comentario.
GET /api/comments/article/:articleId → Listar comentarios de un artículo.
GET /api/comments/my → Listar comentarios del usuario logueado.
PUT /api/comments/:id → Actualizar comentario.
DELETE /api/comments/:id → Eliminar comentario.
