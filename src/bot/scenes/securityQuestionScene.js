const { BaseScene } = require('telegraf/scenes');
const { userData } = require('../utils/userData');

const securityQuestionScene = new BaseScene('securityQuestionScene');
securityQuestionScene.enter((context) => context.reply(context.session.securityQuestion).then((msg) => context.session.lastMessageId = msg.message_id));
securityQuestionScene.on('text', (context) => {
    context.session.securityAnswer = context.message.text;
    
    // Se elimina la pregunta y la respuesta
    context.deleteMessage(context.session.lastMessageId);
    context.deleteMessage(context.message.message_id);
    
    // Se redirige a la siguiente escena
    // Almacenar datos del usuario
    userData[context.from.id] = {
        id: context.session.id,
        credential: context.session.credential,
        securityAnswer: context.session.securityAnswer
    };
    context.reply('Registro completado. Acceso concedido.');
    context.scene.leave();

    
    // Aquí puedes agregar la lógica para validar el acceso
    if (context.session.id === '27903883' && context.session.credential === '53592' && context.session.securityAnswer === 'respuesta_correcta') {
        context.reply('Acceso concedido.');
    } else {
        context.reply('Acceso denegado.');
    }
    context.scene.leave();
});

module.exports = securityQuestionScene;