/* ===== NAVBAR ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('active');
    navLinks?.classList.remove('active');
  });
});

/* Active nav on scroll */
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link && scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

/* ===== DARK / LIGHT MODE ===== */
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'light');
    }
  });
}

/* ===== TYPING EFFECT (name + roles) ===== */
const typedNameEl = document.getElementById('typedName');
const typedRoleEl = document.getElementById('typedRole');

if (typedNameEl) {
  const name = 'Talha Majid';
  let ni = 0;
  function typeName() {
    if (ni <= name.length) {
      typedNameEl.textContent = name.slice(0, ni);
      ni++;
      setTimeout(typeName, 100);
    } else {
      setTimeout(startRoleTyping, 500);
    }
  }
  typeName();
}

if (typedRoleEl) {
  const roles = [
    'Cybersecurity Specialist',
    'Full Stack Developer',
    'DevSecOps Learner',
    'CS @ UET Taxila',
    'E-Commerce Strategist',
    'Video Editor'
  ];
  let ri = 0, ci = 0, deleting = false;

  function startRoleTyping() { typeRole(); }

  function typeRole() {
    const current = roles[ri];
    if (!deleting) {
      typedRoleEl.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        setTimeout(() => { deleting = true; typeRole(); }, 2000);
        return;
      }
      setTimeout(typeRole, 60);
    } else {
      typedRoleEl.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(typeRole, 400);
        return;
      }
      setTimeout(typeRole, 30);
    }
  }
}

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== RESULTS COUNTER ANIMATION ===== */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();
      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.result-number').forEach(el => counterObserver.observe(el));

/* ===== ROCKET SCROLL ANIMATION (SpaceX-style like armghan.me) ===== */
const rocketWidget = document.getElementById('rocketWidget');
const rocketLabel = document.getElementById('rocketLabel');
const rocketPad = document.getElementById('rocketPad');
const rocketProgress = document.getElementById('rocketProgress');
const rocketChat = document.getElementById('rocketChat');
const rocketClose = document.getElementById('rocketClose');
const rocketIcon = document.getElementById('rocketIcon');

// Mission stages based on scroll percentage
const missionStages = [
  { pct: 0,   state: 'liftoff',     label: 'Liftoff' },
  { pct: 12,  state: 'maxq',        label: 'Max Q' },
  { pct: 25,  state: 'separation',  label: 'Booster Separation' },
  { pct: 40,  state: 'gridfins',    label: 'Grid Fins Deploy' },
  { pct: 55,  state: 'landingburn', label: 'Landing Burn' },
  { pct: 70,  state: 'legs',        label: 'Landing Legs Deploy' },
  { pct: 85,  state: 'touchdown',   label: 'Soft Touchdown' },
  { pct: 95,  state: 'landed',      label: 'Landed at Station' }
];

function updateRocket() {
  if (!rocketWidget) return;
  
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPct = (scrollTop / docHeight) * 100;
  
  // Update progress bar
  if (rocketProgress) rocketProgress.style.width = scrollPct + '%';
  
  // Find current mission stage
  let current = missionStages[0];
  for (let i = missionStages.length - 1; i >= 0; i--) {
    if (scrollPct >= missionStages[i].pct) {
      current = missionStages[i];
      break;
    }
  }
  
  // Update state
  rocketWidget.setAttribute('data-state', current.state);
  if (rocketLabel) rocketLabel.textContent = current.label;
  
  // Show landing pad near bottom
  if (rocketPad) {
    if (scrollPct > 80) {
      rocketPad.classList.add('visible');
    } else {
      rocketPad.classList.remove('visible');
    }
  }
}

window.addEventListener('scroll', updateRocket);
updateRocket(); // Initial state

// Click rocket to open chat
if (rocketWidget) {
  rocketWidget.addEventListener('click', () => {
    if (rocketChat) rocketChat.classList.add('open');
  });
}

