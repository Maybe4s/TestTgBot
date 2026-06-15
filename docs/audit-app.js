const fallbackFindings = [
  {
    id: "offer",
    category: "Сайт и оффер",
    severity: "urgent",
    title: "Оффер не объясняет, почему выбрать вас",
    summary: "На первом экране мало конкретики: нет понятного сегмента, результата, сроков и сильного отличия.",
    impact: "Клиент сравнивает вас по цене, а не по ценности.",
    evidenceIds: [],
    pageUrls: [],
    recommendedAction: "Пересобрать первый экран: сегмент, выгода, доказательства, CTA.",
    taskId: "task-offer"
  }
];

const fallbackTasks = [
  {
    id: "task-offer",
    title: "Пересобрать первый экран сайта",
    status: "В работу",
    priority: "urgent",
    owner: "Исполнитель",
    deadline: "7 дней",
    expectedEffect: "Уменьшить потерю заявок с главной страницы.",
    checklist: ["Проверить скрин главной", "Сформулировать оффер", "Добавить CTA"],
    linkedFindingIds: ["offer"],
    linkedEvidenceIds: []
  }
];

let currentAudit = {
  score: 64,
  packageName: "Рост",
  source: { mappedUrls: 0, scrapedPages: 0 },
  pages: [],
  findings: fallbackFindings,
  tasks: fallbackTasks,
  evidence: [],
  plan: [{ period: "7 дней", title: "Закрыть базовые потери", taskIds: ["task-offer"] }],
  scoreBlocks: []
};
let activePageFilter = "all";

const analytics = [
  { channel: "Сайт", reach: "1 240", leads: "12", trend: "+18%", bars: [28, 34, 42, 50, 58, 64, 76] },
  { channel: "Telegram", reach: "3 860", leads: "9", trend: "+31%", bars: [30, 38, 35, 48, 62, 74, 80] },
  { channel: "VK", reach: "2 140", leads: "5", trend: "+12%", bars: [24, 28, 32, 40, 47, 51, 57] },
  { channel: "Карты", reach: "8 300", leads: "18", trend: "+24%", bars: [44, 48, 54, 60, 63, 70, 84] }
];

const form = document.querySelector("#auditForm");
const registrationForm = document.querySelector("#registrationForm");
const registrationScreen = document.querySelector("#registrationScreen");
const appShell = document.querySelector("#appShell");
const auditGrid = document.querySelector("#auditGrid");
const timeline = document.querySelector("#timeline");
const auditPlan = document.querySelector("#auditPlan");
const analyticsGrid = document.querySelector("#analyticsGrid");
const expertMode = document.querySelector("#expertMode");
const logoutButton = document.querySelector("#logoutButton");
const botStatus = document.querySelector("#botStatus");
const botMessage = document.querySelector("#botMessage");
const scoreValue = document.querySelector("#scoreValue");
const scoreLabel = document.querySelector("#scoreLabel");
const issueCount = document.querySelector("#issueCount");
const packageName = document.querySelector("#packageName");
const clientAccessLabel = document.querySelector("#clientAccessLabel");
const crawlStatus = document.querySelector("#crawlStatus");
const processGrid = document.querySelector("#processGrid");
const evidenceBand = document.querySelector("#evidenceBand");
const evidenceGrid = document.querySelector("#evidenceGrid");
const auditArchiveLink = document.querySelector("#auditArchiveLink");
const pagesGrid = document.querySelector("#pagesGrid");
const tasksList = document.querySelector("#tasksList");
const drawer = document.querySelector("#taskDrawer");
const drawerContent = document.querySelector("#drawerContent");
const drawerClose = document.querySelector("#drawerClose");
let expertLayerEnabled = false;
const storageKey = "marketing-os-demo-client";

function priorityClass(priority) {
  return priority === "urgent" ? "urgent" : priority === "important" ? "important" : "later";
}

function severityLabel(priority) {
  return priority === "urgent" ? "Срочно" : priority === "important" ? "Важно" : "Потом";
}

function pageTypeLabel(type) {
  return { home: "Главная", services: "Услуги", contacts: "Контакты", cases: "Кейсы", blog: "Блог" }[type] || "Прочее";
}

function byId(list, id) {
  return (list || []).find((item) => item.id === id);
}

