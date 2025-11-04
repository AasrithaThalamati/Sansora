// seed-database.js - Complete script to populate MongoDB with all 52 products
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'SansoraShopping';

const products = [
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
    },
    {
        id: 31,
        title: "Gaming Headset RGB",
        category: "electronics",
        price: 8999,
        image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600",
        description: "7.1 surround sound gaming headset with RGB lighting and noise-canceling microphone.",
        sku: "GH-RGB-031",
        rating: 4.5,
        reviews_count: 567,
        inventory_count: 78,
        delivery_time: "1-2 business days"
    },
    {
        id: 32,
        title: "Wireless Keyboard & Mouse",
        category: "electronics",
        price: 4999,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
        description: "Ergonomic wireless keyboard and mouse combo with long battery life.",
        sku: "KM-WRL-032",
        rating: 4.4,
        reviews_count: 423,
        inventory_count: 92,
        delivery_time: "1-2 business days"
    },
    {
        id: 33,
        title: "4K Webcam Pro",
        category: "electronics",
        price: 12999,
        image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600",
        description: "Professional 4K webcam with auto-focus, HDR, and built-in dual microphones.",
        sku: "WC-4K-033",
        rating: 4.6,
        reviews_count: 345,
        inventory_count: 54,
        delivery_time: "2-3 business days"
    },
    {
        id: 34,
        title: "Portable SSD 1TB",
        category: "electronics",
        price: 9999,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600",
        description: "Ultra-fast portable SSD with 1TB storage and USB-C connectivity.",
        sku: "SSD-1TB-034",
        rating: 4.7,
        reviews_count: 678,
        inventory_count: 87,
        delivery_time: "1-2 business days"
    },
    {
        id: 35,
        title: "Power Bank 20000mAh",
        category: "electronics",
        price: 3499,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
        description: "High-capacity power bank with fast charging and multiple USB ports.",
        sku: "PB-20K-035",
        rating: 4.5,
        reviews_count: 892,
        inventory_count: 134,
        delivery_time: "1-2 business days"
    },
    {
        id: 36,
        title: "Smart LED Bulbs (4-Pack)",
        category: "home",
        price: 5999,
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600",
        description: "WiFi-enabled smart LED bulbs with 16 million colors and voice control.",
        sku: "LED-SMT-036",
        rating: 4.6,
        reviews_count: 456,
        inventory_count: 112,
        delivery_time: "1-2 business days"
    },
    {
        id: 37,
        title: "Electric Kettle",
        category: "home",
        price: 3999,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600",
        description: "Stainless steel electric kettle with temperature control and auto shut-off.",
        sku: "KT-ELC-037",
        rating: 4.5,
        reviews_count: 678,
        inventory_count: 98,
        delivery_time: "1-2 business days"
    },
    {
        id: 38,
        title: "Cordless Drill Set",
        category: "home",
        price: 15999,
        image: "https://images.unsplash.com/photo-1626925986925-c5c4b35e5e15?w=600",
        description: "Professional cordless drill with battery, charger, and accessory set.",
        sku: "DR-CRD-038",
        rating: 4.7,
        reviews_count: 234,
        inventory_count: 45,
        delivery_time: "2-3 business days"
    },
    {
        id: 39,
        title: "Wall Mounted Shelf",
        category: "home",
        price: 7999,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
        description: "Modern floating shelf with hidden brackets and premium wood finish.",
        sku: "SH-WLL-039",
        rating: 4.4,
        reviews_count: 345,
        inventory_count: 67,
        delivery_time: "3-5 business days"
    },
    {
        id: 40,
        title: "Garden Tool Set",
        category: "home",
        price: 8999,
        image: "https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=600",
        description: "Complete 10-piece gardening tool set with ergonomic handles and storage bag.",
        sku: "GT-SET-040",
        rating: 4.6,
        reviews_count: 289,
        inventory_count: 78,
        delivery_time: "2-3 business days"
    },
    {
        id: 41,
        title: "Running Shoes Pro",
        category: "sports",
        price: 11999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        description: "Professional running shoes with breathable mesh and advanced cushioning.",
        sku: "RS-PRO-041",
        rating: 4.7,
        reviews_count: 834,
        inventory_count: 156,
        delivery_time: "2-3 business days"
    },
    {
        id: 42,
        title: "Dumbbell Set 20kg",
        category: "sports",
        price: 9999,
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600",
        description: "Adjustable dumbbell set with multiple weight plates and secure locks.",
        sku: "DB-20K-042",
        rating: 4.6,
        reviews_count: 456,
        inventory_count: 67,
        delivery_time: "2-3 business days"
    },
    {
        id: 43,
        title: "Cycling Helmet",
        category: "sports",
        price: 5999,
        image: "https://images.unsplash.com/photo-1570758021-ade227dd65da?w=600",
        description: "Safety-certified cycling helmet with adjustable fit and ventilation system.",
        sku: "CH-CYC-043",
        rating: 4.5,
        reviews_count: 345,
        inventory_count: 89,
        delivery_time: "1-2 business days"
    },
    {
        id: 44,
        title: "Resistance Bands Set",
        category: "sports",
        price: 2999,
        image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600",
        description: "Set of 5 resistance bands with different levels and door anchor.",
        sku: "RB-SET-044",
        rating: 4.4,
        reviews_count: 567,
        inventory_count: 145,
        delivery_time: "1-2 business days"
    },
    {
        id: 45,
        title: "Soccer Ball Official",
        category: "sports",
        price: 3499,
        image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600",
        description: "Official size 5 soccer ball with premium synthetic leather construction.",
        sku: "SB-OFF-045",
        rating: 4.6,
        reviews_count: 678,
        inventory_count: 123,
        delivery_time: "1-2 business days"
    },
    {
        id: 46,
        title: "Science Fiction Collection",
        category: "books",
        price: 1999,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600",
        description: "Box set of 5 award-winning science fiction novels from renowned authors.",
        sku: "BK-SFC-046",
        rating: 4.8,
        reviews_count: 445,
        inventory_count: 78,
        delivery_time: "2-3 business days"
    },
    {
        id: 47,
        title: "Photography Guide",
        category: "books",
        price: 1499,
        image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=600",
        description: "Complete guide to digital photography with techniques and examples.",
        sku: "BK-PHG-047",
        rating: 4.7,
        reviews_count: 334,
        inventory_count: 92,
        delivery_time: "2-3 business days"
    },
    {
        id: 48,
        title: "Business Leadership",
        category: "books",
        price: 1299,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        description: "Essential strategies for effective leadership in modern business environments.",
        sku: "BK-BLD-048",
        rating: 4.6,
        reviews_count: 567,
        inventory_count: 112,
        delivery_time: "2-3 business days"
    },
    {
        id: 49,
        title: "Graphic Design Basics",
        category: "books",
        price: 1599,
        image: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=600",
        description: "Comprehensive introduction to graphic design principles and software.",
        sku: "BK-GDB-049",
        rating: 4.5,
        reviews_count: 234,
        inventory_count: 87,
        delivery_time: "2-3 business days"
    },
    {
        id: 50,
        title: "Healthy Living Guide",
        category: "books",
        price: 999,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
        description: "Practical advice for nutrition, exercise, and wellness for a healthier lifestyle.",
        sku: "BK-HLG-050",
        rating: 4.7,
        reviews_count: 678,
        inventory_count: 134,
        delivery_time: "2-3 business days"
    },
    {
        id: 51,
        title: "Men's Formal Shirt",
        category: "fashion",
        price: 2999,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
        description: "Premium cotton formal shirt with wrinkle-resistant fabric and modern fit.",
        sku: "SH-MFM-051",
        rating: 4.5,
        reviews_count: 445,
        inventory_count: 98,
        delivery_time: "2-3 business days"
    },
    {
        id: 52,
        title: "Women's Denim Jeans",
        category: "fashion",
        price: 4999,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
        description: "Comfortable stretch denim jeans with classic fit and multiple size options.",
        sku: "JN-WDN-052",
        rating: 4.6,
        reviews_count: 567,
        inventory_count: 112,
        delivery_time: "2-3 business days"
    }
];

