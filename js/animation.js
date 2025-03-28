// Animação de contagem suave
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = new Intl.NumberFormat().format(value);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Inicializar contadores
  function initCounters() {
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.dataset.target);
      animateValue(el, 0, target, 2000);
    });
  
    // Animar seguidores e barra de progresso
    const followersElement = document.getElementById('followers');
    const progressBar = document.getElementById('progress-bar');
    animateValue(followersElement, 0, 148000, 2500);
    progressBar.style.width = '75%';
  
    // Atualizar taxa de engajamento
    const engagementElement = document.getElementById('engagement-rate');
    setTimeout(() => {
      engagementElement.textContent = 'Conectado - Taxa de engajamento 8.7%';
    }, 3000);
  }
  
  // Criar partículas tech
  function createTechParticles() {
    const container = document.querySelector('.tech-particles');
    for(let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-blue-400/30 rounded-full';
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particle ${4 + Math.random() * 4}s linear infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      container.appendChild(particle);
    }
  }
  
  // Atualizar horário
  function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = 
      now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    initCounters();
    createTechParticles();
  });