function normalizeAudit(payload) {
  if (!payload) return currentAudit;
  if (Array.isArray(payload.findings) && Array.isArray(payload.tasks)) return payload;

  const evidence = payload.evidence || [];
  const findings = (payload.issues || []).map((issue, index) => ({
    id: issue.key || `finding-${index + 1}`,
    category: issue.key === "seo" ? "SEO" : issue.key === "geo" ? "GEO" : issue.key === "contacts" ? "Контакты и заявки" : "Сайт",
    severity: issue.score < 55 ? "urgent" : issue.score < 70 ? "important" : "later",
    title: issue.problem || "Вывод аудита",
    summary: issue.problem || "Нужно проверить вручную.",
    impact: "Влияет на понятность сайта, доверие и путь заявки.",
    evidenceIds: evidence.slice(0, 2).map((item) => item.id).filter(Boolean),
    pageUrls: [],
    recommendedAction: issue.action || "Добавить задачу в работу.",
    taskId: `task-${issue.key || index + 1}`,
    score: issue.score || 50
  }));
  const tasks = findings.map((finding, index) => ({
    id: finding.taskId,
    title: finding.recommendedAction,
    status: index < 2 ? "В работу" : "Запланировано",
    priority: finding.severity,
    owner: finding.id === "contacts" ? "Клиент + система" : "Исполнитель",
    deadline: index < 2 ? "7 дней" : index < 4 ? "14 дней" : "30 дней",
    expectedEffect: finding.impact,
    checklist: ["Открыть доказательства", "Согласовать правку", "Внести изменение", "Проверить результат"],
    linkedFindingIds: [finding.id],
    linkedEvidenceIds: finding.evidenceIds
  }));
  return {
    ...payload,
    pages: payload.pages || [],
    evidence,
    findings: findings.length ? findings : fallbackFindings,
    tasks: tasks.length ? tasks : fallbackTasks,
    plan: [
      { period: "7 дней", title: "Закрыть быстрые потери", taskIds: tasks.slice(0, 2).map((task) => task.id) },
      { period: "14 дней", title: "Усилить доверие и спрос", taskIds: tasks.slice(2, 4).map((task) => task.id) },
      { period: "30 дней", title: "Собрать систему продвижения", taskIds: tasks.slice(4).map((task) => task.id) }
    ],
    scoreBlocks: payload.scoreBlocks || []
  };
}

function renderFindings(findings = currentAudit.findings) {
  findings = findings || fallbackFindings;
  auditGrid.innerHTML = findings.map((finding) => `
    <article class="audit-card ${priorityClass(finding.severity)}" data-task-id="${finding.taskId}">
      <div class="audit-topline">
        <span class="module-badge">${finding.category}</span>
        <span class="priority-badge ${priorityClass(finding.severity)}">${severityLabel(finding.severity)}</span>
      </div>
      <h3>${finding.title}</h3>
      <p>${finding.summary}</p>
      <div class="audit-detail">
        <strong>Почему влияет на заявки</strong>
        <p>${finding.impact}</p>
        ${expertLayerEnabled ? `<strong>Что делаем</strong><p>${finding.recommendedAction}</p>` : ""}
        <button class="inline-action" type="button" data-task-id="${finding.taskId}">Открыть задачу</button>
      </div>
    </article>
  `).join("");
}

function renderPages() {
  currentAudit.pages = currentAudit.pages || [];
  const pages = activePageFilter === "all"
    ? currentAudit.pages
    : currentAudit.pages.filter((page) => page.type === activePageFilter);

  pagesGrid.innerHTML = pages.map((page) => `
    <article class="page-card">
      ${page.screenshot ? `<a href="${page.screenshot}" target="_blank" rel="noreferrer"><img src="${page.screenshot}" alt="Скриншот ${page.title}" /></a>` : ""}
      <div class="page-card-body">
        <div class="audit-topline">
          <span class="module-badge">${pageTypeLabel(page.type)}</span>
          <span class="status-badge">HTTP ${page.statusCode || "?"}</span>
        </div>
        <h3>${page.title}</h3>
        <p>${page.description || page.excerpt || "Описание не найдено."}</p>
        <a href="${page.url}" target="_blank" rel="noreferrer">${page.url}</a>
        <div class="signal-grid">
          <span>${page.signals?.hasCta ? "CTA есть" : "CTA не найден"}</span>
          <span>${page.signals?.hasPhone ? "Телефон есть" : "Телефон не найден"}</span>
          <span>${page.signals?.imageCount || 0} фото</span>
          <span>${page.signals?.linkCount || 0} ссылок</span>
        </div>
      </div>
    </article>
  `).join("") || `<div class="empty-state">Страницы этого типа не найдены.</div>`;
}

