(function () {
  function applyDepartmentTestCardStyle() {
    const section = document.getElementById('test');
    if (!section) return;

    const style = document.createElement('style');
    style.textContent = `
      .department-test-section .test-card {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 40px !important;
        width: 100% !important;
        max-width: 100% !important;
        min-height: 0 !important;
        padding: 38px 42px !important;
        background: var(--cream) !important;
        border: 1px solid var(--gray-200) !important;
        box-sizing: border-box !important;
        transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease !important;
      }

      .department-test-section .test-card::before {
        display: none !important;
      }

      .department-test-section .test-card:hover {
        transform: translateY(-3px) !important;
        border-color: #d5d0c6 !important;
        box-shadow: 0 14px 36px rgba(17, 28, 50, .08) !important;
      }

      .department-test-section .test-card-copy {
        flex: 1 1 auto !important;
      }

      .department-test-section .test-card-copy > span {
        display: block !important;
        color: var(--gold) !important;
        font-family: 'Playfair Display', serif !important;
        font-size: 10px !important;
        letter-spacing: .14em !important;
        margin-bottom: 10px !important;
      }

      .department-test-section .test-card-copy h3 {
        margin: 0 0 8px !important;
        color: var(--black) !important;
        font-size: 21px !important;
        font-weight: 600 !important;
        letter-spacing: -.04em !important;
      }

      .department-test-section .test-card-copy p {
        color: var(--gray-600) !important;
        font-size: 12px !important;
        line-height: 1.7 !important;
      }

      .department-test-section .test-entry-button {
        flex: 0 0 auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 12px !important;
        height: 48px !important;
        padding: 0 22px !important;
        background: var(--navy) !important;
        color: #fff !important;
        border: 1px solid var(--navy) !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        white-space: nowrap !important;
        transition: background .25s ease, border-color .25s ease, transform .25s ease !important;
      }

      .department-test-section .test-entry-button:hover {
        color: #fff !important;
        background: var(--gold) !important;
        border-color: var(--gold) !important;
        transform: translateY(-1px) !important;
      }

      .department-test-section .test-entry-button b {
        margin-left: 0 !important;
        font-size: 16px !important;
        font-weight: 400 !important;
      }

      @media(max-width: 700px) {
        .department-test-section .test-card {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 24px !important;
          padding: 30px 26px !important;
        }

        .department-test-section .test-entry-button {
          width: 100% !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyDepartmentTestCardStyle);
  } else {
    applyDepartmentTestCardStyle();
  }
})();
