let completed = new Set(JSON.parse(localStorage.getItem('ml-hw-done') || '[]'));
let currentPhase = 0;
let openDay = null;

const BADGE_LABELS = {
  read: { label: 'reading', cls: 'badge-read' },
  code: { label: 'coding', cls: 'badge-code' },
  assign: { label: 'assignment', cls: 'badge-assign' },
  hw: { label: 'arch focus', cls: 'badge-hw' }
};

function saveProgress() {
  try {
    localStorage.setItem('ml-hw-done', JSON.stringify([...completed]));
  } catch (e) {}
}

function resetProgress() {
  if (!confirm('Reset all progress? This cannot be undone.')) return;
  completed = new Set();
  saveProgress();
  updateStats();
  renderPhaseTabs();
  renderDays();
}

function updateStats() {
  const done = completed.size;
  const pct = Math.round(done / 50 * 100);
  document.getElementById('done-count').textContent = done;
  document.getElementById('pct-count').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';

  const sorted = [...completed].sort((a, b) => a - b);
  let streak = 0;
  if (sorted.length > 0) {
    streak = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      if (sorted[i] - sorted[i - 1] === 1) streak++;
      else break;
    }
  }
  document.getElementById('streak-count').textContent = streak;
}

function renderPhaseTabs() {
  const container = document.getElementById('phase-tabs');
  container.innerHTML = '';
  PHASES.forEach((p, i) => {
    const phaseDays = DAYS.filter(d => d.phase === i);
    const phaseDone = phaseDays.filter(d => completed.has(d.d)).length;
    const tab = document.createElement('button');
    tab.className = 'phase-tab' + (i === currentPhase ? ' active' : '');
    tab.innerHTML = `
      <span class="dot" style="background:${p.color}"></span>
      <span>${p.label}</span>
      <span class="count">${phaseDone}/${phaseDays.length}</span>
    `;
    tab.onclick = () => {
      currentPhase = i;
      openDay = null;
      renderPhaseTabs();
      renderDays();
    };
    container.appendChild(tab);
  });
}

function renderDays() {
  const phase = PHASES[currentPhase];

  document.getElementById('phase-header').innerHTML = `
    <div class="phase-header-card">
      <div class="phase-dot" style="background:${phase.color}"></div>
      <div class="phase-header-info">
        <h3>${phase.title}</h3>
        <p>${phase.subtitle}</p>
      </div>
    </div>
  `;

  const list = document.getElementById('days-list');
  list.innerHTML = '';

  DAYS.filter(d => d.phase === currentPhase).forEach(day => {
    const isDone = completed.has(day.d);
    const isOpen = openDay === day.d;

    const badgesHtml = day.badges.map(b => {
      const info = BADGE_LABELS[b];
      return `<span class="day-badge ${info.cls}">${info.label}</span>`;
    }).join('');

    const readHtml = day.read && day.read.length ? `
      <div class="section-label"><i class="ti ti-book-2"></i> Reading</div>
      <ul class="task-list">
        ${day.read.map(r => `<li class="task-item">${r}</li>`).join('')}
      </ul>
    ` : '';

    const codeHtml = day.code && day.code.length ? `
      <div class="section-label"><i class="ti ti-code"></i> Coding tasks</div>
      <ul class="task-list">
        ${day.code.map(c => `<li class="task-item">${c}</li>`).join('')}
      </ul>
    ` : '';

    const hwHtml = day.hw ? `
      <div class="hw-note">
        <strong>Hardware connection:</strong> ${day.hw}
      </div>
    ` : '';

    const mentorHtml = day.mentor ? `
      <div class="section-label"><i class="ti ti-message-circle"></i> Mentor check-in</div>
      <div class="mentor-q">"${day.mentor}"</div>
    ` : '';

    const card = document.createElement('div');
    card.className = 'day-card' + (isDone ? ' done' : '') + (isOpen ? ' open' : '');
    card.innerHTML = `
      <div class="day-head" data-day="${day.d}">
        <div class="day-check ${isDone ? 'checked' : ''}" data-check="${day.d}" role="checkbox" aria-checked="${isDone}">
          ${isDone ? '<i class="ti ti-check"></i>' : ''}
        </div>
        <span class="day-num">Day ${String(day.d).padStart(2, '0')}</span>
        <span class="day-title">${day.title}</span>
        <div class="day-badges">${badgesHtml}</div>
        <i class="ti ti-chevron-down chev"></i>
      </div>
      <div class="day-body">
        ${readHtml}
        ${codeHtml}
        ${hwHtml}
        ${mentorHtml}
        <div class="day-footer">
          <button class="btn ${isDone ? 'primary' : ''}" data-toggle="${day.d}">
            ${isDone ? '<i class="ti ti-check"></i> Completed' : 'Mark complete'}
          </button>
          <a href="https://github.com" target="_blank" class="btn">
            <i class="ti ti-brand-github"></i>
            Push today's commit
          </a>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('.day-head').forEach(head => {
    head.addEventListener('click', e => {
      if (e.target.closest('.day-check')) return;
      const d = parseInt(head.dataset.day);
      openDay = openDay === d ? null : d;
      renderDays();
    });
  });

  list.querySelectorAll('[data-check]').forEach(check => {
    check.addEventListener('click', e => {
      e.stopPropagation();
      const d = parseInt(check.dataset.check);
      toggleDone(d);
    });
  });

  list.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', e => {
      const d = parseInt(btn.dataset.toggle);
      toggleDone(d);
    });
  });
}

function toggleDone(d) {
  if (completed.has(d)) completed.delete(d);
  else completed.add(d);
  saveProgress();
  updateStats();
  renderPhaseTabs();
  renderDays();
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

renderPhaseTabs();
renderDays();
updateStats();
