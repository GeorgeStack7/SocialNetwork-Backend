Para ejecutar el proyecto se tiene que realizar algunos comandos y configuracion de variables de entorno que son necesario para su ejecucion:

1. npm i
2. npx tsc
3. copiar y pegar lo siguiente en un archivo .env generado en la raiz del proyecto (backend):
PORT=5000
MONGODB_JAGUAR2 = mongodb://root:authServices@brickcode.com.co:27017/
SECRETORPRIVATEKEY= 234470537Jwt$ (o de su freferencia colcoar una personalizada)

4. npm run dev

tener en cuenta que esto estara desplegado en un contenedor de docker en un servidor en la cual esta configurado y puede acceder bajo el siguiente link: http://brickcode.com.co:5000/

El sistema se basa bajo la siquiente arquitectura ![Alt text](image.png)
Con la variacion que la base de datos esta realizada en MongoDB, el backend con nodejs y el frontend con angular