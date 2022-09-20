export = loadBalancer;
/**
 * @typedef {{
 *    url: string;
 *    active: boolean;
 *  }} Server
 *
 * @typedef {(req: express.Request, res: express.Response) => void} Handler
 */
/**
 *
 * @param {{
 *  getServers: () => Promise<Server[] | null>;
 *  port: number;
 * }} args
 */
declare function loadBalancer(args: {
    getServers: () => Promise<Server[] | null>;
    port: number;
}): void;
declare namespace loadBalancer {
    export { Server, Handler };
}
type Server = {
    url: string;
    active: boolean;
};
type Handler = (req: express.Request, res: express.Response) => void;
import express = require("express");