// Sample users for testing
const sampleUsers = [
    {
        name: "Admin User",
        email: "admin@sansora.com",
        password: "admin123", // Will be hashed
        phone: "+91-9876543210",
        role: "admin",
        cart: [],
        wishlist: [],
        addresses: [
            {
                type: "home",
                street: "123 Admin Street",
                city: "Chennai",
                state: "Tamil Nadu",
                pincode: "600001",
                isDefault: true
            }
        ]
    },
    {
        name: "Test User",
        email: "user@test.com",
        password: "test123", // Will be hashed
        phone: "+91-9876543211",
        role: "customer",
        cart: [],
        wishlist: [],
        addresses: []
    }
];

async function seedDatabase() {
    let client;
    
    try {
        console.log('🔄 Connecting to MongoDB...');
        client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        
        console.log('✅ Connected to MongoDB Atlas');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await db.collection('products').deleteMany({});
        await db.collection('users').deleteMany({});
        await db.collection('orders').deleteMany({});
        await db.collection('categories').deleteMany({});
        console.log('✅ Existing data cleared\n');
        
        // Insert products with timestamps
        console.log('📦 Inserting 52 products...');
        const productsWithTimestamps = products.map(product => ({
            ...product,
            createdAt: new Date(),
            updatedAt: new Date(),
            reviews: [],
            tags: [product.category],
            featured: product.id <= 10 // First 10 products are featured
        }));
        
        const productResult = await db.collection('products').insertMany(productsWithTimestamps);
        console.log(`✅ Inserted ${productResult.insertedCount} products`);
        
        // Count products by category
        const electronics = products.filter(p => p.category === 'electronics').length;
        const fashion = products.filter(p => p.category === 'fashion').length;
        const home = products.filter(p => p.category === 'home').length;
        const sports = products.filter(p => p.category === 'sports').length;
        const books = products.filter(p => p.category === 'books').length;
        
        console.log(`   - Electronics: ${electronics}`);
        console.log(`   - Fashion: ${fashion}`);
        console.log(`   - Home: ${home}`);
        console.log(`   - Sports: ${sports}`);
        console.log(`   - Books: ${books}\n`);
        
        // Insert users with hashed passwords
        console.log('👥 Creating sample users...');
        const usersWithHashedPasswords = await Promise.all(
            sampleUsers.map(async user => ({
                ...user,
                password: await bcrypt.hash(user.password, 10),
                createdAt: new Date(),
                updatedAt: new Date()
            }))
        );
        
        const userResult = await db.collection('users').insertMany(usersWithHashedPasswords);
        console.log(`✅ Created ${userResult.insertedCount} users\n`);
        
        // Create categories
        console.log('📂 Creating categories...');
        const categories = [
            {
                name: "Electronics",
                slug: "electronics",
                description: "Latest electronic gadgets and devices",
                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
                productCount: electronics,
                featured: true,
                createdAt: new Date()
            },
            {
                name: "Fashion",
                slug: "fashion",
                description: "Trending fashion and apparel",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
                productCount: fashion,
                featured: true,
                createdAt: new Date()
            },
            {
                name: "Home",
                slug: "home",
                description: "Home appliances and decor",
                image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=600",
                productCount: home,
                featured: true,
                createdAt: new Date()
            },
            {
                name: "Sports",
                slug: "sports",
                description: "Sports equipment and fitness gear",
                image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600",
                productCount: sports,
                featured: true,
                createdAt: new Date()
            },
            {
                name: "Books",
                slug: "books",
                description: "Books for learning and entertainment",
                image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600",
                productCount: books,
                featured: true,
                createdAt: new Date()
            }
        ];
        
        const categoryResult = await db.collection('categories').insertMany(categories);
        console.log(`✅ Created ${categoryResult.insertedCount} categories\n`);
        
        // Create indexes
        console.log('🔍 Creating database indexes...');
        await db.collection('products').createIndex({ title: 'text', description: 'text' });
        await db.collection('products').createIndex({ category: 1 });
        await db.collection('products').createIndex({ price: 1 });
        await db.collection('products').createIndex({ sku: 1 }, { unique: true });
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        await db.collection('orders').createIndex({ userId: 1 });
        await db.collection('orders').createIndex({ createdAt: -1 });
        console.log('✅ Indexes created\n');
        
        // Print summary
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 Database Seeding Summary');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Total Products: ${productResult.insertedCount}`);
        console.log(`✅ Total Users: ${userResult.insertedCount}`);
        console.log(`✅ Total Categories: ${categoryResult.insertedCount}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('🔐 Test Login Credentials:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('   Admin Account:');
        console.log('   📧 Email: admin@sansora.com');
        console.log('   🔑 Password: admin123\n');
        console.log('   Customer Account:');
        console.log('   📧 Email: user@test.com');
        console.log('   🔑 Password: test123');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        console.log('🎉 Database seeded successfully!');
        console.log('💡 Next steps:');
        console.log('   1. Start your server: node server.js');
        console.log('   2. Visit: http://localhost:5501');
        console.log('   3. Test API: http://localhost:5501/api/products\n');
        
    } catch (error) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ Error seeding database:');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error(error);
        console.error('\n💡 Troubleshooting:');
        console.error('   - Check your .env file for correct MONGODB_URI');
        console.error('   - Ensure MongoDB Atlas cluster is running');
        console.error('   - Verify your IP is whitelisted in MongoDB Atlas');
        console.error('   - Check your internet connection\n');
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('✅ MongoDB connection closed');
        }
    }
}

// Run the seed function
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🌱 Sansora Shopping - Database Seeder');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
seedDatabase();