import { createServer } from "node:http";

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, payload, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": contentType
  });
  response.end(payload);
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function createJsonService({ port, serviceName, routes }) {
  const server = createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
      response.end();
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host}`);
    const key = `${request.method} ${url.pathname}`;
    const handler = routes[key];

    if (!handler) {
      sendJson(response, 404, {
        error: `${serviceName} route not found`,
        route: key
      });
      return;
    }

    try {
      const body = ["POST", "PUT", "PATCH"].includes(request.method)
        ? await readJsonBody(request)
        : {};

      await handler({
        request,
        response,
        url,
        body,
        sendJson,
        sendText
      });
    } catch (error) {
      sendJson(response, 500, {
        error: `${serviceName} failed to process the request`,
        details: error.message
      });
    }
  });

  server.listen(port, () => {
    console.log(`${serviceName} listening on http://localhost:${port}`);
  });
}

export { createJsonService, readJsonBody, sendJson, sendText };
