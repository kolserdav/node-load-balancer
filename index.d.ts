export type ProxyTarget = {
    url: string;
};
export type ProxyCallback = (req: express.Request) => Promise<ProxyTarget>;
/**
 * @typedef {{
 *    url: string;
 *  }} ProxyTarget
 *
 * @typedef {(req: express.Request) => Promise<ProxyTarget>} ProxyCallback
 */
/**
 *
 * @param {{
 *  getServer: ProxyCallback;
 *  port: number;
 * }} args
 */
export function proxy(args: {
    getServer: ProxyCallback;
    port: number;
}): Promise<void>;
import express = require("express");
