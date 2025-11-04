// ============================================
// COMPLETE SCRIPT.JS WITH LOCALSTORAGE SUPPORT
// ============================================

// Global Variables
let currentUser = null;
let isAdmin = false;
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentSlide = 0;

// ✅ FIXED: Load products from localStorage with fallback
let products = [];

// Initialize products on page load
function initializeProducts() {
    const savedProducts = localStorage.getItem('sansora_products');
    
    if (savedProducts) {
        try {
            products = JSON.parse(savedProducts);
            console.log('✅ Loaded', products.length, 'products from localStorage');
        } catch (error) {
            console.error('Error loading products from localStorage:', error);
            products = getDefaultProducts();
            saveProducts();
        }
    } else {
        // First time - load default products
        products = getDefaultProducts();
        saveProducts();
        console.log('✅ Initialized with', products.length, 'default products');
    }
}

// Default products if none exist
function getDefaultProducts() {
    return [
        {
            id: 1,
            title: "iPhone 15 Pro Max",
            category: "electronics",
            price: 134900,
            image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=300&fit=crop",
            description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 256GB storage, ProRAW photography, and all-day battery life.",
            sku: "IP-15-001",
            rating: 4.8,
            reviews_count: 1250,
            inventory_count: 45,
            delivery_time: "1-2 business days"
        },
        {
            id: 2,
            title: "Samsung Galaxy S24 Ultra",
            category: "electronics",
            price: 129999,
            image: "https://images.unsplash.com/photo-1705530292519-ec81f2ace70d?w=600",
            description: "Premium Android flagship with S Pen, 200MP camera, AI features, and stunning 6.8\" Dynamic AMOLED display.",
            sku: "SG-S24-002",
            rating: 4.7,
            reviews_count: 980,
            inventory_count: 32,
            delivery_time: "1-2 business days"
        },
        {
            id: 3,
            title: "MacBook Pro 16-inch",
            category: "electronics",
            price: 249900,
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
            description: "Apple's most powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD, and Liquid Retina XDR display.",
            sku: "MB-16-003",
            rating: 4.9,
            reviews_count: 1520,
            inventory_count: 28,
            delivery_time: "2-3 business days"
        },
        {
            id: 4,
            title: "Sony WH-1000XM5 Headphones",
            category: "electronics",
            price: 29990,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
            description: "Industry-leading noise canceling headphones with 30-hour battery life and premium sound quality.",
            sku: "SN-WH-004",
            rating: 4.6,
            reviews_count: 2340,
            inventory_count: 67,
            delivery_time: "1-2 business days"
        },
        {
            id: 5,
            title: "iPad Pro 12.9-inch",
            category: "electronics",
            price: 112900,
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
            description: "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil compatibility.",
            sku: "IP-PRO-005",
            rating: 4.8,
            reviews_count: 890,
            inventory_count: 41,
            delivery_time: "1-2 business days"
        },
        {
            id: 6,
            title: "Dell XPS 15",
            category: "electronics",
            price: 189999,
            image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=300&fit=crop",
            description: "Premium Windows laptop with Intel i7, 16GB RAM, RTX 4070 graphics, and 15.6\" OLED display.",
            sku: "DL-XPS-006",
            rating: 4.7,
            reviews_count: 756,
            inventory_count: 19,
            delivery_time: "2-3 business days"
        },
        {
            id: 7,
            title: "Apple Watch Series 9",
            category: "electronics",
            price: 41900,
            image: "https://images.unsplash.com/photo-1705307367492-fbaf340d8b72?w=600",
            description: "Advanced smartwatch with health tracking, GPS, cellular connectivity, and S9 SiP chip.",
            sku: "AW-S9-007",
            rating: 4.8,
            reviews_count: 1420,
            inventory_count: 52,
            delivery_time: "1-2 business days"
        },
        {
            id: 8,
            title: "Nintendo Switch OLED",
            category: "electronics",
            price: 32999,
            image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
            description: "Portable gaming console with 7-inch OLED screen, 64GB storage, and versatile play modes.",
            sku: "NS-OLED-008",
            rating: 4.7,
            reviews_count: 2150,
            inventory_count: 78,
            delivery_time: "1-2 business days"
        },
        {
            id: 9,
            title: "Premium Leather Jacket",
            category: "fashion",
            price: 12999,
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
            description: "Genuine leather jacket with modern fit, multiple pockets, and timeless design. Available in black and brown.",
            sku: "LJ-PRM-009",
            rating: 4.5,
            reviews_count: 340,
            inventory_count: 25,
            delivery_time: "2-3 business days"
        },
        {
            id: 10,
            title: "Designer Silk Dress",
            category: "fashion",
            price: 8999,
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
            description: "Elegant silk dress perfect for special occasions. Features flattering cut and premium fabric quality.",
            sku: "SD-DES-010",
            rating: 4.6,
            reviews_count: 267,
            inventory_count: 38,
            delivery_time: "2-3 business days"
        },
        {
            id: 11,
            title: "Luxury Swiss Watch",
            category: "fashion",
            price: 45999,
            image: "https://media.istockphoto.com/id/97472180/photo/wristwatch.webp?w=600",
            description: "Precision Swiss-made timepiece with automatic movement, sapphire crystal, and water resistance.",
            sku: "SW-LUX-011",
            rating: 4.9,
            reviews_count: 145,
            inventory_count: 12,
            delivery_time: "3-5 business days"
        },
        {
            id: 12,
            title: "Designer Sunglasses",
            category: "fashion",
            price: 15999,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
            description: "Premium polarized sunglasses with UV protection and scratch-resistant lenses.",
            sku: "SG-DES-012",
            rating: 4.4,
            reviews_count: 523,
            inventory_count: 67,
            delivery_time: "1-2 business days"
        },
        {
            id: 13,
            title: "Cashmere Sweater",
            category: "fashion",
            price: 18999,
            image: "https://plus.unsplash.com/premium_photo-1698952163456-c062a79ea49c?w=600",
            description: "Ultra-soft cashmere sweater in multiple colors. Perfect for luxury comfort and style.",
            sku: "CS-SWT-013",
            rating: 4.7,
            reviews_count: 289,
            inventory_count: 42,
            delivery_time: "2-3 business days"
        },
        {
            id: 14,
            title: "Italian Leather Handbag",
            category: "fashion",
            price: 22999,
            image: "https://images.unsplash.com/photo-1758178192200-aa46fa597e34?w=600",
            description: "Handcrafted Italian leather handbag with multiple compartments and gold-tone hardware.",
            sku: "HB-ITL-014",
            rating: 4.8,
            reviews_count: 198,
            inventory_count: 28,
            delivery_time: "3-5 business days"
        },
        {
            id: 15,
            title: "Smart Coffee Maker",
            category: "home",
            price: 24999,
            image: "https://images.unsplash.com/photo-1565452344518-47faca79dc69?w=600",
            description: "WiFi-enabled coffee maker with app control, programmable brewing, and thermal carafe.",
            sku: "CM-SMT-015",
            rating: 4.6,
            reviews_count: 542,
            inventory_count: 55,
            delivery_time: "1-2 business days"
        },
        {
            id: 16,
            title: "Robot Vacuum Cleaner",
            category: "home",
            price: 32999,
            image: "https://images.unsplash.com/photo-1603618090561-412154b4bd1b?w=600",
            description: "Smart robotic vacuum with mapping technology, app control, and automatic charging dock.",
            sku: "RV-BOT-016",
            rating: 4.5,
            reviews_count: 687,
            inventory_count: 34,
            delivery_time: "1-2 business days"
        },
        {
            id: 17,
            title: "Air Fryer Pro",
            category: "home",
            price: 14999,
            image: "https://plus.unsplash.com/premium_photo-1711684803379-f45ffd226412?w=600",
            description: "Large capacity air fryer with digital controls, multiple cooking presets, and non-stick basket.",
            sku: "AF-PRO-017",
            rating: 4.6,
            reviews_count: 823,
            inventory_count: 91,
            delivery_time: "1-2 business days"
        },
        {
            id: 18,
            title: "Smart Thermostat",
            category: "home",
            price: 18999,
            image: "https://plus.unsplash.com/premium_photo-1729436833449-225649403fc0?w=600",
            description: "Energy-saving smart thermostat with WiFi connectivity and learning algorithms.",
            sku: "TH-SMT-018",
            rating: 4.7,
            reviews_count: 412,
            inventory_count: 47,
            delivery_time: "1-2 business days"
        },
        {
            id: 19,
            title: "Luxury Bedding Set",
            category: "home",
            price: 12999,
            image: "https://images.unsplash.com/photo-1659986480984-9b7a847168d4?w=600",
            description: "Premium Egyptian cotton bedding set with thread count 1000. Includes sheets, pillowcases, and duvet cover.",
            sku: "BD-LUX-019",
            rating: 4.8,
            reviews_count: 356,
            inventory_count: 62,
            delivery_time: "2-3 business days"
        },
        {
            id: 20,
            title: "Chef's Knife Set",
            category: "home",
            price: 19999,
            image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600",
            description: "Professional-grade knife set with high-carbon steel blades and ergonomic handles.",
            sku: "KN-CHF-020",
            rating: 4.7,
            reviews_count: 234,
            inventory_count: 38,
            delivery_time: "2-3 business days"
        },
        {
            id: 21,
            title: "The Psychology of Success",
            category: "books",
            price: 899,
            image: "https://images.unsplash.com/photo-1578910347621-7e7789165d5d?w=600",
            description: "Bestselling guide to achieving personal and professional success through proven psychological principles.",
            sku: "BK-PSY-021",
            rating: 4.5,
            reviews_count: 1245,
            inventory_count: 156,
            delivery_time: "2-3 business days"
        },
        {
            id: 22,
            title: "Digital Marketing Mastery",
            category: "books",
            price: 1299,
            image: "https://images.unsplash.com/photo-1591286226007-1f9d5b0b7f35?w=600",
            description: "Comprehensive guide to modern digital marketing strategies and tools for businesses.",
            sku: "BK-DMM-022",
            rating: 4.6,
            reviews_count: 892,
            inventory_count: 124,
            delivery_time: "2-3 business days"
        },
        {
            id: 23,
            title: "Cooking Around the World",
            category: "books",
            price: 1599,
            image: "https://chefdez.com/wp-content/uploads/2021/06/cooking-around-the-world-cover.png",
            description: "Beautiful cookbook featuring authentic recipes from 50 countries with stunning photography.",
            sku: "BK-CKW-023",
            rating: 4.8,
            reviews_count: 567,
            inventory_count: 78,
            delivery_time: "3-5 business days"
        },
        {
            id: 24,
            title: "Investment Strategies",
            category: "books",
            price: 1199,
            image: "https://images.unsplash.com/photo-1676282824850-ba7df84c3b67?w=600",
            description: "Expert advice on building wealth through smart investment decisions and portfolio management.",
            sku: "BK-INV-024",
            rating: 4.7,
            reviews_count: 734,
            inventory_count: 98,
            delivery_time: "2-3 business days"
        },
        {
            id: 25,
            title: "Mindfulness and Meditation",
            category: "books",
            price: 799,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
            description: "Practical guide to mindfulness practices and meditation techniques for stress reduction.",
            sku: "BK-MND-025",
            rating: 4.6,
            reviews_count: 1023,
            inventory_count: 145,
            delivery_time: "2-3 business days"
        },
        {
            id: 26,
            title: "Professional Tennis Racket",
            category: "sports",
            price: 18999,
            image: "https://images.unsplash.com/photo-1557493680-99ae26025be8?w=600",
            description: "Tournament-grade tennis racket with carbon fiber construction and perfect balance.",
            sku: "TR-PRO-026",
            rating: 4.7,
            reviews_count: 234,
            inventory_count: 42,
            delivery_time: "2-3 business days"
        },
        {
            id: 27,
            title: "Yoga Mat Premium",
            category: "sports",
            price: 4999,
            image: "https://images.unsplash.com/photo-1667890786022-83bca6c4f4c2?w=600",
            description: "High-quality yoga mat with superior grip, cushioning, and eco-friendly materials.",
            sku: "YM-PRM-027",
            rating: 4.5,
            reviews_count: 678,
            inventory_count: 123,
            delivery_time: "1-2 business days"
        },
        {
            id: 28,
            title: "Fitness Tracker Pro",
            category: "sports",
            price: 12999,
            image: "https://images.unsplash.com/photo-1620213391117-0d169a917221?w=600",
            description: "Advanced fitness tracker with heart rate monitoring, GPS, and 20+ workout modes.",
            sku: "FT-PRO-028",
            rating: 4.6,
            reviews_count: 945,
            inventory_count: 67,
            delivery_time: "1-2 business days"
        },
        {
            id: 29,
            title: "Professional Basketball",
            category: "sports",
            price: 3999,
            image: "https://images.unsplash.com/photo-1682084037329-45a11d86cce7?w=600",
            description: "Official size basketball with premium leather construction and superior grip.",
            sku: "BB-PRO-029",
            rating: 4.5,
            reviews_count: 523,
            inventory_count: 89,
            delivery_time: "1-2 business days"
        },
        {
            id: 30,
            title: "Swimming Goggles Pro",
            category: "sports",
            price: 2999,
            image: "https://images.unsplash.com/photo-1508789964611-09f2d692d591?w=600",
            description: "Professional swimming goggles with anti-fog coating and UV protection.",
            sku: "SG-PRO-030",
            rating: 4.4,
            reviews_count: 412,
            inventory_count: 156,
            delivery_time: "1-2 business days"
        }
    ];
}

