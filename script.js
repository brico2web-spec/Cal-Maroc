// ============================================================
// 🔴🔴🔴 رابط JSONBin ومفتاح API الخاص بك 🔴🔴🔴
// ============================================================
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/6a9f3169ac6210605ab13d85';
const JSONBIN_KEY = '$2a$10$GDFKVACg4Ot83OdLGFYztuGjFQXhXmJa8uGrNaSSDj4XWtP6N3wb.';

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
        'type.economy': 'اقتصادية',
        'type.family': 'عائلية',
        'type.luxury': 'فاخرة',
        'reserve.book': 'احجز الآن',
        'reserve.reserved': '🔒 محجوزة',
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
        'type.economy': 'Économique',
        'type.family': 'Familiale',
        'type.luxury': 'Luxe',
        'reserve.book': 'Réserver',
        'reserve.reserved': '🔒 Réservée',
    }
};

let currentLang = 'ar';

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('lang-' + lang).classList.add('active');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    const descEl = document.getElementById('hero-desc');
    if (lang === 'ar') {
        descEl.textContent = translations.ar['hero.desc'];
    } else {
        descEl.textContent = translations.fr['hero.desc'];
    }

    renderCars();
    renderPricing();

    document.querySelector('#reserve-modal .modal-header h3').innerHTML = translations[lang]['modal.title'];
    document.querySelector('#price-display span').innerHTML = translations[lang]['modal.priceLabel'];
    document.querySelector('#reserve-modal button[type="submit"] span').innerHTML = translations[lang]['modal.confirm'];

    document.querySelector('.contact-info h3').innerHTML = translations[lang]['contact.info'];
    document.querySelector('.contact-form h3').innerHTML = translations[lang]['contact.sendMsg'];
    document.querySelector('.contact-form button span').innerHTML = translations[lang]['contact.send'];

    document.querySelector('.copyright span').innerHTML = translations[lang]['footer.rights'];
    document.querySelector('.nav-actions .btn-admin span').innerHTML = translations[lang]['nav.admin'];
    document.querySelector('.footer-links .admin-link span').innerHTML = translations[lang]['nav.admin'];
    document.querySelector('.nav-actions .btn-primary span').innerHTML = translations[lang]['nav.book'];

    document.querySelector('.hero-buttons .btn-primary span').innerHTML = translations[lang]['hero.explore'];
    document.querySelector('.hero-buttons .btn-outline span').innerHTML = translations[lang]['hero.contact'];
}

