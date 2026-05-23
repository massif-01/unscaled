#!/usr/bin/env node

// This script deletes the old AGENT cron task
// The task UID is: cykO766z1vSKsfA2BuF9Sg

import { spawn } from 'child_process';

const taskUid = "cykO766z1vSKsfA2BuF9Sg";

console.log(`Deleting AGENT cron task: ${taskUid}`);
console.log("Note: manus-config doesn't have a delete command, so we need to do this manually.");
console.log("\nInstructions:");
console.log("1. Go to https://manus.im/app/scheduled");
console.log("2. Find 'Daily RSS Sync' task");
console.log("3. Click the delete/disable button");
console.log("\nOr use the Manus API directly if you have the endpoint.");
