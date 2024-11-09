addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
	if (request.method !== "POST") {
	  return new Response("Method not allowed", { 
		status: 405, 
		headers: { "Access-Control-Allow-Origin": "*" } // Allow CORS for non-POST methods
	  });
	}
  
	// Get the client's IP address
	const clientIP = request.headers.get("CF-Connecting-IP");
  
	if (!clientIP) {
	  return new Response("Unable to determine IP address", { 
		status: 400, 
		headers: { "Access-Control-Allow-Origin": "*" } // Allow CORS
	  });
	}
  
	// Parse the JSON data from the request body
	let logData;
	try {
	  logData = await request.json();
	} catch (error) {
	  return new Response("Invalid JSON format", { 
		status: 400, 
		headers: { "Access-Control-Allow-Origin": "*" } // Allow CORS
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
  
	// Response with CORS headers
	const response = new Response("Log stored successfully", { status: 200 });
	const responseHeaders = new Headers(response.headers);
	responseHeaders.set("Access-Control-Allow-Origin", "*"); // Allow all origins
	responseHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS"); // Specify allowed methods
	responseHeaders.set("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
  
	return new Response(response.body, { status: response.status, headers: responseHeaders });
  }
  