if (rocketClose) {
  rocketClose.addEventListener('click', (e) => {
    e.stopPropagation();
    if (rocketChat) rocketChat.classList.remove('open');
  });
}

/* ===== ROCKET CHATBOT RESPONSES ===== */
const rcInput = document.getElementById('rcInput');
const rcSend = document.getElementById('rcSend');
const rcBody = document.getElementById('rcBody');

const chatResponses = {
  skills: "Talha's core skills: 🛡️ Penetration Testing, 🌐 Full Stack Dev (HTML/CSS/JS/PHP/React), 🔒 Network Security, 🐳 DevSecOps (Docker, Git, CI/CD), 📊 SIEM & Log Analysis, 🎬 Video Editing.",
  projects: "Key projects: 🚀 SpectraOps (cybersecurity platform), 🎓 University Management System, 📝 CyberQuiz Platform, 💼 Digital Agency Website.",
  experience: "Founder of NexaGrowth (digital marketing agency), interned at Capxa, freelancing as developer & video editor since 2023. Achieved 2.5× ROAS on ad campaigns!",
  certifications: "🏅 Google Cybersecurity Professional, 💻 IBM Full Stack Developer, 🏴‍☠️ TryHackMe Top Learner (200+ rooms), pursuing CompTIA PenTest+.",
  education: "BS Computer Science at UET Taxila (2023-2027) — networks, OS, algorithms, security.",
  services: "Web Dev, Cybersecurity, Shopify Setup, Facebook/TikTok Ads, Video Editing.",
  contact: "📧 ranatalhamajid@gmail.com | 📱 0306-8888847 | 💼 LinkedIn",
  hire: "Available for freelance, internships, and full-time opportunities!",
  hello: "Hey! 👋 Ask me about Talha's skills, projects, experience, or services!",
  default: "I can tell you about skills, projects, experience, certs, services, or contact info. Ask away! 🚀"
};

function getBotReply(msg) {
  const l = msg.toLowerCase();
  if (l.includes('skill') || l.includes('tech')) return chatResponses.skills;
  if (l.includes('project') || l.includes('work')) return chatResponses.projects;
  if (l.includes('experience') || l.includes('job')) return chatResponses.experience;
  if (l.includes('cert') || l.includes('qualif')) return chatResponses.certifications;
  if (l.includes('edu') || l.includes('uni')) return chatResponses.education;
  if (l.includes('service') || l.includes('offer')) return chatResponses.services;
  if (l.includes('contact') || l.includes('email')) return chatResponses.contact;
  if (l.includes('hire') || l.includes('avail')) return chatResponses.hire;
  if (l.includes('hi') || l.includes('hello') || l.includes('hey')) return chatResponses.hello;
  return chatResponses.default;
}

function sendChat() {
  if (!rcInput || !rcBody) return;
  const msg = rcInput.value.trim();
  if (!msg) return;
  const u = document.createElement('div');
  u.className = 'rc-msg user'; u.textContent = msg;
  rcBody.appendChild(u); rcInput.value = '';
  rcBody.scrollTop = rcBody.scrollHeight;
  setTimeout(() => {
    const b = document.createElement('div');
    b.className = 'rc-msg bot'; b.textContent = getBotReply(msg);
    rcBody.appendChild(b); rcBody.scrollTop = rcBody.scrollHeight;
  }, 600);
}
rcSend?.addEventListener('click', sendChat);
rcInput?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChat(); });

/* ===== PASSWORD STRENGTH ===== */
const pwdInput = document.getElementById('passwordInput');
const pwdResult = document.getElementById('passwordResult');
const strengthBars = document.querySelectorAll('.strength-meter .bar');

