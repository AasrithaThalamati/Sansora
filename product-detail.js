// ============================================
// PRODUCT DETAIL PAGE - QUIZ FIXED
// ============================================

let currentProduct = null;
let quizAnswers = [];
let currentQuizQuestion = 0;

// Quiz questions
const quizQuestions = [
    {
        question: "What's your primary use for this product?",
        options: ["Personal Use", "Professional Use", "Gift", "Business"]
    },
    {
        question: "What's your budget range?",
        options: ["Budget-friendly", "Mid-range", "Premium", "Luxury"]
    },
    {
        question: "How important is brand reputation to you?",
        options: ["Very Important", "Somewhat Important", "Not Important", "No Preference"]
    }
];

// ============================================
// SINGLE DOMContentLoaded
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('Product Detail Page Loading...');

    // Load saved theme first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Get product ID
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    if (!productId) {
        showError('No product selected');
        return;
    }

    loadProduct(productId);
    updateCartCount();
    initializeQuiz();
});

// ============================================
// LOAD PRODUCT
// ============================================

function loadProduct(productId) {
    const savedProducts = localStorage.getItem('sansora_products');
    if (!savedProducts) {
        showError('No products found. Please add from admin panel.');
        return;
    }

    let products = [];
    try {
        products = JSON.parse(savedProducts);
    } catch (error) {
        showError('Error loading products');
        return;
    }

    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) {
        showError(`Product ID ${productId} not found`);
        return;
    }

    displayProduct();
}

// ============================================
// DISPLAY PRODUCT
// ============================================

function displayProduct() {
    if (!currentProduct) return;

    document.getElementById('productTitle').textContent = currentProduct.title;
    document.getElementById('productCategory').textContent = currentProduct.category.toUpperCase();
    document.getElementById('productPrice').textContent = `₹${currentProduct.price.toLocaleString('en-IN')}`;
    document.getElementById('productDescription').textContent = currentProduct.description;

    const skuEl = document.getElementById('productSku');
    if (skuEl) skuEl.textContent = currentProduct.sku || 'N/A';

    const img = document.getElementById('productImage');
    img.src = currentProduct.image;
    img.onerror = () => img.src = 'https://via.placeholder.com/500x500?text=No+Image';

    if (currentProduct.specs) displaySpecs(currentProduct.specs);
    generateThumbnails();
}

// ============================================
// SPECS & THUMBNAILS
// ============================================

function displaySpecs(specs) {
    const container = document.getElementById('specsList');
    if (!container) return;
    container.innerHTML = Object.entries(specs).map(([k, v]) => `
        <div class="spec-item">
            <span class="spec-label">${k}:</span>
            <span class="spec-value">${v}</span>
        </div>
    `).join('');
}

function generateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    if (!container) return;
    const images = currentProduct.images || [{ url: currentProduct.image }];
    container.innerHTML = images.map((img, i) => `
        <img src="${img.url || currentProduct.image}" 
             class="thumbnail ${i === 0 ? 'active' : ''}"
             onclick="changeMainImage('${img.url || currentProduct.image}', ${i})"
             onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">
    `).join('');
}

function changeMainImage(url, index) {
    document.getElementById('productImage').src = url;
    document.querySelectorAll('.thumbnail').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

// ============================================
// CART
// ============================================

function addToCart() {
    if (!currentProduct) return showMessage('Product not loaded', 'error');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(i => i.id === currentProduct.id);
    if (existing) {
        existing.quantity += 1;
        showMessage(`Quantity: ${existing.quantity}`, 'success');
    } else {
        cart.push({ ...currentProduct, quantity: 1 });
        showMessage(`${currentProduct.title} added!`, 'success');
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function buyNow() {
    addToCart();
    setTimeout(() => window.location.href = 'cart.html', 500);
}

function addToWishlist() {
    showMessage('Wishlist coming soon!', 'success');
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    const el = document.getElementById('cart-count');
    if (el) el.textContent = total;
}

// ============================================
// QUIZ - FIXED VERSION
// ============================================

function initializeQuiz() {
    quizAnswers = [];
    currentQuizQuestion = 0;
    displayQuizQuestion();
}

function displayQuizQuestion() {
    console.log('displayQuizQuestion called, question:', currentQuizQuestion);
    
    const container = document.getElementById('quizQuestions');
    console.log('Quiz container found:', container);
    
    if (!container) {
        console.error('Quiz container not found!');
        return;
    }

    const q = quizQuestions[currentQuizQuestion];
    console.log('Current question:', q);
    
    // Clear container first
    container.innerHTML = '';
    
    // Create question element
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question active';
    questionDiv.style.padding = '20px';
    
    const questionTitle = document.createElement('h3');
    questionTitle.textContent = q.question;
    questionTitle.style.marginBottom = '20px';
    questionTitle.style.fontSize = '24px';
    questionTitle.style.color = '#333';
    questionDiv.appendChild(questionTitle);
    
    // Create options container
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    optionsDiv.style.display = 'grid';
    optionsDiv.style.gap = '15px';
    optionsDiv.style.marginTop = '20px';
    
    // Create option buttons
    q.options.forEach((opt, index) => {
        console.log(`Creating button for option ${index}:`, opt);
        
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = opt;
        button.style.padding = '15px 20px';
        button.style.border = '2px solid #e0e0e0';
        button.style.borderRadius = '10px';
        button.style.background = 'white';
        button.style.cursor = 'pointer';
        button.style.fontSize = '16px';
        button.style.transition = 'all 0.3s';
        
        // Check if this option was previously selected
        if (quizAnswers[currentQuizQuestion] === opt) {
            button.classList.add('selected');
            button.style.background = '#667eea';
            button.style.color = 'white';
            button.style.borderColor = '#667eea';
        }
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('selected')) {
                this.style.background = '#f5f5f5';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.background = 'white';
            }
        });
        
        // Add click event listener
        button.addEventListener('click', function() {
            console.log('Option clicked:', opt);
            selectAnswer(opt);
        });
        
        optionsDiv.appendChild(button);
    });
    
    questionDiv.appendChild(optionsDiv);
    container.appendChild(questionDiv);
    
    console.log('Question displayed successfully');

    updateQuizProgress();
    updateQuizButtons();
}

