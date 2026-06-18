const emails = [
      {
        id: 1,
        sender: 'finance@trustedledger.com',
        senderName: 'Trusted Ledger Finance',
        subject: 'Quarterly review packet',
        preview: 'Here is the updated board summary and the signed PDF packet for review.',
        body: [
          'Hello team, attached is the signed quarterly review packet prepared for tomorrow\'s meeting.',
          'The figures match the secure dashboard and no external action is required from you today.'
        ],
        attachment: 'PDF',
        confidence: 91,
        factors: { domain: 1.4, links: 0.4, attachment: 0.8, language: 0.5, impersonation: 0.5 },
        tags: ['Signed PDF', 'Known sender', 'Internal review']
      },
      {
        id: 2,
        sender: 'courier-update@track-shift-delivery.net',
        senderName: 'Parcel Shift',
        subject: 'Delivery held: confirm address now',
        preview: 'A courier issue requires urgent confirmation to avoid shipment cancellation tonight.',
        body: [
          'We tried to complete your shipment but your address failed verification.',
          'Confirm immediately through the secure link or the parcel will be destroyed within 12 hours.'
        ],
        attachment: 'HTML link',
        confidence: 84,
        factors: { domain: 1.8, links: 2.0, attachment: 0.9, language: 1.7, impersonation: 0.9 },
        tags: ['Urgent', 'Link present', 'Courier brand']
      },
      {
        id: 3,
        sender: 'hr-payroll@org-payroll-secure.co',
        senderName: 'Payroll Operations',
        subject: 'Salary correction form',
        preview: 'Open the attached macro sheet to avoid delays in this month\'s processing.',
        body: [
          'Your payroll file contains a mismatch in tax residency data.',
          'Enable editing and macros in the attached workbook so the correction can be submitted today.'
        ],
        attachment: 'XLSM',
        confidence: 96,
        factors: { domain: 2.0, links: 1.1, attachment: 2.5, language: 1.9, impersonation: 2.0 },
        tags: ['Macro file', 'Urgent', 'Payroll mimicry']
      },
      {
        id: 4,
        sender: 'security@workspace-notify.ai',
        senderName: 'Workspace Security',
        subject: 'New sign-in from Punjab',
        preview: 'We detected a new device sign-in. Review the activity center if this was not you.',
        body: [
          'A new browser session was detected from Ludhiana, Punjab.',
          'If this was not you, visit your known security dashboard directly rather than using email links.'
        ],
        attachment: 'None',
        confidence: 79,
        factors: { domain: 0.8, links: 1.2, attachment: 0.2, language: 0.9, impersonation: 0.8 },
        tags: ['Security notice', 'Location mention', 'No attachment']
      },
      {
        id: 5,
        sender: 'accounts@vendor-clearing-mail.com',
        senderName: 'Vendor Clearing',
        subject: 'Invoice 88421 overdue — action required',
        preview: 'A payment dispute notice includes a compressed archive and alternate settlement link.',
        body: [
          'Your account is under review because invoice 88421 remains unpaid after repeated notices.',
          'Open the archive and complete the alternate transfer within four hours to prevent legal escalation.'
        ],
        attachment: 'ZIP archive',
        confidence: 94,
        factors: { domain: 2.1, links: 1.7, attachment: 2.2, language: 1.8, impersonation: 1.5 },
        tags: ['Archive', 'Payment pressure', 'Threat language']
      }
    ];
    const appState = {
      selectedId: 1,
      theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      pendingOpenId: null,
      spamIds: new Set()
    };

    const factorWeights = { domain: 1.6, links: 1.8, attachment: 1.7, language: 1.5, impersonation: 1.6 };
    const factorLabels = {
      domain: 'Domain trust',
      links: 'Link behavior',
      attachment: 'Attachment risk',
      language: 'Language pressure',
      impersonation: 'Brand mimicry'
    };

    const els = {
      mailList: document.getElementById('mail-list'),
      factorBars: document.getElementById('factor-bars'),
      detailSubject: document.getElementById('detail-subject'),
      detailFrom: document.getElementById('detail-from'),
      detailRiskChip: document.getElementById('detail-risk-chip'),
      detailRoute: document.getElementById('detail-route'),
      detailAlert: document.getElementById('detail-alert'),
      detailAttachment: document.getElementById('detail-attachment'),
      detailConfidence: document.getElementById('detail-confidence'),
      detailEyebrow: document.getElementById('detail-eyebrow'),
      mailBody: document.getElementById('mail-body'),
      currentScore: document.getElementById('current-score'),
      routeOutput: document.getElementById('route-output'),
      thresholdOutput: document.getElementById('threshold-output'),
      classOutput: document.getElementById('class-output'),
      engineStatus: document.getElementById('engine-status'),
      vectorFill: document.getElementById('vector-fill'),
      logList: document.getElementById('log-list'),
      alertModal: document.getElementById('alert-modal'),
      alertFactors: document.getElementById('alert-factors'),
      alertCopy: document.getElementById('alert-copy'),
      continueOpen: document.getElementById('continue-open'),
      closeAlert: document.getElementById('close-alert'),
      openMailBtn: document.getElementById('open-mail-btn'),
      sendSpamBtn: document.getElementById('send-spam-btn'),
      simulateBtn: document.getElementById('simulate-btn')
    };

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function computeScore(mail) {
      const weighted = Object.entries(mail.factors).reduce((sum, [key, value]) => sum + value * factorWeights[key], 0);
      return Number(clamp(weighted / 1.6, 0, 10).toFixed(1));
    }

    function classifyScore(score) {
      if (score >= 9) return { route: 'Spam', alert: 'Forced spam', label: 'Spam', chip: 'risk-spam', className: 'Critical' };
      if (score >= 7) return { route: 'Alert gate', alert: 'Warning shown', label: 'Alert', chip: 'risk-alert', className: 'Elevated' };
      return { route: 'Inbox', alert: 'No warning', label: 'Safe', chip: 'risk-safe', className: 'Stable' };
    }

    function initials(name) {
      return name.split(' ').map(x => x[0]).slice(0, 2).join('').toUpperCase();
    }

    function getMail(id) {
      return emails.find(mail => mail.id === id) || emails[0];
    }

    function routeOverride(mail, meta) {
      if (appState.spamIds.has(mail.id)) {
        return { route: 'Spam', alert: meta.alert, label: 'Spam', chip: 'risk-spam', className: 'Critical' };
      }
      return meta;
    }
    function logEvent(title, copy) {
      const item = document.createElement('div');
      item.className = 'log-item';
      item.innerHTML = `<strong>${title}</strong><span>${copy}</span>`;
      els.logList.prepend(item);
      while (els.logList.children.length > 6) els.logList.removeChild(els.logList.lastElementChild);
    }
    function renderList() {
      els.mailList.innerHTML = '';
      emails.forEach(mail => {
        const score = computeScore(mail);
        const meta = routeOverride(mail, classifyScore(score));
        const article = document.createElement('article');
        article.className = `mail-item ${mail.id === appState.selectedId ? 'active' : ''}`;
        article.tabIndex = 0;
        article.setAttribute('role', 'button');
        article.setAttribute('aria-label', `Inspect ${mail.subject}`);
        article.innerHTML = `
          <div class="mail-avatar">${initials(mail.senderName)}</div>
          <div class="mail-meta">
            <h3>${mail.subject}</h3>
            <p>${mail.sender} &mdash; ${mail.preview}</p>
            <div class="mail-tags">
              ${mail.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          </div>
          <div class="risk-chip ${meta.chip}">${meta.label} ${score.toFixed(1)}</div>
        `;
        article.addEventListener('click', () => selectMail(mail.id));
        article.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectMail(mail.id);
          }
        });
        els.mailList.appendChild(article);
      });
    }

    function renderDetail() {
      const mail = getMail(appState.selectedId);
      const score = computeScore(mail);
      const meta = routeOverride(mail, classifyScore(score));

      els.detailEyebrow.textContent = meta.route === 'Spam' ? 'Spam lane' : meta.route === 'Alert gate' ? 'Protected open' : 'Open inbox';
      els.detailSubject.textContent = mail.subject;
      els.detailFrom.textContent = `${mail.senderName} • ${mail.sender}`;
      els.detailRiskChip.className = `risk-chip ${meta.chip}`;
      els.detailRiskChip.textContent = `Risk ${score.toFixed(1)}`;
      els.detailRoute.textContent = meta.route;
      els.detailAlert.textContent = meta.alert;
      els.detailAttachment.textContent = mail.attachment;
      els.detailConfidence.textContent = `${mail.confidence}%`;
      els.currentScore.textContent = score.toFixed(1);
      els.routeOutput.textContent = meta.route === 'Alert gate' ? 'Warn before open' : meta.route === 'Spam' ? 'Route to spam' : 'Open inbox';
      els.thresholdOutput.textContent = score >= 9 ? 'Spam threshold' : score >= 7 ? 'Alert threshold' : 'Below alert';
      els.classOutput.textContent = meta.className;
      els.engineStatus.className = `risk-chip ${meta.chip}`;
      els.engineStatus.textContent = meta.label;
      els.vectorFill.style.width = `${score * 10}%`;
      els.mailBody.innerHTML = mail.body.map(p => `<p>${p}</p>`).join('');

      els.factorBars.innerHTML = '';
      Object.entries(mail.factors).forEach(([key, value]) => {
        const width = clamp(value / 2.6 * 100, 8, 100);
        const row = document.createElement('div');
        row.className = 'factor';
        row.innerHTML = `
          <small>${factorLabels[key]}</small>
          <div class="factor-track"><i style="width:${width}%"></i></div>
          <b>${value.toFixed(1)}</b>
        `;
        els.factorBars.appendChild(row);
      });
    }

