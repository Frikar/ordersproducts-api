# ordersproducts-api
Proyecto para entrevista en la cual se debía desarrollar una API con MySQL, Node y Express

## Como iniciar el proyecto:

Clona el proyecto:
```bash
$ git clone https://github.com/Frikar/ordersproducts-api.git
```
---

Instala las dependencias:
```bash  
$ npm i
```
---

Crea la base de datos y sus tablas:

- Ingresa en tu cliente de MySQL y crea tu base de datos junto con su usuario
- Usa el archivo create_table.sql para crear las tablas necesarias en el proyecto

---

Crea un archivo .env usando el siguiente ejemplo:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=test_db
PORT=3000
```
---

Inicia el servidor:
```bash
$ npm run start
```
