// Cloudflare Worker code to log interactions with IP and timestamp
addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
	if (request.method !== "POST") {
	  return new Response("Method not allowed", { status: 405 });
	}
  
	// Get the client's IP address
	const clientIP = request.headers.get("CF-Connecting-IP");
  
	if (!clientIP) {
	  return new Response("Unable to determine IP address", { status: 400 });
	}
  
	// Parse the JSON data from the request body
	let logData;
	try {
	  logData = await request.json();
	} catch (error) {
	  return new Response("Invalid JSON format", { status: 400 });
	}
  
	// Add timestamp to the log data
	const timestamp = new Date().toISOString();
	logData.timestamp = timestamp;
  
	// Store log data as a string in Workers KV using IP as the key
	// Format data as JSON string for storage
	const key = `user_logs:${clientIP}`;
	const previousData = await USER_LOGS.get(key) || "[]";
	const logsArray = JSON.parse(previousData);
	logsArray.push(logData);
	await USER_LOGS.put(key, JSON.stringify(logsArray));
  
	return new Response("Log stored successfully", { status: 200 });
  }
  