import express, { Request, Response } from "express";

import redisClient from "../util/redisClient";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {

	await redisClient.hgetall("stats")
	.then(statsRes => {
		let stats = statsRes;
		
		res.status(200).json(stats);
	})
	.catch(error => {
		console.log("An error occurred trying to retrieve the stats");
		res.status(500).json("An internal server error occurred");
	})

});

export default router;