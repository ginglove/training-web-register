const API_BASE = "http://localhost:4000";

function renderProfile(profile) {
  const card = document.querySelector("#profile-card");
  card.classList.remove("skeleton");
  card.innerHTML = `
    <h4>${profile.name}</h4>
    <p>${profile.email}</p>
    <p class="meta">Role: ${profile.role}</p>
    <p class="meta">Focus: ${profile.focus}</p>
  `;
}

function renderCourses(courses) {
  const root = document.querySelector("#course-list");
  root.innerHTML = courses
    .map(
      (course) => `
        <article class="stack-item">
          <h4>${course.title}</h4>
          <p>${course.summary}</p>
          <p class="meta">${course.level} · ${course.duration} · ${course.modules} modules · ${course.progress}% completion</p>
        </article>
      `
    )
    .join("");
}

function renderLabs(labs) {
  const root = document.querySelector("#lab-list");
  root.innerHTML = labs
    .map(
      (lab) => `
        <article class="stack-item">
          <h4>${lab.title}</h4>
          <p>${lab.objective}</p>
          <p class="meta">${lab.type} · Due ${lab.dueDate} · ${lab.scoreWeight}% weight</p>
        </article>
      `
    )
    .join("");
}

function renderAnnouncements(items) {
  const root = document.querySelector("#announcement-list");
  root.innerHTML = items
    .map(
      (item) => `
        <article class="stack-item">
          <h4>${item.title}</h4>
          <p>${item.body}</p>
          <p class="meta">${item.audience} · Published ${item.publishedAt}</p>
        </article>
      `
    )
    .join("");
}

function renderSubmissions(items) {
  const root = document.querySelector("#submission-list");
  root.innerHTML = items
    .map(
      (item) => `
        <article class="table-row">
          <div>
            <strong>${item.studentName}</strong>
            <p class="meta">${item.id}</p>
          </div>
          <div>${item.labId}</div>
          <div><span class="pill ${item.status === "Reviewed" ? "pill-success" : "pill-warning"}">${item.status}</span></div>
          <div>${item.score ?? "-"}</div>
          <div class="meta">${item.feedback}</div>
        </article>
      `
    )
    .join("");
}

function renderAdmin(overview, roadmap) {
  document.querySelector("#stat-students").textContent = overview.activeStudents;
  document.querySelector("#stat-labs").textContent = overview.openLabs;
  document.querySelector("#stat-completion").textContent = `${overview.averageCompletion}%`;

  document.querySelector("#roadmap-list").innerHTML = roadmap
    .map(
      (item) => `
        <article class="roadmap-item">
          <h4>${item.phase}</h4>
          <p>${item.note}</p>
          <p class="meta">Status: ${item.status}</p>
        </article>
      `
    )
    .join("");

  document.querySelector("#risk-list").innerHTML = overview.riskyAreas
    .map(
      (risk) => `
        <article class="risk-item">
          <p>${risk}</p>
        </article>
      `
    )
    .join("");
}

async function fetchJson(path, options) {
  const response = await fetch(`${API_BASE}${path}`, options);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json();
}

async function bootstrap() {
  const [profile, courses, labs, announcements, submissions, overview, roadmap] = await Promise.all([
    fetchJson("/api/profile"),
    fetchJson("/api/courses"),
    fetchJson("/api/labs"),
    fetchJson("/api/announcements"),
    fetchJson("/api/submissions"),
    fetchJson("/api/admin/overview"),
    fetchJson("/api/admin/roadmap")
  ]);

  renderProfile(profile);
  renderCourses(courses);
  renderLabs(labs);
  renderAnnouncements(announcements);
  renderSubmissions(submissions);
  renderAdmin(overview, roadmap);
}

document.querySelector("#demo-submit").addEventListener("click", async () => {
  await fetchJson("/api/submissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      studentName: "Pham Gia Huy",
      labId: "LAB-UI-01"
    })
  });

  const submissions = await fetchJson("/api/submissions");
  renderSubmissions(submissions);
});

bootstrap().catch((error) => {
  console.error(error);
  document.querySelector("#profile-card").classList.remove("skeleton");
  document.querySelector("#profile-card").innerHTML = `
    <h4>Backend connection needed</h4>
    <p class="meta">Start the services with <code>npm run start:all</code> to load live data.</p>
  `;
});
