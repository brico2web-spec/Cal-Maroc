// Admin Credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bahia2026';

// ============================================================
// 🔴🔴🔴 رابط JSONBin ومفتاح API الخاص بك 🔴🔴🔴
// ============================================================
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/6a9f3169ac6210605ab13d85';
const JSONBIN_KEY = '$2a$10$GDFKVACg4Ot83OdLGFYztuGjFQXhXmJa8uGrNaSSDj4XWtP6N3wb.';

// ============================================================
// البيانات الأساسية
// ============================================================
let carsData = [];
let siteData = {};

// ============================================================
// جلب البيانات من السحابة
// ============================================================
async function fetchCarsFromCloud() {
    try {
        const response = await fetch(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_KEY
            }
        });
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        if (data.record && data.record.cars && data.record.cars.length > 0) {
            carsData = data.record.cars;
        } else {
            // إذا كانت البيانات فارغة، نستخدم البيانات من script.js
            if (window.opener && window.opener.DEFAULT_CARS) {
                carsData = window.opener.DEFAULT_CARS;
            } else {
                carsData = [];
            }
        }
        if (data.record && data.record.site) {
            siteData = data.record.site;
        }
        return true;
    } catch (e) {
        console.warn('⚠️ تعذر جلب البيانات من السحابة');
        return false;
    }
}

// ============================================================
// حفظ البيانات في السحابة
// ============================================================
async function saveToCloud(cars, site) {
    try {
        const payload = {
            cars: cars || carsData,
            site: site || siteData
        };
        
        const response = await fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY
            },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) throw new Error('Save failed');
        console.log('✅ تم حفظ البيانات في السحابة');
        return true;
    } catch (e) {
        console.warn('⚠️ تعذر حفظ البيانات في السحابة:', e.message);
        return false;
    }
}

// ============================================================
// دوال البيانات
// ============================================================
function getCars() {
    return carsData;
}

function getSiteData() {
    return siteData;
}

async function saveCars(cars) {
    carsData = cars;
    const saved = await saveToCloud(carsData, siteData);
    
    // 🔥 تحديث الجدول في لوحة الإدارة
    renderCarsTable();
    
    // 🔥 تحديث الصفحة الرئيسية إذا كانت مفتوحة
    try {
        if (window.opener && !window.opener.closed) {
            // تحديث البيانات في الصفحة الرئيسية
            if (typeof window.opener.updateCarsData === 'function') {
                window.opener.updateCarsData(carsData);
            }
            if (typeof window.opener.renderCars === 'function') {
                window.opener.renderCars();
            }
            if (typeof window.opener.renderPricing === 'function') {
                window.opener.renderPricing();
            }
            // إظهار إشعار في الصفحة الرئيسية
            if (typeof window.opener.showToast === 'function') {
                window.opener.showToast('🔄 تم تحديث البيانات بنجاح!');
            }
        }
    } catch (e) {
        console.warn('⚠️ تعذر تحديث الصفحة الرئيسية:', e);
    }
    
    // 🔥 حفظ في localStorage كنسخة احتياطية
    try {
        localStorage.setItem('admin_cars_backup', JSON.stringify(carsData));
        localStorage.setItem('admin_cars_timestamp', Date.now().toString());
    } catch (e) {}
    
    if (saved) {
        showToast('✅ تم حفظ التغييرات ونشرها في جميع الأجهزة!');
    } else {
        showToast('⚠️ تم حفظ البيانات محلياً، لكن فشل النشر للسحابة');
    }
}

async function saveSiteData(data) {
    siteData = data;
    const saved = await saveToCloud(carsData, siteData);
    if (saved) {
        showToast('✅ تم حفظ المعلومات ونشرها في جميع الأجهزة!');
    } else {
        showToast('⚠️ تم حفظ البيانات محلياً، لكن فشل النشر للسحابة');
    }
}

// ============================================================
// CHECK SESSION
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCarsFromCloud();
    if (localStorage.getItem('adminSession') === 'active') {
        showDashboard();
        loadInfoForm();
        renderCarsTable();
    }
});

// ===== LOGIN =====
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    const errorEl = document.getElementById('login-error');

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('adminSession', 'active');
        showDashboard();
        loadInfoForm();
        renderCarsTable();
        showToast('✅ تم تسجيل الدخول بنجاح!');
    } else {
        errorEl.textContent = '❌ اسم المستخدم أو كلمة المرور غير صحيحة';
        document.getElementById('password').value = '';
    }
}

function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function logout() {
    localStorage.removeItem('adminSession');
    location.reload();
}

// ===== TABS =====
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById('tab-' + tabName).classList.add('active');
    document.querySelector('[data-tab="' + tabName + '"]').classList.add('active');

    const titles = { info: 'معلومات الشركة', cars: 'إدارة السيارات', sync: 'مزامنة البيانات', preview: 'معاينة الموقع' };
    document.getElementById('page-title').textContent = titles[tabName];
}

