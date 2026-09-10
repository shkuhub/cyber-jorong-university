const departmentList = document.getElementById("departmentList");
const curriculumList = document.getElementById("curriculumList");

departmentList.innerHTML = departments.map((item, index) => `
  <article class="department reveal">
    <button class="department-header" aria-expanded="false">
      <span class="department-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="department-name">
        <h3>${item.name}</h3>
        <p>${item.subtitle}</p>
      </span>
      <span class="department-arrow">+</span>
    </button>
    <div class="department-detail">
      <div class="department-detail-inner">
        <div class="department-detail-content">
          <div class="detail-title">학과소개</div>
          <p class="detail-description">${item.description}</p>
          <div class="detail-title">주요과목</div>
          <div class="detail-courses">
            ${item.courses.map(course => `<span class="detail-course">${course}</span>`).join("")}
          </div>
          <div class="detail-career"><strong>졸업 후 진로 :</strong> ${item.career}</div>
        </div>
      </div>
    </div>
  </article>
`).join("");

curriculumList.innerHTML = curriculum.map(item => `
  <div class="curriculum-item reveal">
    <div class="curriculum-code">${item.code}</div>
    <div><h3>${item.title}</h3><p>${item.desc}</p></div>
    <div class="curriculum-credit">${item.credit}</div>
  </div>
`).join("");

document.querySelectorAll(".department-header").forEach(button => {
  button.addEventListener("click", () => {
    const department = button.closest(".department");
    const isOpen = department.classList.contains("open");
    document.querySelectorAll(".department").forEach(item => {
      item.classList.remove("open");
      item.querySelector(".department-header").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      department.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const header = document.getElementById("header");
const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.remove("active"));
    const active = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
    if (active) active.classList.add("active");
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));