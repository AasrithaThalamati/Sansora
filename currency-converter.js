// currency-converter.js - Live Currency Conversion System for Sansora

class CurrencyConverter {
    constructor() {
        this.baseCurrency = 'INR'; // Base currency for all prices
        this.currentCurrency = localStorage.getItem('sansora_currency') || 'INR';
        this.exchangeRates = {};
        this.supportedCurrencies = {
            'INR': { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
            'USD': { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
            'EUR': { symbol: '€', name: 'Euro', flag: '🇪🇺' },
            'GBP': { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
            'AED': { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
            'SGD': { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
            'AUD': { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
            'CAD': { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
            'JPY': { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' }
        };
        this.lastUpdated = null;
        this.updateInterval = 3600000; // Update every hour
        
        this.init();
    }

    async init() {
        // Load cached rates first for instant display
        this.loadCachedRates();
        
        // Fetch fresh rates
        await this.fetchExchangeRates();
        
        // Add currency selector to navbar
        this.addCurrencySelector();
        
        // Convert all prices on page
        this.convertAllPrices();
        
        // Set up auto-refresh
        this.setupAutoRefresh();
    }

    loadCachedRates() {
        const cached = localStorage.getItem('sansora_exchange_rates');
        const cachedTime = localStorage.getItem('sansora_rates_timestamp');
        
        if (cached && cachedTime) {
            this.exchangeRates = JSON.parse(cached);
            this.lastUpdated = new Date(parseInt(cachedTime));
        }
    }

    async fetchExchangeRates() {
        try {
            // Using exchangerate-api.com (free tier: 1500 requests/month)
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`);
            
            if (!response.ok) throw new Error('Failed to fetch rates');
            
            const data = await response.json();
            this.exchangeRates = data.rates;
            this.lastUpdated = new Date(data.time_last_updated * 1000);
            
            // Cache the rates
            localStorage.setItem('sansora_exchange_rates', JSON.stringify(this.exchangeRates));
            localStorage.setItem('sansora_rates_timestamp', Date.now().toString());
            
            console.log('✅ Exchange rates updated successfully');
        } catch (error) {
            console.error('❌ Error fetching exchange rates:', error);
            
            // If no cached rates, set default (1:1)
            if (Object.keys(this.exchangeRates).length === 0) {
                Object.keys(this.supportedCurrencies).forEach(currency => {
                    this.exchangeRates[currency] = 1;
                });
            }
        }
    }

    setupAutoRefresh() {
        setInterval(() => {
            this.fetchExchangeRates();
            this.convertAllPrices();
        }, this.updateInterval);
    }

    addCurrencySelector() {
        // Find the navbar
        const navbar = document.querySelector('.nav-container');
        if (!navbar) return;

        // Create currency selector HTML
        const selectorHTML = `
            <div class="currency-selector" style="position: relative; margin-left: auto;">
                <button class="currency-btn" id="currencyBtn" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 0.6rem 1.2rem;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
                ">
                    <span id="currentCurrencyFlag">${this.supportedCurrencies[this.currentCurrency].flag}</span>
                    <span id="currentCurrencyCode">${this.currentCurrency}</span>
                    <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>
                </button>
                
                <div class="currency-dropdown" id="currencyDropdown" style="
                    position: absolute;
                    top: 110%;
                    right: 0;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    min-width: 280px;
                    display: none;
                    z-index: 10000;
                    overflow: hidden;
                    animation: slideDown 0.3s ease;
                ">
                    <div style="
                        padding: 1rem;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        font-weight: 600;
                    ">
                        <i class="fas fa-globe"></i> Select Currency
                    </div>
                    <div id="currencyList" style="max-height: 400px; overflow-y: auto;">
                        ${this.generateCurrencyList()}
                    </div>
                    <div style="
                        padding: 0.8rem;
                        background: #f8f9fa;
                        font-size: 0.75rem;
                        color: #666;
                        text-align: center;
                        border-top: 1px solid #e9ecef;
                    ">
                        <i class="fas fa-info-circle"></i> Last updated: <span id="ratesTimestamp">${this.getTimeAgo()}</span>
                    </div>
                </div>
            </div>
            
            <style>
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .currency-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                }
                
                .currency-item {
                    padding: 0.8rem 1.2rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .currency-item:hover {
                    background: linear-gradient(135deg, #f8f9ff 0%, #f0f3ff 100%);
                }
                
                .currency-item.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .currency-item .rate {
                    margin-left: auto;
                    font-size: 0.85rem;
                    color: #666;
                }
                
                .currency-item.active .rate {
                    color: rgba(255, 255, 255, 0.9);
                }
            </style>
        `;

        // Insert before nav-links
        const navLinks = navbar.querySelector('.nav-links');
        if (navLinks) {
            navLinks.insertAdjacentHTML('beforebegin', selectorHTML);
            
            // Add event listeners
            this.setupCurrencySelector();
        }
    }

    generateCurrencyList() {
        return Object.keys(this.supportedCurrencies)
            .map(code => {
                const currency = this.supportedCurrencies[code];
                const rate = this.exchangeRates[code] || 1;
                const isActive = code === this.currentCurrency;
                
                return `
                    <div class="currency-item ${isActive ? 'active' : ''}" data-currency="${code}">
                        <span style="font-size: 1.5rem;">${currency.flag}</span>
                        <div>
                            <div style="font-weight: 600;">${code}</div>
                            <div style="font-size: 0.8rem; opacity: 0.8;">${currency.name}</div>
                        </div>
                        <span class="rate">1 INR = ${rate.toFixed(4)} ${code}</span>
                    </div>
                `;
            })
            .join('');
    }

    setupCurrencySelector() {
        const btn = document.getElementById('currencyBtn');
        const dropdown = document.getElementById('currencyDropdown');
        const currencyItems = document.querySelectorAll('.currency-item');

        // Toggle dropdown
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.style.display = 'none';
        });

        // Handle currency selection
        currencyItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const currency = item.getAttribute('data-currency');
                this.changeCurrency(currency);
                dropdown.style.display = 'none';
            });
        });
    }

    changeCurrency(newCurrency) {
        this.currentCurrency = newCurrency;
        localStorage.setItem('sansora_currency', newCurrency);
        
        // Update button display
        document.getElementById('currentCurrencyFlag').textContent = 
            this.supportedCurrencies[newCurrency].flag;
        document.getElementById('currentCurrencyCode').textContent = newCurrency;
        
        // Update active state in dropdown
        document.querySelectorAll('.currency-item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-currency') === newCurrency);
        });
        
        // Convert all prices
        this.convertAllPrices();
        
        // Show notification
        this.showNotification(`Currency changed to ${this.supportedCurrencies[newCurrency].name}`);
    }

    convertPrice(priceInINR) {
        const rate = this.exchangeRates[this.currentCurrency] || 1;
        return priceInINR * rate;
    }

    formatPrice(priceInINR) {
        const convertedPrice = this.convertPrice(priceInINR);
        const symbol = this.supportedCurrencies[this.currentCurrency].symbol;
        
        // Format based on currency
        let formatted;
        if (this.currentCurrency === 'JPY') {
            // No decimals for Yen
            formatted = Math.round(convertedPrice).toLocaleString('en-US');
        } else {
            formatted = convertedPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        return `${symbol}${formatted}`;
    }

    convertAllPrices() {
        // Convert product prices
        document.querySelectorAll('[data-price]').forEach(element => {
            const priceInINR = parseFloat(element.getAttribute('data-price'));
            element.textContent = this.formatPrice(priceInINR);
        });

        // Convert cart summary if exists
        this.updateCartSummary();
    }

    updateCartSummary() {
        // Update cart total, subtotal, etc.
        const summaryElements = document.querySelectorAll('.summary-row span:last-child');
        summaryElements.forEach(element => {
            const text = element.textContent.trim();
            // Extract INR price and convert
            const match = text.match(/₹([\d,]+)/);
            if (match) {
                const priceInINR = parseFloat(match[1].replace(/,/g, ''));
                element.textContent = this.formatPrice(priceInINR);
            }
        });
    }

    getTimeAgo() {
        if (!this.lastUpdated) return 'Just now';
        
        const seconds = Math.floor((new Date() - this.lastUpdated) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return this.lastUpdated.toLocaleDateString();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            z-index: 10001;
            font-weight: 600;
            animation: slideInRight 0.4s ease;
        `;
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Helper method to mark prices in HTML
    static markPrice(element, priceInINR) {
        element.setAttribute('data-price', priceInINR);
        return element;
    }
}

// Initialize currency converter when DOM is loaded
let currencyConverter;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        currencyConverter = new CurrencyConverter();
    });
} else {
    currencyConverter = new CurrencyConverter();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.CurrencyConverter = CurrencyConverter;
    window.currencyConverter = currencyConverter;
}