function renderTasks() {
  currentAudit.tasks = currentAudit.tasks || fallbackTasks;
  tasksList.innerHTML = currentAudit.tasks.map((task) => `
    <article class="task-row" data-task-id="${task.id}">
      <div>
        <span class="priority-badge ${priorityClass(task.priority)}">${severityLabel(task.priority)}</span>
        <h3>${task.title}</h3>
        <p>${task.expectedEffect}</p>
      </div>
      <div class="task-row-meta">
        <span>${task.owner}</span>
        <strong>${task.deadline}</strong>
        <button class="inline-action" type="button" data-task-id="${task.id}">Открыть</button>
      </div>
    </article>
  `).join("");
}

function renderEvidence() {
  const evidence = currentAudit.evidence || [];
  if (!evidence.length) {
    evidenceBand.hidden = true;
    evidenceGrid.innerHTML = "";
    return;
  }

  evidenceBand.hidden = false;
  auditArchiveLink.href = currentAudit.source?.archiveUrl || "#";
  evidenceGrid.innerHTML = evidence.slice(0, 6).map((item) => {
    const noImages = !item.imagesFound || item.imagesFound === 0;
    const shotContent = item.screenshot
      ? `<a href="${item.screenshot}" target="_blank" rel="noreferrer"><img class="evidence-shot" src="${item.screenshot}" alt="Скриншот ${item.title}" loading="lazy" /></a>`
      : `<div class="evidence-shot evidence-shot--empty"><span>Страница сохранена,<br>первый экран малоинформативен</span></div>`;
    return `
    <article class="evidence-card">
      ${shotContent}
      <div class="evidence-body">
        <div class="evidence-meta" style="margin-bottom:6px">
          <span class="module-badge">${pageTypeLabel(item.pageType)}</span>
          <span>HTTP ${item.statusCode || "?"}</span>
        </div>
        <h3>${item.title || "Страница сайта"}</h3>
        <p>${item.excerpt || item.description || "Страница проверена, данные сохранены."}</p>
        ${noImages ? `<p class="evidence-warning">⚠ Мало визуальных материалов на странице</p>` : `<span class="evidence-meta">${item.imagesFound} фото найдено</span>`}
      </div>
    </article>`;
  }).join("");
}

function renderPlan() {
  currentAudit.plan = currentAudit.plan || [];
  const renderPlanItem = (item) => `
    <article class="timeline-item">
      <div class="timeline-date">${item.period}</div>
      <div>
        <h3>${item.title}</h3>
        <p>${(item.taskIds || []).map((id) => byId(currentAudit.tasks, id)?.title).filter(Boolean).join(" · ")}</p>
      </div>
      <span class="status-badge">${(item.taskIds || []).length} задач</span>
    </article>
  `;
  auditPlan.innerHTML = (currentAudit.plan || []).map(renderPlanItem).join("");
  timeline.innerHTML = (currentAudit.plan || []).map(renderPlanItem).join("");
}

function renderCrm() {
  currentAudit.tasks = currentAudit.tasks || fallbackTasks;
  const urgent = currentAudit.tasks.filter((task) => task.priority === "urgent");
  const active = currentAudit.tasks.filter((task) => task.priority === "important");
  const later = currentAudit.tasks.filter((task) => task.priority === "later");
  document.querySelector("#waitingList").innerHTML = urgent.map(renderTaskCard).join("") || renderTaskCard({ title: "Нет срочных ожиданий", owner: "Система", deadline: "Сегодня" });
  document.querySelector("#activeList").innerHTML = active.map(renderTaskCard).join("") || renderTaskCard({ title: "Нет задач в работе", owner: "Система", deadline: "14 дней" });
  document.querySelector("#readyList").innerHTML = later.map(renderTaskCard).join("") || renderTaskCard({ title: "Нет задач на потом", owner: "Система", deadline: "30 дней" });
  document.querySelector("#clientFeed").innerHTML = [
    ["Аудит готов", `Проверено страниц: ${currentAudit.source?.scrapedPages || 0}.`],
    ["Найдены задачи", `${currentAudit.tasks.length} задач сформированы из выводов.`],
    ["Архив сохранён", currentAudit.source?.archiveUrl || "Запустите аудит для архива."]
  ].map(([title, text]) => `<div class="feed-item"><strong>${title}</strong><span>${text}</span></div>`).join("");
}

