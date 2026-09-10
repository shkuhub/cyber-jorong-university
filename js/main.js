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

/* =========================
   DEPARTMENT MATCHING TEST
   ========================= */
const departmentProfiles = {
  "이중잣대학과": {
    image: "./assets/characters/double-standard.svg",
    title: "이중잣대학과",
    desc: "상황과 사람에 따라 기준을 조금씩 조정할 줄 아는 편입니다. 남에게는 원칙이 중요하지만 본인에게는 충분히 설명할 만한 사정이 있다고 생각합니다.",
    fit: "기준을 상황에 맞게 해석하는 능력이 뛰어난 학생에게 적합합니다."
  },
  "확신사회학과": {
    image: "./assets/characters/confidence-sociology.svg",
    title: "확신사회학과",
    desc: "정보가 충분하지 않아도 일단 자신의 판단을 믿는 편입니다. 검색보다 자신감이 먼저 도착하는 순간이 종종 있습니다.",
    fit: "모르는 주제에도 의견을 제시할 수 있는 자신감이 있다면 잘 맞습니다."
  },
  "선택적정의학과": {
    image: "./assets/characters/selective-justice.svg",
    title: "선택적정의학과",
    desc: "원칙을 중요하게 생각하지만 현실적인 상황에서는 예외도 필요하다고 봅니다. 특히 그 예외가 본인에게 필요한 경우에는 더욱 그렇습니다.",
    fit: "원칙과 현실 사이에서 합리적인 출구를 찾는 데 능합니다."
  },
  "타인인생컨설팅학과": {
    image: "./assets/characters/life-consulting.svg",
    title: "타인인생컨설팅학과",
    desc: "타인의 문제에는 놀라울 정도로 명확한 해답을 알고 있습니다. 자신의 문제에 대해서는 조금 더 신중한 검토가 필요하다고 생각합니다.",
    fit: "타인의 연애와 직장생활에 조언할 때 유난히 논리적인 학생에게 추천합니다."
  },
  "은근한자랑학과": {
    image: "./assets/characters/humble-brag.svg",
    title: "은근한자랑학과",
    desc: "자랑은 하지 않지만 사람들이 알아주면 좋겠다고 생각합니다. 우연히 공개한 것처럼 보이지만 사실 공개할 이유는 충분히 알고 있습니다.",
    fit: "겸손과 자기PR 사이의 미묘한 균형을 이해하는 학생에게 적합합니다."
  }
};

