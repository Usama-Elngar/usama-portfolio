/* 
  موقع عربي بستايل قريب من Massively
  - كل المحتوى يأتي من ملفات JSON داخل data/
  - الصور داخل assets/images/ (ثوابت نسب عبر CSS)
  - تنقل بالـ hash بدون ريفرش
  - تعليقات عربية مبسطة لتسهيل التعديل
*/

// الحالة العامة المشتركة
const state = {
  profile: null,
  about: null,
  skills: null,
  projects: null,
  articles: null
};

// اختصارات
const $ = (sel) => document.querySelector(sel);
const app = $('#app');

// تحميل ملف JSON
async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error(`فشل تحميل الملف: ${path}`);
  return await res.json();
}

// تحميل كل البيانات المطلوبة
async function loadAll(){
  document.documentElement.setAttribute('lang','ar');
  document.documentElement.setAttribute('dir','rtl');

  // نحمل البيانات بالتوازي لسرعة أعلى
  const [profile, about, skills, projects, articles] = await Promise.all([
    loadJSON('data/profile.json'),
    loadJSON('data/about.json'),
    loadJSON('data/skills.json'),
    loadJSON('data/projects.json'),
    loadJSON('data/articles.json')
  ]);

  // حفظ داخل الحالة
  state.profile = profile;
  state.about = about;
  state.skills = skills;
  state.projects = projects;
  state.articles = articles;

  // رندر عناصر ثابتة (الهيدر/الفوتر) ثم الصفحة
  renderHeaderFooter();
  renderRoute();
}

// رندر عناصر الهيدر/الفوتر (الاسم/الدور/روابط/سنة)
function renderHeaderFooter(){
  $('#profile-name').textContent = state.profile.name || 'الاسم';
  $('#profile-role').textContent = state.profile.role || '';
  $('#profile-name-foot').textContent = state.profile.name || 'الاسم';
  $('#year').textContent = new Date().getFullYear();

  // روابط التواصل في الفوتر
  const social = $('#social-links');
  social.innerHTML = '';
  const links = state.profile.links || {};
  Object.entries(links).forEach(([k, v])=>{
    if(!v) return;
    const a = document.createElement('a');
    a.href = v; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = k.charAt(0).toUpperCase() + k.slice(1);
    social.appendChild(a);
  });
}

// مساعدة: شارات (بادجات)
const badges = (arr=[]) => (arr||[]).map(x=>`<span class="badge">${x}</span>`).join('');

// ====== صفحات ======

// الرئيسية: Hero + ما أقدمه + أحدث المشاريع + أحدث المقالات + CTA
function renderHome(){
  const p = state.profile;
  const latestProjects = (state.projects || []).slice(0,3);
  const latestArticles = (state.articles || []).slice(0,3);

  app.innerHTML = `
    <!-- HERO بخلفية من assets/images/hero.jpg -->
    <section class="section hero">
      <div class="hero-inner">
        <h2 class="hero-title">${p.tagline || 'أصنع تجارب رقمية تجمع بين البرمجة والتصميم'}</h2>
        <p class="hero-sub">${p.short_about || ''}</p>
        <div class="hero-cta">
          <a href="#/projects" class="btn">شاهد أعمالي</a>
          <a href="#/contact" class="btn ghost">تواصل معي</a>
        </div>
      </div>
    </section>

    <!-- ما أقدمه -->
    <section class="section">
      <h2>ما الذي أقدمه</h2>
      <div class="grid three cards">
        ${ (p.offerings||[
            {title:'تطوير واجهات ويب',desc:'تجربة استخدام سريعة ومتجاوبة باستخدام أحدث الممارسات.'},
            {title:'تصميم جرافيك',desc:'هوية بصرية متناسقة تساند هدفك التجاري.'},
            {title:'تسويق رقمي',desc:'محتوى وإعلانات مدروسة تزيد الوعي والتحويلات.'}
          ]).map(item=>`
            <div class="card">
              <h3>${item.title}</h3>
              <p>${item.desc||''}</p>
            </div>
          `).join('')}
      </div>
    </section>

    <!-- أحدث المشاريع -->
    <section class="section">
      <div class="section-head">
        <h2>أحدث المشاريع</h2>
        <a class="link" href="#/projects">عرض الكل</a>
      </div>
      <div class="grid three cards">
        ${ latestProjects.map(projectCard).join('') }
      </div>
    </section>

    <!-- مقتطفات من المقالات -->
    <section class="section">
      <div class="section-head">
        <h2>مقتطفات من المقالات</h2>
        <a class="link" href="#/articles">اقرأ المزيد</a>
      </div>
      <div class="grid three cards">
        ${ latestArticles.map(articleCard).join('') }
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="card" style="text-align:center">
        <h3>جاهز للتعاون؟</h3>
        <p>يسعدني تنفيذ أفكارك وتحويلها إلى منتج رقمي أنيق.</p>
        <a href="#/contact" class="btn">ابدأ الآن</a>
      </div>
    </section>
  `;
}

