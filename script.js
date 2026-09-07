// ============================================================
// LANGUAGE SUPPORT
// ============================================================
const translations = {
    ar: {
        'nav.home': 'الرئيسية',
        'nav.vehicles': 'المركبات',
        'nav.pricing': 'الأسعار',
        'nav.contact': 'اتصل بنا',
        'nav.admin': 'لوحة الإدارة',
        'nav.book': 'احجز الآن',
        'hero.badge': '🚗 تأجير السيارات - القنيطرة',
        'hero.title': 'أحمد تور<br><span class="gradient-text">لتأجير السيارات</span>',
        'hero.desc': 'أفضل أسعار تأجير السيارات في القنيطرة. أسطول حديث، خدمة احترافية، وتوصيل مجاني.',
        'hero.explore': 'استكشف المركبات',
        'hero.contact': 'تواصل معنا',
        'features.bestPrice.title': 'أفضل الأسعار',
        'features.bestPrice.desc': 'أسعار تنافسية وشفافة بدون رسوم خفية',
        'features.modernFleet.title': 'أسطول حديث',
        'features.modernFleet.desc': 'سيارات جديدة ومجهزة بأحدث التقنيات',
        'features.support247.title': 'خدمة 24/7',
        'features.support247.desc': 'متاحون على مدار الساعة لخدمتكم',
        'vehicles.title': 'أسطول المركبات',
        'vehicles.subtitle': 'اختر السيارة المناسبة لاحتياجاتك',
        'pricing.title': 'أسعار التأجير',
        'pricing.subtitle': 'أسعار تبدأ من 250 درهم/يوم',
        'contact.title': 'اتصل بنا',
        'contact.subtitle': 'نحن هنا لمساعدتك في أي وقت',
        'contact.info': 'معلومات التواصل',
        'contact.phone': 'الهاتف',
        'contact.landline': 'الهاتف الثابت',
        'contact.email': 'البريد الإلكتروني',
        'contact.address': 'العنوان',
        'contact.sendMsg': 'أرسل رسالة',
        'contact.fullName': 'الاسم الكامل',
        'contact.phoneNumber': 'رقم الهاتف',
        'contact.message': 'رسالتك...',
        'contact.send': 'إرسال',
        'modal.title': 'حجز سيارة',
        'modal.priceLabel': 'السعر الإجمالي:',
        'modal.confirm': 'تأكيد الحجز',
        'footer.rights': 'جميع الحقوق محفوظة',
        'status.available': 'متاحة حاليا',
        'status.reserved': 'محجوزة حاليا',
        'period.daily': 'يومي',
        'period.weekly': 'أسبوعي',
        'period.monthly': 'شهري',
        'period.3days': '3 أيام',
        'period.7days': '7 أيام',
        'period.14days': '14 يوماً',
        'period.30days': '30 يوماً',
        'reserve.chooseDates': 'اختر التواريخ',
        'reserve.from': 'من',
        'reserve.to': 'إلى',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.vehicles': 'Véhicules',
        'nav.pricing': 'Tarifs',
        'nav.contact': 'Contact',
        'nav.admin': 'Tableau de bord',
        'nav.book': 'Réserver',
        'hero.badge': '🚗 Location de Voitures - Kénitra',
        'hero.title': 'Ahmed TOUR<br><span class="gradient-text">Location de Voitures</span>',
        'hero.desc': 'Meilleurs prix de location de voitures à Kénitra. Flotte moderne, service professionnel et livraison gratuite.',
        'hero.explore': 'Explorer les véhicules',
        'hero.contact': 'Nous contacter',
        'features.bestPrice.title': 'Meilleurs prix',
        'features.bestPrice.desc': 'Prix compétitifs et transparents sans frais cachés',
        'features.modernFleet.title': 'Flotte moderne',
        'features.modernFleet.desc': 'Voitures neuves équipées des dernières technologies',
        'features.support247.title': 'Service 24/7',
        'features.support247.desc': 'Disponibles 24h/24 pour vous servir',
        'vehicles.title': 'Flotte de véhicules',
        'vehicles.subtitle': 'Choisissez la voiture adaptée à vos besoins',
        'pricing.title': 'Tarifs de location',
        'pricing.subtitle': 'Tarifs à partir de 250 DH/jour',
        'contact.title': 'Contactez-nous',
        'contact.subtitle': 'Nous sommes là pour vous aider à tout moment',
        'contact.info': 'Informations de contact',
        'contact.phone': 'Téléphone',
        'contact.landline': 'Téléphone fixe',
        'contact.email': 'Email',
        'contact.address': 'Adresse',
        'contact.sendMsg': 'Envoyer un message',
        'contact.fullName': 'Nom complet',
        'contact.phoneNumber': 'Numéro de téléphone',
        'contact.message': 'Votre message...',
        'contact.send': 'Envoyer',
        'modal.title': 'Réserver une voiture',
        'modal.priceLabel': 'Prix total:',
        'modal.confirm': 'Confirmer la réservation',
        'footer.rights': 'Tous droits réservés',
        'status.available': 'Disponible',
        'status.reserved': 'Réservée',
        'period.daily': 'Journalier',
        'period.weekly': 'Hebdomadaire',
        'period.monthly': 'Mensuel',
        'period.3days': '3 jours',
        'period.7days': '7 jours',
        'period.14days': '14 jours',
        'period.30days': '30 jours',
        'reserve.chooseDates': 'Choisir les dates',
        'reserve.from': 'Du',
        'reserve.to': 'Au',
    }
};

