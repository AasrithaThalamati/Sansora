// products-data.js - Complete product catalog
const products = [
    {
        id: 1,
        title: "iPhone 15 Pro Max",
        category: "electronics",
        price: 134900,
        image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=300&fit=crop",
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 256GB storage, ProRAW photography, and all-day battery life.",
        sku: "IP-15-001",
        specs: {
            "Processor": "A17 Pro chip",
            "Storage": "256GB",
            "Display": "6.7-inch Super Retina XDR",
            "Camera": "48MP Main + 12MP Ultra Wide"
        }
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra",
        category: "electronics",
        price: 129999,
        image: "https://images.unsplash.com/photo-1705530292519-ec81f2ace70d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyNCUyMFVsdHJhfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Premium Android flagship with S Pen, 200MP camera, AI features, and stunning 6.8\" Dynamic AMOLED display.",
        sku: "SG-S24-002",
        specs: {
            "Display": "6.8-inch Dynamic AMOLED",
            "Camera": "200MP Main Camera",
            "S Pen": "Included",
            "Processor": "Snapdragon 8 Gen 3"
        }
    },
    {
        id: 3,
        title: "MacBook Pro 16-inch",
        category: "electronics",
        price: 249900,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop",
        description: "Apple's most powerful laptop with M3 Pro chip, 16GB RAM, 512GB SSD, and Liquid Retina XDR display.",
        sku: "MB-16-003",
        specs: {
            "Processor": "M3 Pro chip",
            "RAM": "16GB",
            "Storage": "512GB SSD",
            "Display": "16-inch Liquid Retina XDR"
        }
    },
    {
        id: 4,
        title: "Sony WH-1000XM5 Headphones",
        category: "electronics",
        price: 29990,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        description: "Industry-leading noise canceling headphones with 30-hour battery life and premium sound quality.",
        sku: "SN-WH-004",
        specs: {
            "Noise Cancellation": "Industry-leading",
            "Battery Life": "30 hours",
            "Connectivity": "Bluetooth 5.2",
            "Weight": "250g"
        }
    },
    {
        id: 5,
        title: "iPad Pro 12.9-inch",
        category: "electronics",
        price: 112900,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
        description: "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil compatibility.",
        sku: "IP-PRO-005",
        specs: {
            "Processor": "M2 chip",
            "Display": "12.9-inch Liquid Retina XDR",
            "Storage": "128GB/256GB/512GB",
            "Apple Pencil": "Compatible (2nd gen)"
        }
    },
    // Continue with all 50 products...
    // (I'll include a few more examples, you can add the rest following the same pattern)
    {
        id: 6,
        title: "Dell XPS 15",
        category: "electronics",
        price: 189999,
        image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=400&h=300&fit=crop",
        description: "Premium Windows laptop with Intel i7, 16GB RAM, RTX 4070 graphics, and 15.6\" OLED display.",
        sku: "DL-XPS-006",
        specs: {
            "Processor": "Intel Core i7-13700H",
            "RAM": "16GB DDR5",
            "Graphics": "NVIDIA RTX 4070",
            "Display": "15.6-inch OLED"
        }
    },
    {
        id: 7,
        title: "Apple Watch Series 9",
        category: "electronics",
        price: 41900,
        image: "https://images.unsplash.com/photo-1705307367492-fbaf340d8b72?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjB3YXRjaCUyMHNlcmllcyUyMDl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Advanced smartwatch with health tracking, GPS, cellular connectivity, and S9 SiP chip.",
        sku: "AW-S9-007",
        specs: {
            "Chip": "S9 SiP",
            "Display": "Always-On Retina",
            "Health Features": "ECG, Blood Oxygen, Heart Rate",
            "Connectivity": "GPS + Cellular"
        }
    },
    {
        id: 8,
        title: "Nintendo Switch OLED",
        category: "electronics",
        price: 32999,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
        description: "Portable gaming console with 7-inch OLED screen, 64GB storage, and versatile play modes.",
        sku: "NS-OLED-008",
        specs: {
            "Display": "7-inch OLED",
            "Storage": "64GB",
            "Play Modes": "TV, Tabletop, Handheld",
            "Battery": "4.5-9 hours"
        }
    },
    {
        id: 9,
        title: "Premium Leather Jacket",
        category: "fashion",
        price: 12999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        description: "Genuine leather jacket with modern fit, multiple pockets, and timeless design. Available in black and brown.",
        sku: "LJ-PRM-009",
        specs: {
            "Material": "Genuine Leather",
            "Colors": "Black, Brown",
            "Fit": "Modern Slim Fit",
            "Pockets": "4 external, 2 internal"
        }
    },
    {
        id: 10,
        title: "Designer Silk Dress",
        category: "fashion",
        price: 8999,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        description: "Elegant silk dress perfect for special occasions. Features flattering cut and premium fabric quality.",
        sku: "SD-DES-010",
        specs: {
            "Material": "100% Silk",
            "Occasion": "Formal/Evening",
            "Care": "Dry clean only",
            "Sizes": "XS to XL"
        }
    },
    {
        id: 11,
        title: "Luxury Swiss Watch",
        category: "fashion",
        price: 45999,
        image: "https://media.istockphoto.com/id/97472180/photo/wristwatch.webp?a=1&b=1&s=612x612&w=0&k=20&c=CyWnPQvv0qrdY4QsA9NYtbEuGC53amsTZ1bUiALncsg=",
        description: "Precision Swiss-made timepiece with automatic movement, sapphire crystal, and water resistance.",
        sku: "SW-LUX-011",
        specs: {
            "Movement": "Automatic Swiss",
            "Crystal": "Sapphire",
            "Water Resistance": "100m",
            "Case Material": "Stainless Steel"
        }
    },
    {
        id: 12,
        title: "Designer Sunglasses",
        category: "fashion",
        price: 15999,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        description: "Premium polarized sunglasses with UV protection and scratch-resistant lenses.",
        sku: "SG-DES-012",
        specs: {
            "Lens": "Polarized",
            "UV Protection": "100%",
            "Material": "Acetate frame",
            "Coating": "Scratch-resistant"
        }
    },
    {
        id: 13,
        title: "Cashmere Sweater",
        category: "fashion",
        price: 18999,
        image: "https://plus.unsplash.com/premium_photo-1698952163456-c062a79ea49c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGNhcmRpZ2FufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Ultra-soft cashmere sweater in multiple colors. Perfect for luxury comfort and style.",
        sku: "CS-SWT-013",
        specs: {
            "Material": "100% Cashmere",
            "Weight": "Lightweight",
            "Colors": "Multiple available",
            "Care": "Hand wash or dry clean"
        }
    },
    {
        id: 14,
        title: "Italian Leather Handbag",
        category: "fashion",
        price: 22999,
        image: "https://images.unsplash.com/photo-1758178192200-aa46fa597e34?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbmVyJTIwYmFnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Handcrafted Italian leather handbag with multiple compartments and gold-tone hardware.",
        sku: "HB-ITL-014",
        specs: {
            "Material": "Italian Leather",
            "Hardware": "Gold-tone",
            "Compartments": "Multiple",
            "Craftsmanship": "Handcrafted"
        }
    },
    {
        id: 15,
        title: "Smart Coffee Maker",
        category: "home",
        price: 24999,
        image: "https://images.unsplash.com/photo-1565452344518-47faca79dc69?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnQlMjBjb2ZmZWUlMjBtYWtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "WiFi-enabled coffee maker with app control, programmable brewing, and thermal carafe.",
        sku: "CM-SMT-015",
        specs: {
            "Connectivity": "WiFi",
            "Capacity": "12 cups",
            "Features": "Programmable, App Control",
            "Carafe": "Thermal"
        }
    },
    {
        id: 16,
        title: "Robot Vacuum Cleaner",
        category: "home",
        price: 32999,
        image: "https://images.unsplash.com/photo-1603618090561-412154b4bd1b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9ib3QlMjB2YWN1dW0lMjBjbGVhbmVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Smart robotic vacuum with mapping technology, app control, and automatic charging dock.",
        sku: "RV-BOT-016",
        specs: {
            "Navigation": "Smart Mapping",
            "Battery": "120 minutes",
            "Control": "App + Voice",
            "Features": "Auto-charge, Scheduling"
        }
    },
    {
        id: 17,
        title: "Air Fryer Pro",
        category: "home",
        price: 14999,
        image: "https://plus.unsplash.com/premium_photo-1711684803379-f45ffd226412?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWlyJTIwZnJ5ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Large capacity air fryer with digital controls, multiple cooking presets, and non-stick basket.",
        sku: "AF-PRO-017",
        specs: {
            "Capacity": "6.5 Liters",
            "Temperature": "80-200°C",
            "Presets": "8 cooking modes",
            "Basket": "Non-stick"
        }
    },
    {
        id: 18,
        title: "Smart Thermostat",
        category: "home",
        price: 18999,
        image: "https://plus.unsplash.com/premium_photo-1729436833449-225649403fc0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnQlMjB0aGVybW9zdGF0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Energy-saving smart thermostat with WiFi connectivity and learning algorithms.",
        sku: "TH-SMT-018",
        specs: {
            "Connectivity": "WiFi",
            "Learning": "AI-powered",
            "Compatibility": "Most HVAC systems",
            "Energy Savings": "Up to 23%"
        }
    },
    {
        id: 19,
        title: "Luxury Bedding Set",
        category: "home",
        price: 12999,
        image: "https://images.unsplash.com/photo-1659986480984-9b7a847168d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGx1eHVyeSUyMGJlZGRpbmclMjBzZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Premium Egyptian cotton bedding set with thread count 1000. Includes sheets, pillowcases, and duvet cover.",
        sku: "BD-LUX-019",
        specs: {
            "Material": "Egyptian Cotton",
            "Thread Count": "1000",
            "Includes": "Sheets, Pillowcases, Duvet",
            "Sizes": "Queen, King"
        }
    },
    {
        id: 20,
        title: "Chef's Knife Set",
        category: "home",
        price: 19999,
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a25pZmUlMjBzZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Professional-grade knife set with high-carbon steel blades and ergonomic handles.",
        sku: "KN-CHF-020",
        specs: {
            "Material": "High-carbon Steel",
            "Pieces": "8-piece set",
            "Handles": "Ergonomic",
            "Sharpness": "Professional-grade"
        }
    },
    {
        id: 21,
        title: "The Psychology of Success",
        category: "books",
        price: 899,
        image: "https://images.unsplash.com/photo-1578910347621-7e7789165d5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VGhlJTIwUHN5Y2hvbG9neSUyMG9mJTIwU3VjY2VzcyUyMGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Bestselling guide to achieving personal and professional success through proven psychological principles.",
        sku: "BK-PSY-021",
        specs: {
            "Pages": "350",
            "Format": "Hardcover/Paperback",
            "Language": "English",
            "Publisher": "Success Publishing"
        }
    },
    {
        id: 22,
        title: "Digital Marketing Mastery",
        category: "books",
        price: 1299,
        image: "https://images.unsplash.com/photo-1591286226007-1f9d5b0b7f35?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RGlnaXRhbCUyME1hcmtldGluZyUyME1hc3RlcnklMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Comprehensive guide to modern digital marketing strategies and tools for businesses.",
        sku: "BK-DMM-022",
        specs: {
            "Pages": "420",
            "Format": "Paperback",
            "Edition": "2024 Updated",
            "Topics": "SEO, Social Media, PPC"
        }
    },
    {
        id: 23,
        title: "Cooking Around the World",
        category: "books",
        price: 1599,
        image: "https://chefdez.com/wp-content/uploads/2021/06/cooking-around-the-world-cover.png",
        description: "Beautiful cookbook featuring authentic recipes from 50 countries with stunning photography.",
        sku: "BK-CKW-023",
        specs: {
            "Recipes": "200+",
            "Countries": "50",
            "Format": "Hardcover",
            "Photography": "Full-color"
        }
    },
    {
        id: 24,
        title: "Investment Strategies",
        category: "books",
        price: 1199,
        image: "https://images.unsplash.com/photo-1676282824850-ba7df84c3b67?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW52ZXN0bWVudCUyMHN0cmF0ZWd5JTIwYm9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Expert advice on building wealth through smart investment decisions and portfolio management.",
        sku: "BK-INV-024",
        specs: {
            "Pages": "380",
            "Level": "Beginner to Advanced",
            "Topics": "Stocks, Bonds, Real Estate",
            "Format": "Paperback"
        }
    },
    {
        id: 25,
        title: "Mindfulness and Meditation",
        category: "books",
        price: 799,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
        description: "Practical guide to mindfulness practices and meditation techniques for stress reduction.",
        sku: "BK-MND-025",
        specs: {
            "Pages": "280",
            "Exercises": "50+ practices",
            "Format": "Paperback",
            "Illustrations": "Included"
        }
    },
    {
        id: 26,
        title: "Professional Tennis Racket",
        category: "sports",
        price: 18999,
        image: "https://images.unsplash.com/photo-1557493680-99ae26025be8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fFByb2Zlc3Npb25hbCUyMFRlbm5pcyUyMFJhY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Tournament-grade tennis racket with carbon fiber construction and perfect balance.",
        sku: "TR-PRO-026",
        specs: {
            "Material": "Carbon Fiber",
            "Weight": "310g",
            "Head Size": "100 sq in",
            "Grip Size": "4 3/8\""
        }
    },
    {
        id: 27,
        title: "Yoga Mat Premium",
        category: "sports",
        price: 4999,
        image: "https://media.istockphoto.com/id/2170450588/photo/interior-of-modern-light-gym-is-well-equipped-with-modern-machines-and-fitness-gear-offering.webp?a=1&b=1&s=612x612&w=0&k=20&c=DHZrsUreCkgZcQG5NAkEl60e2CHHCDjMgra3eL17NbA=",
        description: "High-quality yoga mat with superior grip, cushioning, and eco-friendly materials.",
        sku: "YM-PRM-027",
        specs: {
            "Thickness": "6mm",
            "Material": "Eco-friendly TPE",
            "Size": "183cm x 61cm",
            "Features": "Non-slip, Lightweight"
        }
    },
    {
        id: 28,
        title: "Fitness Tracker Pro",
        category: "sports",
        price: 12999,
        image: "https://media.istockphoto.com/id/1291101465/photo/over-shoulder-view-on-woman-using-tracker-software.webp?a=1&b=1&s=612x612&w=0&k=20&c=WdoiRHp3mgGq0AU1Cm4hXBm1hivgNmkkggylyjrp1C8=",
        description: "Advanced fitness tracker with heart rate monitoring, GPS, and 20+ workout modes.",
        sku: "FT-PRO-028",
        specs: {
            "Display": "AMOLED",
            "Battery": "7 days",
            "Water Resistance": "5 ATM",
            "Workout Modes": "20+"
        }
    },
    {
        id: 29,
        title: "Professional Basketball",
        category: "sports",
        price: 3999,
        image: "https://images.unsplash.com/photo-1682084037329-45a11d86cce7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UHJvZmVzc2lvbmFsJTIwQmFza2V0YmFsbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Official size basketball with premium leather construction and superior grip.",
        sku: "BB-PRO-029",
        specs: {
            "Size": "Official (Size 7)",
            "Material": "Premium Leather",
            "Indoor/Outdoor": "Indoor",
            "Grip": "Enhanced"
        }
    },
    {
        id: 30,
        title: "Swimming Goggles Pro",
        category: "sports",
        price: 2999,
        image: "https://images.unsplash.com/photo-1508789964611-09f2d692d591?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fFN3aW1taW5nJTIwR29nZ2xlcyUyMFByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Professional swimming goggles with anti-fog coating and UV protection.",
        sku: "SG-PRO-030",
        specs: {
            "Lens": "Anti-fog",
            "UV Protection": "Yes",
            "Fit": "Adjustable",
            "Use": "Competition/Training"
        }
    },
    {
        id: 31,
        title: "4K Webcam Ultra",
        category: "electronics",
        price: 15999,
        image: "https://images.unsplash.com/photo-1614588876378-b2ffa4520c22?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NEslMjBXZWJjYW0lMjBVbHRyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Ultra HD webcam with autofocus, noise reduction, and professional streaming capabilities.",
        sku: "WC-4K-031",
        specs: {
            "Resolution": "4K at 30fps",
            "Autofocus": "Yes",
            "Microphone": "Built-in with noise reduction",
            "Field of View": "90 degrees"
        }
    },
    {
        id: 32,
        title: "Wireless Gaming Mouse",
        category: "electronics",
        price: 8999,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
        description: "High-precision gaming mouse with RGB lighting and customizable buttons.",
        sku: "GM-WLS-032",
        specs: {
            "DPI": "Up to 16000",
            "Buttons": "8 programmable",
            "Battery": "70 hours",
            "RGB": "Customizable"
        }
    },
    {
        id: 33,
        title: "Bluetooth Speaker Premium",
        category: "electronics",
        price: 19999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        description: "Portable speaker with 360-degree sound, waterproof design, and 24-hour battery.",
        sku: "BS-PRM-033",
        specs: {
            "Battery": "24 hours",
            "Water Resistance": "IPX7",
            "Bluetooth": "5.0",
            "Sound": "360-degree"
        }
    },
    {
        id: 34,
        title: "Premium Denim Jeans",
        category: "fashion",
        price: 7999,
        image: "https://images.unsplash.com/photo-1715758890151-2c15d5d482aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFByZW1pdW0lMjBEZW5pbSUyMEplYW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Designer jeans with perfect fit, premium denim fabric, and modern styling.",
        sku: "DJ-PRM-034",
        specs: {
            "Material": "Premium Denim",
            "Fit": "Slim/Regular/Relaxed",
            "Stretch": "Yes",
            "Wash": "Multiple options"
        }
    },
    {
        id: 35,
        title: "Luxury Perfume Set",
        category: "fashion",
        price: 12999,
        image: "https://plus.unsplash.com/premium_photo-1726873234228-a511f8a05f1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8THV4dXJ5JTIwUGVyZnVtZSUyMFNldCd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Collection of premium fragrances in elegant packaging. Long-lasting and sophisticated scents.",
        sku: "PF-LUX-035",
        specs: {
            "Bottles": "3-piece set",
            "Volume": "50ml each",
            "Longevity": "8-12 hours",
            "Notes": "Floral, Woody, Fresh"
        }
    },
    {
        id: 36,
        title: "Smart Home Security System",
        category: "home",
        price: 34999,
        image: "https://plus.unsplash.com/premium_photo-1663054919747-d237d710c70e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        description: "Complete security system with cameras, sensors, and smart alerts for home protection.",
        sku: "HS-SEC-036",
        specs: {
            "Cameras": "4 HD cameras",
            "Sensors": "Door/Window sensors",
            "Storage": "Cloud + Local",
            "Alerts": "Mobile notifications"
        }
    },
    {
        id: 37,
        title: "Espresso Machine Deluxe",
        category: "home",
        price: 45999,
        image: "https://media.istockphoto.com/id/1436360977/photo/modern-and-luxury-black-espresso-maker-on-wooden-counter-coffee-cup-and-sunlight-and-leaf.webp?a=1&b=1&s=612x612&w=0&k=20&c=4eymAujaVVC70WI_YBi9I6p8E0jyoiNhSOCjYFmjglc=",
        description: "Professional espresso machine with built-in grinder and milk frother.",
        sku: "EM-DLX-037",
        specs: {
            "Pressure": "15 bar",
            "Grinder": "Built-in burr grinder",
            "Milk Frother": "Automatic",
            "Water Tank": "2 liters"
        }
    },
    {
        id: 38,
        title: "Art of Leadership",
        category: "books",
        price: 999,
        image: "https://images.unsplash.com/photo-1664222845171-f9ffe4579c1f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJ0JTIwb2YlMjBMZWFkZXJzaGlwJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Essential guide to developing leadership skills and inspiring teams to achieve excellence.",
        sku: "BK-LDR-038",
        specs: {
            "Pages": "320",
            "Format": "Hardcover",
            "Case Studies": "25+",
            "Exercises": "Practical worksheets"
        }
    },
    {
        id: 39,
        title: "Photography Masterclass",
        category: "books",
        price: 1899,
        image: "https://images.unsplash.com/photo-1619525459235-0b44139a3a70?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGhvdG9ncmFwaHklMjBNYXN0ZXJjbGFzcyUyMGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        description: "Complete photography course covering techniques from basics to advanced professional skills.",
        sku: "BK-PHT-039",
        specs: {
            "Pages": "450",
            "Format": "Hardcover",
            "Photos": "500+ examples",
            "Level": "All levels"
        }
    },
    {
        id: 40,
        title: "Home Gym Equipment Set",
        category: "sports",
        price: 49999,
        image: "https://media.istockphoto.com/id/1274950193/photo/group-of-different-exercising-equipment-on-white-home-gym-floor-fitness-ball-round-foam.webp?a=1&b=1&s=612x612&w=0&k=20&c=og28nXLB2Z8HZajh3Gem7B1ocZR6e25Cd9wo-_VV2ns=",
        description: "Complete home gym setup with adjustable dumbbells, resistance bands, and workout guide.",
        sku: "HG-SET-040",
        specs: {
            "Dumbbells": "Adjustable 5-25kg",
            "Bands": "5 resistance levels",
            "Includes": "Workout guide, Mat",
            "Storage": "Compact rack"
        }
    },
    {
        id: 41,
        title: "Professional Golf Clubs Set",
        category: "sports",
        price: 89999,
        image: "https://plus.unsplash.com/premium_photo-1679758416197-a828abb2d2d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
        description: "Premium golf club set with titanium drivers, steel irons, and professional-grade putters.",
        sku: "GC-PRO-041",
        specs: {
            "Driver": "Titanium",
            "Irons": "Steel 5-PW",
            "Putter": "Mallet style",
            "Bag": "Premium cart bag included"
        }
    },
    {
        id: 42,
        title: "Smart TV 65-inch OLED",
        category: "electronics",
        price: 179999,
        image: "https://plus.unsplash.com/premium_photo-1682274001252-cd39d7158ae3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U21hcnQlMjBUViUyMDY1LWluY2glMjBPTEVEfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Ultra HD OLED smart TV with HDR, Dolby Atmos, and AI-enhanced picture processing.",
        sku: "TV-65-042",
        specs: {
            "Screen Size": "65 inches",
            "Resolution": "4K OLED",
            "HDR": "Dolby Vision, HDR10+",
            "Audio": "Dolby Atmos"
        }
    },
    {
        id: 43,
        title: "Designer Backpack",
        category: "fashion",
        price: 11999,
        image: "https://plus.unsplash.com/premium_photo-1723649902616-0dce94980e06?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGVzaWduZXIlMjBCYWNrcGFja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Premium leather backpack with laptop compartment and modern design aesthetic.",
        sku: "BP-DES-043",
        specs: {
            "Material": "Premium Leather",
            "Laptop": "Up to 15.6 inches",
            "Compartments": "Multiple",
            "Style": "Modern minimalist"
        }
    },
    {
        id: 44,
        title: "Smart Doorbell Camera",
        category: "home",
        price: 16999,
        image: "https://images.unsplash.com/photo-1621886943381-cb97cc18b17a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBEb29yYmVsbCUyMENhbWVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Video doorbell with motion detection, two-way audio, and cloud storage.",
        sku: "DB-SMT-044",
        specs: {
            "Video": "1080p HD",
            "Field of View": "180 degrees",
            "Night Vision": "Yes",
            "Storage": "Cloud + SD card"
        }
    },
    {
        id: 45,
        title: "Science Fiction Collection",
        category: "books",
        price: 2499,
        image: "https://images.unsplash.com/photo-1727368237856-5b66c680064a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8U2NpZW5jZSUyMEZpY3Rpb24lMjBDb2xsZWN0aW9uJTIwYm9va3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
        description: "Box set of classic science fiction novels from renowned authors.",
        sku: "BK-SCI-045",
        specs: {
            "Books": "5-book set",
            "Authors": "Classic sci-fi masters",
            "Format": "Paperback",
            "Pages": "Average 400 per book"
        }
    },
    {
        id: 46,
        title: "Marathon Running Shoes",
        category: "sports",
        price: 14999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        description: "Professional running shoes with advanced cushioning and lightweight design.",
        sku: "RS-MAR-046",
        specs: {
            "Weight": "250g",
            "Cushioning": "Advanced foam",
            "Drop": "8mm",
            "Use": "Road running"
        }
    },
    {
        id: 47,
        title: "Drone with 4K Camera",
        category: "electronics",
        price: 79999,
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=300&fit=crop",
        description: "Professional drone with 4K video recording, GPS stabilization, and 30-minute flight time.",
        sku: "DR-4K-047",
        specs: {
            "Camera": "4K at 60fps",
            "Flight Time": "30 minutes",
            "Range": "7km",
            "GPS": "Yes, with return home"
        }
    },
    {
        id: 48,
        title: "Vintage Leather Jacket",
        category: "fashion",
        price: 16999,
        image: "https://images.unsplash.com/photo-1649950638867-4eff5cc7d239?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFZpbnRhZ2UlMjBMZWF0aGVyJTIwSmFja2V0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Authentic vintage-style leather jacket with distressed finish and classic cut.",
        sku: "VJ-LTR-048",
        specs: {
            "Material": "Genuine Leather",
            "Style": "Vintage distressed",
            "Lining": "Quilted",
            "Fit": "Classic"
        }
    },
    {
        id: 49,
        title: "Smart Kitchen Scale",
        category: "home",
        price: 5999,
        image: "https://images.unsplash.com/photo-1662454380951-0d4e9beb97db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fFNtYXJ0JTIwS2l0Y2hlbiUyMFNjYWxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "Digital kitchen scale with app connectivity and nutritional information tracking.",
        sku: "KS-SMT-049",
        specs: {
            "Capacity": "5kg",
            "Precision": "1g",
            "App": "Nutrition tracking",
            "Battery": "Rechargeable"
        }
    },
    {
        id: 50,
        title: "Mountain Bike Professional",
        category: "sports",
        price: 159999,
        image: "https://images.unsplash.com/photo-1578924832003-8c9e1f18faab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TW91bnRhaW4lMjBCaWtlJTIwUHJvZmVzc2lvbmFsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "High-performance mountain bike with carbon fiber frame and advanced suspension system.",
        sku: "MB-PRO-050",
        specs: {
            "Frame": "Carbon Fiber",
            "Suspension": "Full suspension 150mm",
            "Gears": "12-speed",
            "Wheel Size": "29 inches"
        }
    }, {
        id: 51,
        title: "iPhone 17 Pro Max",
        category: "electronics",
        price: 150999,
        image: "https://images.unsplash.com/photo-1758186370179-5b033011187b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByZW1pdW0lMjBpcGhvbmVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
        description: "The iPhone 17 Pro Max positions itself as Apple’s top-tier flagship phone, targeting users who want maximum performance, cutting-edge camera capability, and premium build quality. It features a large 6.9″ display, the new A19 Pro chipset,",
        sku: "MB-PRO-078",
        specs: {
            "Display": "Super Retina XDR",
            "Chipset": "A19 Pro",
            "Camera": "Triple 48MP",
            "Storage": "2 TB"
        }
    }
   
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}