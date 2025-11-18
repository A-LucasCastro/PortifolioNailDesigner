/* ========== INICIALIZAÇÃO ========== */
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeScrollAnimations();
    initializeFormValidation();
});

/* ========== MENU RESPONSIVO (HAMBURGER) ========== */
function initializeMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickInsideHamburger && nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

/* ========== ANIMAÇÕES AO ROLAR A PÁGINA ========== */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .gallery-item, .price-item, .highlight, .testimonial-card').forEach(element => {
        observer.observe(element);
    });

    window.addEventListener('scroll', updateHeaderOnScroll);
}

function updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    }
}

/* ========== VALIDAÇÃO DO FORMULÁRIO ========== */
function initializeFormValidation() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!validateForm(name, email, phone, message)) {
            return;
        }

        sendFormData(name, email, phone, message);
    });
}

function validateForm(name, email, phone, message) {
    const nameRegex = /^[a-záéíóúãõâêôç\s]{3,}$/i;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;

    if (!nameRegex.test(name)) {
        showAlert('Por favor, insira um nome válido com pelo menos 3 caracteres.');
        return false;
    }

    if (!emailRegex.test(email)) {
        showAlert('Por favor, insira um e-mail válido.');
        return false;
    }

    if (!phoneRegex.test(phone)) {
        showAlert('Por favor, insira um telefone válido.');
        return false;
    }

    if (message.length < 10) {
        showAlert('A mensagem deve ter pelo menos 10 caracteres.');
        return false;
    }

    return true;
}

function showAlert(message) {
    alert(message);
}

function sendFormData(name, email, phone, message) {
    const whatsappMessage = `*Novo contato do site!*%0A%0ANome: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ATelefone: ${encodeURIComponent(phone)}%0A%0AMensagem: ${encodeURIComponent(message)}`;

    openWhatsAppWithMessage(whatsappMessage);

    document.getElementById('contactForm').reset();
    showSuccess('Mensagem enviada com sucesso! Iasmin responderá em breve.');
}

function showSuccess(message) {
    alert(message);
}

/* ========== WHATSAPP ========== */
function openWhatsApp() {
    const phoneNumber = '5585999999999';
    const defaultMessage = 'Olá Iasmin! Gostaria de agendar um horário para um serviço.';
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
}

function openWhatsAppWithMessage(message) {
    const phoneNumber = '5585999999999';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappURL, '_blank');
}

/* ========== SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO ========== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========== EVENTOS ADICIONAIS ========== */
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.addEventListener('DOMContentLoaded', function() {
    updateHeaderOnScroll();
});
