// Revenue Tracking System
let revenueData = {
    daily: 0,
    total: 0,
    clicks: 0,
    lastReset: new Date().toDateString()
};

// Load data from localStorage
function loadRevenueData() {
    const saved = localStorage.getItem('devmaster_revenue');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Reset daily if it's a new day
        if (parsed.lastReset !== new Date().toDateString()) {
            parsed.daily = 0;
            parsed.clicks = 0;
            parsed.lastReset = new Date().toDateString();
        }
        revenueData = parsed;
    }
    updateRevenueDisplay();
}

// Save data to localStorage
function saveRevenueData() {
    localStorage.setItem('devmaster_revenue', JSON.stringify(revenueData));
}

// Update display
function updateRevenueDisplay() {
    const dailyEl = document.getElementById('daily-revenue');
    const totalEl = document.getElementById('total-revenue');
    const clicksEl = document.getElementById('click-count');
    const todayClicksEl = document.getElementById('today-clicks');
    
    if (dailyEl) dailyEl.textContent = `€${revenueData.daily.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${revenueData.total.toFixed(2)}`;
    if (clicksEl) clicksEl.textContent = revenueData.clicks;
    if (todayClicksEl) todayClicksEl.textContent = revenueData.clicks;
    
    // Show revenue bar after first interaction
    if (revenueData.clicks > 0) {
        const bar = document.getElementById('revenue-bar');
        if (bar) bar.classList.remove('-translate-y-full');
    }
}

// Add revenue
function addRevenue(amount) {
    revenueData.daily += amount;
    revenueData.total += amount;
    revenueData.clicks++;
    saveRevenueData();
    updateRevenueDisplay();
    
    // Show toast with earnings
    showToast(`+€${amount.toFixed(2)} ajouté à vos revenus !`);
}

// Handle Ad Click
function handleAdClick(element) {
    addRevenue(0.45);
    element.style.transform = 'scale(0.95)';
    setTimeout(() => {
        element.style.transform = '';
    }, 200);
}

// Handle Project Click
function handleProjectClick(element, commission) {
    if (commission > 0) {
        addRevenue(commission);
    } else {
        revenueData.clicks++;
        saveRevenueData();
        updateRevenueDisplay();
    }
    showToast('Redirection vers le projet...');
}

// Handle Affiliate Click
function handleAffiliateClick(element, commission) {
    addRevenue(commission);
    // Prevent default for demo, in real world would open link
    setTimeout(() => {
        showToast(`Commission de €${commission.toFixed(2)} enregistrée !`);
    }, 100);
    return false;
}

// Handle Social Click
function handleSocialClick(element) {
    revenueData.clicks++;
    saveRevenueData();
    updateRevenueDisplay();
    showToast('Ouverture du profil social...');
}

// Handle Contact Submit
function handleContactSubmit(event) {
    event.preventDefault();
    addRevenue(5.00); // Lead generation value
    document.getElementById('contact-form').reset();
    showToast('Message envoyé ! Revenus de lead: +€5.00');
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Portfolio Filter
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update buttons
    buttons.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('glass');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('glass');
        }
    });
    
    // Filter projects with animation
    projects.forEach(project => {
        const projectCategory = project.dataset.category;
        if (category === 'all' || projectCategory.includes(category)) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.9)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('top-8');
        navbar.classList.remove('top-0');
    } else {
        navbar.classList.remove('top-8');
        navbar.classList.add('top-0');
    }
    
    lastScroll = currentScroll;
});

// Simulate passive views (CPM)
function simulatePassiveRevenue() {
    setInterval(() => {
        // Add small amount every 30 seconds for staying on page (CPM simulation)
        if (Math.random() > 0.7) {
            const passiveAmount = 0.02;
            revenueData.daily += passiveAmount;
            revenueData.total += passiveAmount;
            saveRevenueData();
            updateRevenueDisplay();
        }
    }, 30000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadRevenueData();
    simulatePassiveRevenue();
    
    // Initialize first filter button as active
    const firstBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (firstBtn) {
        firstBtn.classList.add('bg-primary', 'text-white');
        firstBtn.classList.remove('glass');
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .glass').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Prevent right click on images (basic protection)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});