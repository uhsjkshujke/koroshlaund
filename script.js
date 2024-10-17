document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email').value;
    const adminEmail = "koroshgamer55@gmail.com";
    
    // همه کاربران می‌توانند وارد شوند و بخش سفارش را ببینند
    document.getElementById('user-section').style.display = 'block';
    
    // اگر ایمیل وارد شده ایمیل مدیر بود، بخش مدیریت هم نمایش داده می‌شود
    if (emailInput === adminEmail) {
        document.getElementById('admin-section').style.display = 'block';
    }

    // نمایش سفارش‌های قبلی
    loadOrders();
});

document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const product = document.getElementById('product').value;
    const price = document.getElementById('price').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const order = {
        product: product,
        price: price,
        name: name,
        phone: phone
    };

    // ذخیره سفارش در localStorage
    saveOrder(order);

    // پاک کردن فرم
    document.getElementById('purchase-form').reset();

    // بروزرسانی لیست سفارش‌ها
    loadOrders();
});

function saveOrder(order) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    orders.forEach((order, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            محصول: ${order.product}, قیمت: ${order.price} تومان, خریدار: ${order.name}, شماره تماس: ${order.phone}
            <br />
            <button onclick="showDeleteForm(${index})">حذف</button>
            <div id="delete-form-${index}" style="display:none;">
                <label for="delete-reason">علت حذف:</label>
                <textarea id="delete-reason-${index}" rows="2" required></textarea>
                <button onclick="deleteOrder(${index})">تایید حذف</button>
            </div>
        `;
        ordersList.appendChild(listItem);
    });
}

function showDeleteForm(index) {
    const deleteForm = document.getElementById(`delete-form-${index}`);
    deleteForm.style.display = 'block';
}

function deleteOrder(index) {
    const reason = document.getElementById(`delete-reason-${index}`).value;

    if (reason.trim() === "") {
        alert("لطفاً علت حذف محصول را وارد کنید.");
        return;
    }

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);  // حذف محصول
    localStorage.setItem('orders', JSON.stringify(orders));

    // نمایش پیغام حذف با توضیح
    alert(`محصول با موفقیت حذف شد. علت حذف: ${reason}`);

    // بروزرسانی لیست سفارش‌ها
    loadOrders();
}
