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
    console.log("=== Full Heartbeat Job Details ===\n");
    console.log(JSON.stringify(jobs, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();
