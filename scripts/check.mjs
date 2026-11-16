import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
const command = process.argv[2];
if (!["build", "typecheck"].includes(command)) throw new Error("Use build or typecheck");
for (const app of readdirSync(new URL("../apps/", import.meta.url))) {
  const result = spawnSync("npm", ["run", command, "--workspace", "@study/" + app], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}
if (command === "build") await import("./catalog.mjs");
