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
      /* Common courses: keep the curriculum in a proper table */
      .common-curriculum { margin-bottom: 70px; }
      .common-heading { margin-bottom: 24px; }
      .common-heading > span { display: block; color: var(--gold-light); font-family: 'Playfair Display', serif; font-size: 10px; letter-spacing: .14em; margin-bottom: 8px; }
      .common-heading h3 { color: #fff; font-size: 24px; letter-spacing: -.035em; margin-bottom: 6px; }
      .common-heading p { color: #8f99aa; font-size: 12px; }
      .common-course-table-wrap { overflow-x: auto; border-top: 1px solid #34415a; border-bottom: 1px solid #34415a; }
      .common-course-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
      .common-course-table th { padding: 15px 18px; text-align: left; color: #8f99aa; font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 400; letter-spacing: .1em; border-bottom: 1px solid #34415a; }
      .common-course-table th:first-child { width: 70px; }
      .common-course-table th:nth-child(2) { width: 29%; }
      .common-course-table td { padding: 19px 18px; color: #c9ced7; font-size: 12px; line-height: 1.7; border-bottom: 1px solid #28354d; vertical-align: middle; }
      .common-course-table tbody tr:last-child td { border-bottom: 0; }
      .common-course-table td:first-child { color: var(--gold-light); font-family: 'Playfair Display', serif; font-size: 11px; }
      .common-course-table td:nth-child(2) { color: #fff; font-size: 13px; font-weight: 500; }
      .common-course-table tbody tr { transition: background .2s ease; }
      .common-course-table tbody tr:hover { background: rgba(255,255,255,.025); }

      .department-test-section .section-subtitle { color: #aeb7c5; }
      .department-test-section .test-card { max-width: 900px; background: var(--navy2); border: 1px solid #34415a; padding: 42px; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
      .department-test-section .test-card-copy > span { color: var(--gold-light); font-family: 'Playfair Display', serif; font-size: 10px; letter-spacing: .14em; }
      .department-test-section .test-card-copy h3 { color: #fff; font-size: 25px; letter-spacing: -.035em; margin: 10px 0 7px; }
      .department-test-section .test-card-copy p { color: #aeb7c5; font-size: 13px; }
      .department-test-section .test-entry-button { flex: 0 0 auto; height: 52px; padding: 0 26px; background: transparent; color: #fff; border: 1px solid #68758b; font-size: 13px; cursor: pointer; transition: .25s; }
      .department-test-section .test-entry-button:hover { background: #253653; border-color: #253653; transform: translateY(-2px); }
      .department-test-section .test-entry-button b { margin-left: 12px; font-size: 17px; font-weight: 400; }

      .result-actions { flex-wrap: wrap; }
      .result-actions button { min-width: 150px; }
      .result-actions .share-result { position: relative; }
      .result-actions .share-result.copied { border-color: #7f8c72; color: #58634d; }

      @media(max-width: 850px) {
        .department-test-section .test-card { align-items: flex-start; flex-direction: column; }
        .department-test-section .test-entry-button { width: 100%; }
        .common-course-table { min-width: 620px; }
      }
      @media(max-width: 600px) {
        .department-test-section .test-card { padding: 30px 25px; }
        .department-test-section .test-card-copy h3 { font-size: 21px; }
        .common-curriculum { margin-bottom: 50px; }
      }
    `;
    document.head.appendChild(style);

    /* Convert the common-course cards into a real academic-style table. */
    const commonGrid = document.querySelector('.common-curriculum .common-grid');
    if (commonGrid && typeof commonCourses !== 'undefined') {
      commonGrid.outerHTML = `
        <div class="common-course-table-wrap">
          <table class="common-course-table">
            <thead><tr><th>NO.</th><th>과목명</th><th>교육내용</th></tr></thead>
            <tbody>
              ${commonCourses.map((course, index) => `
                <tr>
                  <td>${String(index + 1).padStart(2, '0')}</td>
                  <td>${course.title}</td>
                  <td>${course.desc}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>`;
    }

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

    /* Add copy-link sharing to the department result screen. */
    document.addEventListener('click', async event => {
      const button = event.target.closest('#shareDepartmentResult');
      if (!button) return;

      const url = window.location.href;
      const original = button.textContent;
      let copied = false;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          copied = true;
        }
      } catch (error) {
        copied = false;
      }

      if (!copied) {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
        textarea.remove();
      }

      button.textContent = copied ? '링크 복사됨' : '링크를 복사해 주세요';
      button.classList.toggle('copied', copied);
      setTimeout(() => {
        button.textContent = original;
        button.classList.remove('copied');
      }, 1800);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDepartmentTestEntry);
  } else {
    initDepartmentTestEntry();
  }
})();