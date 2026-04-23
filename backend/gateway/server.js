import { createJsonService } from "../shared/http.js";

const serviceMap = {
  "/api/auth": "http://localhost:4001/api",
  "/api/users": "http://localhost:4001/api/users",
  "/api/profile": "http://localhost:4001/api/profile",
  "/api/courses": "http://localhost:4002/api/courses",
  "/api/announcements": "http://localhost:4002/api/announcements",
  "/api/labs": "http://localhost:4003/api/labs",
  "/api/submissions": "http://localhost:4003/api/submissions",
  "/api/admin/overview": "http://localhost:4004/api/admin/overview",
  "/api/admin/roadmap": "http://localhost:4004/api/admin/roadmap"
};

async function proxyRequest({ request, response, sendJson, url, body }) {
  const target = serviceMap[url.pathname];

  if (!target) {
    sendJson(response, 404, {
      error: "gateway route not found",
      route: url.pathname
    });
    return;
  }

  const upstreamResponse = await fetch(target, {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: ["GET", "HEAD"].includes(request.method) ? undefined : JSON.stringify(body)
  });

  const text = await upstreamResponse.text();

  response.writeHead(upstreamResponse.status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(text);
}

createJsonService({
  port: 4000,
  serviceName: "api-gateway",
  routes: {
    "GET /health": async ({ sendJson, response }) => {
      sendJson(response, 200, {
        service: "api-gateway",
        status: "healthy",
        downstreamServices: 4
      });
    },
    "GET /api/users": proxyRequest,
    "GET /api/profile": proxyRequest,
    "GET /api/courses": proxyRequest,
    "GET /api/announcements": proxyRequest,
    "GET /api/labs": proxyRequest,
    "GET /api/submissions": proxyRequest,
    "POST /api/submissions": proxyRequest,
    "GET /api/admin/overview": proxyRequest,
    "GET /api/admin/roadmap": proxyRequest
  }
});
