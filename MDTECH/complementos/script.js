// Array con los datos de los testimonios
const testimonials = [
    {
        name: "Diva Blogs",
        date: "2025-06-15",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjVHk6hj-0pW3pgFYpvF3C-596tOkl4Oegqo2ypTF8VOLAA0ckMZ=w72-h72-p-rp-mo-ba3-br100",
        comment: "Excelente trabajo en la marca para mi negocio... muchas gracias , el logo quedo hermoso"
    },
    {
        name: "Maria Grau",
        date: "2025-04-10",
        image: "https://ui-avatars.com/api/?name=Milvia+gstetica&background=e91e63&color=fff&size=100",
        comment: "Excelente servicio, cumplieron con todas mis expectativas, muy contenta con todo, súper recomendado."
    },
    {
        name: "Zahratt Gerencia",
        date: "2025-06-03",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjXzUxGGVTXMn2pYrMYO4qaSU8H4-35Q5ZqYTReyfTw5XaG9eMr6=w72-h72-p-rp-mo-br100",
        comment: "Me encantó el trabajo de la empresa Dariana es muy Creativa"
    },
    {
        name: "Dayana Palmar",
        date: "2024-09-11",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjUOzc7-umIKdaXiT0D4SAtN_UVUOsD-62iC16zrb1BALKlXGBYQOw=w72-h72-p-rp-mo-br100",
        comment: "Excelente atención al cliente y te ayudan a crecer en tu negocio."
    },
    {
        name: "Juan José Atencio",
        date: "2024-10-01",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjUeZgSj38w56LwsrdmylVtJ_zYzvbRdj32epaAgD6dp88Cfen9uhQ=w72-h72-p-rp-mo-br100",
        comment: "Excelente experiencia , fortalece los conocimiento para la creación de contenido."
    },
    {
        name: "Carlos Ochoa",
        date: "2024-09-22",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjXrUErTl4jLk134rmYPETnpjTze7Gc100RaNo4esHraLtDrbdlx=w72-h72-p-rp-mo-br100",
        comment: "Excelente el servicio."
    },
    {
        name: "Julene Torres",
        date: "2024-10-10",
        image: "https://ui-avatars.com/api/?name=j+t&background=e91e63&color=fff&size=100",
        comment: "Excelente calidad de servicio y producto! 100% recomendado."
    },
    {
        name: "Juan José Atencio",
        date: "2024-10-07",
        image: "https://ui-avatars.com/api/?name=j+a&background=e91e63&color=fff&size=100",
        comment: "magnífico trato y dedicación muy agradecido con ellos por ayudarme a construir mis sueños."
    },
    {
        name: "Lina marcela vega",
        date: "2024-07-09",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjV4m4k1eor7jn1HAt6NOH68x8AbBPRi6wp_Dx_zXB4XDJ05LxbOdQ=w72-h72-p-rp-mo-br100",
        comment: "Recomendado 10/10"
    },
    {
        name: "Yunelis Muñoz",
        date: "2024-09-18",
        image: "https://lh3.googleusercontent.com/a-/ALV-UjUoQCTHzNyB9suV-_wE3npKFkm8Q3mtMPkBN_Lnv3pDdd6wV97R=w72-h72-p-rp-mo-br100",
        comment: ""
    },
];

// Función para formatear la fecha
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('es-ES', options);
}

// Función para crear una tarjeta de testimonio (slide)
function createTestimonialCard(testimonial) {
    return `
        <div class="testimonial-card">
            <div class="card-header">
                <img src="${testimonial.image}" alt="${testimonial.name}" class="profile-image">
                <div class="user-info">
                    <div class="user-name">${testimonial.name}</div>
                    <div class="comment-date">${formatDate(testimonial.date)}</div>
                </div>
                <svg class="google-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
            </div>
            <div class="card-stars">★★★★★</div>
            <div class="comment-text">${testimonial.comment}</div>
        </div>
    `;
}

// Slider state
let currentIndex = 0;
const SLIDE_GAP_PX = 30; // debe coincidir con el gap del track en CSS

function getVisibleCount() {
    // 3 en desktop, 2 en tablet, 1 en móvil
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function layoutAndUpdate(track) {
    const viewport = document.querySelector('.carousel-viewport');
    if (!viewport) return;
    const visible = getVisibleCount();
    const slides = Array.from(track.children);

    // calcular el ancho exacto de cada slide para que quepan completas
    const totalGap = SLIDE_GAP_PX * (visible - 1);
    const slideWidth = Math.max(0, Math.floor((viewport.clientWidth - totalGap) / visible));
    slides.forEach(function (slide) {
        slide.style.width = slideWidth + 'px';
        slide.style.flex = '0 0 auto';
    });
    track.style.gap = SLIDE_GAP_PX + 'px';

    const maxIndex = Math.max(0, slides.length - visible);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const offset = -(currentIndex * (slideWidth + SLIDE_GAP_PX));
    track.style.transform = `translateX(${offset}px)`;

    const prevBtn = document.getElementById('prevTestimonials');
    const nextBtn = document.getElementById('nextTestimonials');
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    }
}

function renderTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    track.innerHTML = testimonials.map(function (t) { return `<div class="carousel-slide">${createTestimonialCard(t)}</div>`; }).join('');
    currentIndex = 0;
    layoutAndUpdate(track);

    const prevBtn = document.getElementById('prevTestimonials');
    const nextBtn = document.getElementById('nextTestimonials');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function () {
            currentIndex -= 1;
            layoutAndUpdate(track);
        });
        nextBtn.addEventListener('click', function () {
            currentIndex += 1;
            layoutAndUpdate(track);
        });
    }

    window.addEventListener('resize', function () {
        layoutAndUpdate(track);
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderTestimonials);