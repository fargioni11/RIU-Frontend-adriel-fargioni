#  CRUD de Superhéroes con Angular 18 y JSON-Server

Este es un proyecto **CRUD (Create, Read, Update, Delete)** construido con **Angular v18**, utilizando **Angular Material** para la interfaz y **JSON-Server** como una base de datos mock.

##  Tecnologías utilizadas

- **Angular v18** - Framework para la construcción del frontend.
- **Angular Material** - Librería de UI para diseño responsive.
- **Reactive Forms** - Manejo de formularios reactivos en Angular.
- **JSON-Server** - Simulación de una API REST con una base de datos mock (`db.json`).
- **RxJS y Signals** - Gestión de estado y suscripciones en Angular.
- **Angular Standalone Components** - Arquitectura sin necesidad de `NgModules`.
- **Interceptors
- **Interfaces
- **Servicios y Modales
  
##  Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Angular CLI](https://angular.io/cli) (versión 18)
- JSON-Server (`npm install -g json-server`)

##  Instalación y configuración

Clona este repositorio:
git clone https://github.com/fargioni11/RIU-Frontend-adriel-fargioni.git

cd RIU-Frontend-adriel-fargioni

* Instala las dependencias:
 npm install

* Ejecuta el frontend de Angular:
 ng serve
🔹 La aplicación estará disponible en: http://localhost:4200

* Inicia la base de datos mock con JSON-Server:
 npm run json-server
🔹 La API estará disponible en: http://localhost:3000/superheroes

Uso del CRUD
1. Agregar un superhéroe
Haz clic en el botón "add Superhero".
Completa los campos del formulario.
Haz clic en Guardar y el nuevo superhéroe aparecerá en la tabla.
2. Editar un superhéroe
Haz clic en el botón ✏️ Editar en la tabla.
Modifica los datos y presiona Guardar.
Los cambios se reflejarán inmediatamente.
3. Eliminar un superhéroe
Haz clic en el botón 🗑️ Eliminar en la tabla.
Se mostrará un mensaje de confirmación.
Si confirmas, el superhéroe será eliminado.


![image](https://github.com/user-attachments/assets/ac33be9b-55d7-4178-ae48-f9ef1fb3a55c)

![image](https://github.com/user-attachments/assets/3da80337-ca93-45ba-9c73-3ceb44a47803)


## Ejecutando el Proyecto con Docker

Este proyecto incluye una configuración Docker para simplificar el despliegue y la ejecución. Sigue los pasos a continuación para ejecutar el proyecto usando Docker:

### Requisitos Previos

Asegúrate de tener instalado lo siguiente:
- [Docker](https://www.docker.com/) (versión 20.10 o superior)
- [Docker Compose](https://docs.docker.com/compose/) (versión 2.0 o superior)

### Pasos para Construir y Ejecutar

1. Clona el repositorio y navega al directorio del proyecto:
   ```bash
   git clone https://github.com/fargioni11/RIU-Frontend-adriel-fargioni.git
   cd RIU-Frontend-adriel-fargioni
   ```

2. Construye e inicia los servicios usando Docker Compose:
   ```bash
   docker compose up --build
   ```

3. Accede a la aplicación y API:
   - Frontend: [http://localhost:80](http://localhost:80)
   - API: [http://localhost:3000/superheroes](http://localhost:3000/superheroes)

### Detalles de Configuración

- El frontend se sirve usando Nginx en el puerto `80`.
- La API mock se sirve usando JSON-Server en el puerto `3000`.
- El archivo `db.json` se utiliza como fuente de datos para la API.

### Variables de Entorno

No se requieren variables de entorno adicionales para esta configuración.

### Notas

- Asegúrate de que los puertos `80` y `3000` estén disponibles en tu máquina host.
- El `Dockerfile` y `docker-compose.yml` están configurados para un despliegue listo para producción.

Para más ayuda, consulta la [documentación de Docker](https://docs.docker.com/).

