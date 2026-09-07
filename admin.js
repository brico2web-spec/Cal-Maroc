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
    return JSON.parse(localStorage.getItem('carsData')) || [];
}

function saveCars(cars) {
    localStorage.setItem('carsData', JSON.stringify(cars));
}

function renderCarsTable() {
    const tbody = document.getElementById('cars-table-body');
    const cars = getCars();

    if (cars.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--gray-500);padding:2rem;">لا توجد سيارات مضافة بعد</td></tr>';
        return;
    }

    tbody.innerHTML = cars.map(car => `
        <tr>
            <td><img src="${car.img}" alt="${car.name}" class="car-thumb" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2250%22%3E%3Crect fill=%22%23111827%22 width=%2280%22 height=%2250%22/%3E%3Ctext x=%2240%22 y=%2225%22 text-anchor=%22middle%22 fill=%22%239ca3af%22 font-size=%2212%22 font-family=%22sans-serif%22%3E🚗%3C/text%3E%3C/svg%3E'"></td>
            <td><strong>${car.name}</strong></td>
            <td><span style="background:rgba(225,29,72,0.15);color:var(--primary-light);padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8rem;">${car.type}</span></td>
            <td>${car.price}</td>
            <td>
                <button onclick="editCar(${car.id})" class="btn-edit">✏️ تعديل</button>
                <button onclick="deleteCar(${car.id})" class="btn-delete">🗑️ حذف</button>
            </td>
        </tr>
    `).join('');
}

let editingCarId = null;
let uploadedImageData = null;

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
    document.getElementById('car-price').value = car.price;
    document.getElementById('car-img-url').value = car.img;

    // Show preview if image exists
    if (car.img && car.img.startsWith('data:image')) {
        const preview = document.getElementById('file-preview');
        preview.src = car.img;
        preview.classList.add('show');
        document.getElementById('file-name').textContent = 'صورة مرفوعة';
    } else {
        document.getElementById('file-preview').classList.remove('show');
        document.getElementById('file-name').textContent = 'صورة من رابط';
    }

    document.getElementById('car-modal').classList.add('active');
}

// ===== IMAGE UPLOAD HANDLER =====
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
        showToast('❌ يرجى اختيار ملف صورة فقط', true);
        return;
    }

    // Check size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showToast('❌ حجم الصورة يجب أن يكون أقل من 2 ميجابايت', true);
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        uploadedImageData = imageData;

        // Show preview
        const preview = document.getElementById('file-preview');
        preview.src = imageData;
        preview.classList.add('show');
        document.getElementById('file-name').textContent = file.name;

        // Clear URL field since we're using uploaded image
        document.getElementById('car-img-url').value = '';
    };
    reader.readAsDataURL(file);
}

function saveCar(e) {
    e.preventDefault();

    const cars = getCars();
    const name = document.getElementById('car-name').value;
    const type = document.getElementById('car-type').value;
    const price = document.getElementById('car-price').value;
    const imageUrl = document.getElementById('car-img-url').value.trim();

    // Determine image source: uploaded file or URL
    let finalImage;
    if (uploadedImageData) {
        finalImage = uploadedImageData;
    } else if (imageUrl) {
        finalImage = imageUrl;
    } else {
        showToast('❌ يرجى رفع صورة أو إدخال رابط صورة', true);
        return;
    }

    const carData = {
        id: editingCarId || Date.now(),
        name: name,
        type: type,
        price: price,
        img: finalImage
    };

    if (editingCarId) {
        const index = cars.findIndex(c => c.id === editingCarId);
        if (index !== -1) cars[index] = carData;
        showToast('✅ تم تعديل السيارة بنجاح!');
    } else {
        cars.push(carData);
        showToast('✅ تم إضافة السيارة بنجاح!');
    }

    saveCars(cars);
    renderCarsTable();
    closeCarModal();
    uploadedImageData = null;
}

function deleteCar(id) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    const cars = getCars().filter(c => c.id !== id);
    saveCars(cars);
    renderCarsTable();
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