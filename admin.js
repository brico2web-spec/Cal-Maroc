// Admin Credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bahia2026';

// ============================================================
// 🔴🔴🔴 معلومات Supabase 🔴🔴🔴
// ============================================================
const SUPABASE_URL = 'https://ykjtxziksebpypruvulp.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlranR4emlrc2VicHlwcnV2dWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MTQ2NzAsImV4cCI6MjEwNDM5MDY3MH0.Z8Z8CUusEkhrlHGHHsrlQGs8z0GRqzOPQaTjIPXVEME';

// ============================================================
// البيانات
// ============================================================
let carsData = [];
let siteData = {};

// ============================================================
// جلب البيانات من Supabase
// ============================================================
async function fetchCarsFromSupabase() {
    try {
        console.log('🔄 جاري جلب البيانات من Supabase...');
        
        const carsResponse = await fetch(`${SUPABASE_URL}cars?select=*&order=id.asc`, {
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });
        
        if (!carsResponse.ok) {
            console.warn('⚠️ فشل جلب السيارات:', carsResponse.status);
            return false;
        }
        
        const cars = await carsResponse.json();
        console.log('📦 البيانات المستلمة:', cars);
        
        if (cars && cars.length > 0) {
            carsData = cars;
            console.log('✅ تم جلب السيارات:', carsData.length, 'سيارة');
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

// ============================================================
// حفظ البيانات في Supabase
// ============================================================
async function saveCarsToSupabase(cars) {
    try {
        console.log('💾 جاري حفظ السيارات في Supabase...');
        console.log('📦 عدد السيارات:', cars ? cars.length : 0);
        
        if (!cars || cars.length === 0) {
            console.log('📦 لا توجد سيارات للحفظ');
            return true;
        }
        
        // تحضير البيانات - تأكد من أن كل حقل موجود
        const carsToSave = cars.map(car => {
            // التأكد من أن periods هي JSON string
            let periodsJson = car.periods;
            if (typeof periodsJson !== 'string') {
                periodsJson = JSON.stringify(periodsJson || []);
            }
            
            return {
                id: Number(car.id), // تأكد من أن id رقم
                name: String(car.name || ''),
                type: String(car.type || 'اقتصادية'),
                img: String(car.img || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'),
                status: String(car.status || 'available'),
                periods: periodsJson
            };
        });
        
        console.log('📤 البيانات المرسلة:', JSON.stringify(carsToSave, null, 2));
        
        // ⭐⭐⭐ طريقة جديدة: استخدام UPSERT بدلاً من DELETE + INSERT ⭐⭐⭐
        // هذا يحل مشكلة RLS
        
        // أولاً: نجرب إدراج مباشر
        const insertResponse = await fetch(`${SUPABASE_URL}cars`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation,resolution=merge-duplicates'
            },
            body: JSON.stringify(carsToSave)
        });
        
        console.log('📥 نتيجة الإدراج:', insertResponse.status);
        
        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            console.error('❌ خطأ في الإدراج:', errorText);
            
            // إذا فشل الإدراج، نحاول حذف ثم إدراج
            console.log('🔄 محاولة الحذف ثم الإدراج...');
            
            // حذف جميع السيارات الحالية
            await fetch(`${SUPABASE_URL}cars?id=neq.0`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });
            
            // إدراج السيارات الجديدة
            const retryResponse = await fetch(`${SUPABASE_URL}cars`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify(carsToSave)
            });
            
            if (!retryResponse.ok) {
                const errorText2 = await retryResponse.text();
                console.error('❌ فشل المحاولة الثانية:', errorText2);
                throw new Error('فشل حفظ السيارات: ' + errorText2);
            }
            
            console.log('✅ تم حفظ السيارات بعد المحاولة الثانية');
            return true;
        }
        
        const result = await insertResponse.json();
        console.log('✅ تم حفظ السيارات في Supabase:', result);
        return true;
        
    } catch (error) {
        console.warn('⚠️ تعذر حفظ السيارات:', error.message);
        return false;
    }
}

