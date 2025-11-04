// Complete Deals Data
const allDealsData = {
    electronics: [
        {
            id: 'flagship-smartphone',
            name: 'Flagship Smartphone',
            category: 'electronics',
            icon: '📱',
            originalPrice: 49999,
            price: 29999,
            description: 'Latest flagship with stunning camera and lightning-fast processor'
        },
        {
            id: 'wireless-earbuds-pro',
            name: 'Wireless Earbuds Pro',
            category: 'electronics',
            icon: '🎧',
            originalPrice: 12999,
            price: 6499,
            description: 'Active noise cancellation with premium sound quality'
        },
        {
            id: 'gaming-laptop',
            name: 'Gaming Laptop',
            category: 'electronics',
            icon: '💻',
            originalPrice: 89999,
            price: 54999,
            description: 'RTX graphics with high refresh rate display'
        },
        {
            id: 'smartwatch-ultra',
            name: 'Smartwatch Ultra',
            category: 'electronics',
            icon: '⌚',
            originalPrice: 8999,
            price: 4999,
            description: 'Fitness tracking with 7-day battery life'
        }
    ],
    fashion: [
        {
            id: 'designer-kurta-set',
            name: 'Designer Kurta Set',
            category: 'fashion',
            icon: '👔',
            originalPrice: 3999,
            price: 1999,
            description: 'Premium cotton with intricate embroidery work'
        },
        {
            id: 'mens-formal-blazer',
            name: "Men's Formal Blazer",
            category: 'fashion',
            icon: '🧥',
            originalPrice: 5999,
            price: 2999,
            description: 'Tailored fit with premium fabric blend'
        },
        {
            id: 'womens-party-dress',
            name: "Women's Party Dress",
            category: 'fashion',
            icon: '👗',
            originalPrice: 4499,
            price: 2249,
            description: 'Elegant design perfect for special occasions'
        },
        {
            id: 'casual-sneakers',
            name: 'Casual Sneakers',
            category: 'fashion',
            icon: '👟',
            originalPrice: 2999,
            price: 1499,
            description: 'Comfortable all-day wear with stylish look'
        }
    ],
    home: [
        {
            id: 'air-fryer-deluxe',
            name: 'Air Fryer Deluxe',
            category: 'home',
            icon: '🍳',
            originalPrice: 8999,
            price: 4499,
            description: 'Healthy cooking with oil-free technology'
        },
        {
            id: 'vacuum-cleaner-pro',
            name: 'Vacuum Cleaner Pro',
            category: 'home',
            icon: '🧹',
            originalPrice: 12999,
            price: 6999,
            description: 'Powerful suction with HEPA filtration'
        },
        {
            id: 'cookware-set-12piece',
            name: 'Cookware Set (12-Piece)',
            category: 'home',
            icon: '🍳',
            originalPrice: 6999,
            price: 3499,
            description: 'Non-stick with premium quality materials'
        },
        {
            id: 'smart-led-bulbs-4pack',
            name: 'Smart LED Bulbs (4-Pack)',
            category: 'home',
            icon: '💡',
            originalPrice: 2999,
            price: 1499,
            description: 'WiFi enabled with 16 million color options'
        }
    ],
    sports: [
        {
            id: 'yoga-mat-premium',
            name: 'Yoga Mat Premium',
            category: 'sports',
            icon: '🧘',
            originalPrice: 1999,
            price: 999,
            description: 'Extra thick with non-slip surface'
        },
        {
            id: 'dumbbell-set-20kg',
            name: 'Dumbbell Set (20kg)',
            category: 'sports',
            icon: '🏋️',
            originalPrice: 4999,
            price: 2999,
            description: 'Adjustable weights for versatile training'
        },
        {
            id: 'cycling-helmet-pro',
            name: 'Cycling Helmet Pro',
            category: 'sports',
            icon: '🚴',
            originalPrice: 3499,
            price: 1749,
            description: 'Lightweight with superior ventilation'
        },
        {
            id: 'resistance-bands-set',
            name: 'Resistance Bands Set',
            category: 'sports',
            icon: '💪',
            originalPrice: 1499,
            price: 749,
            description: '5 resistance levels for complete workout'
        }
    ],
    books: [
        {
            id: 'bestseller-fiction-bundle',
            name: 'Bestseller Fiction Bundle',
            category: 'books',
            icon: '📚',
            originalPrice: 2499,
            price: 1499,
            description: '5 award-winning novels in one collection'
        },
        {
            id: 'professional-journal-set',
            name: 'Professional Journal Set',
            category: 'books',
            icon: '📓',
            originalPrice: 1299,
            price: 779,
            description: 'Premium paper quality with elegant design'
        },
        {
            id: 'educational-book-series',
            name: 'Educational Book Series',
            category: 'books',
            icon: '📖',
            originalPrice: 3999,
            price: 2399,
            description: 'Complete learning guide for competitive exams'
        },
        {
            id: 'art-supply-kit',
            name: 'Art Supply Kit',
            category: 'books',
            icon: '🎨',
            originalPrice: 2999,
            price: 1799,
            description: 'Professional-grade materials for artists'
        }
    ]
};

