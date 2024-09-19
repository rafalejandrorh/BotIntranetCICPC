function logErrors (context, error) {
    console.error(error);
    context.reply(`Lo sentimos! Ha ocurrido un error. Revisa que hayas enviado el comando y los parámetros correctos`);
}

module.exports = {
    logErrors
}