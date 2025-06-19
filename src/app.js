import express from "express";
import routes from "./routes";
import "./database";

import sentryConfig from "./config/sentry";
import * as Sentry from "@sentry/node";

import "express-async-errors";
import Youch from "youch";
import "dotenv/config";

class App {
    constructor() {
        this.server = express();

        Sentry.init({
            dsn: sentryConfig.dsn,
            sendDefaultPii: sentryConfig.sendDefaultPii
        });

        this.middlewares();
        this.routes();
        this.exceptionHandle();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
    }
    
    routes() {
        this.server.use(routes);
    }
    
    exceptionHandle() {
        Sentry.setupExpressErrorHandler(this.server);
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === "development") {
                const errors = await new Youch(err, req).toJSON()
                return res.status(500).json(errors)
            }
            return (res.status(500).json({ error: "Internal Server Error" }),
            res.Sentry)
        });
    }

}

export default new App().server;
