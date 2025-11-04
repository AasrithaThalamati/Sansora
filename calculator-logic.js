// PREMIUM PRICE CALCULATOR LOGIC WITH ENHANCED FEATURES
// =====================================================

let state = {
    selectedVariant: 'standard',
    quantity: 1,
    addons: {
        warranty: false,
        'gift-wrap': false,
        insurance: false,
        setup: false
    },
    urgentDelivery: false
};

const basePrice = 2499;
const variants = {
    standard: { name: 'Standard Edition', multiplier: 1 },
    premium: { name: 'Premium Edition', multiplier: 1.5 },
    deluxe: { name: 'Deluxe Edition', multiplier: 2 }
};

const addonPrices = {
    warranty: 999,
    'gift-wrap': 249,
    insurance: 499,
    setup: 1499
};

const urgentDeliveryFee = 750;

function getQuantityDiscount(qty) {
    if (qty >= 10) return 0.20;
    if (qty >= 5) return 0.15;
    if (qty >= 3) return 0.10;
    return 0;
}

function selectVariant(variant) {
    state.selectedVariant = variant;
    
    // Update UI
    document.querySelectorAll('.variant-option').forEach(el => {
        el.classList.remove('active');
    });
    const selectedEl = document.querySelector(`[data-variant="${variant}"]`);
    selectedEl.classList.add('active');
    
    // Add celebration animation
    createConfetti(selectedEl);
    
    updatePriceBreakdown();
}

function updateQuantity(change) {
    const input = document.getElementById('quantity-input');
    const newQty = Math.max(1, state.quantity + change);
    state.quantity = newQty;
    input.value = newQty;
    
    // Check if discount threshold crossed
    const oldDiscount = getQuantityDiscount(state.quantity - change);
    const newDiscount = getQuantityDiscount(newQty);
    
    if (newDiscount > oldDiscount) {
        // Show celebration for new discount tier
        showDiscountCelebration(newDiscount);
    }
    
    updatePriceBreakdown();
}

function onQuantityChange() {
    const input = document.getElementById('quantity-input');
    const oldQty = state.quantity;
    state.quantity = Math.max(1, parseInt(input.value) || 1);
    input.value = state.quantity;
    
    const oldDiscount = getQuantityDiscount(oldQty);
    const newDiscount = getQuantityDiscount(state.quantity);
    
    if (newDiscount > oldDiscount) {
        showDiscountCelebration(newDiscount);
    }
    
    updatePriceBreakdown();
}

function toggleAddon(addonId) {
    state.addons[addonId] = !state.addons[addonId];
    document.getElementById(`addon-${addonId}`).checked = state.addons[addonId];
    
    // Add visual feedback
    const addonItem = document.getElementById(`addon-${addonId}`).closest('.addon-item');
    if (state.addons[addonId]) {
        addonItem.style.background = 'linear-gradient(135deg, #fff9e6 0%, #ffe9b3 100%)';
        addonItem.style.borderColor = '#ffd700';
    } else {
        addonItem.style.background = 'white';
        addonItem.style.borderColor = '#e0e0e0';
    }
    
    updatePriceBreakdown();
}

function toggleUrgentDelivery() {
    state.urgentDelivery = !state.urgentDelivery;
    document.getElementById('urgent-delivery').checked = state.urgentDelivery;
    
    // Add visual feedback
    const deliveryItem = document.getElementById('urgent-delivery').closest('.addon-item');
    if (state.urgentDelivery) {
        deliveryItem.style.background = 'linear-gradient(135deg, #fff9e6 0%, #ffe9b3 100%)';
        deliveryItem.style.borderColor = '#ffd700';
    } else {
        deliveryItem.style.background = 'white';
        deliveryItem.style.borderColor = '#e0e0e0';
    }
    
    updatePriceBreakdown();
}

function updatePriceBreakdown() {
    const variantPrice = basePrice * variants[state.selectedVariant].multiplier;
    const discount = getQuantityDiscount(state.quantity);
    const discountedPrice = variantPrice * (1 - discount);
    const subtotal = discountedPrice * state.quantity;

    let addonsTotal = 0;
    for (const [addonId, isSelected] of Object.entries(state.addons)) {
        if (isSelected) {
            addonsTotal += addonPrices[addonId] * state.quantity;
        }
    }

    const deliveryFee = state.urgentDelivery ? urgentDeliveryFee : 0;
    const total = subtotal + addonsTotal + deliveryFee;

    // Update display with animations
    updateElementWithAnimation('selected-variant-name', variants[state.selectedVariant].name);
    updateElementWithAnimation('base-price', formatCurrency(variantPrice));
    updateElementWithAnimation('display-quantity', state.quantity);
    updateElementWithAnimation('subtotal-amount', formatCurrency(subtotal));
    updateElementWithAnimation('total-amount', formatCurrency(total));

    // Show/hide discount row
    if (discount > 0) {
        document.getElementById('discount-row').style.display = 'flex';
        updateElementWithAnimation('discount-percent', (discount * 100).toFixed(0));
        updateElementWithAnimation('discount-amount', '-' + formatCurrency(variantPrice * discount * state.quantity));
        document.getElementById('discount-message').innerHTML = 
            `<span class="discount-badge">🎉 ${(discount * 100).toFixed(0)}% Bulk Discount Applied - You Save ${formatCurrency(variantPrice * discount * state.quantity)}!</span>`;
    } else {
        document.getElementById('discount-row').style.display = 'none';
        document.getElementById('discount-message').innerHTML = '';
    }

    // Show/hide addons row
    if (addonsTotal > 0) {
        document.getElementById('addons-row').style.display = 'flex';
        updateElementWithAnimation('addons-amount', '+' + formatCurrency(addonsTotal));
    } else {
        document.getElementById('addons-row').style.display = 'none';
    }

    // Show/hide delivery row
    if (state.urgentDelivery) {
        document.getElementById('delivery-row').style.display = 'flex';
    } else {
        document.getElementById('delivery-row').style.display = 'none';
    }
}

