// Admin Credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bahia2026';

// Check session on load
document.addEventListener('DOMContentLoaded', () => {
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

    const titles = { info: 'معلومات الشركة', cars: 'إدارة السيارات', preview: 'معاينة الموقع' };
    document.getElementById('page-title').textContent = titles[tabName];
}

// ===== INFO MANAGEMENT =====
function loadInfoForm() {
    const data = JSON.parse(localStorage.getItem('siteData')) || {};
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
    localStorage.setItem('siteData', JSON.stringify(data));
    showToast('✅ تم حفظ المعلومات بنجاح!');
}

// ===== CARS MANAGEMENT =====
function getCars() {
    try {
        const data = localStorage.getItem('carsData');
        if (!data) return [];
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveCars(cars) {
    localStorage.setItem('carsData', JSON.stringify(cars));
    // Update main page if open
    if (window.opener && !window.opener.closed) {
        try {
            if (typeof window.opener.renderCars === 'function') {
                window.opener.renderCars();
            }
            if (typeof window.opener.renderPricing === 'function') {
                window.opener.renderPricing();
            }
        } catch (e) {}
    }
    // Also update if in same window (when admin opens in same tab)
    if (typeof window.renderCars === 'function') {
        window.renderCars();
    }
    if (typeof window.renderPricing === 'function') {
        window.renderPricing();
    }
}

function renderCarsTable() {
    const tbody = document.getElementById('cars-table-body');
    const cars = getCars();

    if (cars.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--gray-500);padding:2rem;">لا توجد سيارات مضافة بعد</td></tr>';
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
let uploadedImageName = '';

// ===== PERIOD MANAGEMENT =====
function addPeriod(days = '', price = '') {
    const container = document.getElementById('periods-container');
    const index = container.children.length;

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

// ===== IMAGE UPLOAD - Convert to URL using free image hosting =====
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

    // قراءة الصورة وتحويلها إلى Base64 مؤقتاً
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImageData = e.target.result;
        uploadedImageName = file.name;
        
        // عرض المعاينة
        const preview = document.getElementById('file-preview');
        preview.src = uploadedImageData;
        preview.classList.add('show');
        document.getElementById('file-name').textContent = file.name;
        document.getElementById('car-img-url').value = '';
        
        // تخزين الصورة مؤقتاً في sessionStorage للاستخدام في الجلسة الحالية
        try {
            // نضغط الصورة لتقليل حجمها
            compressImage(uploadedImageData, function(compressedData) {
                sessionStorage.setItem('tempCarImage', compressedData);
            });
        } catch (e) {
            console.warn('Could not store image in sessionStorage:', e);
        }
    };
    reader.readAsDataURL(file);
}

// دالة لضغط الصورة
function compressImage(base64Data, callback) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = base64Data;
}

// دالة للحصول على رابط صورة (تستخدم رابط Unsplash إذا لم توجد صورة)
function getImageUrl(imageData, carName) {
    if (!imageData) {
        // استخدام صورة افتراضية من Unsplash
        return `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80`;
    }
    
    // إذا كانت الصورة تبدأ بـ data:image فهي Base64
    if (imageData.startsWith('data:image')) {
        // نحاول تخزينها في localStorage إذا كان حجمها صغيراً
        try {
            // إذا كان حجم الصورة أقل من 500KB نخزنها مباشرة
            const sizeInBytes = imageData.length * 3 / 4;
            if (sizeInBytes < 500 * 1024) {
                return imageData;
            }
        } catch (e) {}
        
        // وإلا نستخدم صورة افتراضية
        return `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80`;
    }
    
    // إذا كان رابط عادي
    return imageData;
}

// ===== CAR MODAL =====
function openCarModal() {
    editingCarId = null;
    uploadedImageData = null;
    uploadedImageName = '';
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

function saveCar(e) {
    e.preventDefault();

    const cars = getCars();
    const name = document.getElementById('car-name').value.trim();
    const type = document.getElementById('car-type').value;
    const status = document.getElementById('car-status').value;
    const imageUrl = document.getElementById('car-img-url').value.trim();
    const periods = getPeriodsFromForm();

    // Validate
    if (!name) {
        showToast('❌ يرجى إدخال اسم السيارة', true);
        return;
    }

    if (periods.length === 0) {
        showToast('❌ يرجى إضافة على الأقل فترة حجز واحدة', true);
        return;
    }

    // معالجة الصورة
    let finalImage;
    
    // 1. إذا تم رفع صورة جديدة
    if (uploadedImageData) {
        // نضغط الصورة قبل تخزينها
        try {
            // نستخدم الصورة المضغوطة إذا كانت موجودة في sessionStorage
            const compressed = sessionStorage.getItem('tempCarImage');
            if (compressed && compressed.startsWith('data:image')) {
                finalImage = compressed;
            } else {
                // نضغط الصورة مباشرة
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 400;
                    const MAX_HEIGHT = 300;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedData = canvas.toDataURL('image/jpeg', 0.6);
                    
                    // تخزين الصورة في carsData
                    finalImage = compressedData;
                    saveCarData(cars, name, type, status, finalImage, periods);
                };
                img.src = uploadedImageData;
                return; // ننتظر تحميل الصورة
            }
        } catch (e) {
            finalImage = uploadedImageData;
        }
    } 
    // 2. إذا تم إدخال رابط
    else if (imageUrl) {
        finalImage = imageUrl;
    } 
    // 3. صورة افتراضية
    else {
        finalImage = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';
    }

    saveCarData(cars, name, type, status, finalImage, periods);
}

function saveCarData(cars, name, type, status, finalImage, periods) {
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

    // حفظ في localStorage
    try {
        localStorage.setItem('carsData', JSON.stringify(cars));
    } catch (e) {
        // إذا كان الحجم كبيراً، نضغط الصور أكثر
        showToast('⚠️ حجم الصورة كبير جداً، يتم ضغطها...', false);
        // نحاول ضغط الصورة مرة أخرى
        if (finalImage.startsWith('data:image')) {
            compressImage(finalImage, function(compressed) {
                carData.img = compressed;
                try {
                    localStorage.setItem('carsData', JSON.stringify(cars));
                } catch (e2) {
                    // إذا فشل، نستخدم صورة افتراضية
                    carData.img = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80';
                    localStorage.setItem('carsData', JSON.stringify(cars));
                    showToast('✅ تم حفظ البيانات مع صورة افتراضية', false);
                }
            });
            return;
        }
    }

    // تحديث الجداول
    renderCarsTable();
    
    // تحديث الصفحة الرئيسية إذا كانت مفتوحة
    try {
        if (window.opener && !window.opener.closed) {
            if (typeof window.opener.renderCars === 'function') {
                window.opener.renderCars();
            }
            if (typeof window.opener.renderPricing === 'function') {
                window.opener.renderPricing();
            }
        }
        // تحديث في نفس النافذة
        if (typeof window.renderCars === 'function') {
            window.renderCars();
        }
        if (typeof window.renderPricing === 'function') {
            window.renderPricing();
        }
    } catch (e) {}

    // إغلاق المودال وتنظيف
    closeCarModal();
    uploadedImageData = null;
    uploadedImageName = '';
    sessionStorage.removeItem('tempCarImage');
    document.getElementById('car-form').reset();
}

function deleteCar(id) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    const cars = getCars().filter(c => c.id !== id);
    try {
        localStorage.setItem('carsData', JSON.stringify(cars));
    } catch (e) {}
    renderCarsTable();

    // تحديث الصفحة الرئيسية
    try {
        if (window.opener && !window.opener.closed) {
            if (typeof window.opener.renderCars === 'function') {
                window.opener.renderCars();
            }
            if (typeof window.opener.renderPricing === 'function') {
                window.opener.renderPricing();
            }
        }
    } catch (e) {}

    showToast('🗑️ تم حذف السيارة');
}

// ===== TOAST =====
function showToast(msg, isError = false) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = msg;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== CLOSE MODAL ON OUTSIDE CLICK =====
document.getElementById('car-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('car-modal')) closeCarModal();
});

// ===== KEYBOARD SHORTCUT =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('car-modal').classList.contains('active')) {
            closeCarModal();
        }
    }
});