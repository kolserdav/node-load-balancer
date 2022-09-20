export type Server = {
    url: string;
};
export type Callback = (req: express.Request) => Promise<Server>;
export type Handler = (req: express.Request, res: express.Response) => void;
/**
 * @typedef {{
 *    url: string;
 *  }} Server
 *
 * @typedef {(req: express.Request) => Promise<Server>} Callback
 * @typedef {(req: express.Request, res: express.Response) => void} Handler
 */
/**
 *
 * @param {{
 *  getServer: Callback;
 *  port: number;
 * }} args
 */
export function proxy(args: {
    getServer: Callback;
    port: number;
}): Promise<void>;
import express = require("express");
