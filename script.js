// Esperar a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN SUAVE =====
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== ANIMACIONES AL HACER SCROLL =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Añadir un pequeño delay para efecto escalonado
                    entry.target.style.transitionDelay = `${Math.random() * 0.3}s`;
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== HEADER DINÁMICO =====
    function initDynamicHeader() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Cambiar background del header
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(139, 90, 159, 0.2)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = '0 4px 20px rgba(139, 90, 159, 0.1)';
            }

            // Ocultar/mostrar header al scrollear
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // ===== EFECTO PARALLAX =====
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ===== CONTADOR ANIMADO =====
    function initAnimatedCounters() {
        const counters = [
            { element: null, target: 500, suffix: '+', prefix: '', text: 'Miembros Activos' },
            { element: null, target: 50, suffix: '+', prefix: '', text: 'Eventos Realizados' },
            { element: null, target: 15, suffix: '', prefix: '', text: 'Años de Experiencia' }
        ];

        // Crear elementos de contador si no existen
        const statsSection = document.createElement('section');
        statsSection.className = 'section stats-section';
        statsSection.innerHTML = `
            <div class="container">
                <h2 class="animate-on-scroll">Nuestro Impacto</h2>
                <div class="stats-grid">
                    ${counters.map((counter, index) => `
                        <div class="stat-item animate-on-scroll">
                            <div class="stat-number" data-target="${counter.target}" data-suffix="${counter.suffix}">${counter.prefix}0${counter.suffix}</div>
                            <div class="stat-text">${counter.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Insertar la sección después de la sección "sobre"
        const sobreSection = document.getElementById('sobre');
        if (sobreSection) {
            sobreSection.insertAdjacentElement('afterend', statsSection);
        }

        // Animar contadores cuando entren en vista
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(counter => {
            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, duration / steps);
    }

    // ===== MENU MÓVIL =====
    function initMobileMenu() {
        // Crear botón hamburguesa
        const nav = document.querySelector('nav');
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        nav.appendChild(hamburger);
        
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // ===== EFECTO TYPING =====
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            heroTitle.style.borderRight = '2px solid white';
            
            let i = 0;
            const timer = setInterval(() => {
                heroTitle.textContent += text.charAt(i);
                i++;
                if (i >= text.length) {
                    clearInterval(timer);
                    setTimeout(() => {
                        heroTitle.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }
    }

    // ===== BOTÓN SCROLL TO TOP =====
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== EFECTOS DE BANDERAS =====
    function initFlagEffects() {
        const flags = document.querySelectorAll('.flag');
        
        flags.forEach(flag => {
            flag.addEventListener('click', function() {
                // Crear tooltip con información
                const tooltip = document.createElement('div');
                tooltip.className = 'flag-tooltip';
                
                let content = '';
                if (this.classList.contains('flag-trans')) {
                    content = 'Bandera Transgénero: Representa a las personas cuya identidad de género difiere del sexo asignado al nacer.';
                } else if (this.classList.contains('flag-nb')) {
                    content = 'Bandera No Binaria: Representa a personas cuya identidad de género no se limita a masculino o femenino.';
                } else if (this.classList.contains('flag-bi')) {
                    content = 'Bandera Bisexual: Representa la atracción hacia más de un género.';
                }
                
                tooltip.textContent = content;
                document.body.appendChild(tooltip);
                
                // Posicionar tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.top = rect.bottom + 10 + 'px';
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                
                // Remover tooltip después de 3 segundos
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 3000);
            });
            
            // Efecto de pulse al hacer hover
            flag.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.6s ease-in-out';
            });
            
            flag.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }

    // ===== MODO OSCURO =====
    function initDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.setAttribute('aria-label', 'Cambiar modo oscuro');
        document.body.appendChild(darkModeToggle);

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        });
    }

    // ===== INICIALIZAR TODAS LAS FUNCIONES =====
    function init() {
        initSmoothScrolling();
        initScrollAnimations();
        initDynamicHeader();
        initParallaxEffect();
        initAnimatedCounters();
        initMobileMenu();
        // initTypingEffect(); // Comentado porque puede interferir con CSS animations
        initScrollToTop();
        initFlagEffects();
        initDarkMode();
        
        console.log('🌈 Página web de diversidad cargada correctamente!');
    }

    // Ejecutar inicialización
    init();
});

// ===== UTILIDADES ADICIONALES =====

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Función para validar formularios (si se añaden más adelante)
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Función para detectar dispositivos móviles
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para throttle de eventos
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}