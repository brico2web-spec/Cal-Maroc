// ============================================================
// 📋 إدارة حقول الحجز في الهيرو (محدث)
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
    
    // جلب السيارات حسب النوع المختار
    const cars = getCars();
    const filteredCars = cars.filter(c => c.type === carType);
    
    if (filteredCars.length === 0) {
        priceField.textContent = '0 DH';
        return;
    }
    
    // نأخذ أول سيارة من النوع المختار
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
    const price = document.getElementById('booking-price')?.textContent;
    
    // التحقق من صحة البيانات
    if (!pickupDate || !returnDate) {
        showToast(currentLang === 'ar' ? '❌ يرجى تحديد تاريخ الإستلام وتاريخ الرجوع' : '❌ Veuillez sélectionner les dates de retrait et de retour');
        return;
    }
    
    if (!carType) {
        showToast(currentLang === 'ar' ? '❌ يرجى اختيار نوع السيارة' : '❌ Veuillez sélectionner le type de voiture');
        return;
    }
    
    // فتح مودال الحجز مع البيانات
    const carName = carType + ' (' + (currentLang === 'ar' ? 'نوع' : 'Type') + ')';
    document.getElementById('car-type').value = carName + ' - ' + location;
    document.getElementById('start-date').value = pickupDate;
    document.getElementById('end-date').value = returnDate;
    
    // حساب السعر في المودال
    currentCarId = null;
    // نبحث عن سيارة من النوع المختار لحساب السعر
    const cars = getCars();
    const filteredCars = cars.filter(c => c.type === carType);
    if (filteredCars.length > 0) {
        currentCarId = filteredCars[0].id;
    }
    updatePrice();
    
    document.getElementById('reserve-modal').classList.add('active');
}

// ============================================================
// 🔄 تحديث السعر عند تغيير أي حقل
// ============================================================
// نضيف مستمعين للتحديث التلقائي
document.addEventListener('DOMContentLoaded', function() {
    // ... الكود الموجود ...
    
    // إضافة مستمعين لحقول الحجز
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');
    const carTypeSelect = document.getElementById('car-type-select');
    const pickupLocation = document.getElementById('pickup-location');
    
    const updateFields = [pickupDate, returnDate, carTypeSelect, pickupLocation];
    updateFields.forEach(field => {
        if (field) {
            field.addEventListener('change', updateBookingPrice);
        }
    });
    
    // تحديث السعر الأولي
    setTimeout(updateBookingPrice, 500);
});

// تحديث الدالة القديمة updateBookingPrice لتكون عامة
window.updateBookingPrice = updateBookingPrice;
window.bookNow = bookNow;