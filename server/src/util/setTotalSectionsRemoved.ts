import redisClient from "./redisClient";

export default async function setTotalSectionsRemoved() {

	let totalSectionsCount = 0;

	// Get stats data
	let data = await redisClient.hgetall("stats", (err, _) => {
		if (err) return new Error("Error retrieving stats from database")
	});

	// Aggregate stats excluding some stats
	for (const [key, value] of Object.entries(data)) {
		if (key === "totalInstalls" || key === "currentUsers"|| key === "removePopups" || key === "removeAdsFromReccomendations" || key === "totalSectionsRemoved") {
			//console.log("Sucessfully skipped fields while calculating totalSectionsRemoved.")
		} else {
			totalSectionsCount += parseInt(value);
		}

	}	

	// Update sectionsRemovedTotal in database
	try {
		await redisClient.hset("stats", "totalSectionsRemoved", totalSectionsCount);
	} catch (err) {
		return new Error(`An error occurred updating the total stats: ${err}`)
	}

	return 0
	
}