const testQuestions = [
  { q: "친구가 약속 시간에 20분 늦었습니다. 가장 가까운 생각은?", answers: [
    ["20분이면 충분히 기다릴 만하지.", "타인인생컨설팅학과"], ["시간 약속은 지켜야지.", "선택적정의학과"], ["나는 늦어도 친구가 늦으면 좀 그렇다.", "이중잣대학과"], ["일단 왜 늦었는지 들어본다.", "확신사회학과"]
  ]},
  { q: "SNS에 지인이 좋은 소식을 올렸습니다. 당신이라면?", answers: [
    ["진심으로 축하하고 지나간다.", "선택적정의학과"], ["나도 비슷한 경험이 있었다고 살짝 말한다.", "은근한자랑학과"], ["댓글 반응부터 보고 분위기를 파악한다.", "타인인생컨설팅학과"], ["좋은 소식이면 일단 축하하지.", "확신사회학과"]
  ]},
  { q: "회의에서 누군가 확신에 차서 틀린 말을 합니다.", answers: [
    ["확신하는 데는 이유가 있겠지.", "확신사회학과"], ["근거를 한번 확인해보자고 한다.", "선택적정의학과"], ["내가 아는 내용이면 바로 정정한다.", "타인인생컨설팅학과"], ["굳이 틀렸다고 바로 말할 필요는 없지.", "이중잣대학과"]
  ]},
  { q: "본인의 실수와 다른 사람의 실수를 비교한다면?", answers: [
    ["원칙적으로는 같게 봐야 한다.", "선택적정의학과"], ["내 실수에는 사정이 있고 남의 실수에는 관리가 부족하다.", "이중잣대학과"], ["상황을 봐야 알지.", "타인인생컨설팅학과"], ["누가 잘못했는지는 명확하지.", "확신사회학과"]
  ]},
  { q: "누군가 당신의 단점을 정확하게 지적했습니다.", answers: [
    ["맞는 말이면 인정한다.", "선택적정의학과"], ["그 사람이 말할 자격이 있는지는 별개다.", "이중잣대학과"], ["왜 그런 생각을 했는지 분석해본다.", "타인인생컨설팅학과"], ["일단 내가 얼마나 잘못했는지부터 판단한다.", "확신사회학과"]
  ]},
  { q: "친구가 연애 문제로 고민을 털어놓았습니다.", answers: [
    ["그건 상대방이 잘못한 거야.", "타인인생컨설팅학과"], ["둘 다 입장이 있을 텐데.", "선택적정의학과"], ["내가 그 상황이면 이렇게 했을 텐데.", "확신사회학과"], ["내 연애는 좀 다르긴 하지만 비슷한 경험이 있었어.", "은근한자랑학과"]
  ]},
  { q: "최근에 꽤 비싼 물건을 샀습니다. SNS에는?", answers: [
    ["굳이 올릴 필요는 없다.", "선택적정의학과"], ["별거 아닌데 한번 올려본다.", "은근한자랑학과"], ["좋은 거 샀으니 좋은 거라고 말한다.", "확신사회학과"], ["누가 알아보면 그때 이야기한다.", "타인인생컨설팅학과"]
  ]},
  { q: "평소 지키던 원칙이 이번에는 본인에게 불리합니다.", answers: [
    ["원칙은 원칙이니까 지켜야 한다.", "선택적정의학과"], ["이번 상황은 조금 다르지 않나?", "이중잣대학과"], ["예외가 가능한 근거를 찾아본다.", "확신사회학과"], ["남이 같은 상황이면 뭐라고 할지 생각한다.", "타인인생컨설팅학과"]
  ]},
  { q: "친구가 당신에게 '요즘 잘되는 것 같다'고 말했습니다.", answers: [
    ["운이 좀 좋았지.", "은근한자랑학과"], ["뭐, 내가 원래 좀 준비를 했지.", "확신사회학과"], ["그렇게 보였나?", "이중잣대학과"], ["너도 충분히 할 수 있어.", "타인인생컨설팅학과"]
  ]},
  { q: "누군가 온라인에서 자신 있게 잘못된 정보를 말합니다.", answers: [
    ["검색해보면 금방 알 수 있는데.", "확신사회학과"], ["굳이 공개적으로 망신줄 필요는 없지.", "선택적정의학과"], ["틀린 건 틀렸다고 알려줘야지.", "타인인생컨설팅학과"], ["나도 모르는 척하고 지나간다.", "은근한자랑학과"]
  ]}
];

const testModal = document.createElement("div");
testModal.className = "department-test-modal";
testModal.setAttribute("aria-hidden", "true");
testModal.innerHTML = `<div class="test-backdrop"></div><div class="test-dialog" role="dialog" aria-modal="true" aria-labelledby="testDialogTitle"><button class="test-close" id="closeDepartmentTest" aria-label="테스트 닫기">×</button><div class="test-dialog-inner" id="testDialogInner"></div></div>`;
document.body.appendChild(testModal);

let testStep = 0;
let testAnswers = [];

function openDepartmentTest() {
  testModal.classList.add("open");
  testModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  testStep = 0;
  testAnswers = [];
  renderTestIntro();
}