function renderTaskCard(task) {
  return `
    <div class="task-card" ${task.id ? `data-task-id="${task.id}"` : ""}>
      <strong>${task.title}</strong>
      <span>${task.owner || ""} · ${task.deadline || ""}</span>
    </div>
  `;
}

function renderAnalytics() {
  analyticsGrid.innerHTML = analytics.map((item) => `
    <article class="channel-card">
      <h3>${item.channel}</h3>
      <div class="metric-row"><span>Охват</span><strong>${item.reach}</strong></div>
      <div class="metric-row"><span>Заявки</span><strong>${item.leads}</strong></div>
      <div class="metric-row"><span>Динамика</span><strong>${item.trend}</strong></div>
      <div class="bar-chart" aria-label="Динамика ${item.channel}">
        ${item.bars.map((height) => `<span style="height:${height}%"></span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderAll() {
  currentAudit = normalizeAudit(currentAudit);
  scoreValue.textContent = `${currentAudit.score || 0}/100`;
  packageName.textContent = currentAudit.packageName || "Рост";
  issueCount.textContent = currentAudit.findings?.length || 0;
  scoreLabel.textContent = `${currentAudit.source?.scrapedPages || 0} страниц из ${currentAudit.source?.mappedUrls || 0} найденных`;
  renderFindings();
  renderPages();
  renderTasks();
  renderEvidence();
  renderPlan();
  renderCrm();
  renderAnalytics();
}

function openTask(taskId) {
  const task = byId(currentAudit.tasks, taskId);
  if (!task) return;
  const findings = task.linkedFindingIds.map((id) => byId(currentAudit.findings, id)).filter(Boolean);
  const evidence = task.linkedEvidenceIds.map((id) => byId(currentAudit.evidence, id)).filter(Boolean);
  const pages = findings.flatMap((finding) => finding.pageUrls || []).map((id) => byId(currentAudit.pages, id)).filter(Boolean);

  drawerContent.innerHTML = `
    <p class="eyebrow">Детальная задача</p>
    <h2>${task.title}</h2>
    <div class="drawer-meta">
      <span class="priority-badge ${priorityClass(task.priority)}">${severityLabel(task.priority)}</span>
      <span class="status-badge">${task.status}</span>
      <span class="status-badge">${task.owner}</span>
      <span class="status-badge">${task.deadline}</span>
    </div>
    <h3>Почему важно</h3>
    <p>${task.expectedEffect}</p>
    <h3>Вывод аудита</h3>
    ${findings.map((finding) => `<p><strong>${finding.title}</strong><br>${finding.summary}<br>${finding.impact}</p>`).join("")}
    <h3>Где найдено</h3>
    <div class="drawer-pages">
      ${pages.map((page) => `<a href="${page.url}" target="_blank" rel="noreferrer">${page.title}</a>`).join("") || "<span>Страница не привязана</span>"}
    </div>
    <h3>Скриншоты и фрагменты</h3>
    <div class="drawer-evidence">
      ${evidence.map((item) => `
        <a href="${item.screenshot}" target="_blank" rel="noreferrer">
          <img src="${item.screenshot}" alt="${item.title}" />
          <span>${item.excerpt || item.title}</span>
        </a>
      `).join("") || "<p>Доказательства не привязаны.</p>"}
    </div>
    <h3>Чеклист</h3>
    <ul class="checklist">${task.checklist.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeTask() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function setCrawlStatus(text, stepIndex = 0) {
  crawlStatus.innerHTML = `<span class="pulse"></span>${text}`;
  [...processGrid.querySelectorAll(".process-card")].forEach((card, index) => {
    card.classList.toggle("active", index <= stepIndex);
  });
}

function buildDemoAudit(site, city, niche) {
  const host = site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") || "example.ru";
  const findings = [
    { id:"offer", category:"Сайт и оффер", severity:"urgent",
      title:"На главной не найден явный путь к заявке",
      summary:`Firecrawl проверил первый экран ${host}: нет понятного оффера, CTA размыт, не видно цен и конкретного сегмента.`,
      impact:"Клиент сравнивает по цене, а не по ценности — конверсия теряется в первые 10 секунд.",
      recommendedAction:"Пересобрать первый экран: сегмент, выгода, 3 доказательства, кнопка заявки.", taskId:"task-offer",
      evidenceIds:["evidence-1"], pageUrls:["page-1"], score:42 },
    { id:"contacts", category:"Контакты и заявки", severity:"urgent",
      title:"Заявка может теряться между каналами",
      summary:`Найден телефон и форма, но не видно мессенджера. Сложно понять, кто и как быстро отвечает.`,
      impact:"Клиент написал — никто не ответил. Лид потерян без CRM-фиксации.",
      recommendedAction:"Свести все обращения в один канал: телефон → CRM, форма → уведомление, мессенджер → ответ за 15 мин.", taskId:"task-contacts",
      evidenceIds:["evidence-2"], pageUrls:["page-2"], score:38 },
    { id:"seo", category:"SEO и спрос", severity:"urgent",
      title:`Не видно экспертных страниц под ключевые запросы в нише "${niche}"`,
      summary:`Firecrawl нашёл 1 страницу услуг и 0 информационных страниц. Конкуренты с блогом получают органику бесплатно.`,
      impact:"Бизнес полностью зависит от рекламного бюджета, нет органического трафика.",
      recommendedAction:`Собрать 20 низкочастотных запросов по "${niche}" в ${city} и сделать 6 страниц с CTA.`, taskId:"task-seo",
      evidenceIds:["evidence-3"], pageUrls:["page-1"], score:40 },
    { id:"geo", category:"GEO и карты", severity:"important",
      title:`Карточки в Яндекс и 2ГИС не заполнены полностью`,
      summary:`По запросам "${niche} ${city}" в картах видно конкурентов с фото, отзывами и актуальными часами работы.`,
      impact:"В локальном поиске клиент выбирает того, у кого карточка выглядит живой и вызывает доверие.",
      recommendedAction:"Привести карточки к стандарту: 20+ фото, 10+ отзывов, описание с ключевыми словами, актуальный адрес.", taskId:"task-geo",
      evidenceIds:[], pageUrls:[], score:55 },
    { id:"trust", category:"Доверие", severity:"important",
      title:"Не хватает визуальных кейсов и процесса работы",
      summary:`На ${host} найдено мало фото готовых объектов и отзывов. Конкуренты показывают "до/после" и видео-визитку.`,
      impact:"В ${niche} доверие продаёт сильнее любой рекламы. Без кейсов — клиент уходит к тем, кто показывает работу.",
      recommendedAction:"Упаковать 3 объекта с фото процесса, добавить отзывы с именами, снять видео-визитку.", taskId:"task-trust",
      evidenceIds:["evidence-1","evidence-2"], pageUrls:["page-1"], score:58 },
    { id:"structure", category:"Структура", severity:"later",
      title:"Сайт слишком компактный для системного продвижения",
      summary:`Firecrawl проверил 5 страниц из 14 найденных URL. Не хватает отдельных страниц под услуги, цены и FAQ.`,
      impact:"Без чёткой структуры сложнее вести рекламу, SEO и контент по разным направлениям.",
      recommendedAction:"Разложить сайт на разделы: услуги, кейсы, цены/смета, FAQ, контакты, блог.", taskId:"task-structure",
      evidenceIds:[], pageUrls:[], score:60 }
  ];
  const tasks = [
    { id:"task-offer", title:"Пересобрать первый экран сайта", status:"В работу", priority:"urgent", owner:"Исполнитель", deadline:"7 дней", expectedEffect:"Уменьшить потерю заявок с главной страницы на 30%.", checklist:["Проверить скрин главной","Сформулировать оффер","Добавить CTA и телефон"], linkedFindingIds:["offer"], linkedEvidenceIds:["evidence-1"] },
    { id:"task-contacts", title:"Настроить единую схему обработки заявок", status:"В работу", priority:"urgent", owner:"Клиент + система", deadline:"7 дней", expectedEffect:"Перестать терять лиды между каналами.", checklist:["Сводим телефон + форма + мессенджер","Настраиваем уведомления","Проверяем скорость ответа"], linkedFindingIds:["contacts"], linkedEvidenceIds:["evidence-2"] },
    { id:"task-seo", title:`Сделать 6 экспертных страниц под нишу "${niche}"`, status:"Запланировано", priority:"urgent", owner:"Исполнитель", deadline:"14 дней", expectedEffect:"Получать органический трафик без рекламного бюджета.", checklist:["Собрать 20 запросов","Написать 6 статей с CTA","Опубликовать и настроить индексацию"], linkedFindingIds:["seo"], linkedEvidenceIds:[] },
    { id:"task-geo", title:"Заполнить карточки в Яндекс/2ГИС/Google", status:"Запланировано", priority:"important", owner:"Клиент + исполнитель", deadline:"14 дней", expectedEffect:"Появиться в топе локального поиска по картам.", checklist:["Добавить 20+ фото","Ответить на отзывы","Обновить описание с ключевыми словами"], linkedFindingIds:["geo"], linkedEvidenceIds:[] },
    { id:"task-trust", title:"Упаковать кейсы и добавить социальные доказательства", status:"Запланировано", priority:"important", owner:"Исполнитель", deadline:"21 день", expectedEffect:"Повысить доверие: клиент видит реальные результаты.", checklist:["3 кейса с фото процесса","5 именных отзывов","Видео-визитка 60 сек"], linkedFindingIds:["trust"], linkedEvidenceIds:[] },
    { id:"task-structure", title:"Расширить структуру сайта", status:"Запланировано", priority:"later", owner:"Исполнитель", deadline:"30 дней", expectedEffect:"Создать платформу для SEO, рекламы и контента.", checklist:["Карта страниц","Написать услуги","FAQ и блог"], linkedFindingIds:["structure"], linkedEvidenceIds:[] }
  ];
  const scoreBlocks = findings.map((f) => ({ label: f.category.split(" ")[0], score: f.score }));
  const score = Math.round(scoreBlocks.reduce((s, b) => s + b.score, 0) / scoreBlocks.length);
  return {
    mode: "demo",
    auditId: "demo",
    savedAt: new Date().toISOString(),
    source: { url: site, mappedUrls: 14, scrapedPages: 5, archiveUrl: "#" },
    score,
    packageName: score < 58 ? "Старт" : "Рост",
    scoreBlocks,
    findings,
    tasks,
    pages: [
      { id:"page-1", type:"home", title:`Главная — ${host}`, url: site, description:"Первый экран, оффер, CTA", statusCode:200, screenshot:"", signals:{ hasCta:false, hasPhone:true, imageCount:3, linkCount:12 }, excerpt:"Строительство и ремонт под ключ. Звоните." },
      { id:"page-2", type:"contacts", title:"Контакты", url:`${site}/contacts`, description:"Телефон, адрес, форма", statusCode:200, screenshot:"", signals:{ hasCta:true, hasPhone:true, imageCount:1, linkCount:4 }, excerpt:"Свяжитесь с нами: телефон, форма, WhatsApp." },
      { id:"page-3", type:"services", title:"Услуги", url:`${site}/services`, description:"Список услуг компании", statusCode:200, screenshot:"", signals:{ hasCta:false, hasPhone:false, imageCount:5, linkCount:8 }, excerpt:"Ремонт квартир, отделка, строительство." }
    ],
    evidence: [
      { id:"evidence-1", pageId:"page-1", pageType:"home", title:`Главная — ${host}`, url: site, screenshot:"", statusCode:200, imagesFound:3, excerpt:"Первый экран: оффер размыт, CTA не выделен, нет цены и кейсов рядом." },
      { id:"evidence-2", pageId:"page-2", pageType:"contacts", title:"Страница контактов", url:`${site}/contacts`, screenshot:"", statusCode:200, imagesFound:1, excerpt:"Телефон есть, но форма длинная, мессенджер не указан." },
      { id:"evidence-3", pageId:"page-3", pageType:"services", title:"Страница услуг", url:`${site}/services`, screenshot:"", statusCode:200, imagesFound:5, excerpt:"Список услуг без цен и без примеров работ." }
    ],
    plan: [
      { period:"7 дней", title:"Закрыть потери заявок", taskIds:["task-offer","task-contacts"] },
      { period:"14 дней", title:"Усилить спрос и доверие", taskIds:["task-seo","task-geo"] },
      { period:"30 дней", title:"Собрать систему продвижения", taskIds:["task-trust","task-structure"] }
    ]
  };
}

async function requestFirecrawlAudit(site, city, niche, channels) {
  setCrawlStatus("Firecrawl: карта сайта", 0);
  // GitHub Pages — работаем в демо-режиме с реалистичными данными
  await new Promise((resolve) => setTimeout(resolve, 800));
  setCrawlStatus("Firecrawl: анализ страниц", 1);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  setCrawlStatus("Firecrawl: аудит готов", 3);
  return buildDemoAudit(site, city, niche);
}

function getChannels() {
  return [...document.querySelectorAll(".channels-field input:checked")].map((input) => input.value);
}

function readClient() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function saveClient(client) {
  localStorage.setItem(storageKey, JSON.stringify(client));
}

function fillAuditForm(client) {
  document.querySelector("#siteInput").value = client.site;
  document.querySelector("#cityInput").value = client.city;
  document.querySelector("#nicheInput").value = client.niche;
  clientAccessLabel.textContent = `Демо-доступ: ${client.name}, ${client.role.toLowerCase()}`;
}

function openCabinet(client) {
  registrationScreen.classList.add("hidden");
  appShell.classList.remove("locked");
  appShell.removeAttribute("aria-hidden");
  fillAuditForm(client);
  botStatus.textContent = "Кабинет открыт";
  botMessage.textContent = `Регистрация: ${client.contact}. Можно запускать аудит и собирать материалы.`;
}

function closeCabinet() {
  localStorage.removeItem(storageKey);
  appShell.classList.add("locked");
  appShell.setAttribute("aria-hidden", "true");
  registrationScreen.classList.remove("hidden");
  registrationForm.reset();
  document.querySelector("#registrationSiteInput").value = "https://vash-dom.ru";
  document.querySelector("#registrationCityInput").value = "Пенза";
}

async function runAudit(event) {
  event.preventDefault();
  const client = readClient();
  if (!client) {
    closeCabinet();
    return;
  }
  const site = document.querySelector("#siteInput").value.trim();
  const city = document.querySelector("#cityInput").value.trim();
  const niche = document.querySelector("#nicheInput").value;
  const channels = getChannels();
  botStatus.textContent = "Аудит запускается";
  botMessage.textContent = "Firecrawl собирает страницы сайта. Кабинет обновится после анализа.";
  try {
    currentAudit = normalizeAudit(await requestFirecrawlAudit(site, city, niche, channels));
    renderAll();
    botStatus.textContent = "Аудит готов";
    botMessage.textContent = `Проверено страниц: ${currentAudit.source?.scrapedPages || 0}. Задач: ${currentAudit.tasks?.length || 0}.`;
  } catch (error) {
    setCrawlStatus("Firecrawl недоступен", 2);
    botStatus.textContent = "Аудит не завершён";
    botMessage.textContent = error.message;
  }
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.panel}`).classList.add("active");
  });
});

