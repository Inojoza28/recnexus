document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const closeMobileMenu = document.getElementById('close-mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.contains('translate-x-full');
        
        if (isOpen) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
        }
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    closeMobileMenu.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Tech Globe Animation
    const techGlobe = document.getElementById('tech-globe');
    
    function createActivePoint() {
        const point = document.createElement('div');
        point.classList.add('absolute', 'w-2', 'h-2', 'bg-blue-500', 'rounded-full', 'opacity-0', 'animate-ping');
        
        // Posições aleatórias no globo
        const angle = Math.random() * Math.PI * 2;
        const radius = techGlobe.offsetWidth / 2;
        const x = radius + Math.cos(angle) * (radius * 0.8) - 4;
        const y = radius + Math.sin(angle) * (radius * 0.8) - 4;
        
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        
        techGlobe.appendChild(point);
        
        // Remove o ponto após animação
        setTimeout(() => {
            techGlobe.removeChild(point);
        }, 2000);
    }

    // Cria pontos ativos em intervalos aleatórios
    setInterval(createActivePoint, Math.random() * 3000 + 1000);
});

// Configuração Tailwind
if (window.tailwind) {
    window.tailwind.config = {
        theme: {
            extend: {
                animation: {
                    'spin-slow': 'spin 10s linear infinite',
                    'spin-reverse': 'spin 15s linear infinite reverse'
                }
            }
        }
    };
}