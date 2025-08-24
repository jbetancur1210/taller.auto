// Menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('show');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Set minimum date for booking form
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const minDate = yyyy + '-' + mm + '-' + dd;
        fechaInput.min = minDate;
    }
    
    // Form validation
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const errorElement = field.nextElementSibling;
                if (field.value.trim() === '') {
                    errorElement.textContent = 'Este campo es obligatorio';
                    isValid = false;
                } else {
                    errorElement.textContent = '';
                    
                    // Email validation
                    if (field.type === 'email') {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(field.value)) {
                            errorElement.textContent = 'Por favor ingresa un email válido';
                            isValid = false;
                        }
                    }
                    
                    // Phone validation
                    if (field.type === 'tel') {
                        const phonePattern = /^[0-9+\-\s()]{10,}$/;
                        if (!phonePattern.test(field.value)) {
                            errorElement.textContent = 'Por favor ingresa un teléfono válido';
                            isValid = false;
                        }
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const notification = document.getElementById('form-notification');
                notification.textContent = '¡Gracias por tu reserva! Te contactaremos pronto para confirmar tu cita.';
                notification.classList.add('success');
                
                // You would normally submit the form to Formspree here
                // For now, we'll just reset the form after a delay
                setTimeout(() => {
                    bookingForm.reset();
                    notification.classList.remove('success');
                    notification.textContent = '';
                }, 5000);
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});