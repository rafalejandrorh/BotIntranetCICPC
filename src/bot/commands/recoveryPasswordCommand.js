const { securityQuestions } = require('../../../config');
const { userData, userAttempts } = require('../utils/userData');
const { logErrors } = require('../middlewares/error.handler');
// const UserService = require('../services/users.service');
// const service = new UserService();

module.exports = (bot) => bot.command(['recuperarContrasenna'], async (context) => {

    try {
        if (!userData[context.from.id]) {
            context.reply('No estás registrado. Usa el comando /registrarme para registrarte.');
            return;
        }
    
        if (!userAttempts[context.from.id]) {
            userAttempts[context.from.id] = 0;
        }
    
        if (userAttempts[context.from.id] >= 3) {
            context.reply('Has alcanzado el límite de intentos. Tu acceso ha sido bloqueado.');
            // Aquí puedes agregar la lógica para bloquear al usuario en la intranet del CICPC
            return;
        }
    
        const question = securityQuestions[Math.floor(Math.random() * securityQuestions.length)];
        context.session.securityQuestion = question;
        context.reply(question).then((msg) => context.session.lastMessageId = msg.message_id);
    
        bot.on('text', (context) => {
            if (context.session.securityQuestion) {
                const answer = context.message.text;
                context.deleteMessage(context.session.lastMessageId);
                context.deleteMessage(context.message.message_id);
    
                if (answer === userData[context.from.id].securityAnswer) {
                    context.reply('Respuesta correcta. Acceso desbloqueado.');
                    // Aquí puedes agregar la lógica para desbloquear al usuario en la intranet del CICPC
                } else {
                    userAttempts[context.from.id]++;
                    if (userAttempts[context.from.id] >= 3) {
                        context.reply('Has alcanzado el límite de intentos. Tu acceso ha sido bloqueado.');
                        // Aquí puedes agregar la lógica para bloquear al usuario en la intranet del CICPC
                    } else {
                        context.reply(`Respuesta incorrecta. Te quedan ${3 - userAttempts[context.from.id]} intentos.`);
                    }
                }
    
                context.session.securityQuestion = null;
            }
        });
    } catch (error) {
        logErrors(context, error);
    }
});
