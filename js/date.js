// Atualizar horário em tempo real
function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Inicializar e atualizar a cada minuto
updateTime();
setInterval(updateTime, 60000);

// Animação de entrada dos elementos
document.querySelectorAll('.metric-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});