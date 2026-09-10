(function () {
  function initDepartmentTestEntry() {
    const admissionSection = document.getElementById('admission');
    if (!admissionSection || document.getElementById('test')) return;

    const admissionTitle = admissionSection.querySelector('.section-title');
    const admissionSubtitle = admissionSection.querySelector('.section-subtitle');
    if (admissionTitle) admissionTitle.textContent = '지원자격';
    if (admissionSubtitle) admissionSubtitle.textContent = '특별한 능력은 필요하지 않습니다. 이미 충분히 가지고 있을 가능성이 높습니다.';

    const cta = admissionSection.querySelector('.department-test-cta');
    if (cta) cta.remove();

    const style = document.createElement('style');
    style.textContent = `
      .department-test-section .section-subtitle { color: #aeb7c5; }
      .department-test-section .test-card { max-width: 900px; background: var(--navy2); border: 1px solid #34415a; padding: 42px; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
      .department-test-section .test-card-copy > span { color: var(--gold-light); font-family: 'Playfair Display', serif; font-size: 10px; letter-spacing: .14em; }
      .department-test-section .test-card-copy h3 { color: #fff; font-size: 25px; letter-spacing: -.035em; margin: 10px 0 7px; }
      .department-test-section .test-card-copy p { color: #aeb7c5; font-size: 13px; }
      .department-test-section .test-entry-button { flex: 0 0 auto; height: 52px; padding: 0 26px; background: transparent; color: #fff; border: 1px solid #68758b; font-size: 13px; cursor: pointer; transition: .25s; }
      .department-test-section .test-entry-button:hover { background: #253653; border-color: #253653; transform: translateY(-2px); }
      .department-test-section .test-entry-button b { margin-left: 12px; font-size: 17px; font-weight: 400; }
      @media(max-width: 850px) { .department-test-section .test-card { align-items: flex-start; flex-direction: column; } .department-test-section .test-entry-button { width: 100%; } }
      @media(max-width: 600px) { .department-test-section .test-card { padding: 30px 25px; } .department-test-section .test-card-copy h3 { font-size: 21px; } }
    `;
    document.head.appendChild(style);

    const testSection = document.createElement('section');
    testSection.className = 'section section-dark department-test-section';
    testSection.id = 'test';
    testSection.innerHTML = `
      <div class="container">
        <div class="section-header reveal">
          <div class="section-eyebrow">DEPARTMENT MATCHING</div>
          <h2 class="section-title">나에게 맞는 학과<br>찾아보기</h2>
          <p class="section-subtitle">어느 학과에 지원할지 고민이 드시나요?<br>당신에게 잘 어울리는 학과를 찾아보세요.</p>
        </div>
        <div class="test-card reveal">
          <div class="test-card-copy">
            <span>10 QUESTIONS · 5 DEPARTMENTS</span>
            <h3>나에게 맞는 학과 찾아보기</h3>
            <p>10개의 질문에 답하면 당신의 성향과 가장 잘 어울리는 학과를 알아볼 수 있습니다.</p>
          </div>
          <button type="button" class="test-entry-button" id="openDepartmentTestEntry">나에게 맞는 학과 찾아보기 <b>→</b></button>
        </div>
      </div>`;

    admissionSection.parentNode.insertBefore(testSection, admissionSection);

    const open = document.getElementById('openDepartmentTestEntry');
    if (open && typeof window.openDepartmentTest === 'function') {
      open.addEventListener('click', window.openDepartmentTest);
    }

    const revealItems = testSection.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealItems.forEach(item => observer.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add('visible'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDepartmentTestEntry);
  } else {
    initDepartmentTestEntry();
  }
})();