// Banner Slider Functionality
let currentBannerSlide = 0;
const bannerSlides = document.querySelectorAll('.deals-banner-slide');
const totalBannerSlides = bannerSlides.length;

function autoAdvanceBanner() {
    changeBannerSlide(1);
}

function changeBannerSlide(direction) {
    bannerSlides[currentBannerSlide].classList.remove('active');
    currentBannerSlide += direction;
    
    if (currentBannerSlide >= totalBannerSlides) {
        currentBannerSlide = 0;
    } else if (currentBannerSlide < 0) {
        currentBannerSlide = totalBannerSlides - 1;
    }
    
    bannerSlides[currentBannerSlide].classList.add('active');
}

// Auto-advance banner every 5 seconds
setInterval(autoAdvanceBanner, 5000);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    populateDeals();
    updateCartCount();
    updateInterestCount();
    setupScrollAnimations();
    setupGalleryLightbox();
});

// Populate all deals
function populateDeals() {
    populateCategoryDeals('electronics', 'electronics-grid');
    populateCategoryDeals('fashion', 'fashion-grid');
    populateCategoryDeals('home', 'home-grid');
    populateCategoryDeals('sports', 'sports-grid');
    populateCategoryDeals('books', 'books-grid');
}

// Populate deals for a specific category
function populateCategoryDeals(category, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    const deals = allDealsData[category];
    
    grid.innerHTML = deals.map(deal => {
        const savings = deal.originalPrice - deal.price;
        const isInInterestList = checkIfInInterestList(deal.id);
        
        return `
            <div class="deal-item" data-id="${deal.id}">
                <h3>${deal.name}</h3>
                <p class="original-price">₹${deal.originalPrice.toLocaleString()}</p>
                <p class="deal-price">₹${deal.price.toLocaleString()}</p>
                <span class="savings">Save ₹${savings.toLocaleString()}</span>
                <p>${deal.description}</p>
                <button class="shop-now-btn" onclick="exploreDeal('${deal.id}')">Explore Now</button>
                <button class="interest-list-btn ${isInInterestList ? 'added' : ''}" 
                        data-id="${deal.id}"
                        onclick="toggleInterestList('${deal.id}', '${category}')">
                    ${isInInterestList ? '❤️ In Interest List' : '🤍 Add to Interest List'}
                </button>
            </div>
        `;
    }).join('');
}

// Check if item is in interest list
function checkIfInInterestList(itemId) {
    const interestList = getInterestList();
    return interestList.some(item => item.id === itemId);
}

// Get interest list from localStorage
function getInterestList() {
    const list = localStorage.getItem('interestList');
    return list ? JSON.parse(list) : [];
}