// Save products to localStorage
function saveProducts() {
    try {
        localStorage.setItem('sansora_products', JSON.stringify(products));
        console.log('✅ Products saved to localStorage:', products.length);
    } catch (error) {
        console.error('❌ Error saving products:', error);
    }
}

// ============================================
// ADMIN PRODUCT MANAGEMENT FUNCTIONS
// ============================================

function addProduct(productData) {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        title: productData.title,
        category: productData.category,
        price: parseFloat(productData.price),
        image: productData.image || "https://via.placeholder.com/400x300",
        description: productData.description,
        sku: productData.sku || `SKU-${newId}`,
        rating: 4.5,
        reviews_count: 0,
        inventory_count: parseInt(productData.inventory_count) || 0,
        delivery_time: productData.delivery_time || "2-3 business days"
    };
    
    products.push(newProduct);
    saveProducts();
    console.log('✅ Product added:', newProduct);
    return newProduct;
}

function updateProduct(productId, updatedData) {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        saveProducts();
        console.log('✅ Product updated:', products[index]);
        return products[index];
    }
    return null;
}

function deleteProduct(productId) {
    const index = products.findIndex(p => p.id === productId);
    if (index !== -1) {
        const deleted = products.splice(index, 1);
        saveProducts();
        console.log('✅ Product deleted:', deleted[0]);
        return true;
    }
    return false;
}

