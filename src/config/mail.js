import "dotenv/config";

export default {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) ,
    secure: false,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS
    },
    default:{
        from: process.env.MAIL_DEFAULT_FROM
    }
}