// Toggle item in interest list
function toggleInterestList(itemId, category) {
    // Find the deal in the appropriate category
    const deal = allDealsData[category].find(d => d.id === itemId);
    if (!deal) return;

    let interestList = getInterestList();
    const existingIndex = interestList.findIndex(item => item.id === itemId);

    if (existingIndex > -1) {
        // Remove from interest list
        interestList.splice(existingIndex, 1);
        localStorage.setItem('interestList', JSON.stringify(interestList));
        showMessage('Removed from interest list', 'info');
    } else {
        // Add to interest list
        const interestItem = {
            ...deal,
            addedDate: Date.now()
        };
        interestList.push(interestItem);
        localStorage.setItem('interestList', JSON.stringify(interestList));
        showMessage('❤️ Added to interest list!', 'success');
    }

    // Update button state
    updateInterestButton(itemId);
    updateInterestCount();
}

// Update interest list button state
function updateInterestButton(itemId) {
    const button = document.querySelector(`.interest-list-btn[data-id="${itemId}"]`);
    if (!button) return;

    const isInList = checkIfInInterestList(itemId);
    
    if (isInList) {
        button.textContent = '❤️ In Interest List';
        button.classList.add('added');
    } else {
        button.textContent = '🤍 Add to Interest List';
        button.classList.remove('added');
    }
}

// Update interest list count in navigation
function updateInterestCount() {
    const interestList = getInterestList();
    const countElement = document.getElementById('interest-count');
    if (countElement) {
        countElement.textContent = interestList.length;
    }
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Explore deal function
function exploreDeal(dealId) {
    // Find the deal across all categories
    let deal = null;
    for (const category in allDealsData) {
        deal = allDealsData[category].find(d => d.id === dealId);
        if (deal) break;
    }
    
    if (deal) {
        const savings = deal.originalPrice - deal.price;
        alert(`Exploring ${deal.name}!\n\nOriginal Price: ₹${deal.originalPrice.toLocaleString()}\nDeal Price: ₹${deal.price.toLocaleString()}\nYou save: ₹${savings.toLocaleString()}\n\n${deal.description}\n\nThis would typically redirect to a detailed product page.`);
    }
}

// Show message popup
function showMessage(message, type = 'success') {
    const existingPopup = document.querySelector('.message-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    const popup = document.createElement('div');
    popup.className = `message-popup ${type}`;
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 300);
    }, 3000);
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter your email address', 'error');
        return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Save to localStorage (in a real app, this would be sent to a server)
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    
    if (subscribers.includes(email)) {
        showMessage('You are already subscribed!', 'info');
        return;
    }
    
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    showMessage('🎉 Successfully subscribed to newsletter!', 'success');
    emailInput.value = '';
}

// Search functionality
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm) {
        window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Enter key to search
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

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        observer.observe(item);
    });
    
    document.querySelectorAll('.category-deal-card').forEach(card => {
        observer.observe(card);
    });
}

// Gallery lightbox effect
function setupGalleryLightbox() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            lightbox.innerHTML = `
                <div style="max-width: 90%; max-height: 90%; text-align: center;" onclick="event.stopPropagation()">
                    <img src="${imgSrc}" style="max-width: 100%; max-height: 70vh; border-radius: 15px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                    <h3 style="color: white; margin-top: 1rem; font-size: 1.5rem;">${title}</h3>
                    <p style="color: #ccc; margin-top: 0.5rem;">${description}</p>
                    <button style="margin-top: 1.5rem; padding: 0.8rem 2rem; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600;" onclick="this.parentElement.parentElement.remove()">Close</button>
                </div>
            `;
            
            lightbox.addEventListener('click', function() {
                this.remove();
            });
            
            document.body.appendChild(lightbox);
        });
    });
}

// Keyboard navigation for banner
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeBannerSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeBannerSlide(1);
    }
});

// Touch swipe support for mobile banner
let touchStartX = 0;
let touchEndX = 0;

const bannerContainer = document.querySelector('.deals-banner-container');

if (bannerContainer) {
    bannerContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    bannerContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeBannerSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        changeBannerSlide(-1);
    }
}

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    }
});

// Make functions globally available
window.toggleInterestList = toggleInterestList;
window.exploreDeal = exploreDeal;
window.searchProducts = searchProducts;
window.logout = logout;
window.changeBannerSlide = changeBannerSlide;
window.subscribeNewsletter = subscribeNewsletter;
window.scrollToTop = scrollToTop;