// ===== INFO MANAGEMENT =====
function loadInfoForm() {
    const data = getSiteData();
    document.getElementById('edit-phone').value = data.phone || '';
    document.getElementById('edit-phone2').value = data.phone2 || '';
    document.getElementById('edit-email').value = data.email || '';
    document.getElementById('edit-address').value = data.address || '';
    document.getElementById('edit-description').value = data.description || '';
}

function saveInfo(e) {
    e.preventDefault();
    const data = {
        phone: document.getElementById('edit-phone').value,
        phone2: document.getElementById('edit-phone2').value,
        email: document.getElementById('edit-email').value,
        address: document.getElementById('edit-address').value,
        description: document.getElementById('edit-description').value
    };
    saveSiteData(data);
    try {
        if (window.opener && !window.opener.closed) {
            if (typeof window.opener.loadSiteInfo === 'function') {
                window.opener.loadSiteInfo();
            }
            if (typeof window.opener.showToast === 'function') {
                window.opener.showToast('🔄 تم تحديث معلومات الشركة!');
            }
        }
    } catch (e) {}
}

// ===== CARS TABLE =====
function renderCarsTable() {
    const tbody = document.getElementById('cars-table-body');
    const cars = getCars();

    if (!cars || cars.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--gray-500);padding:2rem;">🚗 لا توجد سيارات مضافة بعد</td></tr>';
        return;
    }

    tbody.innerHTML = cars.map(car => {
        const statusText = car.status === 'available' ? '✅ متاحة' : '🔴 محجوزة';
        const statusClass = car.status === 'available' ? 'available' : 'reserved';

        let periodsHtml = '';
        if (car.periods && car.periods.length > 0) {
            periodsHtml = car.periods.map(p =>
                `<span class="period-entry">${p.days}j: ${p.price}DH</span>`
            ).join(' ');
        } else {
            periodsHtml = 'لا توجد فترات';
        }

        return `
            <tr>
                <td><img src="${car.img}" alt="${car.name}" class="car-thumb" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'"></td>
                <td><strong>${car.name}</strong></td>
                <td><span style="background:rgba(225,29,72,0.15);color:var(--primary-light);padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8rem;">${car.type}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td class="periods-cell">${periodsHtml}</td>
                <td>
                    <button onclick="editCar(${car.id})" class="btn-edit">✏️ تعديل</button>
                    <button onclick="deleteCar(${car.id})" class="btn-delete">🗑️ حذف</button>
                </td>
            </tr>
        `;
    }).join('');
}

let editingCarId = null;
let uploadedImageData = null;

