// ============================================================
// 🔴🔴🔴 معلومات Supabase 🔴🔴🔴
// ============================================================
const SUPABASE_URL = 'https://ykuzhzhbxdfujbpaxqlu.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdXpoemhieGRmdWpicGF4cWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MTg1MTcsImV4cCI6MjEwNDM5NDUxN30.OUS_ZoC9_Lhk9nme23D7dSwK0pK1rfVivJXL6EF3xlc';

// ============================================================
// LANGUAGE SUPPORT
// ============================================================
const translations = {
    ar: {
        'nav.home': 'الرئيسية',
        'nav.vehicles': 'المركبات',
        'nav.features': 'المميزات',
        'nav.pricing': 'الأسعار',
        'nav.contact': 'اتصل بنا',
        'nav.admin': 'لوحة الإدارة',
        'nav.book': 'احجز الآن',
        'hero.badge': '🚗 تأجير السيارات - القنيطرة',
        'hero.title': 'أحمد تور<br><span class="gradient-text">لتأجير السيارات</span>',
        'hero.desc': 'أفضل أسعار تأجير السيارات في القنيطرة. أسطول حديث، خدمة احترافية، وتوصيل مجاني.',
        'hero.explore': 'استكشف المركبات',
        'hero.contact': 'تواصل معنا',
        'features.title': 'لماذا تختارنا؟',
        'features.subtitle': 'خدماتنا المميزة تجعل رحلتك أفضل',
        'features.bestPrice.title': 'أفضل الأسعار',
        'features.bestPrice.desc': 'أسعار تنافسية وشفافة بدون رسوم خفية',
        'features.modernFleet.title': 'أسطول حديث',
        'features.modernFleet.desc': 'سيارات جديدة ومجهزة بأحدث التقنيات',
        'features.support247.title': 'خدمة 24/7',
        'features.support247.desc': 'متاحون على مدار الساعة لخدمتكم',
        'vehicles.title': 'أسطول المركبات',
        'vehicles.subtitle': 'اختر السيارة المناسبة لاحتياجاتك',
        'pricing.title': 'أسعار التأجير',
        'pricing.subtitle': 'أسعار تبدأ من أرخص سعر في الموقع',
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
        'booking.location': 'مكان الإستلام',
        'booking.pickup': 'يوم الإستلام',
        'booking.return': 'يوم الرجوع',
        'booking.agency': '🏢 الوكالة',
        'booking.train': '🚉 محطة القطار',
        'booking.airport': '✈️ محطة المطار',
        'booking.carType': 'نوع السيارة',
        'booking.priceLabel': '💰 ثمن الكراء:',
        'booking.bookNow': '📝 حجز الآن',
        'pricing.from': 'من',
        'pricing.perDay': 'درهم/يوم',
        'map.title': '📍 موقعنا على الخريطة',
        'map.subtitle': 'زاوية شارع الإمام علي وشارع ياريك زياد - القنيطرة',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.vehicles': 'Véhicules',
        'nav.features': 'Caractéristiques',
        'nav.pricing': 'Tarifs',
        'nav.contact': 'Contact',
        'nav.admin': 'Tableau de bord',
        'nav.book': 'Réserver',
        'hero.badge': '🚗 Location de Voitures - Kénitra',
        'hero.title': 'Ahmed TOUR<br><span class="gradient-text">Location de Voitures</span>',
        'hero.desc': 'Meilleurs prix de location de voitures à Kénitra. Flotte moderne, service professionnel et livraison gratuite.',
        'hero.explore': 'Explorer les véhicules',
        'hero.contact': 'Nous contacter',
        'features.title': 'Pourquoi nous choisir ?',
        'features.subtitle': 'Nos services exclusifs rendent votre voyage meilleur',
        'features.bestPrice.title': 'Meilleurs prix',
        'features.bestPrice.desc': 'Prix compétitifs et transparents sans frais cachés',
        'features.modernFleet.title': 'Flotte moderne',
        'features.modernFleet.desc': 'Voitures neuves équipées des dernières technologies',
        'features.support247.title': 'Service 24/7',
        'features.support247.desc': 'Disponibles 24h/24 pour vous servir',
        'vehicles.title': 'Flotte de véhicules',
        'vehicles.subtitle': 'Choisissez la voiture adaptée à vos besoins',
        'pricing.title': 'Tarifs de location',
        'pricing.subtitle': 'Tarifs à partir du prix le plus bas du site',
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
        'booking.location': 'Lieu de retrait',
        'booking.pickup': 'Date de retrait',
        'booking.return': 'Date de retour',
        'booking.agency': '🏢 Agence',
        'booking.train': '🚉 Gare',
        'booking.airport': '✈️ Aéroport',
        'booking.carType': 'Type de voiture',
        'booking.priceLabel': '💰 Prix de location:',
        'booking.bookNow': '📝 Réserver maintenant',
        'pricing.from': 'à partir de',
        'pricing.perDay': 'DH/jour',
        'map.title': '📍 Notre emplacement sur la carte',
        'map.subtitle': 'Angle Rue Imam Ali et Rue Yarik Ziad - Kénitra',
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
// 🌓 تبديل الثيم
// ============================================================
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        if (icon) icon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        if (icon) icon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (icon) icon.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (icon) icon.textContent = '🌙';
    }
}