function selectAnswer(answer) {
    quizAnswers[currentQuizQuestion] = answer;
    
    // Update visual selection
    document.querySelectorAll('.quiz-option').forEach(btn => {
        if (btn.textContent.trim() === answer) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function nextQuestion() {
    if (!quizAnswers[currentQuizQuestion]) {
        showMessage('Please select an answer', 'error');
        return;
    }
    if (currentQuizQuestion < quizQuestions.length - 1) {
        currentQuizQuestion++;
        displayQuizQuestion();
    } else {
        showQuizResult();
    }
}

function previousQuestion() {
    if (currentQuizQuestion > 0) {
        currentQuizQuestion--;
        displayQuizQuestion();
    }
}

function updateQuizProgress() {
    const progress = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    if (fill) fill.style.width = `${progress}%`;
    if (text) text.textContent = `Question ${currentQuizQuestion + 1} of ${quizQuestions.length}`;
}

function updateQuizButtons() {
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    
    if (prev) {
        prev.style.display = currentQuizQuestion > 0 ? 'inline-flex' : 'none';
    }
    
    if (next) {
        next.innerHTML = currentQuizQuestion === quizQuestions.length - 1
            ? 'See Results <i class="fas fa-check"></i>'
            : 'Next <i class="fas fa-arrow-right"></i>';
    }
}

function showQuizResult() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    const score = Math.floor(Math.random() * 30) + 70;
    const title = document.getElementById('resultTitle');
    const msg = document.getElementById('resultMessage');
    const scoreEl = document.getElementById('resultScore');

    if (score >= 80) {
        title.textContent = 'Perfect Match!';
        msg.textContent = 'This product is highly recommended for your needs!';
    } else if (score >= 60) {
        title.textContent = 'Good Match!';
        msg.textContent = 'This product meets most of your needs.';
    } else {
        title.textContent = 'Consider Alternatives';
        msg.textContent = 'You might want to explore similar products.';
    }
    scoreEl.textContent = `${score}% Match`;
}

function restartQuiz() {
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    initializeQuiz();
}

// ============================================
// TAB SWITCH
// ============================================

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(tabName)) {
            btn.classList.add('active');
        }
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ============================================
// THEME TOGGLE
// ============================================

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// ============================================
// MESSAGES & ERROR
// ============================================

function showError(message) {
    const container = document.querySelector('.product-detail-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align:center;padding:3rem;background:white;border-radius:15px;margin:2rem auto;max-width:600px;box-shadow:0 8px 30px rgba(0,0,0,0.1);">
                <i class="fas fa-exclamation-triangle" style="font-size:4rem;color:#e74c3c;margin-bottom:1rem;"></i>
                <h2 style="color:#e74c3c;">Product Not Found</h2>
                <p style="color:#666;margin:1rem 0;">${message}</p>
                <a href="index.html" style="background:#0066cc;color:white;padding:1rem 2rem;border-radius:25px;text-decoration:none;">
                    Back to Home
                </a>
            </div>
        `;
    }
}

function showMessage(text, type) {
    const div = document.createElement('div');
    div.textContent = text;
    div.style.cssText = `
        position:fixed;top:100px;right:20px;padding:1rem 1.5rem;border-radius:10px;
        color:white;z-index:10001;box-shadow:0 4px 12px rgba(0,0,0,0.3);
        background:${type==='success' ? 'linear-gradient(45deg,#27ae60,#2ecc71)' : 'linear-gradient(45deg,#e74c3c,#c0392b)'};
        animation:slideIn 0.3s ease;
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

console.log('Product Detail JS - Quiz Fixed & Loaded!');