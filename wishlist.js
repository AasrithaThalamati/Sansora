// Wishlist Management System
class WishlistManager {
    constructor() {
        this.storageKey = 'sansora_wishlist';
        this.init();
    }

    init() {
        // Initialize wishlist from storage
        this.updateWishlistCount();
    }

    // Get all wishlist items
    getWishlist() {
        const wishlist = localStorage.getItem(this.storageKey);
        return wishlist ? JSON.parse(wishlist) : [];
    }

    // Save wishlist to storage
    saveWishlist(wishlist) {
        localStorage.setItem(this.storageKey, JSON.stringify(wishlist));
        this.updateWishlistCount();
    }

    // Add item to wishlist
    addToWishlist(product) {
        const wishlist = this.getWishlist();
        
        // Check if product already exists
        const exists = wishlist.some(item => item.id === product.id);
        
        if (exists) {
            this.showNotification('Product already in wishlist!', 'info');
            return false;
        }

        // Add product with timestamp
        product.addedAt = new Date().toISOString();
        wishlist.push(product);
        this.saveWishlist(wishlist);
        
        this.showNotification('Added to wishlist!', 'success');
        this.updateWishlistButton(product.id, true);
        return true;
    }

    // Remove item from wishlist
    removeFromWishlist(productId) {
        let wishlist = this.getWishlist();
        wishlist = wishlist.filter(item => item.id !== productId);
        this.saveWishlist(wishlist);
        
        this.showNotification('Removed from wishlist', 'success');
        this.updateWishlistButton(productId, false);
        return true;
    }

    // Check if product is in wishlist
    isInWishlist(productId) {
        const wishlist = this.getWishlist();
        return wishlist.some(item => item.id === productId);
    }

    // Update wishlist count in header
    updateWishlistCount() {
        const wishlist = this.getWishlist();
        const countElement = document.getElementById('wishlist-count');
        if (countElement) {
            countElement.textContent = wishlist.length;
        }
    }

    // Update wishlist button state
    updateWishlistButton(productId, isInWishlist) {
        const buttons = document.querySelectorAll(`[data-product-id="${productId}"]`);
        buttons.forEach(button => {
            if (isInWishlist) {
                button.classList.add('in-wishlist');
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.title = 'Remove from wishlist';
            } else {
                button.classList.remove('in-wishlist');
                button.innerHTML = '<i class="far fa-heart"></i>';
                button.title = 'Add to wishlist';
            }
        });
    }

    // Toggle wishlist (add/remove)
    toggleWishlist(product) {
        if (this.isInWishlist(product.id)) {
            this.removeFromWishlist(product.id);
        } else {
            this.addToWishlist(product);
        }
    }

    // Show notification
    showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.wishlist-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `wishlist-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Get total wishlist value
    getTotalValue() {
        const wishlist = this.getWishlist();
        return wishlist.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return total + price;
        }, 0);
    }

    // Clear entire wishlist
    clearWishlist() {
        if (confirm('Are you sure you want to clear your entire wishlist?')) {
            localStorage.removeItem(this.storageKey);
            this.updateWishlistCount();
            this.showNotification('Wishlist cleared', 'success');
            return true;
        }
        return false;
    }
}

// Initialize wishlist manager
const wishlistManager = new WishlistManager();

// Function to be called from product detail page
function addToWishlist() {
    // Get current product details from the page
    const product = {
        id: new URLSearchParams(window.location.search).get('id') || Date.now().toString(),
        name: document.getElementById('productTitle')?.textContent || '',
        price: document.getElementById('productPrice')?.textContent || '',
        image: document.getElementById('productImage')?.src || '',
        category: document.getElementById('productCategory')?.textContent || '',
        rating: '4.8',
        reviews: '2,547'
    };

    wishlistManager.toggleWishlist(product);
}

// Update wishlist button state on page load
document.addEventListener('DOMContentLoaded', function() {
    const productId = new URLSearchParams(window.location.search).get('id');
    if (productId && wishlistManager.isInWishlist(productId)) {
        wishlistManager.updateWishlistButton(productId, true);
    }
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .wishlist-notification {
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    }

    .wishlist-notification.success {
        border-left: 4px solid #4caf50;
    }

    .wishlist-notification.success i {
        color: #4caf50;
    }

    .wishlist-notification.info {
        border-left: 4px solid #2196F3;
    }

    .wishlist-notification.info i {
        color: #2196F3;
    }

    .wishlist-notification.fade-out {
        animation: slideOut 0.3s ease forwards;
    }

    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .btn-wishlist.in-wishlist {
        background: #ff5252 !important;
        color: white !important;
    }

    .btn-wishlist.in-wishlist:hover {
        background: #e04848 !important;
    }

    .wishlist-icon {
        position: relative;
    }

    .wishlist-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff5252;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
`;
document.head.appendChild(style);