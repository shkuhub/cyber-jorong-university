const departmentList = document.getElementById("departmentList");
const curriculumList = document.getElementById("curriculumList");

departmentList.innerHTML = departments.map((item, index) => `
  <article class="department reveal">
    <button class="department-header" aria-expanded="false">
      <span class="department-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="department-name"><h3>${item.name}</h3><p>${item.subtitle}</p></span>
      <span class="department-arrow">+</span>
    </button>
    <div class="department-detail"><div class="department-detail-inner"><div class="department-detail-content">
      <div class="detail-title">학과소개</div><p class="detail-description">${item.description}</p>
      <div class="detail-title">주요과목</div><div class="detail-courses">${item.courses.map(course => `<span class="detail-course">${course}</span>`).join("")}</div>
      <div class="detail-career"><strong>졸업 후 진로 :</strong> ${item.career}</div>
    </div></div></div>
  </article>`).join("");

curriculumList.innerHTML = `
  <div class="common-curriculum reveal">
    <div class="common-heading"><span>COMMON COURSES</span><h3>공통과목</h3><p>전공에 관계없이 모든 학생이 이수하는 기초 교육과정입니다.</p></div>
    <div class="common-grid">${commonCourses.map(course => `<div class="common-course"><strong>${course.title}</strong><p>${course.desc}</p></div>`).join("")}</div>
  </div>
  ${curriculum.map(item => `<div class="curriculum-item reveal"><div class="curriculum-code">${item.code}</div><div><h3>${item.title}</h3><p>${item.desc}</p></div><div class="curriculum-credit">${item.credit}</div></div>`).join("")}`;

const curriculumTitle = document.querySelector("#curriculum .section-title");
const curriculumSubtitle = document.querySelector("#curriculum .section-subtitle");
if (curriculumTitle) curriculumTitle.textContent = "교육과정";
if (curriculumSubtitle) curriculumSubtitle.textContent = "3년 동안 인간의 모순을 관찰하고 분석하는 공통교육과 전공교육을 이수합니다.";

document.querySelectorAll(".department-header").forEach(button => button.addEventListener("click", () => {
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
}));

const testSection = document.createElement("section");
testSection.className = "section section-dark";
testSection.id = "test";
testSection.innerHTML = `<div class="container"><div class="section-header reveal"><div class="section-eyebrow">JORONG INDEX</div><h2 class="section-title">당신의 조롱력을<br>측정해보세요.</h2><p class="section-subtitle">본인이 얼마나 타인의 모순을 빠르게 발견하는지 확인합니다. 물론 본인의 모순은 평가 대상에서 제외됩니다.</p></div><div class="test-card reveal"><div class="test-progress"><span id="testProgress">1 / 5</span><div><i id="testBar"></i></div></div><div id="testArea"></div></div></div>`;
const admissionSection = document.getElementById("admission");
if (admissionSection) admissionSection.parentNode.insertBefore(testSection, admissionSection);

const footerBottom = document.querySelector(".footer-bottom");
if (footerBottom) footerBottom.innerHTML = `<div>싸이버 조롱대학교 · 입학처 02-0000-0000 · admission@jorong.ac.kr</div><div>서울특별시 어딘가 · 평일 09:00–17:00</div><div class="footer-notice">본 사이트는 실제 교육기관이 아닌 패러디 웹사이트입니다. 합격 여부 및 등록금 납부와 관련한 실제 효력은 없습니다.</div><div>© 2026 CYBER JORONG UNIVERSITY. All Rights Reserved.</div>`;
const footerLinks = document.querySelector(".footer-links");
if (footerLinks && !footerLinks.querySelector('a[href="#test"]')) footerLinks.insertAdjacentHTML("beforeend", '<a href="#test">조롱력 테스트</a>');
const nav = document.querySelector(".nav");
if (nav && !nav.querySelector('a[href="#test"]')) nav.insertAdjacentHTML("beforeend", '<a href="#test">조롱력 테스트</a>');

const testQuestions = [
  { q: "친구가 약속 시간에 20분 늦었다. 가장 먼저 드는 생각은?", a: ["시간은 지켜야지.", "무슨 사정이 있었겠지.", "나는 늦어도 괜찮지만 친구가 늦으면 조금 그렇다.", "일단 다음 약속도 늦는지 지켜본다."] },
  { q: "SNS에 지인이 좋은 소식을 올렸다. 당신의 반응은?", a: ["진심으로 축하한다.", "좋아요를 누르고 내용은 자세히 보지 않는다.", "나도 비슷한 경험이 있다는 사실을 굳이 말하고 싶어진다.", "일단 댓글을 보고 분위기를 파악한다."] },
  { q: "회의에서 누군가 확신에 차서 틀린 말을 한다면?", a: ["근거를 확인해보자고 한다.", "틀렸다는 생각이 들지만 분위기를 본다.", "내가 아는 내용이라면 바로 정정한다.", "확신이 있으니 뭔가 이유가 있겠지 생각한다."] },
  { q: "본인이 한 실수와 남이 한 실수의 차이를 설명한다면?", a: ["원칙적으로 같아야 한다.", "상황에 따라 다를 수 있다.", "내 실수에는 사정이 있고 남의 실수에는 관리가 부족하다.", "판단하기 전에 전체 맥락을 봐야 한다."] },
  { q: "누군가 당신의 단점을 정확하게 지적했다면?", a: ["인정하고 고친다.", "일단 반박할 근거를 찾는다.", "맞는 말이지만 그 사람이 말할 자격이 있는지는 따져본다.", "집에 가서 생각해본다."] }
];
let testStep = 0;
let testScore = 0;

