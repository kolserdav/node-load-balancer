export = loadBalancer;
/**
 * @typedef {{
 *    url: string;
 *  }} Server
 *
 * @typedef {(req: express.Request, res: express.Response) => void} Handler
 */
/**
 *
 * @param {{
 *  getServer: (req: express.Request) => Promise<Server>;
 *  port: number;
 * }} args
 */
declare function loadBalancer(args: {
    getServer: (req: express.Request) => Promise<Server>;
    port: number;
}): Promise<void>;
declare namespace loadBalancer {
    export { Server, Handler };
}
import express = require("express");
type Server = {
    url: string;
};
type Handler = (req: express.Request, res: express.Response) => void;
