// Interest List Management
(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('✅ Interest List initializing...');
        
        // Load and display items
        loadInterestList();
        
        // Setup event listeners
        setupFilterButtons();
        setupClearAll();
        setupSearchListener();
        updateCartCount();
        updateInterestCount();
        
        console.log('✅ Interest List initialized');
    }
    
    // Get interest list from localStorage
    function getInterestList() {
        try {
            const list = localStorage.getItem('interestList');
            return list ? JSON.parse(list) : [];
        } catch (error) {
            console.error('Error reading interest list:', error);
            return [];
        }
    }
    
    // Load and display interest list
    function loadInterestList() {
        const interestList = getInterestList();
        const container = document.getElementById('interest-list');
        const emptyState = document.getElementById('empty-state');
        
        console.log('📦 Loading', interestList.length, 'items');
        
        if (!container || !emptyState) {
            console.error('❌ Required elements not found');
            return;
        }
        
        if (interestList.length === 0) {
            container.style.display = 'none';
            emptyState.style.display = 'block';
            updateStats([], 0, 0);
            return;
        }
        
        container.style.display = 'grid';
        emptyState.style.display = 'none';
        
        let totalSavings = 0;
        let totalValue = 0;
        
        container.innerHTML = interestList.map(item => {
            const savings = item.originalPrice - item.price;
            totalSavings += savings;
            totalValue += item.price;
            
            const daysAgo = Math.floor((Date.now() - item.addedDate) / (1000 * 60 * 60 * 24));
            let timeText = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
            
            const categoryClass = `category-${item.category}`;
            const categoryName = item.category.charAt(0).toUpperCase() + item.category.slice(1);
            
            return `
                <div class="interest-item" data-category="${item.category}" data-id="${item.id}">
                    <div class="item-badge">Exceptional Value</div>
                    <span class="category-badge ${categoryClass}">${categoryName}</span>
                    <div class="item-icon">${item.icon || '🎁'}</div>
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-prices">
                        <span class="original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>
                        <span class="current-price">₹${item.price.toLocaleString('en-IN')}</span>
                        <div class="savings-badge">Save ₹${savings.toLocaleString('en-IN')}</div>
                    </div>
                    <p class="item-added">
                        <i class="fas fa-clock"></i> Added ${timeText}
                    </p>
                    <div class="item-actions">
                        <button class="action-btn view-btn" onclick="window.interestListApp.viewProduct('${item.id}')">
                            <i class="fas fa-eye"></i> View Deal
                        </button>
                        <button class="action-btn remove-btn" onclick="window.interestListApp.removeItem('${item.id}')">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        updateStats(interestList, totalSavings, totalValue);
        console.log('✅ Items rendered successfully');
    }
    
    // Update statistics
    function updateStats(items, savings, value) {
        const itemsEl = document.getElementById('total-items');
        const savingsEl = document.getElementById('total-savings');
        const valueEl = document.getElementById('total-value');
        
        if (itemsEl) itemsEl.textContent = items.length;
        if (savingsEl) savingsEl.textContent = `₹${savings.toLocaleString('en-IN')}`;
        if (valueEl) valueEl.textContent = `₹${value.toLocaleString('en-IN')}`;
    }
    
    // Setup filter buttons
    function setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const items = document.querySelectorAll('.interest-item');
                let visibleCount = 0;
                
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        visibleCount++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                if (visibleCount === 0 && filter !== 'all') {
                    const categoryName = filter.charAt(0).toUpperCase() + filter.slice(1);
                    showNotification(`No ${categoryName} items in your interest list`, 'info');
                }
            });
        });
    }
    
    // Setup clear all button
    function setupClearAll() {
        const clearAllBtn = document.getElementById('clear-all');
        
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', function() {
                const interestList = getInterestList();
                
                if (interestList.length === 0) {
                    showNotification('Interest list is already empty!', 'info');
                    return;
                }
                
                if (confirm(`Are you sure you want to clear all ${interestList.length} items?`)) {
                    localStorage.removeItem('interestList');
                    loadInterestList();
                    updateInterestCount();
                    showNotification('✨ Interest list cleared successfully!', 'success');
                }
            });
        }
    }
    
    // Setup search listener
    function setupSearchListener() {
        const searchInputEl = document.getElementById('search-input');
        if (searchInputEl) {
            searchInputEl.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchProducts();
                }
            });
        }
    }
    
    // Remove item from interest list
    function removeFromInterestList(itemId) {
        const item = document.querySelector(`.interest-item[data-id="${itemId}"]`);
        
        if (item) {
            const itemName = item.querySelector('.item-name').textContent;
            item.classList.add('removing');
            
            setTimeout(() => {
                let interestList = getInterestList();
                interestList = interestList.filter(i => i.id !== itemId);
                localStorage.setItem('interestList', JSON.stringify(interestList));
                
                loadInterestList();
                updateInterestCount();
                showNotification(`${itemName} removed`, 'success');
            }, 400);
        }
    }
    
    // View product
    function viewProduct(itemId) {
        window.location.href = `deals.html#${itemId}`;
    }
    
    // Update cart count
    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const el = document.getElementById('cart-count');
            if (el) el.textContent = cart.length;
        } catch (e) {}
    }
    
    // Update interest list count
    function updateInterestCount() {
        try {
            const list = getInterestList();
            const el = document.getElementById('interest-count');
            if (el) el.textContent = list.length;
        } catch (e) {}
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification-popup');
        if (existing) existing.remove();
        
        const styles = {
            success: { bg: '#2ecc71', icon: 'fa-check-circle' },
            error: { bg: '#e74c3c', icon: 'fa-times-circle' },
            info: { bg: '#3498db', icon: 'fa-info-circle' },
            warning: { bg: '#f39c12', icon: 'fa-exclamation-triangle' }
        };
        
        const style = styles[type] || styles.info;
        const notification = document.createElement('div');
        notification.className = 'notification-popup';
        notification.style.cssText = `
            position: fixed; top: 90px; right: 20px; padding: 18px 30px;
            background: ${style.bg}; color: white; border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3); z-index: 10000;
            animation: slideInRight 0.4s ease-out; display: flex;
            align-items: center; gap: 12px; font-weight: 500;
            max-width: 450px; min-width: 280px; cursor: pointer;
        `;
        
        notification.innerHTML = `
            <i class="fas ${style.icon}" style="font-size: 1.3rem;"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        const remove = () => {
            notification.style.animation = 'slideOutRight 0.4s ease-out';
            setTimeout(() => notification.remove(), 400);
        };
        
        setTimeout(remove, 3000);
        notification.addEventListener('click', remove);
    }
    
    // Search functionality
    function searchProducts() {
        const input = document.getElementById('search-input');
        if (!input) return;
        
        const term = input.value.trim();
        if (term) {
            window.location.href = `index.html?search=${encodeURIComponent(term)}`;
        } else {
            showNotification('Please enter a search term', 'warning');
        }
    }
    
    // Logout
    function logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('loggedInUser');
            showNotification('Logged out successfully', 'success');
            setTimeout(() => window.location.href = 'login.html', 1000);
        }
    }
    
    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(450px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(450px); opacity: 0; }
        }
        .notification-popup:hover { transform: translateY(-3px); }
    `;
    document.head.appendChild(style);
    
    // Export to global scope
    window.interestListApp = {
        removeItem: removeFromInterestList,
        viewProduct: viewProduct,
        search: searchProducts,
        logout: logout
    };
    
    // Only export these if they don't already exist
    if (typeof window.searchProducts === 'undefined') {
        window.searchProducts = searchProducts;
    }
    if (typeof window.logout === 'undefined') {
        window.logout = logout;
    }
    
    // Update on focus
    window.addEventListener('focus', () => {
        updateInterestCount();
        updateCartCount();
    });
    
})();