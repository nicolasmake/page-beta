/* ===============================================================
   Beta Promoções — Interações
   - Atualiza ano automaticamente
   - Efeito ripple em cliques (micro interação)
   - Respeita prefers-reduced-motion
   =============================================================== */

// Atualiza o ano no rodapé
document.getElementById('year').textContent = String(new Date().getFullYear());

// Efeito ripple nos elementos com [data-ripple]
(function enableRipple() {
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-ripple]').forEach((el) => {
    // Cria host do ripple se não existir
    let rippleHost = el.querySelector('.ripple');
    if (!rippleHost) {
      rippleHost = document.createElement('span');
      rippleHost.className = 'ripple';
      rippleHost.setAttribute('aria-hidden', 'true');
      el.appendChild(rippleHost);
    }

    el.addEventListener('click', (ev) => {
      if (!motionOK) return; // respeita preferência do usuário

      const rect = el.getBoundingClientRect();
      const circle = document.createElement('span');
      circle.className = 'ripple__circle';
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      rippleHost.appendChild(circle);

      // Remove o círculo ao fim da animação
      circle.addEventListener('animationend', () => circle.remove());
    });
  });
})();
