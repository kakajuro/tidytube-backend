import { rateLimit } from 'express-rate-limit';
import requestIp from "request-ip";

import { sha256 } from 'js-sha256';

import dotenv from "dotenv";
dotenv.config();

const clientIPSecret = process.env.CLIENTIPSECRET;

export const generalLimiter = rateLimit({
  windowMs: 1* 60 * 1000,
  limit: 30,
  message: {message: "Too many requests, please try again later"},
  keyGenerator: (req) => {
    let actualClientIP;
    let clientIP = requestIp.getClientIp(req);

    !clientIP ? actualClientIP = req.socket.remoteAddress : actualClientIP = clientIP;

    return sha256.hmac(clientIPSecret,clientIP!);
  }
});

export const burstLimiter = rateLimit({
  windowMs: 1 * 1000,
  limit: 8,
  message: {message: "Too many requests, please try again later"},
  keyGenerator: (req) => {
    let actualClientIP;
    let clientIP = requestIp.getClientIp(req);

    !clientIP ? actualClientIP = req.socket.remoteAddress : actualClientIP = clientIP;

    return sha256.hmac(clientIPSecret,clientIP!);
  }
});
