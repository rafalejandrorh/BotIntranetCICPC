const { 
    telegram: { bot: { replySettingsDefault } },
    regExp: { email: regExpEmail, phone: regExpPhone }
} = require('../../../config');
const { userData } = require('../utils/userData');
const { logErrors } = require('../middlewares/error.handler');
// const UserService = require('../services/users.service');
// const service = new UserService();

module.exports = (bot, stage) => bot.command(['registrarme'], async (context) => {

    try {
        if (!userData[context.from.id]) {
            context.scene.enter('idScene');
        }

        if (userData[context.from.id]) {
            context.reply('Ya estás registrado. Acceso concedido.', replySettingsDefault);
        }
    } catch (error) {
        logErrors(context, error);
    }
});