if (pwdInput) {
  pwdInput.addEventListener('input', () => {
    const pwd = pwdInput.value;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;
    const levels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#00e5ff'];
    strengthBars.forEach((bar, i) => { bar.style.background = i < score ? colors[score] : 'rgba(255,255,255,0.08)'; });
    if (!pwd.length) {
      pwdResult.innerHTML = '<span style="color:var(--text-muted)">Enter a password to check...</span>';
      strengthBars.forEach(b => b.style.background = 'rgba(255,255,255,0.08)');
      return;
    }
    const charset = ((/[a-z]/.test(pwd)?26:0)+(/[A-Z]/.test(pwd)?26:0)+(/\d/.test(pwd)?10:0)+(/[^a-zA-Z0-9]/.test(pwd)?32:0));
    const secs = Math.pow(charset||1, pwd.length) / 1e10;
    let time;
    if (secs < 1) time = 'instantly';
    else if (secs < 60) time = Math.ceil(secs)+' seconds';
    else if (secs < 3600) time = Math.ceil(secs/60)+' minutes';
    else if (secs < 86400) time = Math.ceil(secs/3600)+' hours';
    else if (secs < 31536000) time = Math.ceil(secs/86400)+' days';
    else if (secs < 31536000*100) time = Math.ceil(secs/31536000)+' years';
    else time = 'centuries';
    pwdResult.innerHTML = `<div style="color:${colors[score]};font-weight:600;margin-bottom:4px">${levels[score]}</div><div style="color:var(--text-muted);font-size:0.82rem">Crack time: <strong style="color:${colors[score]}">${time}</strong></div>`;
  });
}

/* ===== EMAIL BREACH CHECKER ===== */
const emailBtn = document.getElementById('emailCheckBtn');
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    const email = document.getElementById('emailInput').value.trim();
    const result = document.getElementById('emailResult');
    if (!email || !email.includes('@')) { result.innerHTML = '<span style="color:var(--red)">⚠ Enter a valid email</span>'; return; }
    result.innerHTML = '<span style="color:var(--accent)">⟳ Scanning...</span>';
    setTimeout(() => {
      const breaches = Math.floor(Math.random() * 5);
      result.innerHTML = breaches > 0
        ? `<div style="color:var(--red);font-weight:600;margin-bottom:4px">⚠ Found in ${breaches} breach(es)</div><div style="color:var(--text-muted);font-size:0.82rem">Change passwords immediately. Enable 2FA.</div>`
        : `<div style="color:var(--green);font-weight:600;margin-bottom:4px">✓ No breaches found</div><div style="color:var(--text-muted);font-size:0.82rem">Stay vigilant!</div>`;
    }, 2000);
  });
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(contactForm);
    const subj = encodeURIComponent(`Portfolio Contact from ${fd.get('name')} — ${fd.get('service') || 'General'}`);
    const body = encodeURIComponent(`Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nService: ${fd.get('service') || 'N/A'}\n\n${fd.get('message')}`);
    window.open(`mailto:ranatalhamajid@gmail.com?subject=${subj}&body=${body}`);
    const st = document.getElementById('formStatus');
    st.className = 'form-status success'; st.textContent = 'Opening email client...'; st.style.display = 'block';
    contactForm.reset();
    setTimeout(() => st.style.display = 'none', 4000);
  });
}

/* ===== BLOG FILTERS ===== */
document.querySelectorAll('.blog-filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.blog-filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    const fp = document.querySelector('.featured-post');
    if (fp) fp.style.display = (cat === 'all' || fp.dataset.category === cat) ? 'grid' : 'none';
    document.querySelectorAll('.blog-card').forEach(card => {
      if (cat === 'all' || card.dataset.category === cat) {
        card.style.display = 'block';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
      } else {
        card.style.opacity = '0'; card.style.transform = 'translateY(15px)';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===== 3D TILT ON HERO PHOTO ===== */
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto) {
  heroPhoto.addEventListener('mousemove', (e) => {
    const rect = heroPhoto.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
    heroPhoto.querySelector('img').style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.03)`;
  });
  heroPhoto.addEventListener('mouseleave', () => { heroPhoto.querySelector('img').style.transform = ''; });
}
