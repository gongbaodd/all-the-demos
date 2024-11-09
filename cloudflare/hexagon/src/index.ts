addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
	// Handle preflight OPTIONS request for CORS
	if (request.method === "OPTIONS") {
	  return new Response(null, {
		status: 204,
		headers: {
		  "Access-Control-Allow-Origin": "*",
		  "Access-Control-Allow-Methods": "POST, OPTIONS",
		  "Access-Control-Allow-Headers": "Content-Type",
		},
	  });
	}
  
	if (request.method !== "POST") {
	  return new Response("Method not allowed", { 
		status: 405, 
		headers: { "Access-Control-Allow-Origin": "*" } 
	  });
	}
  
	// Get the client's IP address
	const clientIP = request.headers.get("CF-Connecting-IP");
  
	if (!clientIP) {
	  return new Response("Unable to determine IP address", { 
		status: 400, 
		headers: { "Access-Control-Allow-Origin": "*" } 
	  });
	}
  
	// Parse the JSON data from the request body
	let logData;
	try {
	  logData = await request.json();
	} catch (error) {
	  return new Response("Invalid JSON format", { 
		status: 400, 
		headers: { "Access-Control-Allow-Origin": "*" } 
	  });
	}
  
	// Add timestamp to the log data
	const timestamp = new Date().toISOString();
	logData.timestamp = timestamp;
  
	// Store log data in Workers KV using IP as the key
	const key = `user_logs:${clientIP}`;
	const previousData = await USER_LOGS.get(key) || "[]";
	const logsArray = JSON.parse(previousData);
	logsArray.push(logData);
	await USER_LOGS.put(key, JSON.stringify(logsArray));
  
	// Respond to the POST request with CORS headers
	return new Response("Log stored successfully", {
	  status: 200,
	  headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	  },
	});
  }
  