let currentLang = 'ar';

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('lang-' + lang).classList.add('active');

    // Update text content for elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update hero description
    if (lang === 'ar') {
        document.getElementById('hero-desc').textContent = translations.ar['hero.desc'];
    } else {
        document.getElementById('hero-desc').textContent = translations.fr['hero.desc'];
    }

    // Update car status labels
    document.querySelectorAll('.car-badge').forEach(el => {
        if (el.classList.contains('available')) {
            el.textContent = translations[lang]['status.available'];
        } else if (el.classList.contains('reserved')) {
            el.textContent = translations[lang]['status.reserved'];
        }
    });

    // Update period tags
    document.querySelectorAll('.period-tag .period-label').forEach(el => {
        const key = el.getAttribute('data-period-key');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update modal
    document.querySelector('#reserve-modal .modal-header h3').innerHTML = translations[lang]['modal.title'];
    document.querySelector('#reserve-modal .modal-header h3').setAttribute('data-i18n', 'modal.title');
    document.querySelector('#price-display span').innerHTML = translations[lang]['modal.priceLabel'];
    document.querySelector('#price-display span').setAttribute('data-i18n', 'modal.priceLabel');
    document.querySelector('#reserve-modal button[type="submit"] span').innerHTML = translations[lang]['modal.confirm'];
    document.querySelector('#reserve-modal button[type="submit"] span').setAttribute('data-i18n', 'modal.confirm');

    // Update contact form labels
    document.querySelector('.contact-info h3').innerHTML = translations[lang]['contact.info'];
    document.querySelector('.contact-info h3').setAttribute('data-i18n', 'contact.info');
    document.querySelector('.contact-form h3').innerHTML = translations[lang]['contact.sendMsg'];
    document.querySelector('.contact-form h3').setAttribute('data-i18n', 'contact.sendMsg');
    document.querySelector('.contact-form button span').innerHTML = translations[lang]['contact.send'];
    document.querySelector('.contact-form button span').setAttribute('data-i18n', 'contact.send');

    // Update footer
    document.querySelector('.copyright span').innerHTML = translations[lang]['footer.rights'];
    document.querySelector('.copyright span').setAttribute('data-i18n', 'footer.rights');

    // Update nav admin
    document.querySelector('.nav-actions .btn-admin span').innerHTML = translations[lang]['nav.admin'];
    document.querySelector('.nav-actions .btn-admin span').setAttribute('data-i18n', 'nav.admin');

    // Update footer admin link
    document.querySelector('.footer-links .admin-link span').innerHTML = translations[lang]['nav.admin'];
    document.querySelector('.footer-links .admin-link span').setAttribute('data-i18n', 'nav.admin');

    // Update booking button
    document.querySelector('.nav-actions .btn-primary span').innerHTML = translations[lang]['nav.book'];
    document.querySelector('.nav-actions .btn-primary span').setAttribute('data-i18n', 'nav.book');

    // Update hero button
    document.querySelector('.hero-buttons .btn-primary span').innerHTML = translations[lang]['hero.explore'];
    document.querySelector('.hero-buttons .btn-primary span').setAttribute('data-i18n', 'hero.explore');
    document.querySelector('.hero-buttons .btn-outline span').innerHTML = translations[lang]['hero.contact'];
    document.querySelector('.hero-buttons .btn-outline span').setAttribute('data-i18n', 'hero.contact');
}

// ============================================================
// DEFAULT DATA
// ============================================================
const defaultCars = [
    {
        id: 1,
        name: 'Renault Clio',
        type: 'اقتصادية',
        img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
        status: 'available',
        periods: [
            { days: 1, price: 250 },
            { days: 3, price: 700 },
            { days: 7, price: 1500 },
            { days: 30, price: 5500 }
        ]
    },
    {
        id: 2,
        name: 'Dacia Logan',
        type: 'اقتصادية',
        img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
        status: 'available',
        periods: [
            { days: 1, price: 300 },
            { days: 3, price: 850 },
            { days: 7, price: 1800 },
            { days: 30, price: 6500 }
        ]
    },
    {
        id: 3,
        name: 'Audi A4',
        type: 'فاخرة',
        img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=600&q=80',
        status: 'available',
        periods: [
            { days: 1, price: 800 },
            { days: 3, price: 2200 },
            { days: 7, price: 5000 },
            { days: 30, price: 18000 }
        ]
    },
    {
        id: 4,
        name: 'Mercedes C-Class',
        type: 'فاخرة',
        img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
        status: 'reserved',
        periods: [
            { days: 1, price: 900 },
            { days: 3, price: 2500 },
            { days: 7, price: 5500 },
            { days: 30, price: 20000 }
        ]
    },
    {
        id: 5,
        name: 'Hyundai Tucson',
        type: 'عائلية',
        img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80',
        status: 'available',
        periods: [
            { days: 1, price: 500 },
            { days: 3, price: 1400 },
            { days: 7, price: 3200 },
            { days: 30, price: 11000 }
        ]
    },
    {
        id: 6,
        name: 'Peugeot 3008',
        type: 'عائلية',
        img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
        status: 'available',
        periods: [
            { days: 1, price: 550 },
            { days: 3, price: 1500 },
            { days: 7, price: 3500 },
            { days: 30, price: 12000 }
        ]
    }
];

const defaultSiteData = {
    phone: '06 61 17 01 82',
    phone2: '05 37 37 88 89',
    email: 'ahmadi2011@live.fr',
    address: 'زاوية شارع الإمام علي وشارع ياريك زياد - القنيطرة',
    description: 'أفضل أسعار تأجير السيارات في القنيطرة. أسطول حديث، خدمة احترافية، وتوصيل مجاني.'
};

// ============================================================
// STORAGE FUNCTIONS
// ============================================================
function initStorage() {
    if (!localStorage.getItem('carsData')) {
        localStorage.setItem('carsData', JSON.stringify(defaultCars));
    }
    if (!localStorage.getItem('siteData')) {
        localStorage.setItem('siteData', JSON.stringify(defaultSiteData));
    }
}

function getCars() {
    return JSON.parse(localStorage.getItem('carsData')) || defaultCars;
}

function getSiteData() {
    return JSON.parse(localStorage.getItem('siteData')) || defaultSiteData;
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================
function renderCars() {
    const grid = document.getElementById('cars-grid');
    const cars = getCars();

    if (cars.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--gray-400);padding:2rem;">لا توجد سيارات متاحة حالياً</p>';
        return;
    }

    grid.innerHTML = cars.map(car => {
        const statusText = car.status === 'available' ?
            translations[currentLang]['status.available'] :
            translations[currentLang]['status.reserved'];
        const statusClass = car.status === 'available' ? 'available' : 'reserved';

        // Build period tags
        let periodHtml = '';
        if (car.periods && car.periods.length > 0) {
            periodHtml = '<div class="car-periods">';
            car.periods.forEach(p => {
                let periodKey = '';
                if (p.days === 1) periodKey = 'period.daily';
                else if (p.days === 3) periodKey = 'period.3days';
                else if (p.days === 7) periodKey = 'period.7days';
                else if (p.days === 14) periodKey = 'period.14days';
                else if (p.days === 30) periodKey = 'period.monthly';
                else if (p.days === 7) periodKey = 'period.weekly';
                else periodKey = 'period.daily';

                const label = translations[currentLang][periodKey] || p.days + ' يوم';
                periodHtml += `
                    <span class="period-tag">
                        <span class="period-label" data-period-key="${periodKey}">${label}</span>
                        : <span class="period-price">${p.price} DH</span>
                    </span>
                `;
            });
            periodHtml += '</div>';
        }

        // Find daily price for display
        const dailyPrice = car.periods && car.periods.length > 0 ?
            car.periods.find(p => p.days === 1)?.price || car.periods[0].price :
            0;

        return `
            <div class="car-card">
                <div class="car-image">
                    <img src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22400%22%3E%3Crect fill=%22%23111827%22 width=%22600%22 height=%22400%22/%3E%3Ctext x=%22300%22 y=%22200%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2224%22 font-family=%22sans-serif%22%3E🚗 ${car.name}%3C/text%3E%3C/svg%3E'">
                    <span class="car-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <h3>${car.name}</h3>
                        <span class="car-tag">${car.type}</span>
                    </div>
                    <div class="car-price">${dailyPrice} <small>DH / يوم</small></div>
                    ${periodHtml}
                    <button onclick="openReserve('${car.name} - ${car.type}', ${car.id})" class="btn-secondary" ${car.status === 'reserved' ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                        ${car.status === 'reserved' ? '🔒 محجوزة' : 'احجز الآن'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderPricing() {
    const grid = document.getElementById('pricing-grid');
    const cars = getCars();

    // Group by type
    const types = ['اقتصادية', 'عائلية', 'فاخرة'];
    const typeLabels = {
        'اقتصادية': 'اقتصادية',
        'عائلية': 'عائلية',
        'فاخرة': 'فاخرة'
    };

    const typeData = types.map(type => {
        const carsOfType = cars.filter(c => c.type === type);
        const avgPrice = carsOfType.length > 0 ?
            carsOfType.reduce((sum, c) => {
                const daily = c.periods?.find(p => p.days === 1)?.price || 0;
                return sum + daily;
            }, 0) / carsOfType.length :
            0;
        return { type, count: carsOfType.length, avgPrice: Math.round(avgPrice) };
    });

    grid.innerHTML = typeData.map((data, index) => {
        const isFeatured = index === 1;
        const priceDisplay = data.avgPrice > 0 ? data.avgPrice : '---';

        return `
            <div class="pricing-card ${isFeatured ? 'featured' : ''}">
                ${isFeatured ? '<div class="badge-popular">🌟 الأكثر طلباً</div>' : ''}
                <h3>${typeLabels[data.type]}</h3>
                <div class="price">${priceDisplay} <span>DH/يوم</span></div>
                <ul>
                    <li>✓ تأمين شامل</li>
                    <li>✓ مسافة غير محدودة</li>
                    <li>✓ خدمة التوصيل</li>
                    ${isFeatured ? '<li>✓ مقعد أطفال مجاني</li>' : ''}
                    <li>✓ دعم على مدار الساعة</li>
                </ul>
                <button onclick="openReserve('${typeLabels[data.type]}')" class="${isFeatured ? 'btn-primary' : 'btn-secondary'}">
                    احجز الآن
                </button>
            </div>
        `;
    }).join('');
}

function loadSiteInfo() {
    const data = getSiteData();
    document.getElementById('info-phone').textContent = data.phone;
    document.getElementById('info-phone2').textContent = data.phone2;
    document.getElementById('info-email').textContent = data.email;
    document.getElementById('info-address').textContent = data.address;

    // Update hero description based on language
    const descEl = document.getElementById('hero-desc');
    if (currentLang === 'ar') {
        descEl.textContent = data.description || translations.ar['hero.desc'];
    } else {
        descEl.textContent = data.description ? data.description.replace(/القنيطرة/g, 'Kénitra') : translations.fr['hero.desc'];
    }
}

// ============================================================
// RESERVATION FUNCTIONS
// ============================================================
let currentCarId = null;

function openReserve(carName, carId) {
    currentCarId = carId;
    document.getElementById('car-type').value = carName;
    document.getElementById('reserve-modal').classList.add('active');

    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    document.getElementById('start-date').value = today.toISOString().split('T')[0];
    document.getElementById('end-date').value = tomorrow.toISOString().split('T')[0];

    // Update price on date change
    updatePrice();

    // Add event listeners for date changes
    document.getElementById('start-date').onchange = updatePrice;
    document.getElementById('end-date').onchange = updatePrice;
}

function updatePrice() {
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;
    const priceEl = document.getElementById('total-price');

    if (!start || !end) {
        priceEl.textContent = '0 DH';
        return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays < 0) {
        priceEl.textContent = '0 DH';
        return;
    }

    // Find car and calculate price
    const cars = getCars();
    const car = cars.find(c => c.id === currentCarId);

    if (!car || !car.periods || car.periods.length === 0) {
        priceEl.textContent = '0 DH';
        return;
    }

    // Find best price for the duration
    let bestPrice = 0;
    // Sort periods by days descending to find best match
    const sortedPeriods = [...car.periods].sort((a, b) => b.days - a.days);

    for (const period of sortedPeriods) {
        if (diffDays >= period.days) {
            // Calculate price based on period
            const fullPeriods = Math.floor(diffDays / period.days);
            const remainingDays = diffDays % period.days;
            let total = fullPeriods * period.price;

            // Handle remaining days with best rate
            if (remainingDays > 0) {
                const remainingPeriod = car.periods.find(p => p.days === 1);
                if (remainingPeriod) {
                    total += remainingDays * remainingPeriod.price;
                } else {
                    total += remainingDays * (period.price / period.days);
                }
            }
            bestPrice = Math.round(total);
            break;
        }
    }

    if (bestPrice === 0 && car.periods.length > 0) {
        // Fallback: use daily rate
        const daily = car.periods.find(p => p.days === 1) || car.periods[0];
        bestPrice = daily.price * diffDays;
    }

    priceEl.textContent = bestPrice + ' DH';
}

function closeModal() {
    document.getElementById('reserve-modal').classList.remove('active');
}

function handleSubmit(e) {
    e.preventDefault();
    showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
    e.target.reset();
}

function handleReserve(e) {
    e.preventDefault();
    closeModal();
    showToast('✅ تم تأكيد حجزك بنجاح! سنتواصل معك لتأكيد التفاصيل');
    e.target.reset();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ============================================================
// MODAL CLOSE ON OUTSIDE CLICK
// ============================================================
document.getElementById('reserve-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('reserve-modal')) closeModal();
});

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    renderCars();
    renderPricing();
    loadSiteInfo();
    switchLanguage('ar');
});