// ===== PERIOD MANAGEMENT =====
function addPeriod(days = '', price = '') {
    const container = document.getElementById('periods-container');
    const div = document.createElement('div');
    div.className = 'period-item';
    div.innerHTML = `
        <div>
            <span class="period-label">عدد الأيام</span>
            <input type="number" class="period-days" placeholder="مثال: 3" value="${days}" min="1" required>
        </div>
        <div>
            <span class="period-label">السعر (DH)</span>
            <input type="number" class="period-price" placeholder="مثال: 700" value="${price}" min="0" required>
        </div>
        <button type="button" class="btn-remove-period" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

function loadPeriods(periods) {
    const container = document.getElementById('periods-container');
    container.innerHTML = '';
    if (periods && periods.length > 0) {
        periods.forEach(p => addPeriod(p.days, p.price));
    } else {
        addPeriod(1, '');
        addPeriod(3, '');
        addPeriod(7, '');
        addPeriod(30, '');
    }
}

function getPeriodsFromForm() {
    const items = document.querySelectorAll('.period-item');
    const periods = [];
    items.forEach(item => {
        const days = parseInt(item.querySelector('.period-days').value);
        const price = parseInt(item.querySelector('.period-price').value);
        if (days > 0 && price > 0) {
            periods.push({ days, price });
        }
    });
    periods.sort((a, b) => a.days - b.days);
    return periods;
}

// ===== IMAGE UPLOAD =====
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('❌ يرجى اختيار ملف صورة فقط', true);
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        showToast('❌ حجم الصورة يجب أن يكون أقل من 2 ميجابايت', true);
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImageData = e.target.result;
        const preview = document.getElementById('file-preview');
        preview.src = uploadedImageData;
        preview.classList.add('show');
        document.getElementById('file-name').textContent = file.name;
        document.getElementById('car-img-url').value = '';
    };
    reader.readAsDataURL(file);
}

// ===== CAR MODAL =====
function openCarModal() {
    editingCarId = null;
    uploadedImageData = null;
    document.getElementById('car-modal-title').textContent = 'إضافة سيارة جديدة';
    document.getElementById('car-form').reset();
    document.getElementById('car-id').value = '';
    document.getElementById('file-preview').classList.remove('show');
    document.getElementById('file-preview').src = '';
    document.getElementById('file-name').textContent = 'لم يتم اختيار صورة';
    document.getElementById('car-img-url').value = '';
    document.getElementById('car-status').value = 'available';
    loadPeriods([]);
    document.getElementById('car-modal').classList.add('active');
}

function closeCarModal() {
    document.getElementById('car-modal').classList.remove('active');
}

function editCar(id) {
    const cars = getCars();
    const car = cars.find(c => c.id === id);
    if (!car) return;

    editingCarId = id;
    document.getElementById('car-modal-title').textContent = 'تعديل سيارة';
    document.getElementById('car-id').value = car.id;
    document.getElementById('car-name').value = car.name;
    document.getElementById('car-type').value = car.type;
    document.getElementById('car-status').value = car.status || 'available';
    document.getElementById('car-img-url').value = car.img;

    if (car.img && car.img.startsWith('data:image')) {
        const preview = document.getElementById('file-preview');
        preview.src = car.img;
        preview.classList.add('show');
        document.getElementById('file-name').textContent = 'صورة مرفوعة';
    } else {
        document.getElementById('file-preview').classList.remove('show');
        document.getElementById('file-name').textContent = 'صورة من رابط';
    }

    loadPeriods(car.periods || []);
    document.getElementById('car-modal').classList.add('active');
}

async function saveCar(e) {
    e.preventDefault();

    const cars = getCars();
    const name = document.getElementById('car-name').value.trim();
    const type = document.getElementById('car-type').value;
    const status = document.getElementById('car-status').value;
    const imageUrl = document.getElementById('car-img-url').value.trim();
    const periods = getPeriodsFromForm();

    if (!name) {
        showToast('❌ يرجى إدخال اسم السيارة', true);
        return;
    }

    if (periods.length === 0) {
        showToast('❌ يرجى إضافة على الأقل فترة حجز واحدة', true);
        return;
    }

    let finalImage;
    if (uploadedImageData) {
        finalImage = uploadedImageData;
    } else if (imageUrl) {
        finalImage = imageUrl;
    } else {
        finalImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';
    }

    const carData = {
        id: editingCarId || Date.now(),
        name: name,
        type: type,
        status: status,
        img: finalImage,
        periods: periods
    };

    if (editingCarId) {
        const index = cars.findIndex(c => c.id === editingCarId);
        if (index !== -1) {
            cars[index] = carData;
        } else {
            cars.push(carData);
        }
        showToast('✅ تم تعديل السيارة بنجاح!');
    } else {
        cars.push(carData);
        showToast('✅ تم إضافة السيارة بنجاح!');
    }

    // 🔥 حفظ البيانات وتحديث كل شيء
    await saveCars(cars);
    
    // 🔥 تحديث الجدول فوراً
    renderCarsTable();
    
    // 🔥 إغلاق المودال
    closeCarModal();
    uploadedImageData = null;
    document.getElementById('car-form').reset();
    
    // 🔥 تحديث الصفحة الرئيسية إذا كانت مفتوحة
    try {
        if (window.opener && !window.opener.closed) {
            // ننتظر قليلاً للتأكد من حفظ البيانات
            setTimeout(() => {
                if (typeof window.opener.renderCars === 'function') {
                    window.opener.renderCars();
                }
                if (typeof window.opener.renderPricing === 'function') {
                    window.opener.renderPricing();
                }
                if (typeof window.opener.showToast === 'function') {
                    window.opener.showToast('🔄 تم تحديث قائمة السيارات!');
                }
            }, 500);
        }
    } catch (e) {
        console.warn('⚠️ تعذر تحديث الصفحة الرئيسية:', e);
    }
}

async function deleteCar(id) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    const cars = getCars().filter(c => c.id !== id);
    await saveCars(cars);
    renderCarsTable();

    try {
        if (window.opener && !window.opener.closed) {
            setTimeout(() => {
                if (typeof window.opener.renderCars === 'function') {
                    window.opener.renderCars();
                }
                if (typeof window.opener.renderPricing === 'function') {
                    window.opener.renderPricing();
                }
                if (typeof window.opener.showToast === 'function') {
                    window.opener.showToast('🗑️ تم حذف السيارة!');
                }
            }, 500);
        }
    } catch (e) {}

    showToast('🗑️ تم حذف السيارة');
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, isError = false) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = msg;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// ============================================================
// CLOSE MODAL ON OUTSIDE CLICK
// ============================================================
document.getElementById('car-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('car-modal')) closeCarModal();
});

// ============================================================
// KEYBOARD SHORTCUT
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('car-modal').classList.contains('active')) {
            closeCarModal();
        }
    }
});

// جعل الدوال عامة
window.getCars = getCars;
window.saveCars = saveCars;
window.getSiteData = getSiteData;
window.saveSiteData = saveSiteData;
window.renderCarsTable = renderCarsTable;
window.carsData = carsData;
window.siteData = siteData;