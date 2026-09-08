// ============================================================
// 🔴🔴🔴 معلومات Supabase 🔴🔴🔴
// ============================================================
const SUPABASE_URL = 'https://ykjtxziksebpypruvulp.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlranR4emlrc2VicHlwcnV2dWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MTQ2NzAsImV4cCI6MjEwNDM5MDY3MH0.Z8Z8CUusEkhrlHGHHsrlQGs8z0GRqzOPQaTjIPXVEME';

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
            renderCars();
            renderPricing();
        } else {
            carsData = [];
            console.log('📦 لا توجد سيارات في قاعدة البيانات');
        }
        
        // جلب معلومات الموقع
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
                    loadSiteInfo();
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
// عرض السيارات
// ============================================================
function renderCars() {
    const container = document.getElementById('cars-container') || document.querySelector('.cars-grid');
    if (!container) return;
    
    const cars = getCars();
    
    if (!cars || cars.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--gray-500);">🚗 لا توجد سيارات متاحة حالياً</p>';
        return;
    }
    
    container.innerHTML = cars.map(car => {
        const statusText = car.status === 'available' ? 'متاحة ✅' : 'محجوزة 🔴';
        const statusClass = car.status === 'available' ? 'available' : 'reserved';
        
        return `
            <div class="car-card" data-car-id="${car.id}">
                <div class="car-image">
                    <img src="${car.img}" alt="${car.name}" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p class="car-type">${car.type}</p>
                    <button class="btn-book" onclick="openBookingModal(${car.id})" ${car.status !== 'available' ? 'disabled' : ''}>
                        حجز الآن
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// عرض الأسعار
// ============================================================
function renderPricing() {
    const container = document.getElementById('pricing-container') || document.querySelector('.pricing-grid');
    if (!container) return;
    
    const cars = getCars();
    
    if (!cars || cars.length === 0) {
        container.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:2rem;color:var(--gray-500);">📋 لا توجد سيارات لعرض الأسعار</p>';
        return;
    }
    
    container.innerHTML = cars.map(car => {
        let periods = [];
        if (car.periods) {
            if (typeof car.periods === 'string') {
                try {
                    periods = JSON.parse(car.periods);
                } catch (e) {
                    periods = [];
                }
            } else {
                periods = car.periods;
            }
        }
        
        const pricesHtml = periods.length > 0 
            ? periods.map(p => `<div class="price-item"><span>${p.days} أيام</span><strong>${p.price} DH</strong></div>`).join('')
            : '<p>لا توجد أسعار متاحة</p>';
        
        return `
            <div class="price-card">
                <h3>${car.name}</h3>
                <p class="car-type">${car.type}</p>
                <div class="prices">
                    ${pricesHtml}
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================
// تحميل معلومات الموقع
// ============================================================
function loadSiteInfo() {
    const data = getSiteData();
    
    // تحديث رقم الهاتف
    const phoneElements = document.querySelectorAll('[data-phone]');
    phoneElements.forEach(el => {
        if (el.tagName === 'A') {
            el.href = `tel:${data.phone}`;
            el.textContent = data.phone;
        } else {
            el.textContent = data.phone;
        }
    });
    
    // تحديث الهاتف الثاني
    const phone2Elements = document.querySelectorAll('[data-phone2]');
    phone2Elements.forEach(el => {
        if (el.tagName === 'A') {
            el.href = `tel:${data.phone2}`;
            el.textContent = data.phone2;
        } else {
            el.textContent = data.phone2;
        }
    });
    
    // تحديث البريد الإلكتروني
    const emailElements = document.querySelectorAll('[data-email]');
    emailElements.forEach(el => {
        if (el.tagName === 'A') {
            el.href = `mailto:${data.email}`;
            el.textContent = data.email;
        } else {
            el.textContent = data.email;
        }
    });
    
    // تحديث العنوان
    const addressElements = document.querySelectorAll('[data-address]');
    addressElements.forEach(el => {
        el.textContent = data.address;
    });
    
    // تحديث الوصف
    const descElements = document.querySelectorAll('[data-description]');
    descElements.forEach(el => {
        el.textContent = data.description;
    });
}

// ============================================================
// دالة فتح نموذج الحجز
// ============================================================
function openBookingModal(carId) {
    const cars = getCars();
    const car = cars.find(c => c.id === carId);
    if (!car) return;
    
    // يمكنك إضافة نموذج حجز هنا
    console.log('حجز السيارة:', car.name);
    alert(`سيتم حجز السيارة: ${car.name}`);
}

// ============================================================
// تحميل البيانات عند تحميل الصفحة
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCarsFromSupabase();
});

// تحديث البيانات كل 10 ثوانٍ (اختياري)
setInterval(async () => {
    await fetchCarsFromSupabase();
}, 10000);
