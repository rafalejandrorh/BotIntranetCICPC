const { BaseScene } = require('telegraf/scenes');
const { securityQuestions } = require('../../../config');

const credentialScene = new BaseScene('credentialScene');
credentialScene.enter((context) => context.reply('¿Cuál es tu credencial?').then((msg) => context.session.lastMessageId = msg.message_id));
credentialScene.on('text', (context) => {
    context.session.credential = context.message.text;
    
    // Se elimina la pregunta y la respuesta
    context.deleteMessage(context.session.lastMessageId);
    context.deleteMessage(context.message.message_id);
    
    // Se redirige a la siguiente escena
    context.session.securityQuestion = securityQuestions[Math.floor(Math.random() * securityQuestions.length)];
    context.scene.enter('securityQuestionScene');
});

module.exports = credentialScene;