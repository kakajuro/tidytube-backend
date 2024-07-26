import express, { Request, Response, NextFunction } from "express";

import { sha256 } from 'js-sha256';

import dotenv from "dotenv";
dotenv.config();

export default async function validInstall(req: Request, res: Response, next: NextFunction) {
  
  const timestamp = new Date().getTime();

  const installKey = process.env.INSTALLKEY!;
  const installKeySecret = process.env.INSTALLKEYSECRET!;

  const incomingInstallKey = req.headers["incoming-install-key"];

  const hashedInstallKey = sha256.hmac(installKeySecret, installKey);

  if (hashedInstallKey === incomingInstallKey) {
    console.log(`${timestamp}: New user authenticated`);
    next();
  } else {
    console.log(`${timestamp}: New user authenticated`);
    res.status(401).json({"message": "Invalid credentials"});
  }

}
