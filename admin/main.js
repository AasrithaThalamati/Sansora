// Fake Data
const orders = [
  { id: 1001, customer: "Rajesh Kumar", product: "iPhone 15", amount: 79999, status: "Delivered", date: "2025-10-28" },
  { id: 1002, customer: "Priya Sharma", product: "MacBook Air", amount: 109999, status: "Pending", date: "2025-10-29" },
  { id: 1003, customer: "Amit Patel", product: "AirPods Pro", amount: 24999, status: "Shipped", date: "2025-10-30" },
];

const products = [
  { id: 1, name: "iPhone 15", price: 79999, stock: 12, category: "Electronics" },
  { id: 2, name: "Samsung S24", price: 69999, stock: 8, category: "Electronics" },
  { id: 3, name: "Dell XPS 13", price: 124999, stock: 5, category: "Laptops" },
];

// App State
let isLoggedIn = false;
let darkMode = true;

// DOM Elements
const app = document.getElementById('app');

// Login Screen
function showLogin() {
  app.innerHTML = `
    <div id="login-form">
      <h1>Sansora Admin</h1>
      <p>Secure Login</p>
      <input type="text" id="username" placeholder="Username" />
      <input type="password" id="password" placeholder="Password" />
      <button onclick="login()">Login</button>
    </div>
  `;
}

// Dashboard
function showDashboard() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  app.innerHTML = `
    <div class="container">
      <header>
        <div class="logo">Sansora Admin</div>
        <button class="toggle-btn" onclick="toggleDarkMode()">Dark Mode</button>
      </header>

      <div class="stats">
        <div class="stat-card">
          <h3>₹${totalRevenue.toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
        <div class="stat-card">
          <h3>${orders.length}</h3>
          <p>Total Orders</p>
        </div>
        <div class="stat-card">
          <h3>${pendingOrders}</h3>
          <p>Pending</p>
        </div>
        <div class="stat-card">
          <h3>${products.length}</h3>
          <p>Products</p>
        </div>
      </div>

      <div class="card">
        <h2>Recent Orders</h2>
        <input type="text" class="search-box" placeholder="Search orders..." onkeyup="searchOrders(this.value)" />
        <table id="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td>#${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.product}</td>
                <td>₹${o.amount.toLocaleString()}</td>
                <td><span style="color:${o.status==='Delivered'?'#00b894':o.status==='Pending'?'#e17055':'#0984e3'}">${o.status}</span></td>
                <td>${o.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="card">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td>${p.name}</td>
                <td>₹${p.price.toLocaleString()}</td>
                <td>${p.stock}</td>
                <td>${p.category}</td>
                <td>
                  <button class="btn btn-edit" onclick="alert('Edit ${p.name}')">Edit</button>
                  <button class="btn btn-delete" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// Login Function
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'admin' && pass === 'admin123') {
    isLoggedIn = true;
    showDashboard();
  } else {
    alert('Invalid credentials! Use: admin / admin123');
  }
}

// Search Orders
function searchOrders(query) {
  const rows = document.querySelectorAll('#orders-table tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
  });
}

// Delete Product
function deleteProduct(id) {
  if (confirm('Delete this product?')) {
    alert(`Product ${id} deleted!`);
  }
}

// Toggle Dark Mode
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode');
  const icon = darkMode ? 'Dark Mode' : 'Light Mode';
  document.querySelector('.toggle-btn').textContent = icon;
}

// Init
showLogin();