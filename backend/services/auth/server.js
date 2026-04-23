import { createJsonService } from "../../shared/http.js";

const users = [
  {
    id: "T-100",
    name: "Dr. Nguyen Minh",
    email: "teacher@testinglab.edu",
    role: "teacher",
    focus: "Manual testing, API testing"
  },
  {
    id: "S-201",
    name: "Tran Hoang An",
    email: "student1@testinglab.edu",
    role: "student",
    focus: "Web regression"
  },
  {
    id: "S-202",
    name: "Le Bao Chau",
    email: "student2@testinglab.edu",
    role: "student",
    focus: "Test automation"
  }
];

createJsonService({
  port: 4001,
  serviceName: "auth-service",
  routes: {
    "GET /health": async ({ sendJson, response }) => {
      sendJson(response, 200, {
        service: "auth-service",
        status: "healthy"
      });
    },
    "GET /api/users": async ({ sendJson, response }) => {
      sendJson(response, 200, users);
    },
    "GET /api/profile": async ({ sendJson, response }) => {
      sendJson(response, 200, users[0]);
    },
    "POST /api/login": async ({ body, sendJson, response }) => {
      const match = users.find((user) => user.email === body.email) ?? users[0];

      sendJson(response, 200, {
        message: "Login success",
        token: "demo-token-software-testing",
        user: match
      });
    }
  }
});
