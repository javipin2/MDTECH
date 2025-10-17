/* ========================================
   OPTIMIZADOR DE ANIMACIONES ELEMENTOR - ANDRARA.COM
   ======================================== */

(function() {
    'use strict';
    
    // Configuración de optimización
    const ANIMATION_CONFIG = {
        // Precargar animaciones cuando estén a 600px de distancia
        preloadDistance: 600,
        // Activar animaciones cuando estén a 200px de distancia
        activationDistance: 200,
        // Máximo de animaciones precargadas simultáneamente
        maxPreloaded: 5
    };
    
    class ElementorAnimationsOptimizer {
        constructor() {
            this.preloadedAnimations = new Set();
            this.activeAnimations = new Set();
            this.init();
        }
        
        init() {
            this.setupAnimationObserver();
            this.setupScrollOptimization();
            this.preloadInitialAnimations();
        }
        
        setupAnimationObserver() {
            // Observer para precargar animaciones
            const preloadObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.preloadAnimation(entry.target);
                    }
                });
            }, { 
                rootMargin: `${ANIMATION_CONFIG.preloadDistance}px 0px ${ANIMATION_CONFIG.preloadDistance}px 0px`,
                threshold: 0.1
            });
            
            // Observer para activar animaciones
            const activationObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.activateAnimation(entry.target);
                    }
                });
            }, { 
                rootMargin: `${ANIMATION_CONFIG.activationDistance}px 0px ${ANIMATION_CONFIG.activationDistance}px 0px`,
                threshold: 0.3
            });
            
            // Aplicar observers a todas las animaciones
            document.querySelectorAll('.elementor-invisible').forEach(el => {
                preloadObserver.observe(el);
                activationObserver.observe(el);
            });
        }
        
        setupScrollOptimization() {
            let ticking = false;
            
            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.optimizeScrollAnimations();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
            
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
        
        preloadInitialAnimations() {
            // Precargar las primeras animaciones inmediatamente
            const initialAnimations = document.querySelectorAll('.elementor-invisible');
            initialAnimations.forEach((el, index) => {
                if (index < ANIMATION_CONFIG.maxPreloaded) {
                    this.preloadAnimation(el);
                }
            });
        }
        
        preloadAnimation(element) {
            if (this.preloadedAnimations.has(element)) return;
            
            // Aplicar estado de precarga
            element.style.opacity = '0.3';
            element.style.transform = this.getPreloadTransform(element);
            element.style.transition = 'all 0.2s ease-out';
            
            // Precargar imágenes si existen
            const images = element.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
            
            // Precargar backgrounds
            const backgrounds = element.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
            backgrounds.forEach(bg => {
                bg.classList.add('e-lazyloaded');
            });
            
            this.preloadedAnimations.add(element);
        }
        
        activateAnimation(element) {
            if (this.activeAnimations.has(element)) return;
            
            // Remover clase invisible
            element.classList.remove('elementor-invisible');
            
            // Aplicar animación final
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) translateX(0)';
            
            this.activeAnimations.add(element);
        }
        
        getPreloadTransform(element) {
            const animationType = this.getAnimationType(element);
            
            switch (animationType) {
                case 'fadeInUp':
                    return 'translateY(30px)';
                case 'fadeInRight':
                    return 'translateX(30px)';
                case 'fadeInLeft':
                    return 'translateX(-30px)';
                case 'fadeInDown':
                    return 'translateY(-30px)';
                default:
                    return 'translateY(20px)';
            }
        }
        
        getAnimationType(element) {
            const settings = element.dataset.settings;
            if (settings) {
                try {
                    const parsed = JSON.parse(settings);
                    return parsed.animation || 'fadeInUp';
                } catch (e) {
                    return 'fadeInUp';
                }
            }
            return 'fadeInUp';
        }
        
        optimizeScrollAnimations() {
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;
            
            // Optimizar animaciones visibles
            document.querySelectorAll('.elementor-invisible').forEach(el => {
                const rect = el.getBoundingClientRect();
                const distanceFromTop = rect.top;
                const distanceFromBottom = rect.bottom;
                
                // Si está cerca del viewport, precargar
                if (distanceFromTop < viewportHeight + ANIMATION_CONFIG.preloadDistance && 
                    distanceFromBottom > -ANIMATION_CONFIG.preloadDistance) {
                    this.preloadAnimation(el);
                }
            });
        }
    }
    
    // Inicializar optimizador
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new ElementorAnimationsOptimizer();
        });
    } else {
        new ElementorAnimationsOptimizer();
    }
    
    // Reinicializar cuando Elementor cargue
    document.addEventListener('elementor/lazyload/observe', () => {
        new ElementorAnimationsOptimizer();
    });
    
})();