function renderTest() {
  const area = document.getElementById("testArea");
  if (!area) return;
  const question = testQuestions[testStep];
  document.getElementById("testProgress").textContent = `${testStep + 1} / ${testQuestions.length}`;
  document.getElementById("testBar").style.width = `${(testStep / testQuestions.length) * 100}%`;
  area.innerHTML = `<div class="test-question"><span>QUESTION ${String(testStep + 1).padStart(2, "0")}</span><h3>${question.q}</h3><div class="test-options">${question.a.map((answer, index) => `<button data-score="${index}">${answer}<b>›</b></button>`).join("")}</div></div>`;
  area.querySelectorAll("button").forEach(button => button.addEventListener("click", () => {
    testScore += Number(button.dataset.score);
    testStep += 1;
    if (testStep < testQuestions.length) renderTest();
    else renderResult();
  }));
}

function renderResult() {
  const area = document.getElementById("testArea");
  const score = testScore;
  let title;
  let desc;
  if (score <= 5) {
    title = "관찰자형";
    desc = "타인을 쉽게 단정하지 않는 편입니다. 조롱력은 낮지만 사회적 적응력은 높을 가능성이 있습니다.";
  } else if (score <= 10) {
    title = "잠재적 조롱자";
    desc = "평소에는 침착하지만 모순을 발견하면 마음속으로 한 번쯤 코멘트를 남기는 유형입니다.";
  } else if (score <= 15) {
    title = "고급 조롱자";
    desc = "말하지 않아도 상황의 아이러니를 빠르게 포착합니다. 표정 관리가 중요한 단계입니다.";
  } else {
    title = "조롱 석사";
    desc = "남의 모순을 발견하는 속도가 매우 빠릅니다. 이제 같은 기준을 자신에게 적용하는 연습이 필요합니다.";
  }
  document.getElementById("testProgress").textContent = "RESULT";
  document.getElementById("testBar").style.width = "100%";
  area.innerHTML = `<div class="test-result"><span>YOUR JORONG TYPE</span><h3>${title}</h3><p>${desc}</p><button id="restartTest">다시 테스트하기</button></div>`;
  document.getElementById("restartTest").addEventListener("click", () => {
    testStep = 0;
    testScore = 0;
    renderTest();
  });
}

const testStyle = document.createElement("style");
testStyle.textContent = `
.common-curriculum{padding:38px 0 45px;border-bottom:1px solid #34415a}.common-heading>span{font-family:'Playfair Display',serif;color:var(--gold-light);font-size:12px;letter-spacing:.12em}.common-heading h3{font-size:22px;margin:7px 0 5px}.common-heading p{color:#8f99aa;font-size:12px}.common-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:#34415a;margin-top:28px}.common-course{background:var(--navy2);padding:24px}.common-course strong{font-size:14px}.common-course p{color:#8f99aa;font-size:11px;line-height:1.8;margin-top:8px}.test-card{max-width:900px;background:var(--navy2);border:1px solid #34415a;padding:42px}.test-progress{display:flex;align-items:center;gap:20px;margin-bottom:45px;color:#8f99aa;font-family:'Playfair Display',serif;font-size:12px}.test-progress>div{height:2px;background:#34415a;flex:1}.test-progress i{display:block;height:100%;width:0;background:var(--gold-light);transition:.35s}.test-question>span,.test-result>span{color:var(--gold-light);font-size:10px;letter-spacing:.16em}.test-question h3{font-size:25px;line-height:1.5;margin:14px 0 30px;letter-spacing:-.035em}.test-options{display:grid;gap:8px}.test-options button{display:flex;justify-content:space-between;align-items:center;text-align:left;border:1px solid #34415a;background:transparent;color:#dce0e6;padding:17px 20px;font-size:13px;cursor:pointer;transition:.2s}.test-options button:hover{background:#202f4b;border-color:#63708a;transform:translateX(4px)}.test-options b{font-size:20px;font-weight:300;color:#8f99aa}.test-result{text-align:center;padding:20px 0 10px}.test-result h3{font-size:38px;color:var(--gold-light);margin:12px 0}.test-result p{color:#aeb7c5;font-size:13px;max-width:560px;margin:0 auto 30px}.test-result button{height:46px;padding:0 24px;border:1px solid #58657c;background:transparent;color:#fff;cursor:pointer}.footer-notice{margin-top:14px;color:#4f5a6d}@media(max-width:850px){.common-grid{grid-template-columns:1fr}.test-card{padding:30px 24px}.test-question h3{font-size:20px}}`;
document.head.appendChild(testStyle);

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

renderTest();