// ui.js
// ملاحظة: هذا الملف اختياري حالياً—الـ rendering الأساسي يتم داخل app.js.
// أبقيناه كما أرسلته مع تعديل روابط الهاش والمسارات لتتوافق مع بنية المشروع.

/* ===== HERO ===== */
export function renderHero() {
  return `
    <section class="hero">
      <div class="hero-inner">
        <h1 class="hero-title">مرحباً، أنا أسامة 👋</h1>
        <p class="hero-sub">مطور واجهات أمامية - شغوف ببناء مشاريع برمجية احترافية</p>
        <div class="hero-cta">
          <a href="#/projects" data-route="projects" class="btn">شاهد أعمالي</a>
          <a href="#/contact" data-route="contact" class="btn ghost">تواصل</a>
        </div>
      </div>
    </section>
  `;
}

/* ===== ABOUT ===== */
export function renderAbout() {
  return `
    <section class="section">
      <h2>تعارف</h2>
      <p>
        أنا مطور ويب متخصص في بناء واجهات أمامية عصرية باستخدام HTML, CSS, JavaScript 
        ومهتم دائماً بتحسين تجربة المستخدم.
      </p>
    </section>
  `;
}

/* ===== SKILLS ===== */
export function renderSkills() {
  return `
    <section class="section">
      <h2>المهارات</h2>
      <div class="flex">
        <span class="chip">HTML</span>
        <span class="chip">CSS</span>
        <span class="chip">JavaScript</span>
        <span class="chip">React</span>
        <span class="chip">Git & GitHub</span>
      </div>
    </section>
  `;
}

/* ===== TIMELINE (خبرات أو تعليم) ===== */
export function renderTimeline() {
  return `
    <section class="section">
      <h2>الخبرات</h2>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">2023 - الآن</div>
          <h3>Front-End Developer</h3>
          <p>بناء واجهات تفاعلية باستخدام React و Tailwind.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">2021 - 2023</div>
          <h3>Web Designer</h3>
          <p>تصميم مواقع بسيطة وتحويلها إلى صفحات HTML + CSS.</p>
        </div>
      </div>
    </section>
  `;
}

/* ===== PROJECTS ===== */
export function renderProjects() {
  return `
    <section class="section">
      <div class="section-head">
        <h2>المشاريع</h2>
      </div>
      <div class="grid three cards">
        <div class="card">
          <div class="thumb">
            <img src="public/images/projects/project1.jpg" alt="مشروع 1">
          </div>
          <h3>مشروع 1</h3>
          <p>وصف مختصر عن المشروع.</p>
          <a href="#" class="link">رؤية المزيد</a>
        </div>
        <div class="card">
          <div class="thumb">
            <img src="public/images/projects/project2.jpg" alt="مشروع 2">
          </div>
          <h3>مشروع 2</h3>
          <p>وصف مختصر عن المشروع.</p>
          <a href="#" class="link">رؤية المزيد</a>
        </div>
      </div>
    </section>
  `;
}

/* ===== ARTICLES ===== */
export function renderArticles() {
  return `
    <section class="section">
      <div class="section-head">
        <h2>المقالات</h2>
      </div>
      <div class="grid two cards">
        <div class="card">
          <div class="thumb">
            <img src="public/images/articles/article1.jpg" alt="مقال 1">
          </div>
          <h3>مقال 1</h3>
          <p>مقدمة قصيرة عن المقال.</p>
          <a href="#" class="link">اقرأ المزيد</a>
        </div>
        <div class="card">
          <div class="thumb">
            <img src="public/images/articles/article2.jpg" alt="مقال 2">
          </div>
          <h3>مقال 2</h3>
          <p>مقدمة قصيرة عن المقال.</p>
          <a href="#" class="link">اقرأ المزيد</a>
        </div>
      </div>
    </section>
  `;
}

/* ===== CONTACT ===== */
export function renderContact() {
  return `
    <section class="section">
      <h2>تواصل</h2>
      <div class="contact-wrap">
        <div class="contact-card">
          <h3>معلومات التواصل</h3>
          <p>البريد: you@example.com</p>
          <p>الهاتف: +20 100 000 0000</p>
        </div>
        <div class="contact-card">
          <form class="contact-form">
            <input type="text" placeholder="الاسم" required>
            <input type="email" placeholder="البريد الإلكتروني" required>
            <textarea rows="4" placeholder="رسالتك" required></textarea>
            <button type="submit" class="btn small">إرسال</button>
          </form>
        </div>
      </div>
    </section>
  `;
}
