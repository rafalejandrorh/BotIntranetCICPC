// const UserService = require('../services/users.service');
// const service = new UserService();

module.exports = recoveryPasswordCommand = ({ userData, logError }) => {

    return (bot, stage, replySettingsDefault) => bot.command(['registrarme'], async (context) => {

        try {
            if (!userData[context.from.id]) {
                context.scene.enter('idScene');
            }

            if (userData[context.from.id]) {
                context.reply('Ya estás registrado. Acceso concedido.', replySettingsDefault);
            }
        } catch (error) {
            logError(context, error);
        }
    });

};