
// URL of your Cloudflare Worker endpoint
const endpoint = "https://hexagon.solitary-forest-8d89.workers.dev/";

// Function to send interaction data to the Worker
export async function logInteraction(data: any) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });

    if (response.ok) {
      console.log("Log stored successfully");
    } else {
      console.error("Failed to store log:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending log data:", error);
  }
}

