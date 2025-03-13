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
- 
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