// ============================================================
// 🌐 جلب البيانات من Supabase
// ============================================================
let carsData = [];
let siteData = {};

async function fetchCarsFromSupabase() {
    try {
        console.log('🔄 جاري جلب البيانات من Supabase...');
        
        const response = await fetch(`${SUPABASE_URL}cars?select=*&order=id.asc`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (!response.ok) {
            console.warn('⚠️ فشل جلب السيارات:', response.status);
            return false;
        }
        
        const cars = await response.json();
        console.log('📦 البيانات المستلمة:', cars);
        
        if (cars && cars.length > 0) {
            carsData = cars;
            console.log('✅ تم جلب السيارات:', carsData.length, 'سيارة');
        } else {
            carsData = [];
            console.log('📦 لا توجد سيارات في قاعدة البيانات');
        }
        
        try {
            const siteResponse = await fetch(`${SUPABASE_URL}site_info?id=eq.1&select=*`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });
            
            if (siteResponse.ok) {
                const site = await siteResponse.json();
                if (site && site.length > 0) {
                    siteData = site[0];
                    console.log('✅ تم جلب معلومات الموقع');
                }
            }
        } catch (e) {
            console.warn('⚠️ تعذر جلب معلومات الموقع:', e.message);
        }
        
        return true;
    } catch (error) {
        console.warn('⚠️ تعذر جلب البيانات:', error.message);
        return false;
    }
}

function getCars() {
    return carsData;
}

function getSiteData() {
    return siteData;
}

function updateCarsData(newData) {
    if (newData && Array.isArray(newData)) {
        carsData = newData;
        renderCars();
        renderPricing();
        return true;
    }
    return false;
}

