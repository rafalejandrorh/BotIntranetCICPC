const { BaseScene } = require('telegraf/scenes');

const idScene = new BaseScene('idScene');
idScene.enter((context) => context.reply('¿Cuál es tu cédula?').then((msg) => context.session.lastMessageId = msg.message_id));
idScene.on('text', (context) => {
    context.session.id = context.message.text;
    
    // Se elimina la pregunta y la respuesta
    context.deleteMessage(context.session.lastMessageId);
    context.deleteMessage(context.message.message_id);
    
    // Se redirige a la siguiente escena
    context.scene.enter('credentialScene');
});

module.exports = idScene;