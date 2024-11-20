// Sample products data with categories
let products = [
    {
        id: 1,
        name: "Mie Jebew",
        price: 12000.000 ,
        image: "mj.jpg",
        category: "mie"
    },
    {
        id: 2,
        name: "Pangsit Chili Oil",
        price: 12000.000,
        image: "pc.jpg",
        category: "pangsitOil"
    },
    {
        id: 3,
        name: "Pangsit Goreng",
        price: 12000.000,
        image: "pg.jpg",
        category: "PangsitGoreng"
    },
    {
        id: 4,
        name: "Pangsit Sayur",
        price: 17000.000,
        image: "ps.jpeg",
        category: "PangsitSayur"
    },
    
];

let cart = [];
let currentCategory = 'all';
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = ''; // Bersihkan grid produk sebelum menambahkan produk baru

    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" onclick="showDescription('${product.category}')">
                <div class="product-info">
                    <h3 class="product-title"  onclick="showDescription('${product.category}')">${product.name}</h3>
                    <div class="product-price">Rp ${product.price.toLocaleString()}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Beli
                    </button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Pilih semua elemen yang ingin diberi animasi fade-in
const fadeElements = document.querySelectorAll('.fade-in');

// Buat observer untuk memantau elemen
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Tambahkan class 'visible' saat elemen terlihat
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop memantau elemen setelah animasi
        }
    });
}, {
    threshold: 0.5 // 50% elemen harus terlihat agar animasi berjalan
});

// Mulai memantau semua elemen dengan class 'fade-in'
fadeElements.forEach(element => {
    observer.observe(element);
});



function showDescription(product) {
    document.getElementById(product + '-description').style.display = 'block';
}

function hideDescription(product) {
    document.getElementById(product + '-description').style.display = 'none';
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// CAROSEL START

     // JavaScript for carousel functionality
    let currentIndex = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const indicators = document.getElementById('indicators');

    // Update the carousel to show the current item
    function updateCarousel() {
    const offset = -currentIndex * 100; // Move carousel items to the left
    document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;

    // Update indicators
    const indicatorButtons = document.querySelectorAll('.carousel-indicators button');
    indicatorButtons.forEach((button, index) => {
        button.classList.toggle('active', index === currentIndex);
    });
    }

    // Create the indicators
    function createIndicators() {
    for (let i = 0; i < totalItems; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
        });
        indicators.appendChild(button);
    }
    }

    // Show next item
    nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
    });

    // Show previous item
    prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
    });

    // Initialize carousel
    createIndicators();
    updateCarousel();

 // CAROSEL END


// Previous functions remain the same
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    showToast('Cek Kerangjang Ya!');
    if (document.getElementById('cartSection').style.display === 'block') {
        displayCart();
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.
    quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });

    cartTotal.textContent = total.toLocaleString();
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartCount();
        displayCart();
        showToast('Item removed from cart');
    }
}

// Show cart section
function showCart() {
    document.getElementById('productsSection').style.display = 'none';
    document.getElementById('carouselExample').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    displayCart();
}

// Show products section
function showProducts() {
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('carouselExample').style.display = 'block';
    document.getElementById('productsSection').style.display = 'block';
}

// Checkout via WhatsApp
function checkoutToWhatsApp() {
    const name = document.getElementById('customerName').value;
    const address = document.getElementById('customerAddress').value;

    if (name && address) {
        let message = `Hallo, saya mau membeli:\n\n`;
        cart.forEach(item => {
            message += `${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}\n`;
        });
        message += `\nTotal: Rp ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}`;
        message += `\n\nNama: ${name} \nAlamat: ${address}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/6285174338565?text=${encodedMessage}`);
    } else {
        showToast('Isi yah kalo mau beli, Haturnuhun.');
    }
}

// Initialize products display
displayProducts();