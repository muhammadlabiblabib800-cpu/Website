// ========== WEBSITE RESTORAN PEDAS MANTAP ==========
// Script utama untuk website restoran makanan pedas

document.addEventListener('DOMContentLoaded', function() {
    // ========== INISIALISASI AOS (ANIMASI SCROLL) ==========
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-in-out'
    });
    
    // ========== TOGGLE NAVBAR MOBILE ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Tutup navbar mobile saat klik link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========== NAVBAR STICKY ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ========== DARK MODE TOGGLE ==========
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Cek preferensi dark mode dari localStorage
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }
    
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Simpan preferensi dark mode ke localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // ========== FILTER MENU ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus class active dari semua button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Tambah class active ke button yang diklik
            this.classList.add('active');
            
            // Ambil filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter menu items
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Trigger animasi ulang
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ========== WHATSAPP BUTTON ==========
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappFloatBtn = document.getElementById('whatsapp-float-btn');
    const whatsappNumber = document.getElementById('whatsapp-number').textContent.trim();
    
    // Format pesan WhatsApp
    const whatsappMessage = encodeURIComponent(
        "Halo Pedas Mantap! Saya ingin memesan makanan. Bisa tolong info menu yang tersedia?"
    );
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${whatsappMessage}`;
    
    // Set URL untuk tombol WhatsApp
    if (whatsappBtn) {
        whatsappBtn.href = whatsappUrl;
    }
    
    if (whatsappFloatBtn) {
        whatsappFloatBtn.href = whatsappUrl;
    }
    
    // ========== FORM KONTAK ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ambil nilai dari form
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (!name || !email || !phone || !subject || !message) {
                alert('Mohon lengkapi semua field!');
                return;
            }
            
            // Simulasi pengiriman form (di implementasi nyata, ini akan dikirim ke server)
            const formData = {
                name,
                email,
                phone,
                subject,
                message
            };
            
            console.log('Data form dikirim:', formData);
            
            // Tampilkan pesan sukses
            alert('Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ========== SMOOTH SCROLL UNTUK NAVBAR LINK ==========
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
    
    // ========== ANIMASI UNTUK MENU ITEMS ==========
    // Tambahkan efek hover untuk menu items
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ========== TAMBAH EFEK AKTIF PADA NAV LINK SAAT SCROLL ==========
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== INISIALISASI TAMBAHAN UNTUK RESPONSIVITAS ==========
    // Sesuaikan tinggi hero image untuk mobile
    function adjustHeroImage() {
        const heroImage = document.querySelector('.hero-image');
        if (window.innerWidth < 768 && heroImage) {
            heroImage.style.height = '300px';
        }
    }
    
    // Panggil fungsi saat load dan resize
    adjustHeroImage();
    window.addEventListener('resize', adjustHeroImage);
    
    // ========== LOG SAAT PAGE LOAD ==========
    console.log('Website Restoran Pedas Mantap telah dimuat!');
});