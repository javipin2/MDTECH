/* ========================================
   OPTIMIZADOR DE SCROLL - ANDRARA.COM
   ======================================== */

(function() {
    'use strict';
    
    // Configuración optimizada
    const SCROLL_CONFIG = {
        // Cargar contenido cuando esté a 800px de distancia (muy anticipado)
        rootMargin: '800px 0px 800px 0px',
        threshold: 0.1,
        // Precargar las próximas 3 secciones
        preloadSections: 3
    };
    
    // Optimizador de scroll mejorado
    class ScrollOptimizer {
        constructor() {
            this.observers = new Map();
            this.loadedElements = new Set();
            this.init();
        }
        
        init() {
            this.setupLazyLoading();
            this.setupAnimationPreloading();
            this.setupScrollOptimization();
        }
        
        setupLazyLoading() {
            // Observer para backgrounds con margen muy amplio
            const backgroundObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.loadBackground(entry.target);
                    }
                });
            }, { 
                rootMargin: '1000px 0px 1000px 0px',
                threshold: 0.01
            });
            
            // Observer para animaciones con precarga
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.preloadAnimation(entry.target);
                    }
                });
            }, { 
                rootMargin: '600px 0px 600px 0px',
                threshold: 0.1
            });
            
            // Aplicar observers
            document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)').forEach(el => {
                backgroundObserver.observe(el);
            });
            
            document.querySelectorAll('.elementor-invisible').forEach(el => {
                animationObserver.observe(el);
            });
            
            this.observers.set('backgrounds', backgroundObserver);
            this.observers.set('animations', animationObserver);
        }
        
        setupAnimationPreloading() {
            // Precargar todas las animaciones visibles
            const allAnimations = document.querySelectorAll('.elementor-invisible');
            allAnimations.forEach((el, index) => {
                // Precargar las primeras 5 animaciones inmediatamente
                if (index < 5) {
                    this.preloadAnimation(el);
                }
            });
        }
        
        setupScrollOptimization() {
            // Optimizar scroll con throttling
            let ticking = false;
            
            const optimizeScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', optimizeScroll, { passive: true });
            
            // Precargar contenido al hacer scroll
            let lastScrollY = window.scrollY;
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                
                if (scrollDirection === 'down') {
                    this.preloadNextContent();
                }
                
                lastScrollY = currentScrollY;
            }, { passive: true });
        }
        
        loadBackground(element) {
            if (this.loadedElements.has(element)) return;
            
            element.classList.add('e-lazyloaded');
            this.loadedElements.add(element);
            
            // Cargar imagen de fondo si existe
            const bgImage = element.style.backgroundImage;
            if (bgImage && bgImage !== 'none') {
                const img = new Image();
                img.src = bgImage.replace(/url\(['"]?(.+?)['"]?\)/, '$1');
            }
        }
        
        preloadAnimation(element) {
            if (this.loadedElements.has(element)) return;
            
            // Precargar la animación
            element.style.opacity = '0.3';
            element.style.transform = 'translateY(20px)';
            
            // Marcar como precargado
            this.loadedElements.add(element);
            
            // Activar animación cuando esté más cerca
            const activationObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.activateAnimation(entry.target);
                        activationObserver.unobserve(entry.target);
                    }
                });
            }, { 
                rootMargin: '200px 0px 200px 0px',
                threshold: 0.3
            });
            
            activationObserver.observe(element);
        }
        
        activateAnimation(element) {
            element.classList.remove('elementor-invisible');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
        
        preloadNextContent() {
            // Precargar las siguientes secciones
            const nextSections = document.querySelectorAll('.elementor-section:not(.preloaded)');
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;
            
            nextSections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const distanceFromViewport = rect.top - viewportHeight;
                
                // Precargar si está a menos de 1000px
                if (distanceFromViewport < 1000 && index < SCROLL_CONFIG.preloadSections) {
                    this.preloadSection(section);
                }
            });
        }
        
        preloadSection(section) {
            if (section.classList.contains('preloaded')) return;
            
            section.classList.add('preloaded');
            
            // Precargar imágenes
            const images = section.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
            
            // Precargar backgrounds
            const backgrounds = section.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
            backgrounds.forEach(bg => {
                this.loadBackground(bg);
            });
        }
        
        handleScroll() {
            // Optimizar elementos visibles
            const visibleElements = document.querySelectorAll('.elementor-invisible');
            visibleElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !this.loadedElements.has(el)) {
                    this.preloadAnimation(el);
                }
            });
        }
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ScrollOptimizer();
        });
    } else {
        new ScrollOptimizer();
    }
    
    // También inicializar en el evento de Elementor
    document.addEventListener('elementor/lazyload/observe', () => {
        new ScrollOptimizer();
    });
    
})();
