// Product images for background slideshow
const productImages = [
    "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1705530292519-ec81f2ace70d?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?w=1200&h=800&fit=crop"
];

let currentSlide = 0;
const bgSlideshow = document.getElementById('bgSlideshow');

// Background Slideshow
function initBackgroundSlideshow() {
    productImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'bg-slide';
        slide.style.backgroundImage = `url('${image}')`;
        if (index === 0) slide.classList.add('active');
        bgSlideshow.appendChild(slide);
    });
}

function changeBackgroundSlide() {
    const slides = document.querySelectorAll('.bg-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function startBackgroundSlideshow() {
    setInterval(changeBackgroundSlide, 5000);
}

// Animated Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 40 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Password Toggle
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('togglePassword');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// Show Message
function showMessage(message, type = 'success') {
    const messagePopup = document.getElementById('loginMessage');
    messagePopup.textContent = message;
    messagePopup.className = `message-popup ${type} show`;
    
    setTimeout(() => {
        messagePopup.classList.remove('show');
    }, 4000);
}

// Form Submission
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    setLoadingState(true);
    
    setTimeout(() => {
        const validCredentials = [
            { username: 'Aasritha_Thalamati', password: '1234', role: 'user', isAdmin: false },
            { username: 'admin', password: 'admin123', role: 'admin', isAdmin: true }
        ];
        
        const user = validCredentials.find(
            cred => cred.username === username && cred.password === password
        );
        
        setLoadingState(false);
        
        if (user) {
            showMessage(`Welcome back, ${username}!`, 'success');
            
            const userData = {
                username: user.username,
                role: user.role,
                isAdmin: user.isAdmin,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('sansora_user', JSON.stringify(userData));
            
            if (remember) {
                localStorage.setItem('sansora_remember', 'true');
            }
            
            setTimeout(() => {
                window.location.href = user.isAdmin ? 'admin.html' : 'index.html';
            }, 1500);
            
        } else {
            showMessage('Invalid username or password', 'error');
            
            const loginCard = document.querySelector('.login-card');
            loginCard.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginCard.style.animation = 'slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }, 500);
        }
    }, 800);
}

// Loading State
function setLoadingState(isLoading) {
    const loginBtn = document.querySelector('.login-btn');
    
    if (isLoading) {
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    } else {
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In';
    }
}

// Shake Animation
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const savedUser = localStorage.getItem('sansora_user');
    if (savedUser) {
        try {
            const userData = JSON.parse(savedUser);
            window.location.href = userData.isAdmin ? 'admin.html' : 'index.html';
            return;
        } catch (error) {
            localStorage.removeItem('sansora_user');
        }
    }
    
    initBackgroundSlideshow();
    startBackgroundSlideshow();
    createParticles();
    
    document.getElementById('username').focus();
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('togglePassword').addEventListener('click', togglePassword);
    
    document.querySelector('.forgot-link').addEventListener('click', function(e) {
        e.preventDefault();
        showMessage('Password reset feature coming soon!', 'success');
    });
    
    // Credential box click to fill
    document.querySelectorAll('.credential-box').forEach(box => {
        box.addEventListener('click', function() {
            const text = this.textContent;
            const usernameMatch = text.match(/Username:\s*(\S+)/);
            const passwordMatch = text.match(/Password:\s*(\S+)/);
            
            if (usernameMatch && passwordMatch) {
                document.getElementById('username').value = usernameMatch[1];
                document.getElementById('password').value = passwordMatch[1];
                showMessage('Credentials filled! Click Sign In to continue.', 'success');
            }
        });
    });
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});

// Console Welcome
console.log('%c🛍️ Welcome to Sansora Shopping!', 'background: linear-gradient(45deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cDemo Credentials:', 'font-weight: bold; font-size: 14px; color: #667eea;');
console.log('User: Aasritha_Thalamati / 1234');
console.log('Admin: admin / admin123');