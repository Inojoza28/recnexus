document.addEventListener('DOMContentLoaded', () => {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const closePanelBtn = document.getElementById('close-panel');
    const synth = window.speechSynthesis;

    // Texto fixo para leitura
    const siteDescription = `
        A RecNexus é uma comunidade tech que impulsiona criadores de conteúdo através de reposts estratégicos no Instagram. 
        Nosso objetivo é aumentar seu alcance e conexões profissionais na área de tecnologia. 
        Para começar, siga nosso Instagram @recnexus e faça parte dessa rede!
    `;

    // Controle do Painel (mantido)
    if (accessibilityBtn && accessibilityPanel) {
        accessibilityBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            accessibilityPanel.classList.toggle('scale-0');
            accessibilityPanel.classList.toggle('scale-100');
        });

        document.addEventListener('click', (e) => {
            if (!accessibilityPanel.contains(e.target) && !accessibilityBtn.contains(e.target)) {
                accessibilityPanel.classList.add('scale-0');
                accessibilityPanel.classList.remove('scale-100');
            }
        });
    }

    // Controle do Painel (função reaproveitável)
    const togglePanel = (open = true) => {
        accessibilityPanel.classList.toggle('scale-0', !open);
        accessibilityPanel.classList.toggle('scale-100', open);
    };

    if (accessibilityBtn && accessibilityPanel) {
        // Abrir painel
        accessibilityBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePanel(true);
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!accessibilityPanel.contains(e.target) && !accessibilityBtn.contains(e.target)) {
                togglePanel(false);
            }
        });
    }

    // Fechar com botão X
    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', () => {
            togglePanel(false);
        });
    }

    // Sistema Aprimorado de Alto Contraste
    const highContrastToggle = document.getElementById('high-contrast');
    if (highContrastToggle) {
        // Carregar estado salvo considerando preferências do sistema
        const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches;
        const savedHighContrast = localStorage.getItem('highContrast') === 'true';

        highContrastToggle.checked = savedHighContrast || prefersHighContrast;
        document.body.classList.toggle('high-contrast', highContrastToggle.checked);

        // Ouvir mudanças com debounce
        let timeout;
        highContrastToggle.addEventListener('change', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                document.body.classList.toggle('high-contrast', highContrastToggle.checked);
                localStorage.setItem('highContrast', highContrastToggle.checked);

                // Forçar repaint para transições suaves
                document.body.getBoundingClientRect();
            }, 100);
        });
    }

    // Sistema de Tamanho de Fonte Aprimorado
    let fontSize = parseInt(localStorage.getItem('fontSize')) || 100;
    const applyFontSize = () => {
        document.documentElement.style.fontSize = `${fontSize}%`;
        localStorage.setItem('fontSize', fontSize);
    };
    applyFontSize();

    // Controles com taxa de variação e limites
    const fontControls = {
        increase: {
            element: document.getElementById('increase-font'),
            step: 10,
            max: 150
        },
        decrease: {
            element: document.getElementById('decrease-font'),
            step: -10,
            min: 80
        }
    };

    Object.values(fontControls).forEach(({ element, step, max, min }) => {
        element?.addEventListener('click', () => {
            fontSize = Math.min(Math.max(fontSize + step, min || -Infinity), max || Infinity);
            applyFontSize();
        });
    });

    // Text-to-Speech Profissional
    let currentUtterance = null;
    document.getElementById('text-to-speech').addEventListener('click', () => {
        if (synth.speaking && currentUtterance) {
            synth.cancel();
            return;
        }

        currentUtterance = new SpeechSynthesisUtterance(siteDescription);
        currentUtterance.lang = 'pt-BR';
        currentUtterance.rate = 1;
        currentUtterance.pitch = 1;
        currentUtterance.volume = 1;

        // Feedback visual durante a fala
        currentUtterance.onstart = () => {
            document.documentElement.classList.add('speech-active');
        };

        currentUtterance.onend = () => {
            document.documentElement.classList.remove('speech-active');
        };

        synth.speak(currentUtterance);
    });

    // Reset de Configurações Profissional
    document.getElementById('reset-settings').addEventListener('click', () => {
        // Animação de reset suave
        document.documentElement.style.transition = 'all 0.3s ease';

        // Resetar configurações
        localStorage.clear();
        fontSize = 100;
        applyFontSize();

        // Resetar alto contraste
        document.body.classList.remove('high-contrast');
        highContrastToggle.checked = false;

        // Parar leitura
        if (synth.speaking) {
            synth.cancel();
        }

        // Feedback visual
        const feedback = document.createElement('div');
        feedback.textContent = 'Configurações resetadas!';
        feedback.className = 'fixed bottom-20 left-5 bg-green-500 text-white px-4 py-2 rounded-lg';
        document.body.appendChild(feedback);

        setTimeout(() => feedback.remove(), 2000);
    });
});
