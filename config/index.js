const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    env: process.env.NODE_ENV,
    isProd: process.env.NODE_ENV === 'production' ? true : false,
    port: process.env.LOCAL_PORT || 6000,
    telegram: {
        bot: {
            token: process.env.TOKEN_BOT_TELEGRAM,
            allowBots: false,
            replySettingsDefault: {
                protect_content: true,
                disable_notification: false,
            }
        }
    },
    apiKey: process.env.API_KEY,
    secretKeyJwt: process.env.SECRET_KEY_JWT || 'BOT_INTRANET_CICPC*2024',
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    },
    postgresql: {
        host: process.env.POSTGRES_DB_HOST,
        port: process.env.POSTGRES_DB_PORT,
        database: process.env.POSTGRES_DB_NAME,
        user: process.env.POSTGRES_DB_USER,
        password: process.env.POSTGRES_DB_PASSWORD,
        url: `postgres://${process.env.POSTGRES_DB_USER}:${process.env.POSTGRES_DB_PASSWORD}@${process.env.POSTGRES_DB_HOST}:${process.env.POSTGRES_DB_PORT}/${process.env.POSTGRES_DB_NAME}`
    },
    smtp: {
        gmail: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    },
    API: {
        V1: {
            endpoint: process.env.API_ENDPOINT_V1
        }
    },
    regExp: {
        amount: /\d{1,9}$/,
        countryCode: /^[A-Z]{2}$/,
        timezone: /^[A-Za-z]+\/[A-Za-z]+$/,
        email: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
        phone: /^\+\d{1,3}\d{3,14}$/,
    }
};