// من أنا: صورة شخصية + أقسام + تايملاين مختصر
function renderAbout(){
  const a = state.about || { sections: [], timeline: [] };
  const profileImg = 'assets/images/profile.jpg'; // ضع صورتك هنا

  app.innerHTML = `
    <section class="section">
      <div class="grid two">
        <!-- كارت الصورة/النبذة السريعة -->
        <div class="card">
          <div class="thumb" style="aspect-ratio: 1 / 1">
            <img src="${profileImg}" alt="صورة شخصية" />
          </div>
          <h3 style="margin:10px 0 6px">نبذة سريعة</h3>
          <p>${state.profile.short_about || ''}</p>
        </div>

        <!-- كارت الأقسام النصية -->
        <div class="card">
          <h2>من أنا</h2>
          ${ (a.sections||[]).map(s=>`
            <div class="block">
              <h3>${s.title}</h3>
              <p>${s.content}</p>
            </div>
          `).join('') }
        </div>
      </div>
    </section>

    ${ (a.timeline && a.timeline.length) ? `
      <section class="section">
        <h2>محطات في الرحلة</h2>
        <div class="card">
          <div class="timeline">
            ${ a.timeline.map(t=>`
              <div class="timeline-item">
                <div class="timeline-date">${t.period||''}</div>
                <div class="timeline-content">
                  <h4>${t.title||''}</h4>
                  <p>${t.desc||''}</p>
                </div>
              </div>
            `).join('') }
          </div>
        </div>
      </section>
    `:''}
  `;
}

// المهارات: تقنية + شخصية + أدوات
function renderSkills(){
  const s = state.skills || { technical: [], soft: [], tools: [] };

  app.innerHTML = `
    <section class="section">
      <h2>المهارات التقنية</h2>
      <div class="card">
        ${ (s.technical||[]).map(item=>`
          <div class="skill" style="margin-bottom:14px">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px">
              <span>${item.name}</span>
              ${ item.level!=null ? `<span>${item.level}%</span>`:''}
            </div>
            ${ item.level!=null ? `
            <div class="bar" style="background:#1b2438;height:8px;border-radius:6px;overflow:hidden">
              <div class="bar-fill" style="height:100%;width:${item.level}%;background:var(--primary)"></div>
            </div>`:''}
            ${ item.tags ? `<div class="mt-6">${badges(item.tags)}</div>`:''}
          </div>
        `).join('') }
      </div>
    </section>

    ${ (s.soft && s.soft.length) ? `
    <section class="section">
      <h2>مهارات شخصية</h2>
      <div class="card">
        <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px">
          ${ s.soft.map(x=>`<span class="chip">${x}</span>`).join('') }
        </div>
      </div>
    </section>`:''}

    ${ (s.tools && s.tools.length) ? `
    <section class="section">
      <h2>أدوات أستخدمها</h2>
      <div class="card">
        <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px">
          ${ s.tools.map(x=>`<span class="chip">${x}</span>`).join('') }
        </div>
      </div>
    </section>`:''}
  `;
}

// المشاريع: شبكة كروت + فلاتر بالوسوم
function renderProjects(){
  const projects = state.projects || [];
  const allTags = Array.from(new Set(projects.flatMap(p=>p.tech||[])));

  app.innerHTML = `
    <section class="section">
      <div class="section-head">
        <h2>المشاريع</h2>
        ${ allTags.length ? `
          <div class="filters">
            <button class="btn small" data-filter="*">الكل</button>
            ${ allTags.map(t=>`<button class="btn ghost small" data-filter="${t}">${t}</button>`).join('') }
          </div>`:''}
      </div>
      <div id="projects-grid" class="grid three cards">
        ${ projects.map(projectCard).join('') }
      </div>
    </section>
  `;

  // تفعيل الفلاتر
  document.querySelectorAll('.filters .btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filters .btn').forEach(b=>b.classList.add('ghost'));
      btn.classList.remove('ghost');
      const f = btn.dataset.filter;
      const grid = $('#projects-grid');
      grid.querySelectorAll('.card').forEach(card=>{
        if(f==='*'){ card.style.display=''; return; }
        const tags = (card.dataset.tags||'').split(',');
        card.style.display = tags.includes(f) ? '' : 'none';
      });
    });
  });
}

