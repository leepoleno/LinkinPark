// =============================================
//   LINKIN PARK — ФАНСАЙТ
//   script.js — логика вкладок + эффекты
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ──────────────────

  const tabs     = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Снимаем активный класс у всех
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Добавляем активный класс нажатой вкладке
      tab.classList.add('active');

      // Находим и показываем соответствующий контент
      const id = tab.getAttribute('data-tab');
      const target = document.getElementById(id);
      if (target) target.classList.add('active');

      // Плавный скролл к контенту на мобильных
      if (window.innerWidth < 768) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });


  // ── ЧАСТИЦЫ (красные огни) ────────────────

  const container = document.getElementById('particles');
  const PARTICLE_COUNT = 30;

  function createParticle() {
    const el = document.createElement('div');
    el.classList.add('particle');

    const size   = Math.random() * 3 + 1;
    const left   = Math.random() * 100;
    const dur    = Math.random() * 12 + 8;
    const delay  = Math.random() * 10;
    const opacity = Math.random() * 0.7 + 0.2;

    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: 0;
      box-shadow: 0 0 ${size * 3}px rgba(200,20,40,${opacity});
    `;

    // Случайный цвет — красный или тёмно-оранжевый
    const colors = ['#c0152a', '#e8192f', '#ff4444', '#aa0020'];
    el.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(el);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
  }


  // ── ЭФФЕКТ НАВЕДЕНИЯ НА КАРТОЧКИ ФАКТОВ ──

  document.querySelectorAll('.fact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.fact-num').style.color = 'var(--red)';
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.fact-num').style.color = 'var(--red-dark)';
    });
  });


  // ── КНОПКА ОТПРАВКИ ФОРМЫ ────────────────

  window.handleSubmit = function () {
    const name = document.getElementById('name-input').value.trim();
    const msg  = document.getElementById('msg-input').value.trim();
    const successEl = document.getElementById('form-success');

    if (!name || !msg) {
      // Анимация ошибки — тряска кнопки
      const btn = document.querySelector('.submit-btn');
      btn.style.animation = 'shake 0.4s ease';
      setTimeout(() => { btn.style.animation = ''; }, 400);
      return;
    }

    successEl.style.display = 'block';
    document.getElementById('name-input').value = '';
    document.getElementById('msg-input').value = '';

    // Скрыть сообщение через 4 секунды
    setTimeout(() => { successEl.style.display = 'none'; }, 4000);
  };


  // ── ЭФФЕКТ ПОЯВЛЕНИЯ РАЗДЕЛОВ ─────────────

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.member-card, .fact-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });


  // ── КУРСОР С КРАСНЫМ СВЕЧЕНИЕМ ────────────

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px; height: 20px;
    border-radius: 50%;
    border: 1px solid rgba(200,20,40,0.7);
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, border-color 0.2s;
    mix-blend-mode: screen;
    top: 0; left: 0;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursor);

  let cx = 0, cy = 0;
  document.addEventListener('mousemove', (e) => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });

  // Увеличиваем курсор при наведении на кликабельные элементы
  document.querySelectorAll('button, a, .gallery-item, .member-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.borderColor = 'rgba(232,25,47,1)';
      cursor.style.boxShadow = '0 0 10px rgba(200,20,40,0.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'rgba(200,20,40,0.7)';
      cursor.style.boxShadow = 'none';
    });
  });

  // Скрыть кастомный курсор на тач-устройствах
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
  }

});


// ── CSS ДЛЯ АНИМАЦИИ ТРЯСКИ ───────────────────

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);
