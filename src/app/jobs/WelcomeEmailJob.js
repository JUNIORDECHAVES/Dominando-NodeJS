import Mail from "../../lib/Mail"; 

class WelcomeEmailJob {
    get key() {
        return "WelcomeEmail";
    }

    async handle({ data }) {
        const { name, email } = data;
        Mail.send({
            to: email,
            subject: "Bem vindo(a) ao sistema",
            text: `olá ${name}, seja bem vindo(a) ao sistema`,
        });
    }
}

export default new WelcomeEmailJob();