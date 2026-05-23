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

(async () => {
  try {
    const jobs = await callForge("ListHeartbeatJobs", {});
    console.log("=== Heartbeat Jobs ===\n");
    jobs.jobs.forEach(job => {
      console.log(`Name: ${job.name}`);
      console.log(`Task UID: ${job.taskUid}`);
      console.log(`Description: ${job.description}`);
      console.log(`Cron: ${job.cronExpression}`);
      console.log(`Callback Path: ${job.callbackPath}`);
      console.log(`Callback Method: ${job.callbackMethod}`);
      console.log(`Enabled: ${job.isEnable}`);
      console.log(`Created: ${job.createdAt}`);
      console.log(`Last Executed: ${job.lastExecutedAt || "Never"}`);
      console.log(`Next Execution: ${job.nextExecutionAt}`);
      console.log("---\n");
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