// ============================================================
// ⭐ RENDER CARS
// ============================================================
function renderCars() {
    const grid = document.getElementById('cars-grid');
    const cars = getCars();

    if (!cars || cars.length === 0) {
        grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">🚗 لا توجد سيارات متاحة حالياً</p>';
        return;
    }

    const typeColors = {
        'اقتصادية': { bg: '#eff6ff', border: '#3b82f6', tag: '#3b82f6', text: '#1e40af' },
        'عائلية': { bg: '#fffbeb', border: '#f59e0b', tag: '#f59e0b', text: '#92400e' },
        'فاخرة': { bg: '#f0fdf4', border: '#22c55e', tag: '#22c55e', text: '#166534' }
    };

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

        const colors = typeColors[car.type] || typeColors['اقتصادية'];

        let periodHtml = '';
        if (car.periods) {
            const periods = typeof car.periods === 'string' ? JSON.parse(car.periods) : car.periods;
            if (periods && periods.length > 0) {
                periodHtml = '<div class="car-periods">';
                periods.forEach(p => {
                    let periodKey = '';
                    if (p.days === 1) periodKey = 'period.daily';
                    else if (p.days === 3) periodKey = 'period.3days';
                    else if (p.days === 7) periodKey = 'period.7days';
                    else if (p.days === 14) periodKey = 'period.14days';
                    else if (p.days === 30) periodKey = 'period.monthly';
                    else periodKey = 'period.daily';

                    const label = translations[currentLang][periodKey] || p.days + ' يوم';
                    periodHtml += `
                        <span class="period-tag" style="border-color:${colors.border};background:${colors.bg}">
                            <span class="period-label" data-period-key="${periodKey}">${label}</span>
                            : <span class="period-price" style="color:${colors.tag}">${p.price} DH</span>
                        </span>
                    `;
                });
                periodHtml += '</div>';
            }
        }

        const periods = typeof car.periods === 'string' ? JSON.parse(car.periods) : (car.periods || []);
        const dailyPrice = periods.length > 0 ?
            periods.find(p => p.days === 1)?.price || periods[0].price :
            0;

        const isReserved = car.status === 'reserved';
        const bookText = isReserved ? translations[currentLang]['reserve.reserved'] : translations[currentLang]['reserve.book'];

        return `
            <div class="car-card" style="border-top-color: ${colors.border} !important;">
                <div class="car-image">
                    <img src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'">
                    <span class="car-badge ${statusClass}">${statusText}</span>
                    <span class="car-type-badge" style="background:${colors.bg};color:${colors.tag};border:1px solid ${colors.border}">
                        ${typeText}
                    </span>
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <h3 style="color:${colors.text}">${car.name}</h3>
                        <span class="car-tag" style="background:${colors.bg};color:${colors.tag};border-color:${colors.border}">
                            ${typeText}
                        </span>
                    </div>
                    <div class="car-price">
                        ${dailyPrice} 
                        <small>DH / ${translations[currentLang]['period.daily']}</small>
                    </div>
                    ${periodHtml}
                    <button onclick="openReserve('${car.name}', ${car.id})" class="btn-secondary" ${isReserved ? 'disabled style="opacity:0.5;cursor:not-allowed;"' : ''} style="border-color:${colors.border};color:${colors.tag};">
                        ${bookText}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// ⭐ RENDER PRICING
// ============================================================
function renderPricing() {
    const grid = document.getElementById('pricing-grid');
    const cars = getCars();

    const typeOrder = ['عائلية', 'اقتصادية', 'فاخرة'];
    
    const typeColors = {
        'اقتصادية': { bg: '#eff6ff', border: '#3b82f6', text: '#2563eb', icon: '💙' },
        'عائلية': { bg: '#fffbeb', border: '#f59e0b', text: '#d97706', icon: '🧡' },
        'فاخرة': { bg: '#f0fdf4', border: '#22c55e', text: '#16a34a', icon: '💚' }
    };

    const typeLabels = {
        'اقتصادية': translations[currentLang]['type.economy'],
        'عائلية': translations[currentLang]['type.family'],
        'فاخرة': translations[currentLang]['type.luxury']
    };

    const typeData = typeOrder.map(type => {
        const carsOfType = cars.filter(c => c.type === type);
        let minPrice = Infinity;
        carsOfType.forEach(car => {
            const periods = typeof car.periods === 'string' ? JSON.parse(car.periods) : (car.periods || []);
            const daily = periods.find(p => p.days === 1)?.price || periods[0]?.price || 0;
            if (daily > 0 && daily < minPrice) minPrice = daily;
        });
        return { 
            type, 
            count: carsOfType.length, 
            minPrice: minPrice === Infinity ? 0 : minPrice,
            color: typeColors[type] || typeColors['اقتصادية']
        };
    });

    grid.innerHTML = typeData.map((data, index) => {
        const isFeatured = index === 1;
        const priceDisplay = data.minPrice > 0 ? data.minPrice : '---';
        const color = data.color;
        
        return `
            <div class="pricing-card ${isFeatured ? 'featured' : ''}" style="border-color: ${isFeatured ? color.border : 'var(--border)'};">
                ${isFeatured ? '<div class="badge-popular">🌟 ' + (currentLang === 'ar' ? 'الأكثر طلباً' : 'Le plus demandé') + '</div>' : ''}
                <div class="pricing-icon" style="background:${color.bg};color:${color.text};font-size:2rem;width:4rem;height:4rem;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;border:2px solid ${color.border}">
                    ${color.icon}
                </div>
                <h3 style="color:${color.text}">${typeLabels[data.type]}</h3>
                <div class="price">
                    ${priceDisplay} 
                    <span>${translations[currentLang]['pricing.perDay']}</span>
                </div>
                <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1rem;">
                    ${translations[currentLang]['pricing.from']} ${priceDisplay} ${currentLang === 'ar' ? 'درهم/يوم' : 'DH/jour'}
                </p>
                <ul>
                    <li>✓ ${currentLang === 'ar' ? 'تأمين شامل' : 'Assurance complète'}</li>
                    <li>✓ ${currentLang === 'ar' ? 'مسافة غير محدودة' : 'Kilométrage illimité'}</li>
                    <li>✓ ${currentLang === 'ar' ? 'خدمة التوصيل' : 'Service de livraison'}</li>
                    ${isFeatured ? '<li>✓ ' + (currentLang === 'ar' ? 'مقعد أطفال مجاني' : 'Siège enfant gratuit') + '</li>' : ''}
                    <li>✓ ${currentLang === 'ar' ? 'دعم على مدار الساعة' : 'Support 24/7'}</li>
                </ul>
                <button onclick="openReserve('${typeLabels[data.type]}')" class="${isFeatured ? 'btn-primary' : 'btn-secondary'}" style="${isFeatured ? '' : 'border-color:' + color.border + ';color:' + color.text + ';'}">
                    ${currentLang === 'ar' ? 'احجز الآن' : 'Réserver'}
                </button>
            </div>
        `;
    }).join('');
}

function loadSiteInfo() {
    const data = getSiteData();
    document.getElementById('info-phone').textContent = data.phone || '06 61 17 01 82';
    document.getElementById('info-phone2').textContent = data.phone2 || '05 37 37 88 89';
    document.getElementById('info-email').textContent = data.email || 'ahmadi2011@live.fr';
    document.getElementById('info-address').textContent = data.address || 'زاوية شارع الإمام علي وشارع ياريك زياد - القنيطرة';

    const descEl = document.getElementById('hero-desc');
    if (currentLang === 'ar') {
        descEl.textContent = data.description || translations.ar['hero.desc'];
    } else {
        descEl.textContent = data.description ? data.description.replace(/القنيطرة/g, 'Kénitra') : translations.fr['hero.desc'];
    }
}

// ============================================================
// 📋 إدارة حقول الحجز
// ============================================================
function updateBookingPrice() {
    const pickupDate = document.getElementById('pickup-date')?.value;
    const returnDate = document.getElementById('return-date')?.value;
    const carType = document.getElementById('car-type-select')?.value;
    const priceField = document.getElementById('booking-price');
    
    if (!priceField) return;
    
    if (!pickupDate || !returnDate) {
        priceField.textContent = '0 DH';
        return;
    }
    
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        priceField.textContent = '0 DH';
        return;
    }
    
    const cars = getCars();
    const filteredCars = cars.filter(c => c.type === carType);
    
    if (filteredCars.length === 0) {
        priceField.textContent = '0 DH';
        return;
    }
    
    const firstCar = filteredCars[0];
    const periods = typeof firstCar.periods === 'string' ? JSON.parse(firstCar.periods) : (firstCar.periods || []);
    
    if (periods.length === 0) {
        priceField.textContent = '0 DH';
        return;
    }
    
    let bestPrice = 0;
    const sortedPeriods = [...periods].sort((a, b) => b.days - a.days);
    
    for (const period of sortedPeriods) {
        if (diffDays >= period.days) {
            const fullPeriods = Math.floor(diffDays / period.days);
            const remainingDays = diffDays % period.days;
            let total = fullPeriods * period.price;
            
            if (remainingDays > 0) {
                const remainingPeriod = periods.find(p => p.days === 1);
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
    
    if (bestPrice === 0 && periods.length > 0) {
        const daily = periods.find(p => p.days === 1) || periods[0];
        bestPrice = daily.price * diffDays;
    }
    
    priceField.textContent = bestPrice + ' DH';
}

// ============================================================
// 📝 زر "حجز الآن"
// ============================================================
function bookNow() {
    const pickupDate = document.getElementById('pickup-date')?.value;
    const returnDate = document.getElementById('return-date')?.value;
    const carType = document.getElementById('car-type-select')?.value;
    const location = document.getElementById('pickup-location')?.value;
    
    if (!pickupDate || !returnDate) {
        showToast(currentLang === 'ar' ? '❌ يرجى تحديد تاريخ الإستلام وتاريخ الرجوع' : '❌ Veuillez sélectionner les dates de retrait et de retour');
        return;
    }
    
    if (!carType) {
        showToast(currentLang === 'ar' ? '❌ يرجى اختيار نوع السيارة' : '❌ Veuillez sélectionner le type de voiture');
        return;
    }
    
    // الحصول على اسم سيارة من النوع المختار
    const cars = getCars();
    const filteredCars = cars.filter(c => c.type === carType);
    let carName = carType;
    if (filteredCars.length > 0) {
        carName = filteredCars[0].name;
    }
    
    document.getElementById('car-type').value = carName + ' - ' + location;
    document.getElementById('start-date').value = pickupDate;
    document.getElementById('end-date').value = returnDate;
    
    currentCarId = null;
    if (filteredCars.length > 0) {
        currentCarId = filteredCars[0].id;
    }
    updatePrice();
    
    document.getElementById('reserve-modal').classList.add('active');
}

// ============================================================
// 💬 إرسال رسالة واتساب
// ============================================================
function sendWhatsAppBooking(carName, carType, customerName, phone, startDate, endDate, totalPrice, location) {
    const whatsappNumber = '0601749553';
    
    // الحصول على التاريخ والوقت الحالي
    const now = new Date();
    const dateStr = now.toLocaleDateString('ar-MA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const timeStr = now.toLocaleTimeString('ar-MA', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // تحديد نوع السيارة بالعربي
    let typeDisplay = carType;
    if (carType === 'اقتصادية') typeDisplay = 'اقتصادية';
    else if (carType === 'عائلية') typeDisplay = 'عائلية';
    else if (carType === 'فاخرة') typeDisplay = 'فاخرة';
    else typeDisplay = carType;
    
    // تحديد اسم السيارة
    let carDisplay = carName;
    const typeMatch = carName.match(/اقتصادية|عائلية|فاخرة/);
    if (typeMatch) {
        carDisplay = carName.replace(typeMatch[0], '').replace(/[()\-]/g, '').trim();
        if (!carDisplay) carDisplay = carName;
    }
    
    // ✅ بناء الرسالة مع الاسم الصحيح
    const message = `🚗 *طلب حجز سيارة جديد* 🚗
    
📋 *تفاصيل الحجز:*
• 🚙 السيارة: ${carDisplay} (${typeDisplay})
• 👤 الاسم: ${customerName}
• 📱 الهاتف: ${phone}
• 📅 تاريخ الإستلام: ${startDate}
• 📅 تاريخ الرجوع: ${endDate}
• 📍 مكان الإستلام: ${location || 'لم يتم التحديد'}
• 💰 السعر الإجمالي: ${totalPrice}

📌 *يرجى تأكيد الحجز في أقرب وقت.*
    
📍 *Ahmed TOUR - Groupe Bahia*
📍 *Kénitra, Maroc
📅 تاريخ الإرسال: ${dateStr} - ${timeStr}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
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

    if (!car || !car.periods) {
        priceEl.textContent = '0 DH';
        return;
    }

    const periods = typeof car.periods === 'string' ? JSON.parse(car.periods) : (car.periods || []);
    if (periods.length === 0) {
        priceEl.textContent = '0 DH';
        return;
    }

    let bestPrice = 0;
    const sortedPeriods = [...periods].sort((a, b) => b.days - a.days);

    for (const period of sortedPeriods) {
        if (diffDays >= period.days) {
            const fullPeriods = Math.floor(diffDays / period.days);
            const remainingDays = diffDays % period.days;
            let total = fullPeriods * period.price;

            if (remainingDays > 0) {
                const remainingPeriod = periods.find(p => p.days === 1);
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

    if (bestPrice === 0 && periods.length > 0) {
        const daily = periods.find(p => p.days === 1) || periods[0];
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

// ============================================================
// 🔄 دالة handleReserve (المعدلة - تظهر الاسم بشكل صحيح)
// ============================================================
function handleReserve(e) {
    e.preventDefault();
    
    // جلب البيانات من النموذج
    const carFullName = document.getElementById('car-type')?.value || '';
    
    // ✅ جلب الاسم الكامل من الحقل الأول في المودال
    const nameInputs = document.querySelectorAll('#reserve-modal input[type="text"]');
    const customerName = nameInputs.length > 0 ? nameInputs[0].value : '';
    
    // ✅ جلب رقم الهاتف
    const phoneInputs = document.querySelectorAll('#reserve-modal input[type="tel"]');
    const phone = phoneInputs.length > 0 ? phoneInputs[0].value : '';
    
    const startDate = document.getElementById('start-date')?.value || '';
    const endDate = document.getElementById('end-date')?.value || '';
    const totalPrice = document.getElementById('total-price')?.textContent || '0 DH';
    const location = document.getElementById('pickup-location')?.value || 'لم يتم التحديد';
    
    // ✅ التحقق من صحة البيانات
    if (!customerName || customerName.trim() === '') {
        showToast(currentLang === 'ar' ? '❌ يرجى إدخال الاسم الكامل' : '❌ Veuillez entrer votre nom complet');
        return;
    }
    
    if (!phone || phone.trim() === '') {
        showToast(currentLang === 'ar' ? '❌ يرجى إدخال رقم الهاتف' : '❌ Veuillez entrer votre numéro de téléphone');
        return;
    }
    
    // استخراج اسم السيارة والنوع
    let carName = carFullName;
    let carType = '';
    
    // البحث عن النوع في النص
    const typeMatch = carFullName.match(/اقتصادية|عائلية|فاخرة/);
    if (typeMatch) {
        carType = typeMatch[0];
        carName = carFullName.replace(typeMatch[0], '').replace(/[()\-]/g, '').trim();
        if (!carName) carName = carFullName;
    } else {
        // إذا لم يتم العثور على نوع، نبحث عن السيارة في قاعدة البيانات
        const cars = getCars();
        const foundCar = cars.find(c => carFullName.includes(c.name));
        if (foundCar) {
            carName = foundCar.name;
            carType = foundCar.type;
        } else {
            carName = carFullName;
            carType = 'غير محدد';
        }
    }
    
    // إغلاق المودال
    closeModal();
    
    // إظهار رسالة تأكيد
    showToast(currentLang === 'ar' ? '✅ جاري توجيهك إلى واتساب لتأكيد الحجز...' : '✅ Redirection vers WhatsApp pour confirmer la réservation...');
    
    // إرسال رسالة واتساب مع البيانات الصحيحة
    sendWhatsAppBooking(
        carName,
        carType,
        customerName,   // ✅ الآن الاسم صحيح
        phone,
        startDate,
        endDate,
        totalPrice,
        location
    );
    
    // إعادة تعيين النموذج
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
document.addEventListener('DOMContentLoaded', async function() {
    loadTheme();
    
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');
    const carTypeSelect = document.getElementById('car-type-select');
    const pickupLocation = document.getElementById('pickup-location');
    
    if (pickupDate) {
        pickupDate.addEventListener('change', updateBookingPrice);
        const today = new Date();
        pickupDate.value = today.toISOString().split('T')[0];
    }
    
    if (returnDate) {
        returnDate.addEventListener('change', updateBookingPrice);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        returnDate.value = tomorrow.toISOString().split('T')[0];
    }
    
    if (carTypeSelect) {
        carTypeSelect.addEventListener('change', updateBookingPrice);
    }
    
    if (pickupLocation) {
        pickupLocation.addEventListener('change', updateBookingPrice);
    }
    
    setTimeout(updateBookingPrice, 500);
    
    const grid = document.getElementById('cars-grid');
    grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">⏳ جاري تحميل البيانات...</p>';
    
    const success = await fetchCarsFromSupabase();
    
    if (success && carsData.length > 0) {
        renderCars();
        renderPricing();
        loadSiteInfo();
        switchLanguage('ar');
        showToast('✅ تم تحميل البيانات بنجاح!');
    } else {
        grid.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">⚠️ لا توجد سيارات، يرجى إضافة سيارات من لوحة الإدارة</p>';
        renderPricing();
        switchLanguage('ar');
    }
});

// جعل الدوال عامة
window.renderCars = renderCars;
window.renderPricing = renderPricing;
window.getCars = getCars;
window.loadSiteInfo = loadSiteInfo;
window.updateCarsData = updateCarsData;
window.showToast = showToast;
window.carsData = carsData;
window.siteData = siteData;
window.fetchCarsFromSupabase = fetchCarsFromSupabase;
window.toggleTheme = toggleTheme;
window.loadTheme = loadTheme;
window.updateBookingPrice = updateBookingPrice;
window.bookNow = bookNow;