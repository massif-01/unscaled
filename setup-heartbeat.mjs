#!/usr/bin/env node

const SERVICE = "webdevtoken.v1.WebDevService";

const buildEndpoint = (rpc) => {
  const baseUrl = process.env.BUILT_IN_FORGE_API_URL;
  if (!baseUrl) throw new Error("BUILT_IN_FORGE_API_URL not set");
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(`${SERVICE}/${rpc}`, normalizedBase).toString();
};

const callForge = async (rpc, body) => {
  const endpoint = buildEndpoint(rpc);
  const headers = {
    accept: "application/json",
    authorization: `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
    "content-type": "application/json",
    "connect-protocol-version": "1",
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Heartbeat ${rpc} failed (${response.status}): ${detail}`);
  }
  return response.json();
};

async function main() {
  try {
    console.log("Creating Heartbeat job for Daily RSS Sync...");
    
    const result = await callForge("CreateHeartbeatJob", {
      name: "Daily RSS Sync",
      cronExpression: "0 0 1 * * *", // Every day at 01:00 UTC
      callbackPath: "/api/scheduled/sync-rss",
      callbackMethod: "POST",
      callbackPayload: "{}",
      description: "Automatically sync RSS feed from aihot.virxact.com daily",
    });

    console.log("✓ Heartbeat job created successfully!");
    console.log("  Task UID:", result.taskUid);
    console.log("  Next execution:", result.nextExecutionAt);

    // List all jobs
    console.log("\nListing all Heartbeat jobs...");
    const jobs = await callForge("ListHeartbeatJobs", {});
    console.log("Jobs:", JSON.stringify(jobs, null, 2));

  } catch (error) {
    console.error("✗ Error:", error.message);
    process.exit(1);
  }
}

main();
