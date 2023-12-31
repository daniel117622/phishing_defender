# PhishDefender

![PhishDefender Logo](back/postgresTodo/base/static/img/XSS_VulnScanner_main_view.jpg)

PhishDefender es una poderosa herramienta para detectar vulnerabilidades y defenderse de los ataques XSS. Este archivo README le guiará a través del proceso de configuración e instalación.

## Requisitos

Asegúrate de tener los siguientes requisitos antes de comenzar:

- [Google Chrome](https://www.google.com/chrome/)
- [Python3](https://www.python.org/)
- [Docker](https://www.docker.com/)

## Instalaciones

### Docker
1. Instala las imágenes para los contenedores.
   ```bash
   docker pull postgres
   docker pull dpage/pgadmin4
   ```

1. Crea un contenedor con una base de datos limpia para PostgreSQL 13.
   ```bash
   docker run -d --name mydb -v C:\Users\my_user\my_dir:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_USER=my_user -e POSTGRES_DB=my_db -e POSTGRES_PASSWORD=my_pass postgres:13
   ```
2. Crea un contenedor para ejecutar pgAdmin 4 y acceder a la base de datos.
   ```bash
   docker run --name pgadmin -p 82:80 -e 'PGADMIN_DEFAULT_EMAIL=my_email' -e 'PGADMIN_DEFAULT_PASSWORD=my_pass' -d dpage/pgadmin4
   ```
3. Crea un servidor en pgAdmin para conectarlo a la base de datos.

   3.1. Para correr el proyecto localmente, busca la IP en la que está corriendo el contenedor con la base de datos local. Esta IP es el servidor que se debe registrar en pgadmin.

   ```bash
   docker ps
   docker inspect <ID>
   ```

### Python

1. Crea un entorno virtual en el directorio de tu proyecto.
   ```bash
   python -m venv env
   ```
2. Activa el entorno virtual.

  En Windows:
   ```bash
   env\Scripts\activate
   ```

  En macOS o Linux:
   ```bash
   source env/bin/activate
   ```
3. Instala las librerías:
   ```bash
   pip install -r requirements.txt
   ```

### Google Chrome
  1. Entra a chrome://extensions/ en Google Chrome y activa el modo desarrollador.
  2. Selecciona Cargar Descomprimida para cargar la aplicación. Elige el directorio /front/ de este repositorio.
  3. Recarga la aplicación y abre el service worker para debuggear la app.


¡Listo! Ahora estás preparado para usar PhishDefender. Si necesitas más detalles o ayuda adicional, consulta el tutorial de referencia mencionado anteriormente.
## Tutoriales de referencia
Cómo comenzar un proyecto de Django con una base de datos PostgreSQL: https://stackpython.medium.com/how-to-start-django-project-with-a-database-postgresql-aaa1d74659d8

Arquitectura Google Chrome Extensión: https://developer.chrome.com/docs/extensions/mv3/architecture-overview/
