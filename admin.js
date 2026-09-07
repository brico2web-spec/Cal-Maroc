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

// Login
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

// Tabs
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById('tab-' + tabName).classList.add('active');
    document.querySelector('[data-tab="' + tabName + '"]').classList.add('active');
    
    const titles = { info: 'معلومات الشركة', cars: 'إدارة السيارات', preview: 'معاينة الموقع' };
    document.getElementById('page-title').textContent = titles[tabName];
}

// Info Management
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

// Cars Management
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
            <td><img src="${car.img}" alt="${car.name}" class="car-thumb" onerror="this.src='https://via.placeholder.com/80x50?text=Car'"></td>
            <td><strong>${car.name}</strong></td>
            <td><span style="background:rgba(220,38,38,0.2);color:var(--red-light);padding:0.25rem 0.75rem;border-radius:9999px;font-size:0.8rem;">${car.type}</span></td>
            <td>${car.price}</td>
            <td>
                <button onclick="editCar(${car.id})" class="btn-edit">✏️ تعديل</button>
                <button onclick="deleteCar(${car.id})" class="btn-delete">🗑️ حذف</button>
            </td>
        </tr>
    `).join('');
}

let editingCarId = null;

function openCarModal() {
    editingCarId = null;
    document.getElementById('car-modal-title').textContent = 'إضافة سيارة جديدة';
    document.getElementById('car-form').reset();
    document.getElementById('car-id').value = '';
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
    document.getElementById('car-img').value = car.img;
    document.getElementById('car-modal').classList.add('active');
}

function saveCar(e) {
    e.preventDefault();
    const cars = getCars();
    const carData = {
        id: editingCarId || Date.now(),
        name: document.getElementById('car-name').value,
        type: document.getElementById('car-type').value,
        price: document.getElementById('car-price').value,
        img: document.getElementById('car-img').value
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
}

function deleteCar(id) {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;
    const cars = getCars().filter(c => c.id !== id);
    saveCars(cars);
    renderCarsTable();
    showToast('🗑️ تم حذف السيارة');
}

// Toast
function showToast(msg, isError = false) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = msg;
    toast.classList.toggle('error', isError);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Close modal on outside click
document.getElementById('car-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('car-modal')) closeCarModal();
});