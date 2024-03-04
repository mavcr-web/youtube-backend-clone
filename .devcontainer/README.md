# CARGAR VARIABLES DE ENTORNO DESDE .env
> Primero, el comando `set -o allexport` activa la opción allexport, lo que significa que todas las variables definidas a partir de este punto se exportarán automáticamente a los subprocesos del shell. Luego, el comando `source .env` carga las variables de entorno desde el archivo .env en el script actual. Finalmente, el comando `set +o allexport` desactiva la opción allexport, lo que significa que las variables definidas después de este punto ya no se exportarán automáticamente a los subprocesos del shell.
```bash
set -o allexport; source .env; set +o allexport
```

# LEER VARIABLES DE ENTORNO
> leer todas las variables de entorno
```bash
printenv
```
> leer una variable de entorno en especifico
```bash
printenv SHELL
```