import { createJsonService } from "../../shared/http.js";

const courses = [
  {
    id: "CSE-ST-01",
    title: "Software Testing Foundations",
    level: "Core",
    duration: "8 weeks",
    progress: 76,
    modules: 6,
    summary: "Introduce testing principles, SDLC alignment, and defect lifecycle."
  },
  {
    id: "CSE-ST-02",
    title: "Web Application Test Design",
    level: "Intermediate",
    duration: "6 weeks",
    progress: 54,
    modules: 5,
    summary: "Train students to derive test conditions, scenarios, and execution data."
  },
  {
    id: "CSE-ST-03",
    title: "API and Automation Essentials",
    level: "Advanced",
    duration: "5 weeks",
    progress: 33,
    modules: 4,
    summary: "Practice endpoint validation, assertions, and maintainable automation flows."
  }
];

const announcements = [
  {
    id: "ANN-01",
    title: "Midterm practical lab opens on Friday",
    audience: "All students",
    publishedAt: "2026-04-22",
    body: "Students should complete the browser compatibility checklist before starting the timed lab."
  },
  {
    id: "ANN-02",
    title: "New bug report template uploaded",
    audience: "Team 03 and Team 04",
    publishedAt: "2026-04-20",
    body: "Use the updated template with severity, reproducibility, and expected result sections."
  }
];

createJsonService({
  port: 4002,
  serviceName: "learning-service",
  routes: {
    "GET /health": async ({ sendJson, response }) => {
      sendJson(response, 200, {
        service: "learning-service",
        status: "healthy"
      });
    },
    "GET /api/courses": async ({ sendJson, response }) => {
      sendJson(response, 200, courses);
    },
    "GET /api/announcements": async ({ sendJson, response }) => {
      sendJson(response, 200, announcements);
    }
  }
});
