import { rateLimit } from 'express-rate-limit';
import requestIp from "request-ip";

import { sha256 } from 'js-sha256';

export const rateLimiter = rateLimit({
  windowMs: 1* 60 * 1000,
  limit: 30,
  message: {message: "Too many requests, please try again later"},
  keyGenerator: (req) => {
    let actualClientIP;
    let clientIP = requestIp.getClientIp(req);

    !clientIP ? actualClientIP = req.socket.remoteAddress : actualClientIP = clientIP;

    return sha256(clientIP!);
  }
})