// المقالات
function renderArticles(){
  const arts = state.articles || [];
  app.innerHTML = `
    <section class="section">
      <h2>المقالات</h2>
      <div class="grid three cards">
        ${ arts.map(articleCard).join('') }
      </div>
    </section>
  `;
}

// تواصل: معلومات + نموذج Styled (بدون Back-end: mailto)
function renderContact(){
  const p = state.profile;

  app.innerHTML = `
    <section class="section">
      <h2>تواصل معي</h2>
      <div class="contact-wrap">
        <!-- نموذج -->
        <div class="contact-card">
          <form class="contact-form" action="mailto:${p.email}" method="post" enctype="text/plain">
            <div class="grid two">
              <div>
                <label>الاسم</label>
                <input type="text" name="name" placeholder="اسمك الكامل" required />
              </div>
              <div>
                <label>البريد الإلكتروني</label>
                <input type="email" name="email" placeholder="name@example.com" required />
              </div>
            </div>
            <div class="mt-10">
              <label>رسالتك</label>
              <textarea name="message" rows="6" placeholder="اكتب رسالتك هنا..." required></textarea>
            </div>
            <div class="mt-10">
              <button class="btn" type="submit">أرسل الآن</button>
              <a class="btn ghost" href="https://wa.me/${(p.phone||'').replace(/^0/,'2')}" target="_blank" rel="noopener">واتساب</a>
            </div>
          </form>
        </div>

        <!-- بيانات تواصل -->
        <div class="contact-card">
          <h3>بيانات التواصل</h3>
          <p><strong>البريد:</strong> <a href="mailto:${p.email}">${p.email}</a></p>
          ${ p.phone ? `<p><strong>الهاتف:</strong> <a href="tel:${p.phone}">${p.phone}</a></p>`:''}
          <p><strong>الموقع:</strong> ${p.location||''}</p>
          <div class="mt-10">
            <h4>حساباتي</h4>
            <div class="flex">
              ${ Object.entries(p.links||{}).map(([k,v])=> v ? `<a class="btn small ghost" href="${v}" target="_blank" rel="noopener">${k}</a>`:'').join('') }
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// بطاقات مشاريع/مقالات (قابلة لإعادة الاستخدام)
function projectCard(p){
  const tags = (p.tech||[]);
  return `
    <div class="card" data-tags="${tags.join(',')}">
      ${ p.image ? `<div class="thumb"><img src="${p.image}" alt="${p.title}"/></div>`:''}
      <h3>${p.title}</h3>
      <p>${p.summary||''}</p>
      <div class="mt-8">${badges(tags)}</div>
      <div class="mt-10 flex">
        ${ p.demo ? `<a class="btn small" href="${p.demo}" target="_blank" rel="noopener">عرض</a>`:''}
        ${ p.repo ? `<a class="btn ghost small" href="${p.repo}" target="_blank" rel="noopener">الكود</a>`:''}
      </div>
    </div>
  `;
}
function articleCard(a){
  return `
    <div class="card">
      ${ a.image ? `<div class="thumb"><img src="${a.image}" alt="${a.title}"/></div>`:''}
      <h3>${a.title}</h3>
      <p>${a.excerpt||''}</p>
      ${ a.url ? `<a class="btn small" href="${a.url}" target="_blank" rel="noopener">اقرأ المقال</a>`:''}
    </div>
  `;
}

/* ====== الراوتر البسيط ====== */
function currentRoute(){
  const hash = (location.hash||'#/').replace('#','').toLowerCase();
  if(hash.startsWith('/about')) return 'about';
  if(hash.startsWith('/skills')) return 'skills';
  if(hash.startsWith('/projects')) return 'projects';
  if(hash.startsWith('/articles')) return 'articles';
  if(hash.startsWith('/contact')) return 'contact';
  return 'home';
}
function setActiveNav(){
  document.querySelectorAll('.site-nav .nav-link').forEach(a=>{
    const r = a.getAttribute('data-route');
    a.classList.toggle('active', r === currentRoute());
  });
}
function renderRoute(){
  setActiveNav();
  const r = currentRoute();
  if(r==='about') return renderAbout();
  if(r==='skills') return renderSkills();
  if(r==='projects') return renderProjects();
  if(r==='articles') return renderArticles();
  if(r==='contact') return renderContact();
  return renderHome();
}

/* ====== أحداث عامة ====== */
window.addEventListener('hashchange', renderRoute);

// بدء التشغيل
loadAll().catch(err=>{
  app.innerHTML = `<div class="section"><h2>حدث خطأ</h2><p>${err.message}</p></div>`;
  console.error(err);
});
