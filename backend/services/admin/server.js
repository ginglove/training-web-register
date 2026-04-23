import { createJsonService } from "../../shared/http.js";

const stats = {
  activeStudents: 128,
  activeCourses: 6,
  openLabs: 9,
  averageCompletion: 81,
  riskyAreas: [
    "Students are missing traceability links between requirements and test cases.",
    "API error-path coverage is lower than the course target.",
    "Cross-browser evidence is inconsistent in week 5 submissions."
  ]
};

const roadmap = [
  {
    phase: "Foundation",
    status: "Completed",
    note: "Course spaces, role-based access, and announcement workflows."
  },
  {
    phase: "Practice & grading",
    status: "In progress",
    note: "Hands-on labs, submission review, and score feedback."
  },
  {
    phase: "Reporting",
    status: "Planned",
    note: "Student progress analytics and rubric export."
  }
];

createJsonService({
  port: 4004,
  serviceName: "admin-service",
  routes: {
    "GET /health": async ({ sendJson, response }) => {
      sendJson(response, 200, {
        service: "admin-service",
        status: "healthy"
      });
    },
    "GET /api/admin/overview": async ({ sendJson, response }) => {
      sendJson(response, 200, stats);
    },
    "GET /api/admin/roadmap": async ({ sendJson, response }) => {
      sendJson(response, 200, roadmap);
    }
  }
});
