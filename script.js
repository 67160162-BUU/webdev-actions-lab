const translations = {
  th: {
    brand: 'Gatunyu.dev',
    navAbout: 'เกี่ยวกับฉัน',
    navSkills: 'ทักษะ',
    navContact: 'ติดต่อ',
    badge: 'GitHub Actions & Pages Lab',
    heroTitle: 'กตัญญู สงวนสัจวาจา',
    heroSubtitle: 'รหัสนิสิต: 67160162 | คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา (BUU)',
    statusReady: 'พร้อมสำหรับการ Deploy อัตโนมัติด้วย GitHub Actions 🚀',
    statusHello: 'สวัสดีจาก GitHub Pages! ยินดีที่ได้รู้จักครับ 👋✨',
    helloBtn: 'ทักทาย (Say Hello)',
    aboutTitle: 'About Me (เกี่ยวกับฉัน)',
    aboutDesc1:
      'สวัสดีครับ! ผมชื่อ <strong>กตัญญู สงวนสัจวาจา</strong> นิสิตชั้นปีที่ 2 คณะวิทยาการสารสนเทศ มหาวิทยาลัยบูรพา (รหัสนิสิต 67160162) ผู้มีความหลงใหลในการพัฒนาเว็บไซต์และการทำระบบอัตโนมัติ (DevOps & CI/CD)',
    aboutDesc2:
      'ผมชอบเรียนรู้เทคโนโลยีใหม่ๆ ตั้งแต่การออกแบบ UI ที่สวยงามใช้งานง่าย ไปจนถึงการตั้งค่า GitHub Actions เพื่อตรวจสอบโค้ดและ Deploy เว็บไซต์ขึ้นสู่ GitHub Pages อย่างเป็นระบบ',
    labelEdu: 'การศึกษา',
    valEdu: 'มหาวิทยาลัยบูรพา (BUU)',
    labelFocus: 'ความสนใจ',
    valFocus: 'Full-Stack Web & Cloud Automation',
    labelGoal: 'เป้าหมาย',
    valGoal: 'สร้างซอฟต์แวร์ที่มีคุณภาพและส่งมอบได้อย่างรวดเร็ว',
    skillsTitle: 'Skills (ทักษะความสามารถ)',
    skillsSubtitle: 'ทักษะและเครื่องมือที่ใช้ในการพัฒนาโปรเจกต์และการเรียนรู้ในห้องปฏิบัติการ:',
    skillCatFrontend: 'Frontend Development',
    skillCatBackend: 'Backend Development',
    skillCatDevops: 'DevOps & Automation',
    skillCatTools: 'Tools & Workflow',
    contactTitle: 'Contact (ช่องทางการติดต่อ)',
    contactSubtitle:
      'สามารถติดต่อพูดคุย แลกเปลี่ยนความรู้ หรือติดตามผลงานของผมได้ตามช่องทางด้านล่างนี้ครับ (สามารถแก้ไขข้อมูลเพิ่มเติมได้):',
    contactEmailLabel: 'อีเมลมหาวิทยาลัย',
    contactGithubLabel: 'GitHub Profile',
    contactLocationLabel: 'สถานที่',
    contactLocationVal: 'บางแสน, ชลบุรี, ประเทศไทย',
    footerText: '© 2026 กตัญญู สงวนสัจวาจา (67160162) — สร้างและอัปเดตอัตโนมัติด้วย GitHub Actions',
  },
  en: {
    brand: 'Gatunyu.dev',
    navAbout: 'About Me',
    navSkills: 'Skills',
    navContact: 'Contact',
    badge: 'GitHub Actions & Pages Lab',
    heroTitle: 'Gatunyu Sanguansatjawaja',
    heroSubtitle: 'Student ID: 67160162 | Faculty of Informatics, Burapha University (BUU)',
    statusReady: 'Ready for automated deployment via GitHub Actions 🚀',
    statusHello: 'Hello from GitHub Pages! Nice to meet you 👋✨',
    helloBtn: 'Say Hello',
    aboutTitle: 'About Me',
    aboutDesc1:
      'Hello! I am <strong>Gatunyu Sanguansatjawaja</strong>, a 2nd-year student at the Faculty of Informatics, Burapha University (ID: 67160162), passionate about modern Web Development and DevOps / CI/CD automation.',
    aboutDesc2:
      'I enjoy building clean, responsive user interfaces and configuring automated GitHub Actions workflows to verify and deploy applications seamlessly to GitHub Pages.',
    labelEdu: 'Education',
    valEdu: 'Burapha University (BUU)',
    labelFocus: 'Focus Areas',
    valFocus: 'Full-Stack Web & Cloud Automation',
    labelGoal: 'Goal',
    valGoal: 'Build reliable software with fast, automated delivery',
    skillsTitle: 'Skills & Technologies',
    skillsSubtitle: 'Core technologies and tools I use in my coursework and development labs:',
    skillCatFrontend: 'Frontend Development',
    skillCatBackend: 'Backend Development',
    skillCatDevops: 'DevOps & Automation',
    skillCatTools: 'Tools & Workflow',
    contactTitle: 'Contact Me',
    contactSubtitle:
      'Feel free to reach out, collaborate, or check out my repositories through the channels below:',
    contactEmailLabel: 'University Email',
    contactGithubLabel: 'GitHub Profile',
    contactLocationLabel: 'Location',
    contactLocationVal: 'Bangsaen, Chonburi, Thailand',
    footerText: '© 2026 Gatunyu Sanguansatjawaja (67160162) — Automated with GitHub Actions',
  },
};

let currentLang = localStorage.getItem('lang') || 'th';
let currentTheme = localStorage.getItem('theme') || 'light';
let greeted = false;

const langToggleBtn = document.querySelector('#langToggle');
const themeToggleBtn = document.querySelector('#themeToggle');
const helloBtn = document.querySelector('#helloBtn');
const statusEl = document.querySelector('#status');

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key === 'statusReady' && greeted) {
      el.innerHTML = translations[lang].statusHello;
    } else if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update button label to show the language user can switch to
  langToggleBtn.textContent = lang === 'th' ? 'EN' : 'TH';
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  themeToggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Event Listeners
langToggleBtn.addEventListener('click', () => {
  const nextLang = currentLang === 'th' ? 'en' : 'th';
  applyLanguage(nextLang);
});

themeToggleBtn.addEventListener('click', () => {
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
});

helloBtn.addEventListener('click', () => {
  greeted = !greeted;
  statusEl.innerHTML = greeted
    ? translations[currentLang].statusHello
    : translations[currentLang].statusReady;
});

// Initialize on page load
applyTheme(currentTheme);
applyLanguage(currentLang);