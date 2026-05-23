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
    // Create Noon RSS Sync (04:00 UTC = 12:00 Beijing)
    console.log("Creating Noon RSS Sync (04:00 UTC = 12:00 Beijing)...");
    const noon = await callForge("CreateHeartbeatJob", {
      name: "Noon RSS Sync",
      cronExpression: "0 0 4 * * *",
      callbackPath: "/api/scheduled/sync-rss",
      callbackMethod: "POST",
      callbackPayload: "{}",
      description: "RSS sync at 12:00 Beijing time (04:00 UTC)",
    });
    console.log("✓ Noon RSS Sync created!");
    console.log("  Task UID:", noon.taskUid);
    console.log("  Next execution:", noon.nextExecutionAt);

    // Create Evening RSS Sync (12:00 UTC = 20:00 Beijing)
    console.log("\nCreating Evening RSS Sync (12:00 UTC = 20:00 Beijing)...");
    const evening = await callForge("CreateHeartbeatJob", {
      name: "Evening RSS Sync",
      cronExpression: "0 0 12 * * *",
      callbackPath: "/api/scheduled/sync-rss",
      callbackMethod: "POST",
      callbackPayload: "{}",
      description: "RSS sync at 20:00 Beijing time (12:00 UTC)",
    });
    console.log("✓ Evening RSS Sync created!");
    console.log("  Task UID:", evening.taskUid);
    console.log("  Next execution:", evening.nextExecutionAt);

    // List all jobs
    console.log("\n--- All Heartbeat Jobs ---");
    const jobs = await callForge("ListHeartbeatJobs", {});
    console.log(JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error("✗ Error:", error.message);
    process.exit(1);
  }
}
main();
