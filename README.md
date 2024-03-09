# Despliegue

Aquí puedes documentar los pasos necesarios para desplegar tu aplicación.

## Requisitos previos

- [ ] Instalar las dependencias del proyecto
- [ ] Configurar las variables de entorno

- SECRET
- PORT
- SQL_TYPE # ejemplo postgres
- SQL_HOST
- SQL_USERNAME
- SQL_PASSWORD
- SQL_DATABASE
- WHITE_LIST # SEPARADO POR COMA(,) SIN ESPACIO
- AWS_BUCKET_NAME
- AWS_BUCKET_REGION
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

## Pasos de despliegue

1. Clonar el repositorio
2. Instalar las dependencias ejecutando `pnpm install`
3. Configurar las variables de entorno o en el archivo `.env`
4. Generar los archivos estáticos con el comando `npm run build`
5. Iniciar el servidor de producción con `npm start`

¡Y eso es todo! Ahora tu aplicación está desplegada y lista para su uso.

Recuerda personalizar este archivo con los pasos específicos para tu proyecto.
