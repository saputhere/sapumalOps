/* =========================================================
   Roobi — Personal Site
   js/projects.js
   Edit this list to add, change or remove project cards.
   feature: true marks a featured project.
   Desktop layout (3 columns, 6 tracks):
     1 featured  -> spans 2 columns, next normal card in column 3
     2 featured  -> each takes half the row (1.5 columns)
     3 featured  -> one per column in a single row
   ========================================================= */

const PROJECTS = [
  {
    feature: true,
    cat: 'Developer tool · Browser-based',
    title: 'Image to Base64 Converter',
    desc: 'A lightweight HTML web application that converts images to Base64 entirely in the browser, with no uploads, no backend and no external services required.',
    tags: ['HTML5', 'JavaScript', 'Developer tools'],
    link: 'https://github.com/saputhere/base64covertor'
  },
  {
    feature: true,
    cat: 'Desktop · File transfer',
    title: 'Synvora',
    desc: 'Sends files between a Windows PC and a phone over home Wi-Fi, with no cable, cloud or account. Chunked uploads are checksum-verified, pairing uses one-time codes, and every connection runs over HTTPS.',
    tags: ['Electron', 'Node.js', 'TypeScript'],
    link: 'https://github.com/saputhere/Synvora'
  },
  {
    cat: 'API · Printing',
    title: 'Printfactory API Printing Solution',
    desc: 'An API-driven printing solution that connects business systems to print workflows.',
    tags: ['REST APIs', 'C# / .NET']
  },
  {
    cat: 'Microsoft · SharePoint',
    title: 'SharePoint Migration Tool',
    desc: 'A tool for moving content and data into SharePoint as part of a structured migration.',
    tags: ['SharePoint', 'Power Automate', 'Azure']
  },
  {
    cat: 'Enterprise · ERP',
    title: 'Cascada ERP Solution',
    desc: 'An enterprise resource planning solution built to organise core business operations in one system.',
    tags: ['C# / .NET', 'SQL Server']
  },
  {
    cat: 'Retail · Point of Sale',
    title: 'POS System',
    desc: 'A point-of-sale system for handling sales transactions and day-to-day store operations.',
    tags: ['API', 'SQL Server', 'C# / .NET']
  },
  {
    cat: 'Power Apps · Workflow',
    title: 'Shopflow System · RMW to FGW',
    desc: 'A Power Apps solution for the RMW to FGW process within the Shopflow system.',
    tags: ['Power Apps', 'Power Automate', 'SharePoint']
  },
  {
    cat: 'Power Platform · SharePoint',
    title: 'Digital Workflow Automation Suite',
    desc: 'End-to-end approval and reporting flows built on Power Apps, Power Automate and SharePoint, replacing manual paperwork across a multi-site manufacturing operation.',
    tags: ['Power Apps', 'Power Automate', 'Power BI']
  },
  {
    cat: 'C# · .NET · Security',
    title: 'SecureNet Client Portal',
    desc: 'A role-based client portal hardened against common attack vectors, with audit logging and two-factor authentication built in from the first commit.',
    tags: ['C# / .NET', 'SQL Server', 'JWT Auth']
  },
  {
    cat: 'PHP · JavaScript',
    title: 'MediaCore CMS',
    desc: 'A lightweight content management system built for a broadcast media house, handling scheduling, versioned articles and a custom media library.',
    tags: ['PHP', 'MySQL', 'Vanilla JS']
  },
  {
    cat: 'Power BI · Fabric',
    title: 'Insight Dashboard',
    desc: 'A live analytics dashboard consolidating production, quality and workforce data into a single view for plant-level decisions.',
    tags: ['Power BI', 'Fabric', 'DAX']
  }
];

/* Escapes text before it is placed into HTML */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

(function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    const link = p.link
      ? `<div class="card-actions"><a class="card-link" href="${esc(p.link)}" target="_blank" rel="noopener">View on GitHub →</a></div>`
      : '';

    return `
      <article class="card${p.feature ? ' feature' : ''} reveal">
        <h3>${esc(p.title)}</h3>
        <div class="tags">
          ${tags}
          <button class="card-read" type="button" aria-expanded="false" aria-controls="pd-${i}">
            Read <span class="card-read-icon" aria-hidden="true">+</span>
          </button>
        </div>
        <div class="card-detail" id="pd-${i}">
          <div class="card-detail-inner">
            <div class="pd-body">
              <div class="pd-cat">${esc(p.cat)}</div>
              <p>${esc(p.desc)}</p>
            </div>
          </div>
        </div>
        ${link}
      </article>`;
  }).join('');

  /* CSS uses this count to choose how wide the featured cards are */
  grid.dataset.featured = String(PROJECTS.filter((p) => p.feature).length);

  /* Only one card can be open at a time.
     Opening a card closes any other. Clicking the open card closes it. */
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.card-read');
    if (!btn) return;

    const willOpen = btn.getAttribute('aria-expanded') !== 'true';

    grid.querySelectorAll('.card-read').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      b.querySelector('.card-read-icon').textContent = '+';
      const panel = document.getElementById(b.getAttribute('aria-controls'));
      if (panel) panel.classList.remove('open');
    });

    if (willOpen) {
      btn.setAttribute('aria-expanded', 'true');
      btn.querySelector('.card-read-icon').textContent = '−';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.classList.add('open');
    }
  });
})();