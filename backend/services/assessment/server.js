import { createJsonService } from "../../shared/http.js";

const labs = [
  {
    id: "LAB-UI-01",
    title: "UI Test Case Design Lab",
    type: "Manual testing",
    dueDate: "2026-04-28",
    status: "Open",
    scoreWeight: 20,
    objective: "Create positive, negative, and usability test cases for the student portal."
  },
  {
    id: "LAB-API-02",
    title: "REST API Validation Sprint",
    type: "API testing",
    dueDate: "2026-05-03",
    status: "Open",
    scoreWeight: 25,
    objective: "Verify authentication, authorization, and error handling behavior."
  }
];

const submissions = [
  {
    id: "SUB-001",
    studentName: "Tran Hoang An",
    labId: "LAB-UI-01",
    status: "Reviewed",
    score: 8.8,
    feedback: "Strong boundary coverage. Add cross-browser evidence."
  },
  {
    id: "SUB-002",
    studentName: "Le Bao Chau",
    labId: "LAB-API-02",
    status: "Pending",
    score: null,
    feedback: "Waiting for instructor review."
  }
];

createJsonService({
  port: 4003,
  serviceName: "assessment-service",
  routes: {
    "GET /health": async ({ sendJson, response }) => {
      sendJson(response, 200, {
        service: "assessment-service",
        status: "healthy"
      });
    },
    "GET /api/labs": async ({ sendJson, response }) => {
      sendJson(response, 200, labs);
    },
    "GET /api/submissions": async ({ sendJson, response }) => {
      sendJson(response, 200, submissions);
    },
    "POST /api/submissions": async ({ body, sendJson, response }) => {
      const newSubmission = {
        id: `SUB-${String(submissions.length + 1).padStart(3, "0")}`,
        studentName: body.studentName ?? "Unknown Student",
        labId: body.labId ?? "LAB-UI-01",
        status: "Pending",
        score: null,
        feedback: "Queued for review."
      };

      submissions.push(newSubmission);
      sendJson(response, 201, newSubmission);
    }
  }
});
