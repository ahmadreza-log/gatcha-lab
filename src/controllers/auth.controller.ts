import { Request, Response } from "express";

export class AuthController {
    static async get(req: Request, res: Response) {
        res.json('Hello World')
    }
}