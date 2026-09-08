// Admin Credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bahia2026';

// ============================================================
// معلومات Supabase
// ============================================================
const SUPABASE_URL = 'https://ykuzhzhbxdfujbpaxqlu.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrdXpoemhieGRmdWpicGF4cWx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MTg1MTcsImV4cCI6MjEwNDM5NDUxN30.OUS_ZoC9_Lhk9nme23D7dSwK0pK1rfVivJXL6EF3xlc';

// ============================================================
// البيانات
// ============================================================
let carsData = [];
let siteData = {};
let slidersData = [];

// ============================================================
// جلب البيانات
// ============================================================
async function fetchCarsFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_URL}cars?select=*&order=id.asc`, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (!response.ok) return false;
        const cars = await response.json();
        carsData = (cars && cars.length > 0) ? cars : [];
        
        try {
            const siteResponse = await fetch(`${SUPABASE_URL}site_info?id=eq.1&select=*`, {
                headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
            });
            if (siteResponse.ok) {
                const site = await siteResponse.json();
                if (site && site.length > 0) siteData = site[0];
            }
        } catch (e) {}

        // جلب السلايدر
        await fetchSlidersFromSupabase();
        
        renderCarsTable();
        return true;
    } catch (error) { return false; }
}

// ========== دوال السلايدر ==========
async function fetchSlidersFromSupabase() {
    try {
        const response = await fetch(`${SUPABASE_URL}sliders?select=*&order=id.asc`, {
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (!response.ok) { slidersData = []; return; }
        const data = await response.json();
        slidersData = (data && data.length > 0) ? data : [];
        renderSlidersTable();
    } catch (e) { slidersData = []; }
}

function addSliderRow() {
    const container = document.getElementById('sliders-container');
    const div = document.createElement('div');
    div.className = 'slider-row';
    div.innerHTML = `
        <div class="form-group">
            <label>رابط الصورة (URL)</label>
            <input type="url" class="slider-img-url" placeholder="https://example.com/slide.jpg">
        </div>
        <div class="form-group">
            <label>العنوان الرئيسي (مثال: أفضل تأجير سيارات)</label>
            <input type="text" class="slider-title" placeholder="مثال: Groupe Bahia - Ahmed TOUR">
        </div>
        <div class="form-group">
            <label>العنوان الفرعي (مثال: توصيل مجاني)</label>
            <input type="text" class="slider-subtitle" placeholder="مثال: أفضل الأسعار في القنيطرة">
        </div>
        <button type="button" class="btn-delete" onclick="this.parentElement.remove()">🗑️ حذف</button>
    `;
    container.appendChild(div);
}

function renderSlidersTable() {
    const container = document.getElementById('sliders-container');
    if (!container) return;
    container.innerHTML = '';
    
    if (slidersData && slidersData.length > 0) {
        slidersData.forEach(s => {
            const div = document.createElement('div');
            div.className = 'slider-row';
            div.innerHTML = `
                <div class="form-group">
                    <label>رابط الصورة (URL)</label>
                    <input type="url" class="slider-img-url" value="${s.img || ''}" placeholder="https://example.com/slide.jpg">
                </div>
                <div class="form-group">
                    <label>العنوان الرئيسي</label>
                    <input type="text" class="slider-title" value="${s.title || ''}" placeholder="مثال: Groupe Bahia - Ahmed TOUR">
                </div>
                <div class="form-group">
                    <label>العنوان الفرعي</label>
                    <input type="text" class="slider-subtitle" value="${s.subtitle || ''}" placeholder="مثال: أفضل الأسعار في القنيطرة">
                </div>
                <div style="display:flex; align-items:flex-end;">
                    <button type="button" class="btn-delete" onclick="this.parentElement.parentElement.remove()">🗑️ حذف</button>
                </div>
            `;
            container.appendChild(div);
        });
    } else {
        // إضافة صف فارغ افتراضي
        addSliderRow();
    }
}

async function saveSliders() {
    const rows = document.querySelectorAll('.slider-row');
    const newSliders = [];
    
    rows.forEach(row => {
        const img = row.querySelector('.slider-img-url').value.trim();
        const title = row.querySelector('.slider-title').value.trim();
        const subtitle = row.querySelector('.slider-subtitle').value.trim();
        
        if (img) {
            newSliders.push({ img, title, subtitle });
        }
    });

    if (newSliders.length === 0) {
        showToast('❌ يرجى إدخال رابط صورة واحدة على الأقل', true);
        return;
    }

    try {
        // حذف القيم القديمة وإعادة الإدخال (أفضل طريقة للسلايدر لسهولة الترتيب)
        await fetch(`${SUPABASE_URL}sliders?id=neq.0`, {
            method: 'DELETE',
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });

        const response = await fetch(`${SUPABASE_URL}sliders`, {
            method: 'POST',
            headers: { 
                'apikey': SUPABASE_ANON_KEY, 
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(newSliders)
        });

        if (response.ok) {
            slidersData = newSliders;
            showToast('✅ تم حفظ السلايدر بنجاح!');
            // تحديث واجهة الزوار فوراً
            try {
                if (window.opener && !window.opener.closed) {
                    if (typeof window.opener.loadSliders === 'function') {
                        window.opener.loadSliders();
                    }
                }
            } catch (e) {}
        } else {
            showToast('❌ فشل حفظ السلايدر', true);
        }
    } catch (error) {
        showToast('❌ حدث خطأ أثناء الحفظ', true);
    }
}

function getCars() { return carsData; }
function getSiteData() { return siteData; }
function getSlidersData() { return slidersData; }

async function saveSiteToSupabase(site) {
    try {
        const response = await fetch(`${SUPABASE_URL}site_info?id=eq.1`, {
            method: 'PUT',
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
            body: JSON.stringify({ id: 1, phone: site.phone || '', phone2: site.phone2 || '', email: site.email || '', address: site.address || '', description: site.description || '' })
        });
        return response.ok;
    } catch (error) { return false; }
}

async function saveSiteData(data) {
    siteData = data;
    if (await saveSiteToSupabase(data)) showToast('✅ تم حفظ المعلومات!');
    else showToast('⚠️ تعذر حفظ المعلومات');
}

// ============================================================
// Session & Login
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    await fetchCarsFromSupabase();
    if (localStorage.getItem('adminSession') === 'active') {
        showDashboard(); loadInfoForm(); renderCarsTable(); renderSlidersTable();
    }
});

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem('adminSession', 'active');
        showDashboard(); loadInfoForm(); renderCarsTable(); renderSlidersTable();
        showToast('✅ تم تسجيل الدخول بنجاح!');
    } else {
        document.getElementById('login-error').textContent = '❌ بيانات الدخول غير صحيحة';
        document.getElementById('password').value = '';
    }
}

function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
}

function logout() { localStorage.removeItem('adminSession'); location.reload(); }

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tabName).classList.add('active');
    document.querySelector('[data-tab="' + tabName + '"]').classList.add('active');
    document.getElementById('page-title').textContent = { 
        info: 'معلومات الشركة', 
        cars: 'إدارة السيارات', 
        sliders: 'إدارة صور السلايدر', 
        preview: 'معاينة الموقع' 
    }[tabName];
}

// ===== INFO =====
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
    saveSiteData({
        phone: document.getElementById('edit-phone').value,
        phone2: document.getElementById('edit-phone2').value,
        email: document.getElementById('edit-email').value,
        address: document.getElementById('edit-address').value,
        description: document.getElementById('edit-description').value
    });
}

// ===== CARS TABLE =====
function renderCarsTable() {
    const tbody = document.getElementById('cars-table-body');
    const cars = getCars();
    if (!cars || cars.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:2rem;">🚗 لا توجد سيارات مضافة بعد</td></tr>';
        return;
    }

    tbody.innerHTML = cars.map(car => {
        const statusText = car.status === 'available' ? '✅ متاحة' : '🔴 محجوزة';
        const statusClass = car.status === 'available' ? 'available' : 'reserved';
        let periodsHtml = '';
        if (car.periods) {
            let periods = car.periods;
            if (typeof periods === 'string') { try { periods = JSON.parse(periods); } catch (e) { periods = []; } }
            if (periods && periods.length > 0) periodsHtml = periods.map(p => `<span class="period-entry">${p.days}j: ${p.price}DH</span>`).join(' ');
        }
        if (!periodsHtml) periodsHtml = 'لا توجد فترات';

        return `
            <tr>
                <td data-label="الصورة"><img src="${car.img}" alt="${car.name}" class="car-thumb" onerror="this.src='https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80'"></td>
                <td data-label="الاسم"><strong>${car.name}</strong></td>
                <td data-label="النوع"><span style="background:rgba(220,38,38,0.15);color:var(--primary);padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8rem;">${car.type}</span></td>
                <td data-label="الحالة"><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td data-label="فترات الحجز" class="periods-cell">${periodsHtml}</td>
                <td data-label="الإجراءات">
                    <button onclick="editCar(${car.id})" class="btn-edit">✏️ تعديل</button>
                    <button onclick="deleteCar(${car.id})" class="btn-delete">🗑️ حذف</button>
                </td>
            </tr>
        `;
    }).join('');
}

let editingCarId = null;
let uploadedImageData = null;

// ===== PERIODS =====
function addPeriod(days = '', price = '') {
    const container = document.getElementById('periods-container');
    const div = document.createElement('div');
    div.className = 'period-item';
    div.innerHTML = `
        <div>
            <span style="display:block;font-size:0.7rem;color:var(--text-muted);margin-bottom:0.2rem;">عدد الأيام</span>
            <input type="number" class="period-days" placeholder="مثال: 3" value="${days}" min="1" required>
        </div>
        <div>
            <span style="display:block;font-size:0.7rem;color:var(--text-muted);margin-bottom:0.2rem;">السعر (DH)</span>
            <input type="number" class="period-price" placeholder="مثال: 700" value="${price}" min="0" required>
        </div>
        <button type="button" class="btn-remove-period" onclick="this.parentElement.remove()">✕</button>
    `;
    container.appendChild(div);
}

function loadPeriods(periods) {
    const container = document.getElementById('periods-container');
    container.innerHTML = '';
    if (periods && periods.length > 0) periods.forEach(p => addPeriod(p.days, p.price));
    else { addPeriod(1, ''); addPeriod(3, ''); addPeriod(7, ''); addPeriod(30, ''); }
}

function getPeriodsFromForm() {
    const items = document.querySelectorAll('.period-item');
    const periods = [];
    items.forEach(item => {
        const days = parseInt(item.querySelector('.period-days').value);
        const price = parseInt(item.querySelector('.period-price').value);
        if (days > 0 && price > 0) periods.push({ days, price });
    });
    return periods.sort((a, b) => a.days - b.days);
}

// ===== IMAGE UPLOAD =====
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('❌ حجم الصورة يجب أن يكون أقل من 2 ميجابايت', true); return; }
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
    editingCarId = null; uploadedImageData = null;
    document.getElementById('car-modal-title').textContent = 'إضافة سيارة جديدة';
    document.getElementById('car-form').reset();
    document.getElementById('file-preview').classList.remove('show');
    document.getElementById('file-name').textContent = 'لم يتم اختيار صورة';
    document.getElementById('car-img-url').value = '';
    document.getElementById('car-status-toggle').checked = true;
    document.getElementById('status-text').textContent = '✅ متاحة حالياً';
    loadPeriods([]);
    document.getElementById('car-modal').classList.add('active');
}

function closeCarModal() { document.getElementById('car-modal').classList.remove('active'); }

function editCar(id) {
    const car = getCars().find(c => c.id === id);
    if (!car) return;
    editingCarId = id;
    document.getElementById('car-modal-title').textContent = 'تعديل سيارة';
    document.getElementById('car-id').value = car.id;
    document.getElementById('car-name').value = car.name;
    document.getElementById('car-type').value = car.type;
    document.getElementById('car-img-url').value = car.img;
    const isAvailable = car.status === 'available';
    document.getElementById('car-status-toggle').checked = isAvailable;
    document.getElementById('status-text').textContent = isAvailable ? '✅ متاحة حالياً' : '🔴 محجوزة حالياً';
    if (car.img && car.img.startsWith('data:image')) {
        const preview = document.getElementById('file-preview');
        preview.src = car.img; preview.classList.add('show');
        document.getElementById('file-name').textContent = 'صورة مرفوعة';
    } else {
        document.getElementById('file-preview').classList.remove('show');
        document.getElementById('file-name').textContent = 'صورة من رابط';
    }
    let periods = [];
    if (car.periods) {
        if (typeof car.periods === 'string') { try { periods = JSON.parse(car.periods); } catch (e) { periods = []; } }
        else periods = car.periods;
    }
    loadPeriods(periods);
    document.getElementById('car-modal').classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('car-status-toggle');
    const text = document.getElementById('status-text');
    if(toggle) {
        toggle.addEventListener('change', () => {
            if (toggle.checked) { text.textContent = '✅ متاحة حالياً'; text.style.color = 'var(--success)'; }
            else { text.textContent = '🔴 محجوزة حالياً'; text.style.color = '#ef4444'; }
        });
    }
});

// ===== SAVE CAR =====
async function saveCar(e) {
    e.preventDefault();
    try {
        const cars = getCars();
        const name = document.getElementById('car-name').value.trim();
        const type = document.getElementById('car-type').value;
        const status = document.getElementById('car-status-toggle').checked ? 'available' : 'reserved';
        const imageUrl = document.getElementById('car-img-url').value.trim();
        const periods = getPeriodsFromForm();
        if (!name) { showToast('❌ يرجى إدخال اسم السيارة', true); return; }
        if (periods.length === 0) { showToast('❌ يرجى إضافة فترة حجز واحدة على الأقل', true); return; }
        let finalImage;
        if (uploadedImageData && uploadedImageData.length < 500000) finalImage = uploadedImageData;
        else if (imageUrl) finalImage = imageUrl;
        else finalImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';
        const carData = { name, type, status, img: finalImage, periods };
        let saved = false;
        if (editingCarId) {
            const index = cars.findIndex(c => c.id === editingCarId);
            if (index !== -1) cars[index] = { ...cars[index], ...carData };
            else cars.push({ id: editingCarId, ...carData });
            const response = await fetch(`${SUPABASE_URL}cars?id=eq.${editingCarId}`, {
                method: 'PATCH',
                headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(carData)
            });
            if (response.ok) saved = true;
            showToast('✅ تم تعديل السيارة بنجاح!');
        } else {
            const newId = Date.now();
            cars.push({ id: newId, ...carData });
            const response = await fetch(`${SUPABASE_URL}cars`, {
                method: 'POST',
                headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
                body: JSON.stringify({ id: newId, ...carData })
            });
            if (response.ok) saved = true;
            showToast('✅ تم إضافة السيارة بنجاح!');
        }
        if (saved) { carsData = cars; renderCarsTable(); showToast('✅ تم حفظ السيارة!'); }
        else { localStorage.setItem('carsData', JSON.stringify(cars)); carsData = cars; renderCarsTable(); showToast('⚠️ تم الحفظ محلياً، فشل النشر للسحابة'); }
        try {
            if (window.opener && !window.opener.closed) {
                if (typeof window.opener.fetchCarsFromSupabase === 'function') await window.opener.fetchCarsFromSupabase();
                if (typeof window.opener.renderCars === 'function') window.opener.renderCars();
                if (typeof window.opener.renderPricing === 'function') window.opener.renderPricing();
                if (typeof window.opener.showToast === 'function') window.opener.showToast('✅ تم تحديث الموقع!');
            }
        } catch (e) {}
        closeCarModal();
        uploadedImageData = null;
        document.getElementById('car-form').reset();
    } catch (error) { showToast('❌ حدث خطأ أثناء حفظ السيارة', true); }
}

// ===== DELETE CAR =====
async function deleteCar(id) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    const cars = getCars().filter(c => c.id !== id);
    try {
        const response = await fetch(`${SUPABASE_URL}cars?id=eq.${id}`, {
            method: 'DELETE',
            headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
        });
        if (response.ok) { carsData = cars; renderCarsTable(); showToast('🗑️ تم حذف السيارة!'); }
        else throw new Error('فشل الحذف');
    } catch (e) {
        localStorage.setItem('carsData', JSON.stringify(cars));
        carsData = cars; renderCarsTable();
        showToast('⚠️ تم الحذف محلياً، فشل النشر للسحابة');
    }
    try {
        if (window.opener && !window.opener.closed) {
            if (typeof window.opener.fetchCarsFromSupabase === 'function') await window.opener.fetchCarsFromSupabase();
            if (typeof window.opener.renderCars === 'function') window.opener.renderCars();
            if (typeof window.opener.renderPricing === 'function') window.opener.renderPricing();
        }
    } catch (e) {}
}

// ===== TOAST =====
function showToast(msg, isError = false) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = msg;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

document.getElementById('car-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('car-modal')) closeCarModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('car-modal').classList.contains('active')) closeCarModal();
});

window.getCars = getCars;
window.getSiteData = getSiteData;
window.getSlidersData = getSlidersData;
window.saveSiteData = saveSiteData;
window.renderCarsTable = renderCarsTable;
window.fetchCarsFromSupabase = fetchCarsFromSupabase;
window.saveSliders = saveSliders;
window.addSliderRow = addSliderRow;