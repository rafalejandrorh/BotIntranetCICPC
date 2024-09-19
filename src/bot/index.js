const { Telegraf, Scenes, session } = require('telegraf');
const { Stage } = Scenes;
const { telegram: { bot: { token } } } = require('../../config');
// Commands
const register = require('./commands/registerCommand');
const recoveryPassword = require('./commands/recoveryPasswordCommand');

// Escenes
const idScene = require('./scenes/idScene');
const credentialScene = require('./scenes/credentialScene');
const securityQuestionScene = require('./scenes/securityQuestionScene');

const bot = new Telegraf(token);

// Establecer Session
bot.use(session());

// Crear stage y registrar escenas
const stage = new Stage([idScene, credentialScene, securityQuestionScene]);
bot.use(stage.middleware());
// Comando para registrarse en el Bot
register(bot, stage);

// Comando para Desbloqueo de Usuario a través de pregunta de seguridad
recoveryPassword(bot);
// Launch Bot
bot.launch();