import { spawn } from "node:child_process";
import process from "node:process";

const services = [
  { name: "auth-service", script: "backend/services/auth/server.js" },
  { name: "learning-service", script: "backend/services/learning/server.js" },
  { name: "assessment-service", script: "backend/services/assessment/server.js" },
  { name: "admin-service", script: "backend/services/admin/server.js" },
  { name: "api-gateway", script: "backend/gateway/server.js" }
];

const children = services.map((service) => {
  const child = spawn(process.execPath, [service.script], {
    stdio: "inherit"
  });

  child.on("exit", (code) => {
    console.log(`${service.name} exited with code ${code ?? 0}`);
  });

  return child;
});

function shutdown() {
  for (const child of children) {
    child.kill("SIGTERM");
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
