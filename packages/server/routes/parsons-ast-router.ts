import express from "express";
import { ChatCompletionRequestMessage } from "openai";

import { IUser } from "../models/user";
import { openai } from "../utils/codex";
import { verifyUser } from "../utils/strategy";

export const parsonsRouter = express.Router();

parsonsRouter.post("/ast", verifyUser, async (req, res, next) => {

    
}); 