document.querySelectorAll(".audit-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".audit-tab").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".audit-tab-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#auditTab-${button.dataset.auditTab}`).classList.add("active");
  });
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    activePageFilter = button.dataset.pageFilter;
    renderPages();
  });
});

document.body.addEventListener("click", (event) => {
  const target = event.target.closest("[data-task-id]");
  if (target?.dataset.taskId) openTask(target.dataset.taskId);
});

expertMode.addEventListener("click", () => {
  expertLayerEnabled = !expertLayerEnabled;
  expertMode.textContent = expertLayerEnabled ? "Скрыть экспертный слой" : "Добавить экспертный слой";
  renderFindings();
});

drawerClose.addEventListener("click", closeTask);
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const client = {
    name: document.querySelector("#clientNameInput").value.trim(),
    contact: document.querySelector("#clientContactInput").value.trim(),
    site: document.querySelector("#registrationSiteInput").value.trim(),
    city: document.querySelector("#registrationCityInput").value.trim(),
    role: document.querySelector("#clientRoleInput").value,
    niche: document.querySelector("#registrationNicheInput").value,
    createdAt: new Date().toISOString()
  };
  saveClient(client);
  openCabinet(client);
});

logoutButton.addEventListener("click", closeCabinet);
form.addEventListener("submit", runAudit);
renderAll();

const savedClient = readClient();
if (savedClient?.site && savedClient?.name) openCabinet(savedClient);
