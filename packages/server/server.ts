import "./utils/strategy";

import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import Session from "express-session";
import mongoose from "mongoose";
import passport from "passport";

import { codexRouter } from "./routes/codex-baseline-router";
import { loginRouter } from "./routes/login-router";
import { tasksRouter } from "./routes/tasks-router";
import { pseudoRouter } from "./routes/codex-pseudo-router";
import { parsonsRouter } from "./routes/codex-parsons-router";
import { tokenRouter } from "./routes/codex-token-router";
import { hierarchicalRouter } from "./routes/codex-hierarchical-router";
import { selfExplainRouter } from "./routes/codex-selfexplain-router";
import { writeOverRouter } from "./routes/codex-writeover-router";
import { initLanguageService } from "./sockets/intellisense";
import { initPythonShell } from "./sockets/python-shell";
import env from "./utils/env";

const corsOptions = {
    origin: (origin: any, callback: any) => {
        const whitelist = env.WHITELISTED_DOMAINS.split(",").map((d) =>
            d.trim()
        );

        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

mongoose
    .connect(env.MONGODB_URI)
    .then((db) => {
        const app = express();

        app.use(cors(corsOptions));
        app.use(
            Session({
                secret: env.COOKIE_SECRET,
                resave: false,
                saveUninitialized: false,
            })
        );

        app.use(compression());
        app.use(cookieParser(env.COOKIE_SECRET));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(
            bodyParser.json({
                limit: "50mb",
            })
        );
        app.use(
            bodyParser.urlencoded({
                limit: "10mb",
            })
        );

        app.use("/api/auth/", loginRouter);
        app.use("/api/tasks/", tasksRouter);
        app.use("/api/technique-baseline/", codexRouter);
        app.use("/api/technique-parsons/", parsonsRouter);
        app.use("/api/technique-pseudo/", pseudoRouter);
        app.use("/api/technique-hierarchical/", hierarchicalRouter);
        app.use("/api/technique-token/", tokenRouter);
        app.use("/api/technique-writeover/", writeOverRouter);
        app.use("/api/technique-explain/", selfExplainRouter);

        const server = app.listen(
            env.PORT_PREFIX + env.NODE_APP_INSTANCE,
            () => {
                console.log(
                    `Express server listening at http://localhost:${
                        env.PORT_PREFIX + env.NODE_APP_INSTANCE
                    }`
                );
            }
        );

        initPythonShell(server);
        initLanguageService(server);
    })
    .catch((err) => {
        console.error("[Terminating] Error connecting to MongoDB: ", err);
    });
