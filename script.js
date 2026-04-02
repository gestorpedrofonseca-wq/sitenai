/* ============================================
   INITIALIZE ICONS
   ============================================ */
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}

/* ============================================
   AUTO-SCROLL TO CTA
   ============================================ */
window.addEventListener('DOMContentLoaded', () => {
  const cta = document.getElementById('cta-whatsapp');
  if (cta) {
    setTimeout(() => {
      cta.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500); // Small delay to let the page load/particles start
  }
});

/* ============================================
   DYNAMIC LIVE TOAST NOTIFICATIONS & URGENCY SYNC
   ============================================ */
(function setupSystem() {
  const container = document.getElementById('toast-container');
  const banner = document.querySelector('.urgency-banner p');
  const participantCountEl = document.getElementById('participant-count');
  if (!container || !banner) return;

  const names = ["Juliana", "Rodrigo", "Amanda", "Marcelo", "Larissa", "Gustavo", "Patrícia", "Fernando", "Camila", "Bruno"];
  const cities = ["SP", "RJ", "MG", "PR", "SC", "RS", "BA", "CE", "DF", "GO"];
  const products = ["Bolsa Premium", "Fone Bluetooth", "Kit Maquiagem", "Relógio Luxo", "Massageador Facial", "Umidificador"];

  let vagas = 15;
  let participantCount = 2212;

  function updateBanner() {
    banner.innerHTML = `Últimas <strong>${vagas} vagas</strong> disponíveis`;
  }

  function updateParticipantCount() {
    if (participantCountEl) {
      participantCountEl.textContent = participantCount.toLocaleString('pt-BR');
    }
  }

  function removeOldestToast() {
    const toasts = container.querySelectorAll('div[data-toast]');
    if (toasts.length >= 2) {
      const oldest = toasts[0];
      oldest.classList.add('opacity-0', 'translate-x-[-20px]');
      setTimeout(() => oldest.remove(), 500);
    }
  }

  function createToast() {
    // Limit to 2
    removeOldestToast();

    const isJoin = Math.random() > 0.4;
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    // Sync UI on Join
    if (isJoin) {
      if (vagas > 1) {
        vagas--;
        updateBanner();
      }
      participantCount++;
      updateParticipantCount();
    }
    
    const toast = document.createElement('div');
    toast.setAttribute('data-toast', 'true');
    toast.className = "relative flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-2xl p-3 animate-slide-in pointer-events-auto w-[280px] sm:w-[320px] transition-all duration-300 overflow-hidden cursor-grab active:cursor-grabbing select-none hover:border-orange-200 touch-none";
    
    // DRAG & SWIPE LOGIC (same but with manual dismissal removal)
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let dismissed = false;

    toast.addEventListener('pointerdown', (e) => {
      startX = e.clientX;
      isDragging = true;
      toast.style.transition = 'none';
      toast.setPointerCapture(e.pointerId);
    });

    toast.addEventListener('pointermove', (e) => {
      if (!isDragging || dismissed) return;
      currentX = e.clientX - startX;
      toast.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
      toast.style.opacity = Math.abs(currentX) > 80 ? '0.7' : '1';
    });

    toast.addEventListener('pointerup', () => {
      if (!isDragging || dismissed) return;
      isDragging = false;
      toast.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      if (Math.abs(currentX) > 80) {
        dismissed = true;
        toast.style.opacity = '0';
        toast.style.transform = `translateX(${currentX > 0 ? 400 : -400}px) rotate(${currentX * 0.1}deg)`;
        setTimeout(() => toast.remove(), 400);
      } else {
        toast.style.transform = 'translateX(0) rotate(0)';
        toast.style.opacity = '1';
      }
      currentX = 0;
    });

    const icon = isJoin ? "👋" : "🛍️";
    const title = isJoin ? "Entrou no grupo!" : "Comprou agora!";
    const desc = isJoin 
      ? `${name} de ${city} acabou de entrar.` 
      : `${name} de ${city} comprou ${product}.`;

    toast.innerHTML = `
      <div class="size-10 rounded-full bg-orange-500/10 flex items-center justify-center text-xl shrink-0">${icon}</div>
      <div class="overflow-hidden pr-4">
        <p class="text-[12px] font-bold text-slate-800">${title}</p>
        <p class="text-[11px] text-slate-500 truncate">${desc}</p>
      </div>
      <button class="toast-close">✕</button>
    `;

    // Click to Dismiss
    const dismissToast = () => {
      if (dismissed) return;
      dismissed = true;
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-20px)';
      setTimeout(() => toast.remove(), 400);
    };

    toast.addEventListener('click', dismissToast);
    toast.querySelector('.toast-close').addEventListener('click', (e) => {
      e.stopPropagation();
      dismissToast();
    });

    container.appendChild(toast);

    // Play Sound
    const sound = document.getElementById('notif-sound');
    if (sound) {
      sound.currentTime = 0; // Reset to start
      sound.volume = 0.7;
      sound.play().catch(() => {});
    }
  }

  // Initial and random interval
  setTimeout(createToast, 1500);
  setInterval(() => {
    createToast();
  }, 6000 + (Math.random() * 3000));
})();

/* ============================================
   PARTICLES
   ============================================ */
(function createParticles() {
  const container = document.getElementById('particles');
  const emojis = ['🛍️', '🏷️', '✨', '💰', '🔥', '⭐', '💎'];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.classList.add('particle');

    const useEmoji = Math.random() > 0.4;
    if (useEmoji) {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.fontSize = `${Math.random() * 18 + 14}px`;
      el.style.background = 'none';
      el.style.width = 'auto';
      el.style.height = 'auto';
      el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'; // Make pop on white
    } else {
      const size = Math.random() * 8 + 4;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      const colors = ['#ee4d2d', '#f5c842', '#ff6b44', '#128C7E'];
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
    }

    el.style.left = `${Math.random() * 100}%`;
    el.style.bottom = `-${Math.random() * 10 + 5}%`;
    el.style.opacity = (Math.random() * 0.4 + 0.4).toString(); // Higher opacity for white background

    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;

    container.appendChild(el);
  }
})();

/* ============================================
   CTA CLICK — troca URL aqui!
   ============================================ */
document.getElementById('cta-whatsapp').addEventListener('click', function (e) {
  // Substitua pela URL do grupo WhatsApp
  this.href = 'https://chat.whatsapp.com/SEU_LINK_AQUI';
});