function closeDepartmentTest() {
  testModal.classList.remove("open");
  testModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function renderTestIntro() {
  document.getElementById("testDialogInner").innerHTML = `<div class="test-intro"><div class="test-eyebrow">DEPARTMENT MATCHING</div><h2 id="testDialogTitle">나에게 맞는 학과 찾기</h2><p>10개의 질문을 통해 당신의 성향과 가장 잘 어울리는 학과를 찾아드립니다.</p><div class="test-intro-note"><span>01</span><span>정답은 없습니다.</span><span>02</span><span>당신의 선택만 확인합니다.</span><span>03</span><span>마지막에 하나의 학과가 배정됩니다.</span></div><button class="test-start" id="startDepartmentTest">테스트 시작하기 <span>→</span></button></div>`;
  document.getElementById("startDepartmentTest").addEventListener("click", renderQuestion);
}

function renderQuestion() {
  const question = testQuestions[testStep];
  const progress = Math.round((testStep / testQuestions.length) * 100);
  document.getElementById("testDialogInner").innerHTML = `<div class="test-question-screen"><div class="test-progress-label"><span>DEPARTMENT MATCHING</span><strong>${testStep + 1} / ${testQuestions.length}</strong></div><div class="test-progress-track"><i style="width:${progress}%"></i></div><span class="question-number">QUESTION ${String(testStep + 1).padStart(2, "0")}</span><h2>${question.q}</h2><div class="test-options">${question.answers.map((answer, index) => `<button data-department="${answer[1]}"><span>${answer[0]}</span><b>›</b></button>`).join("")}</div></div>`;
  document.querySelectorAll(".test-options button").forEach(button => button.addEventListener("click", () => {
    testAnswers.push(button.dataset.department);
    testStep += 1;
    if (testStep < testQuestions.length) renderQuestion();
    else renderResult();
  }));
}

function renderResult() {
  const counts = Object.fromEntries(Object.keys(departmentProfiles).map(name => [name, 0]));
  testAnswers.forEach(name => counts[name] += 1);
  const max = Math.max(...Object.values(counts));
  const tied = Object.keys(counts).filter(name => counts[name] === max);
  const assigned = tied.length === 1 ? tied[0] : testAnswers.slice().reverse().find(name => tied.includes(name));
  const profile = departmentProfiles[assigned];

  document.getElementById("testDialogInner").innerHTML = `<div class="test-result-screen"><div class="result-label">DEPARTMENT MATCHING RESULT</div><p class="result-complete">학과 배정 완료</p><h2>당신은 <strong>${profile.title}</strong>에<br>어울립니다.</h2><div class="result-character"><img src="${profile.image}" alt="${profile.title} 신입생 캐릭터 일러스트"></div><div class="result-evaluation"><span>YOUR DEPARTMENT</span><h3>${profile.title}</h3><p>${profile.desc}</p><small>${profile.fit}</small></div><div class="result-actions"><button id="restartDepartmentTest">다시 테스트하기</button><button id="goDepartment">학과 자세히 보기 <span>→</span></button></div></div>`;
  document.getElementById("restartDepartmentTest").addEventListener("click", () => { testStep = 0; testAnswers = []; renderTestIntro(); });
  document.getElementById("goDepartment").addEventListener("click", () => { closeDepartmentTest(); document.getElementById("departments").scrollIntoView({ behavior: "smooth" }); });
}

document.getElementById("openDepartmentTest")?.addEventListener("click", openDepartmentTest);
document.getElementById("openDepartmentTestBottom")?.addEventListener("click", openDepartmentTest);
document.getElementById("closeDepartmentTest").addEventListener("click", closeDepartmentTest);
testModal.querySelector(".test-backdrop").addEventListener("click", closeDepartmentTest);
document.addEventListener("keydown", event => { if (event.key === "Escape" && testModal.classList.contains("open")) closeDepartmentTest(); });

const footerBottom = document.querySelector(".footer-bottom");
if (footerBottom) footerBottom.innerHTML = `<div>싸이버 조롱대학교 · 입학처 02-0000-0000 · admission@jorong.ac.kr</div><div>서울특별시 어딘가 · 평일 09:00–17:00</div><div class="footer-notice">본 사이트는 실제 교육기관이 아닌 패러디 웹사이트입니다. 합격 여부 및 등록금 납부와 관련한 실제 효력은 없습니다.</div><div>© 2026 CYBER JORONG UNIVERSITY. All Rights Reserved.</div>`;

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
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
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