document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobile-menu');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('close-mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-nav-link');
    let isOpen = false;

    function toggleMenu() {
        isOpen = !isOpen;
        menu.classList.toggle('open', isOpen);
    }

    function closeOnDesktop() {
        if (window.innerWidth >= 768 && isOpen) {
            toggleMenu();
        }
    }

    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Fecha o menu apenas se estiver aberto
            if (isOpen) {
                toggleMenu();
            }
            
            // Adiciona scroll suave manualmente
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300); // Delay para coincidir com a animação do menu
                }
            }
        });
    });

    toggleBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    window.addEventListener('resize', closeOnDesktop);
    
    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (isOpen && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
            toggleMenu();
        }
    });
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