function updateElementWithAnimation(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.transform = 'scale(1.1)';
        element.style.transition = 'transform 0.3s ease';
        element.textContent = value;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 300);
    }
}

function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function addToCart() {
    const variantPrice = basePrice * variants[state.selectedVariant].multiplier;
    const discount = getQuantityDiscount(state.quantity);
    const discountedPrice = variantPrice * (1 - discount);
    
    let addonsTotal = 0;
    let selectedAddons = [];
    for (const [addonId, isSelected] of Object.entries(state.addons)) {
        if (isSelected) {
            addonsTotal += addonPrices[addonId];
            selectedAddons.push(addonId);
        }
    }
    
    const deliveryFee = state.urgentDelivery ? urgentDeliveryFee : 0;
    const unitPrice = discountedPrice + addonsTotal + (deliveryFee / state.quantity);
    
    // Create cart item with configuration
    const cartItem = {
        id: Date.now(),
        title: `Product - ${variants[state.selectedVariant].name}`,
        price: Math.round(unitPrice),
        image: 'https://via.placeholder.com/400x300?text=Custom+Product',
        category: 'custom',
        description: `Custom configured product with ${variants[state.selectedVariant].name}`,
        sku: `CALC-${state.selectedVariant.toUpperCase()}`,
        quantity: state.quantity,
        configuration: {
            variant: state.selectedVariant,
            addons: selectedAddons,
            urgentDelivery: state.urgentDelivery,
            discount: discount * 100,
            basePrice: basePrice,
            variantMultiplier: variants[state.selectedVariant].multiplier
        }
    };
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if same configuration exists
    const existingIndex = cart.findIndex(item => 
        item.configuration && 
        item.configuration.variant === cartItem.configuration.variant &&
        JSON.stringify(item.configuration.addons) === JSON.stringify(cartItem.configuration.addons) &&
        item.configuration.urgentDelivery === cartItem.configuration.urgentDelivery
    );
    
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += cartItem.quantity;
        showMessage('✅ Quantity updated in cart! 🎉', 'success');
    } else {
        cart.push(cartItem);
        showMessage('✅ Product added to cart successfully! 🛒✨', 'success');
    }
    
    // Save cart
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count with animation
    updateCartCount();
    
    // Add celebration effect
    createCartCelebration();
    
    // Build configuration details for logging
    const configDetails = [];
    if (state.selectedVariant !== 'standard') {
        configDetails.push(variants[state.selectedVariant].name);
    }
    if (selectedAddons.length > 0) {
        configDetails.push(`${selectedAddons.length} add-on(s)`);
    }
    if (state.urgentDelivery) {
        configDetails.push('Express Delivery');
    }
    if (discount > 0) {
        configDetails.push(`${(discount * 100).toFixed(0)}% discount`);
    }
    
    console.log('✅ Added to cart:', cartItem);
    console.log('📦 Configuration:', configDetails.join(', '));
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
        
        // Add bounce animation
        cartCountElement.style.transform = 'scale(1.5)';
        cartCountElement.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 300);
    }
}

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = text;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.4s';
        setTimeout(() => messageDiv.remove(), 400);
    }, 3000);
}

function showDiscountCelebration(discount) {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
        color: white;
        padding: 3rem 4rem;
        border-radius: 25px;
        font-size: 2rem;
        font-weight: 900;
        z-index: 10001;
        box-shadow: 0 20px 60px rgba(255, 140, 0, 0.6);
        animation: celebrationPop 0.6s ease;
        text-align: center;
    `;
    celebration.innerHTML = `
        🎉<br>
        ${(discount * 100).toFixed(0)}% Discount Unlocked!<br>
        <span style="font-size: 1.2rem;">You're Saving Big!</span>
    `;
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.style.opacity = '0';
        celebration.style.transition = 'opacity 0.5s';
        setTimeout(() => celebration.remove(), 500);
    }, 2000);
}

function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = ['⭐', '✨', '💫', '🌟'][Math.floor(Math.random() * 4)];
        confetti.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall 1s ease-out forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1000);
    }
}

function createCartCelebration() {
    const cartIcon = document.querySelector('.nav-link .fa-shopping-cart');
    if (cartIcon) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.textContent = ['🎊', '🎉', '✨', '💝'][Math.floor(Math.random() * 4)];
            particle.style.cssText = `
                position: fixed;
                left: ${cartIcon.getBoundingClientRect().left}px;
                top: ${cartIcon.getBoundingClientRect().top}px;
                font-size: 1.5rem;
                pointer-events: none;
                z-index: 10000;
                animation: particleExplosion 0.8s ease-out forwards;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 800);
        }
    }
}

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 + 100}px) rotate(${Math.random() * 720}deg);
        }
    }
    
    @keyframes particleExplosion {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 150 - 75}px, ${Math.random() * 150 - 75}px) scale(0);
        }
    }
    
    @keyframes celebrationPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
updatePriceBreakdown();
updateCartCount();

console.log('✅ Premium Calculator initialized with enhanced features!');
console.log('🎨 Luxury theme active');
console.log('🎉 Celebration effects enabled');