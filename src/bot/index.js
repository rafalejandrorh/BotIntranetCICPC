const { Telegraf, Scenes, session } = require('telegraf');
const { Stage } = Scenes;
const { telegram: { bot: { token } } } = require('../../config');

// const cronJobs = require('./cronJobs');
// const auth = require('./middlewares/auth.handler');
// const isBot = require('./middlewares/isBot.handler');

// Constants
const { 
    telegram: { bot: { replySettingsDefault } },
    regExp: { email: regExpEmail, phone: regExpPhone },
    securityQuestions
} = require('../../config');
const { userData, userAttempts } = require('../bot/utils/userData');

// Middlewares
const { logError: logErrorMiddleware } = require('../bot/middlewares/error.handler');

// Commands
const registerCommand = require('./commands/registerCommand');
const recoveryPasswordCommand = require('./commands/recoveryPasswordCommand');

// Escenes
const idScene = require('./scenes/idScene');
const credentialScene = require('./scenes/credentialScene');
const securityQuestionScene = require('./scenes/securityQuestionScene');

const bot = new Telegraf(token);

// Establecer Session
bot.use(session());

// Crear stage y registrar escenas
const stage = new Stage([idScene(), credentialScene, securityQuestionScene]);
bot.use(stage.middleware());

// El Comando Start debe mostrar los comandos disponibles en el BOT
// start(bot);

// Comando para registrarse en el Bot
const register = registerCommand({userData, logErrorMiddleware});
register(bot, stage, replySettingsDefault);

// Comando para Desbloqueo de Usuario a través de pregunta de seguridad
const recoveryPassword = recoveryPasswordCommand({securityQuestions, userData, userAttempts, logErrorMiddleware});
recoveryPassword(bot, replySettingsDefault);

// CronJobs
// cronJobs(bot);

// Launch Bot
bot.launch();