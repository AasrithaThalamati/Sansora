// index-script.js - Main page functionality

let currentFilter = 'all';

// Create product card HTML - COMPLETE WITH ALL TEXT
function createProductCard(product) {
    return `
        <div class="product-card" data-category="${product.category}">
            <a href="product-detail.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/400x300?text=Product+Image'">
            </a>
            <div class="product-info">
                <span class="product-category">${product.category.toUpperCase()}</span>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description.substring(0, 100)}...</p>
                <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
            </div>
            <button class="btn-add-cart" onclick="addToCartFromCard(${product.id}, event)">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
}

// Load products with optional filter
function loadProducts(filter = 'all') {
    const container = document.getElementById('products-grid');
    if (!container) {
        console.error('Products grid container not found!');
        return;
    }

    let filteredProducts = products;
    
    // Filter products by category
    if (filter !== 'all') {
        filteredProducts = products.filter(p => p.category === filter);
    }

    // Update section title based on filter
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    
    if (sectionTitle && sectionSubtitle) {
        if (filter === 'all') {
            sectionTitle.textContent = 'Featured Products';
            sectionSubtitle.textContent = 'Discover our handpicked collection of premium products';
        } else {
            const categoryNames = {
                'electronics': 'Electronics',
                'fashion': 'Fashion',
                'home': 'Home & Kitchen',
                'books': 'Books',
                'sports': 'Sports'
            };
            sectionTitle.textContent = categoryNames[filter] || filter;
            sectionSubtitle.textContent = `Explore our ${categoryNames[filter] || filter} collection`;
        }
    }

    // Display filtered products
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; font-size: 1.2rem; color: #666;">No products found in this category.</p>';
    } else {
        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    }

    // Scroll to products section smoothly
    if (filter !== 'all') {
        const productsSection = document.querySelector('.products-container');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    loadProducts(category);
    
    // Update active button state
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
}

// Add to cart from product card
function addToCartFromCard(productId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        showMessage('Product not found!', 'error');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            sku: product.sku,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Visual feedback on button
    const btn = event ? event.target.closest('.btn-add-cart') : null;
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = '#2dce89';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 1500);
    }
    
    // Show success message
    showMessage(`${product.title} added to cart!`, 'success');
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Search products function
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (!searchTerm) {
        loadProducts(currentFilter);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('products-grid');
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    
    if (sectionTitle && sectionSubtitle) {
        sectionTitle.textContent = `Search Results for "${searchTerm}"`;
        sectionSubtitle.textContent = `Found ${filteredProducts.length} product(s)`;
    }
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem; font-size: 1.2rem; color: #666;">No products found matching your search.</p>';
    } else {
        container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    }
}

// Add enter key support for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// Show message popup
function showMessage(text, type = 'success') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add CSS animation for message popup
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Show deals function
function showDeals() {
    alert('Deals section coming soon! Check back later for amazing offers.');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any user data if needed
        alert('Logged out successfully!');
        // Redirect to login page if you have one
        // window.location.href = 'login.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing page...');
    console.log('Total products:', products ? products.length : 0);
    
    // Check if products are loaded
    if (typeof products === 'undefined') {
        console.error('Products not loaded! Make sure product-data.js is included before index-script.js');
        return;
    }
    
    loadProducts('all');
    updateCartCount();
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
});