function getAllProducts() {
    return products;
}

function getProductById(productId) {
    return products.find(p => p.id === parseInt(productId));
}

// ============================================
// AUTHENTICATION SYSTEM
// ============================================

function initializeAuth() {
    const savedUser = localStorage.getItem('sansora_user');
    console.log('Initializing auth, saved user:', savedUser);
    
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            currentUser = userData.username;
            isAdmin = userData.isAdmin || false;
            
            console.log('User authenticated:', currentUser, 'isAdmin:', isAdmin);
            
            const currentPage = window.location.pathname.split('/').pop();
            
            if (currentPage === 'admin.html') {
                if (!isAdmin) {
                    alert('Access denied. Admin privileges required.');
                    window.location.href = 'index.html';
                    return;
                }
            }
            
            if (currentPage === 'login.html') {
                if (isAdmin) {
                    console.log('Admin already logged in, redirecting to admin dashboard');
                    window.location.href = 'admin.html';
                } else {
                    console.log('User already logged in, redirecting to home');
                    window.location.href = 'index.html';
                }
            }
            // Spin the Wheel Functionality
let wheelSpinning = false;
let spinsRemaining = 3;
const wheelSegments = [
    { text: '50% OFF', color: '#ff6b6b', prize: '50% OFF' },
    { text: 'Try Again', color: '#4ecdc4', prize: 'Better Luck!' },
    { text: '30% OFF', color: '#ffe66d', prize: '30% OFF' },
    { text: '₹500', color: '#a8e6cf', prize: '₹500 Cashback' },
    { text: '20% OFF', color: '#ff8b94', prize: '20% OFF' },
    { text: 'Free Ship', color: '#c7ceea', prize: 'Free Shipping' },
    { text: '10% OFF', color: '#ffd3b6', prize: '10% OFF' },
    { text: '₹200', color: '#95e1d3', prize: '₹200 Cashback' }
];

// Draw the wheel
function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    const segmentAngle = (2 * Math.PI) / wheelSegments.length;

    // Draw segments
    wheelSegments.forEach((segment, index) => {
        const startAngle = index * segmentAngle - Math.PI / 2;
        const endAngle = startAngle + segmentAngle;

        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(segment.text, radius / 1.5, 10);
        ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Spin the wheel
function spinWheel() {
    if (wheelSpinning || spinsRemaining <= 0) return;

    wheelSpinning = true;
    spinsRemaining--;
    document.getElementById('spinsRemaining').textContent = spinsRemaining;
    document.getElementById('spinButton').disabled = true;

    const canvas = document.getElementById('wheelCanvas');
    const randomSpin = Math.floor(Math.random() * 360) + 1800; // 5+ rotations
    const duration = 4000;
    const startTime = Date.now();
    let currentRotation = 0;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = easeOut * randomSpin;
        canvas.style.transform = `rotate(${currentRotation}deg)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            wheelSpinning = false;
            const finalRotation = currentRotation % 360;
            const segmentAngle = 360 / wheelSegments.length;
            const winningIndex = Math.floor((360 - finalRotation + segmentAngle / 2) / segmentAngle) % wheelSegments.length;
            showReward(wheelSegments[winningIndex]);
            
            if (spinsRemaining > 0) {
                document.getElementById('spinButton').disabled = false;
            }
        }
    }

    animate();
}

// Show reward modal
function showReward(segment) {
    const modal = document.getElementById('rewardModal');
    const rewardText = document.getElementById('rewardText');
    const rewardCode = document.getElementById('rewardCode');

    if (segment.text === 'Try Again') {
        rewardText.textContent = 'Better luck next time!';
        rewardCode.style.display = 'none';
    } else {
        rewardText.textContent = `You won: ${segment.prize}!`;
        rewardCode.textContent = generateCouponCode();
        rewardCode.style.display = 'block';
    }

    modal.classList.add('active');
    
    // Confetti effect
    createConfetti();
}

// Close reward modal
function closeRewardModal() {
    document.getElementById('rewardModal').classList.remove('active');
}

// Claim reward
function claimReward() {
    const code = document.getElementById('rewardCode').textContent;
    if (code) {
        alert(`Coupon code ${code} has been added to your account!`);
    }
    closeRewardModal();
}

// Generate random coupon code
function generateCouponCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'SANSORA';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Create confetti effect
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'][Math.floor(Math.random() * 4)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '10001';
        confetti.style.borderRadius = '50%';
        document.body.appendChild(confetti);

        const fall = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        fall.onfinish = () => confetti.remove();
    }
}

// Initialize wheel on page load
document.addEventListener('DOMContentLoaded', function() {
    drawWheel();
    
    // Load saved spins
    const savedSpins = localStorage.getItem('sansora_spins');
    const lastSpinDate = localStorage.getItem('sansora_spin_date');
    const today = new Date().toDateString();
    
    if (lastSpinDate === today && savedSpins) {
        spinsRemaining = parseInt(savedSpins);
    } else {
        // Reset spins for new day
        spinsRemaining = 3;
        localStorage.setItem('sansora_spin_date', today);
    }
    
    document.getElementById('spinsRemaining').textContent = spinsRemaining;
    
    // Save spins when changed
    const originalSpin = spinWheel;
    window.spinWheel = function() {
        originalSpin();
        localStorage.setItem('sansora_spins', spinsRemaining);
    };
});

            // Update profile button in navbar
            updateProfileButton();
            
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('sansora_user');
        }
    } else {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (currentPage === 'admin.html') {
            alert('Please login to access the admin dashboard');
            window.location.href = 'login.html';
            return;
        }

        if (currentPage === 'profile.html') {
            alert('Please login to view your profile');
            window.location.href = 'login.html';
            return;
        }
    }
}

// Update profile button based on login status
function updateProfileButton() {
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn && currentUser) {
        const userData = JSON.parse(localStorage.getItem('sansora_user'));
        const initial = currentUser.charAt(0).toUpperCase();
        
        profileBtn.innerHTML = `
            <div style="width: 35px; height: 35px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); 
                        display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1rem;">
                ${initial}
            </div>
        `;
        profileBtn.onclick = () => window.location.href = 'profile.html';
    }
}


// ============================================
// WALLET FUNCTIONS
// ============================================

function getWalletBalance() {
    if (!currentUser) return 0;
    
    const walletData = localStorage.getItem('sansora_wallet_' + currentUser);
    if (walletData) {
        try {
            const data = JSON.parse(walletData);
            return data.balance || 0;
        } catch (error) {
            return 0;
        }
    }
    return 0;
}

function deductFromWallet(amount, description) {
    if (!currentUser) return false;
    
    const walletKey = 'sansora_wallet_' + currentUser;
    let walletData = JSON.parse(localStorage.getItem(walletKey) || '{"balance": 0, "transactions": []}');
    
    if (walletData.balance < amount) {
        showMessage('❌ Insufficient wallet balance!', 'error');
        return false;
    }
    
    walletData.balance -= amount;
    walletData.transactions.push({
        type: 'debit',
        amount: amount,
        description: description,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    
    localStorage.setItem(walletKey, JSON.stringify(walletData));
    showMessage('✅ Payment successful via wallet!', 'success');
    return true;
}

function addToWallet(amount, description) {
    if (!currentUser) return false;
    
    const walletKey = 'sansora_wallet_' + currentUser;
    let walletData = JSON.parse(localStorage.getItem(walletKey) || '{"balance": 0, "transactions": []}');
    
    walletData.balance += amount;
    walletData.transactions.push({
        type: 'credit',
        amount: amount,
        description: description,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    
    localStorage.setItem(walletKey, JSON.stringify(walletData));
    return true;
}


// ============================================
// LOGOUT FUNCTION
// ============================================

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('sansora_user');
        localStorage.removeItem('sansora_remember');
        currentUser = null;
        isAdmin = false;
        // Don't clear cart on logout - let users keep their cart
        window.location.href = 'login.html';
    }
}

// ============================================
// MESSAGE DISPLAY FUNCTION
// ============================================

function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = text;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1.2rem 2rem;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10001;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.4s ease;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// ============================================
// HERO SLIDER FUNCTIONALITY
// ============================================

function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((ind, idx) => {
            if (idx === currentSlide) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, idx) => {
        if (idx === currentSlide) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, idx) => {
        if (idx === currentSlide) {
            ind.classList.add('active');
        } else {
            ind.classList.remove('active');
        }
    });
}
// ============================================
// VIDEO AD FUNCTIONALITY (NEW!)
// ============================================

function playVideo(overlayElement) {
    const videoWrapper = overlayElement.parentElement;
    const iframe = videoWrapper.querySelector('iframe');
    
    if (iframe) {
        // Get current src and add autoplay parameter
        const currentSrc = iframe.src;
        if (!currentSrc.includes('autoplay=1')) {
            iframe.src = currentSrc.replace('autoplay=0', 'autoplay=1');
        }
        
        // Hide the overlay
        overlayElement.style.display = 'none';
        
        // Show message
        showMessage('🎬 Playing video...', 'success');
    }
}

// ============================================
// PRODUCT DISPLAY FUNCTIONS
// ============================================

function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666; grid-column: 1/-1;">No products found in this category.</p>';
        return;
    }
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-category="${product.category}">
            <img src="${product.image}" alt="${product.title}" class="product-image" onclick="viewProduct(${product.id})" style="cursor: pointer;">
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    console.log('✅ Displayed', productsToShow.length, 'products on page');
}

function filterProducts(category) {
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filteredProducts);
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function viewProduct(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// ============================================
// CART FUNCTIONS
// ============================================

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showMessage('Product not found!', 'error');
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showMessage(`✅ ${product.title} quantity updated in cart!`, 'success');
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
        showMessage(`✅ ${product.title} added to cart!`, 'success');
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = totalItems;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveCart();
    displayCart();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartCount();
        saveCart();
        displayCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

function searchProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        displayProducts(products);
        return;
    }
    
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.sku && p.sku.toLowerCase().includes(query))
    );
    
    displayProducts(filtered);
    
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = `Search Results for "${query}" (${filtered.length} items)`;
    }
}

// Initialize search bar if exists
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
});

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function showCategories() {
    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) {
        categoryFilter.scrollIntoView({ behavior: 'smooth' });
    }
}

function showDeals() {
    const dealProducts = products.filter((_, index) => index % 3 === 0);
    displayProducts(dealProducts);
    
    const productsContainer = document.querySelector('.products-container');
    if (productsContainer) {
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = 'Special Deals & Offers';
        }
        productsContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

function showAccount() {
    if (currentUser) {
        alert(`Account: ${currentUser}\nType: ${isAdmin ? 'Admin' : 'User'}`);
    } else {
        window.location.href = 'login.html';
    }
}
// Tracking Orders - NEW FUNCTIONALITY
function createOrder(cartItems, shippingDetails) {
    const orders = JSON.parse(localStorage.getItem('sansora_orders') || '[]');
    const orderId = `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`;
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 500;
    const tax = Math.round(subtotal * 0.1);
    
    const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Processing',
        processingDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: cartItems,
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax,
        shippingAddress: shippingDetails
    };
    
    orders.push(newOrder);
    localStorage.setItem('sansora_orders', JSON.stringify(orders));
    return orderId;
}

// ============================================
// INITIALIZE EVERYTHING WHEN PAGE LOADS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Initializing Sansora...');
    
    // Initialize products FIRST
    initializeProducts();
    
    // Initialize authentication
    initializeAuth();
    
    // Load cart
    loadCart();
    
    // Initialize slider
    initializeSlider();
    
    // Display products on home page
    if (document.getElementById('products-grid')) {
        displayProducts();
    }
    
    // Update cart count
    updateCartCount();
    
    // Show admin link if user is admin
    const savedUser = localStorage.getItem('sansora_user');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            if (userData.isAdmin) {
                const adminNavLink = document.getElementById('adminNavLink');
                if (adminNavLink) {
                    adminNavLink.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    }
    
    console.log('✅ Sansora initialized successfully!');
    console.log('📦 Total products:', products.length);
    console.log('🛒 Cart items:', cart.length);
});

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// ============================================

window.sansora = {
    products,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartCount,
    saveCart,
    loadCart,
    currentUser,
    isAdmin,
    showMessage,
    logout,
    viewProduct,
    filterProducts,
    searchProducts,
    saveProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
};

console.log('✅ Sansora API loaded and ready!');