// ============================================================
// 🌓 تبديل الثيم (نهاري / ليلي)
// ============================================================
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    // تبديل الثيم
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// ============================================================
// تحميل الثيم المخزن
// ============================================================
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        icon.textContent = '🌙';
    }
}

// ============================================================
// استدعاء loadTheme عند تحميل الصفحة
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    loadTheme();
    // ... باقي الكود
});