async function saveSiteToSupabase(site) {
    try {
        console.log('💾 جاري حفظ معلومات الموقع...');
        
        const response = await fetch(`${SUPABASE_URL}site_info?id=eq.1`, {
            method: 'PUT',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                id: 1,
                phone: site.phone || '',
                phone2: site.phone2 || '',
                email: site.email || '',
                address: site.address || '',
                description: site.description || ''
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ خطأ في حفظ معلومات الموقع:', errorText);
            throw new Error('فشل حفظ معلومات الموقع');
        }
        
        console.log('✅ تم حفظ معلومات الموقع في Supabase');
        return true;
    } catch (error) {
        console.warn('⚠️ تعذر حفظ معلومات الموقع:', error.message);
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
    
    // حفظ في Supabase
    const saved = await saveCarsToSupabase(carsData);
    
    // تحديث الجدول
    renderCarsTable();
    
    // تحديث الصفحة الرئيسية
    try {
        if (window.opener && !window.opener.closed) {
            if (typeof window.opener.updateCarsData === 'function') {
                window.opener.updateCarsData(carsData);
            }
            if (typeof window.opener.renderCars === 'function') {
                window.opener.renderCars();
            }
            if (typeof window.opener.renderPricing === 'function') {
                window.opener.renderPricing();
            }
            if (typeof window.opener.showToast === 'function') {
                window.opener.showToast('🔄 تم تحديث قائمة السيارات!');
            }
        }
    } catch (e) {
        console.warn('⚠️ تعذر تحديث الصفحة الرئيسية:', e);
    }
    
    if (saved) {
        showToast('✅ تم حفظ التغييرات ونشرها في جميع الأجهزة!');
    } else {
        showToast('⚠️ تعذر حفظ البيانات في السحابة، تم الحفظ محلياً');
    }
}

async function saveSiteData(data) {
    siteData = data;
    const saved = await saveSiteToSupabase(data);
    if (saved) {
        showToast('✅ تم حفظ المعلومات ونشرها في جميع الأجهزة!');
    } else {
        showToast('⚠️ تعذر حفظ المعلومات في السحابة');
    }
}

// ============================================================
// CHECK SESSION
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCarsFromSupabase();
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
        if (car.periods) {
            const periods = typeof car.periods === 'string' ? JSON.parse(car.periods) : car.periods;
            if (periods && periods.length > 0) {
                periodsHtml = periods.map(p =>
                    `<span class="period-entry">${p.days}j: ${p.price}DH</span>`
                ).join(' ');
            }
        }
        if (!periodsHtml) periodsHtml = 'لا توجد فترات';

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

    const periods = typeof car.periods === 'string' ? JSON.parse(car.periods) : (car.periods || []);
    loadPeriods(periods);
    document.getElementById('car-modal').classList.add('active');
}

// ===== ⭐⭐⭐ دالة حفظ السيارة (المعدلة نهائياً) ⭐⭐⭐ =====
async function saveCar(e) {
    e.preventDefault();

    try {
        // جلب البيانات من النموذج
        const name = document.getElementById('car-name').value.trim();
        const type = document.getElementById('car-type').value;
        const status = document.getElementById('car-status').value;
        const imageUrl = document.getElementById('car-img-url').value.trim();
        const periods = getPeriodsFromForm();

        // التحقق من صحة البيانات
        if (!name) {
            showToast('❌ يرجى إدخال اسم السيارة', true);
            return;
        }

        if (periods.length === 0) {
            showToast('❌ يرجى إضافة على الأقل فترة حجز واحدة', true);
            return;
        }

        // تحديد الصورة
        let finalImage;
        if (uploadedImageData) {
            finalImage = uploadedImageData;
        } else if (imageUrl) {
            finalImage = imageUrl;
        } else {
            finalImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';
        }

        // إنشاء كائن السيارة
        const carData = {
            id: editingCarId || Date.now(),
            name: name,
            type: type,
            status: status,
            img: finalImage,
            periods: periods
        };

        console.log('🚗 بيانات السيارة الجديدة:', carData);

        // الحصول على قائمة السيارات الحالية
        let cars = getCars();
        if (!cars || !Array.isArray(cars)) {
            cars = [];
        }

        // إضافة أو تعديل السيارة
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

        // ⭐⭐⭐ حفظ في Supabase ⭐⭐⭐
        console.log('💾 جاري حفظ في Supabase...');
        const saved = await saveCarsToSupabase(cars);
        
        if (saved) {
            // تحديث البيانات المحلية
            carsData = cars;
            renderCarsTable();
            showToast('✅ تم حفظ السيارة ونشرها في جميع الأجهزة!');
        } else {
            // حفظ في localStorage كنسخة احتياطية
            try {
                localStorage.setItem('carsData', JSON.stringify(cars));
                carsData = cars;
                renderCarsTable();
                showToast('⚠️ تم حفظ السيارة محلياً، فشل النشر للسحابة');
            } catch (e) {
                showToast('❌ فشل حفظ السيارة', true);
            }
        }

        // تحديث الصفحة الرئيسية
        try {
            if (window.opener && !window.opener.closed) {
                setTimeout(async () => {
                    if (typeof window.opener.fetchCarsFromSupabase === 'function') {
                        await window.opener.fetchCarsFromSupabase();
                    }
                    if (typeof window.opener.renderCars === 'function') {
                        window.opener.renderCars();
                    }
                    if (typeof window.opener.renderPricing === 'function') {
                        window.opener.renderPricing();
                    }
                    if (typeof window.opener.showToast === 'function') {
                        window.opener.showToast('✅ تم إضافة سيارة جديدة!');
                    }
                }, 1000);
            }
        } catch (e) {
            console.warn('⚠️ تعذر تحديث الصفحة الرئيسية:', e);
        }

        // إغلاق المودال وتنظيف
        closeCarModal();
        uploadedImageData = null;
        document.getElementById('car-form').reset();
        
    } catch (error) {
        console.error('❌ خطأ في حفظ السيارة:', error);
        showToast('❌ حدث خطأ أثناء حفظ السيارة: ' + error.message, true);
    }
}

async function deleteCar(id) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    const cars = getCars().filter(c => c.id !== id);
    
    const saved = await saveCarsToSupabase(cars);
    if (saved) {
        carsData = cars;
        renderCarsTable();
        showToast('🗑️ تم حذف السيارة ونشرها في جميع الأجهزة!');
    } else {
        try {
            localStorage.setItem('carsData', JSON.stringify(cars));
            carsData = cars;
            renderCarsTable();
            showToast('⚠️ تم حذف السيارة محلياً، فشل النشر للسحابة');
        } catch (e) {
            showToast('❌ فشل حذف السيارة', true);
        }
    }

    try {
        if (window.opener && !window.opener.closed) {
            setTimeout(async () => {
                if (typeof window.opener.fetchCarsFromSupabase === 'function') {
                    await window.opener.fetchCarsFromSupabase();
                }
                if (typeof window.opener.renderCars === 'function') {
                    window.opener.renderCars();
                }
                if (typeof window.opener.renderPricing === 'function') {
                    window.opener.renderPricing();
                }
                if (typeof window.opener.showToast === 'function') {
                    window.opener.showToast('🗑️ تم حذف السيارة!');
                }
            }, 1000);
        }
    } catch (e) {}
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
window.fetchCarsFromSupabase = fetchCarsFromSupabase;