// ============================================================
// 📦 السيارات الافتراضية
// ============================================================
const DEFAULT_CARS = [
    {
        id: 1,
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

let siteData = {
    phone: '06 61 17 01 82',
    phone2: '05 37 37 88 89',
    email: 'ahmadi2011@live.fr',
    address: 'زاوية شارع الإمام علي وشارع ياريك زياد - القنيطرة',
    description: 'أفضل أسعار تأجير السيارات في القنيطرة. أسطول حديث، خدمة احترافية، وتوصيل مجاني.'
};

// ============================================================
// 🌐 جلب البيانات من السحابة
// ============================================================
let carsData = [];
let isCloudDataLoaded = false;

async function fetchCarsFromCloud() {
    try {
        console.log('🔄 جاري جلب البيانات من السحابة...');
        const response = await fetch(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('فشل الاتصال بالسحابة');
        }
        
        const data = await response.json();
        const record = data.record;
        
        if (record && record.cars && Array.isArray(record.cars) && record.cars.length > 0) {
            carsData = record.cars;
            isCloudDataLoaded = true;
            console.log('✅ تم جلب البيانات من السحابة:', carsData.length, 'سيارة');
            return true;
        } else {
            console.log('📦 البيانات في السحابة فارغة، استخدام البيانات الافتراضية');
            carsData = DEFAULT_CARS;
            isCloudDataLoaded = true;
            // محاولة إرسال البيانات الافتراضية إلى السحابة
            try {
                await sendDefaultDataToCloud();
            } catch (e) {}
            return true;
        }
    } catch (error) {
        console.warn('⚠️ تعذر جلب البيانات من السحابة:', error.message);
        carsData = DEFAULT_CARS;
        return false;
    }
}

async function sendDefaultDataToCloud() {
    try {
        const payload = {
            cars: DEFAULT_CARS,
            site: siteData
        };
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            console.log('✅ تم إرسال البيانات الافتراضية إلى السحابة');
            return true;
        }
    } catch (e) {}
    return false;
}

// ============================================================
// 🔥 دالة تحديث البيانات من الإدارة
// ============================================================
function updateCarsData(newData) {
    if (newData && Array.isArray(newData) && newData.length > 0) {
        carsData = newData;
        isCloudDataLoaded = true;
        console.log('🔄 تم تحديث البيانات من الإدارة:', carsData.length, 'سيارة');
        renderCars();
        renderPricing();
        return true;
    }
    return false;
}

function getCars() {
    if (isCloudDataLoaded && carsData && carsData.length > 0) {
        return carsData;
    }
    return DEFAULT_CARS;
}

function getSiteData() {
    return siteData;
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================
function renderCars() {
    const grid = document.getElementById('cars-grid');
    const cars = getCars();

    if (!cars || cars.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--gray-400);padding:2rem;">🚗 لا توجد سيارات متاحة حالياً</p>';
        return;
    }

    grid.innerHTML = cars.map(car => {
        const statusText = car.status === 'available' ?
            translations[currentLang]['status.available'] :
            translations[currentLang]['status.reserved'];
        const statusClass = car.status === 'available' ? 'available' : 'reserved';

        let typeKey = 'type.economy';
        if (car.type === 'اقتصادية') typeKey = 'type.economy';
        else if (car.type === 'عائلية') typeKey = 'type.family';
        else if (car.type === 'فاخرة') typeKey = 'type.luxury';
        const typeText = translations[currentLang][typeKey] || car.type;

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

        const dailyPrice = car.periods && car.periods.length > 0 ?
            car.periods.find(p => p.days === 1)?.price || car.periods[0].price :
            0;

        const isReserved = car.status === 'reserved';
        const bookText = isReserved ? translations[currentLang]['reserve.reserved'] : translations[currentLang]['reserve.book'];

        return `
            <div class="car-card">
                <div class="car-image">
                    <img src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'">
                    <span class="car-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <h3>${car.name}</h3>
                        <span class="car-tag">${typeText}</span>
                    </div>
                    <div class="car-price">${dailyPrice} <small>DH / ${translations[currentLang]['period.daily']}</small></div>
                    ${periodHtml}
                    <button onclick="openReserve('${car.name} - ${typeText}', ${car.id})" class="btn-secondary" ${isReserved ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''}>
                        ${bookText}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderPricing() {
    const grid = document.getElementById('pricing-grid');
    const cars = getCars();

    const types = ['اقتصادية', 'عائلية', 'فاخرة'];
    const typeLabels = {
        'اقتصادية': translations[currentLang]['type.economy'],
        'عائلية': translations[currentLang]['type.family'],
        'فاخرة': translations[currentLang]['type.luxury']
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
                ${isFeatured ? '<div class="badge-popular">🌟 ' + (currentLang === 'ar' ? 'الأكثر طلباً' : 'Le plus demandé') + '</div>' : ''}
                <h3>${typeLabels[data.type]}</h3>
                <div class="price">${priceDisplay} <span>DH/${translations[currentLang]['period.daily']}</span></div>
                <ul>
                    <li>✓ ${currentLang === 'ar' ? 'تأمين شامل' : 'Assurance complète'}</li>
                    <li>✓ ${currentLang === 'ar' ? 'مسافة غير محدودة' : 'Kilométrage illimité'}</li>
                    <li>✓ ${currentLang === 'ar' ? 'خدمة التوصيل' : 'Service de livraison'}</li>
                    ${isFeatured ? '<li>✓ ' + (currentLang === 'ar' ? 'مقعد أطفال مجاني' : 'Siège enfant gratuit') + '</li>' : ''}
                    <li>✓ ${currentLang === 'ar' ? 'دعم على مدار الساعة' : 'Support 24/7'}</li>
                </ul>
                <button onclick="openReserve('${typeLabels[data.type]}')" class="${isFeatured ? 'btn-primary' : 'btn-secondary'}">
                    ${currentLang === 'ar' ? 'احجز الآن' : 'Réserver'}
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

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    document.getElementById('start-date').value = today.toISOString().split('T')[0];
    document.getElementById('end-date').value = tomorrow.toISOString().split('T')[0];

    updatePrice();
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

    const cars = getCars();
    const car = cars.find(c => c.id === currentCarId);

    if (!car || !car.periods || car.periods.length === 0) {
        priceEl.textContent = '0 DH';
        return;
    }

    let bestPrice = 0;
    const sortedPeriods = [...car.periods].sort((a, b) => b.days - a.days);

    for (const period of sortedPeriods) {
        if (diffDays >= period.days) {
            const fullPeriods = Math.floor(diffDays / period.days);
            const remainingDays = diffDays % period.days;
            let total = fullPeriods * period.price;

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
    showToast(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' : 'Votre message a été envoyé avec succès! Nous vous contacterons bientôt');
    e.target.reset();
}

function handleReserve(e) {
    e.preventDefault();
    closeModal();
    showToast(currentLang === 'ar' ? '✅ تم تأكيد حجزك بنجاح! سنتواصل معك لتأكيد التفاصيل' : '✅ Votre réservation a été confirmée! Nous vous contacterons pour confirmer les détails');
    e.target.reset();
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
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
// 🚀 INIT
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    // عرض البيانات الافتراضية فوراً
    carsData = DEFAULT_CARS;
    renderCars();
    renderPricing();
    loadSiteInfo();
    switchLanguage('ar');
    
    // محاولة جلب البيانات من السحابة
    const success = await fetchCarsFromCloud();
    if (success && isCloudDataLoaded) {
        renderCars();
        renderPricing();
        showToast('✅ تم تحديث البيانات بنجاح!');
    }
});

// جعل الدوال عامة للوصول من admin
window.renderCars = renderCars;
window.renderPricing = renderPricing;
window.getCars = getCars;
window.loadSiteInfo = loadSiteInfo;
window.carsData = carsData;
window.siteData = siteData;
window.DEFAULT_CARS = DEFAULT_CARS;
window.updateCarsData = updateCarsData;
window.showToast = showToast;