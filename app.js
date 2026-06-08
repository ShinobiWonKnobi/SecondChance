/* ==========================================================================
   PRODUCT CATALOG DATA
   ========================================================================== */
const PRODUCTS = [
  {
    id: 'rebirth-hoodie',
    name: 'The Rebirth Hoodie',
    price: 2999,
    category: 'apparel',
    image: 'images/hoodie.png',
    meta: 'Organic Cotton Fleece',
    description: 'Designed as a symbol of starting fresh. Crafted from ultra-heavyweight 450 GSM GOTS-certified organic cotton, with a double-lined hood and relaxed silhouette. Dyed with eco-friendly non-toxic vegetable dyes. Every thread represents a path forward.',
    materials: ['100% GOTS Organic Cotton', '450 GSM heavy fleece', 'Chemical-free natural dyes', 'Ethically made in small batches']
  },
  {
    id: 'new-leaf-tee',
    name: 'New Leaf Tee',
    price: 1499,
    category: 'apparel',
    image: 'images/tee.png',
    meta: 'Organic Hemp Blend',
    description: 'Lightweight, breathable, and raw. Our signature tee is made from a premium organic hemp and cotton blend that softens with every wash. An everyday essential carrying the quiet message of turning over a new leaf.',
    materials: ['55% Hemp, 45% Organic Cotton', '180 GSM light slub', 'Undyed natural colorway', 'Carbon-neutral manufacturing']
  },
  {
    id: 'resilience-tote',
    name: 'Resilience Tote',
    price: 999,
    category: 'accessories',
    image: 'images/tote.png',
    meta: 'Upcycled Heavy Canvas',
    description: 'A rugged daily companion built from upcycled thick canvas sheets that were destined for landfills. Extremely spacious, double-stitched for durability, and featuring an internal zipper pocket. Carry your essentials and your values.',
    materials: ['100% Upcycled Industrial Canvas', 'Reinforced shoulder straps', 'Internal keys/phone pocket', 'Hand-screen printed logo']
  },
  {
    id: 'restoration-pants',
    name: 'Restoration Sweatpants',
    price: 2499,
    category: 'apparel',
    image: 'images/pants.png',
    meta: 'Organic Cotton Fleece',
    description: 'True comfort for peaceful days. These lounge pants feature an elasticized waist with drawcords, hidden side-seam pockets, and elastic cuffs. Perfect for slow mornings, reflection, and recovery.',
    materials: ['100% GOTS Organic Cotton', '380 GSM loopback fleece', 'Natural beige undertone', 'Fair-trade certified workshop']
  }
];

const WHATSAPP_NUMBER = '918056066050';

/* ==========================================================================
   STATE MANAGEMENT
   ========================================================================== */
let cart = JSON.parse(localStorage.getItem('second_chance_cart')) || [];
let activeSize = 'M'; // Default size selected in modal

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
const header = document.getElementById('main-header');
const productGrid = document.getElementById('product-grid');
const filterControls = document.getElementById('filter-controls');

// Mobile Menu Drawer
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-menu-drawer');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// Modal Elements
const modal = document.getElementById('product-modal');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal');
const modalProductContent = document.getElementById('modal-product-content');

// Cart Drawer Elements
const cartBtn = document.getElementById('cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartBadgeEl = document.getElementById('cart-badge');
const checkoutBtn = document.getElementById('checkout-btn');

// Toast
const toast = document.getElementById('toast');

/* ==========================================================================
   INIT & RENDER FUNCTIONS
   ========================================================================== */
function init() {
  renderProducts('all');
  updateCartUI();
  setupEventListeners();
  setupScrollAnimations();
}

// Render products to grid with optional filter
function renderProducts(filter) {
  productGrid.innerHTML = '';
  
  const filteredProducts = filter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);
    
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    
    card.innerHTML = `
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy">
        <div class="product-quickview-btn">View Details</div>
      </div>
      <div class="product-info">
        <span class="product-meta">${product.meta}</span>
        <h3 class="product-title">${product.name}</h3>
        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
      </div>
    `;
    
    // Clicking anywhere on card opens details
    card.addEventListener('click', () => openProductModal(product.id));
    
    productGrid.appendChild(card);
  });
}

/* ==========================================================================
   MODAL CONTROLS
   ========================================================================== */
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  activeSize = 'M'; // Reset size to Medium default

  modalProductContent.innerHTML = `
    <div class="modal-image-col">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="modal-info-col">
      <span class="modal-tag">${product.meta}</span>
      <h2 class="modal-title">${product.name}</h2>
      <p class="modal-price">₹${product.price.toLocaleString('en-IN')}</p>
      
      <p class="modal-description">${product.description}</p>
      
      <div class="modal-selectors">
        <span class="selector-label">Select Size</span>
        <div class="size-options">
          <button class="size-btn ${activeSize === 'S' ? 'active' : ''}" data-size="S">S</button>
          <button class="size-btn ${activeSize === 'M' ? 'active' : ''}" data-size="M">M</button>
          <button class="size-btn ${activeSize === 'L' ? 'active' : ''}" data-size="L">L</button>
          <button class="size-btn ${activeSize === 'XL' ? 'active' : ''}" data-size="XL">XL</button>
        </div>
      </div>
      
      <div class="modal-actions">
        <button class="modal-add-to-cart" id="add-to-cart-action">Add to Cart</button>
        <button class="modal-buy-now" id="buy-now-action">Buy Now (WhatsApp)</button>
      </div>
    </div>
  `;

  // Attach size selector handlers
  const sizeBtns = modalProductContent.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeSize = btn.getAttribute('data-size');
    });
  });

  // Attach Add to Cart action
  modalProductContent.querySelector('#add-to-cart-action').addEventListener('click', () => {
    addToCart(product, activeSize);
    closeProductModal();
  });

  // Attach Buy Now action
  modalProductContent.querySelector('#buy-now-action').addEventListener('click', () => {
    buyNowDirect(product, activeSize);
  });

  // Display Modal
  modal.classList.add('active');
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeProductModal() {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   CART OPERATIONS
   ========================================================================== */
function addToCart(product, size) {
  // Check if item with same ID and same size already exists
  const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === size);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.name} (${size}) added to cart`);
}

function updateCartQuantity(productId, size, change) {
  const itemIndex = cart.findIndex(item => item.id === productId && item.size === size);
  if (itemIndex === -1) return;

  cart[itemIndex].quantity += change;

  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('second_chance_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Update badge
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartBadgeEl.textContent = totalItems;
  
  if (totalItems === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg class="icon" style="width:48px; height:48px; color:var(--text-secondary); margin-bottom:15px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p>Your cart is empty.</p>
      </div>
    `;
    cartSubtotalEl.textContent = '₹0.00';
    checkoutBtn.style.opacity = '0.6';
    checkoutBtn.style.pointerEvents = 'none';
    return;
  }

  checkoutBtn.style.opacity = '1';
  checkoutBtn.style.pointerEvents = 'auto';

  // Render list
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const totalItemPrice = item.price * item.quantity;
    subtotal += totalItemPrice;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-meta">Size: ${item.size}</span>
        <span class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</span>
        <div class="cart-item-quantity-control">
          <button class="qty-btn dec-qty" aria-label="Decrease Quantity">&minus;</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn inc-qty" aria-label="Increase Quantity">&plus;</button>
        </div>
      </div>
      <button class="remove-item-btn" aria-label="Remove Item">&times;</button>
    `;

    // Hook listeners
    row.querySelector('.dec-qty').addEventListener('click', () => updateCartQuantity(item.id, item.size, -1));
    row.querySelector('.inc-qty').addEventListener('click', () => updateCartQuantity(item.id, item.size, 1));
    row.querySelector('.remove-item-btn').addEventListener('click', () => removeCartItem(item.id, item.size));

    cartItemsContainer.appendChild(row);
  });

  cartSubtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
}

/* ==========================================================================
   WHATSAPP ORDER COMPILING
   ========================================================================== */
function buyNowDirect(product, size) {
  const message = `Hello SECOND CHANCE team! %0A%0AI'd like to place an immediate order for:%0A- *${product.name}* [Size: ${size}] - ₹${product.price.toLocaleString('en-IN')}%0A%0APlease guide me on payment details. Thank you!`;
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(link, '_blank');
}

function checkoutViaWhatsApp() {
  if (cart.length === 0) return;

  let orderDetailsText = '';
  let totalOrderVal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalOrderVal += itemTotal;
    orderDetailsText += `- ${item.quantity}x *${item.name}* [Size: ${item.size}] - ₹${itemTotal.toLocaleString('en-IN')}%0A`;
  });

  const formattedMsg = `Hello SECOND CHANCE team!%0A%0AI'd like to place an order for the following items:%0A%0A*ORDER DETAILS:*%0A${orderDetailsText}%0A*TOTAL PRICE:* ₹${totalOrderVal.toLocaleString('en-IN')}%0A(Shipping: Free)%0A%0APlease let me know how I can complete the payment. Thank you!`;
  
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${formattedMsg}`;
  window.open(link, '_blank');
}

/* ==========================================================================
   NOTIFICATIONS (TOAST)
   ========================================================================== */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

/* ==========================================================================
   DRAWER NAVIGATION & LAYOUT HANDLERS
   ========================================================================== */
function toggleMobileMenu() {
  mobileDrawer.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.style.overflow = mobileDrawer.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenuDrawer() {
  mobileDrawer.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openCart() {
  cartDrawer.classList.add('active');
  cartDrawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartDrawer.classList.remove('active');
  cartDrawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function setupEventListeners() {
  // Header scrolled class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Filter Buttons
  const filterBtns = filterControls.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filterValue = e.target.getAttribute('data-filter');
      renderProducts(filterValue);
    });
  });

  // Mobile Drawer
  menuToggle.addEventListener('click', toggleMobileMenu);
  closeMobileMenu.addEventListener('click', closeMobileMenuDrawer);
  mobileMenuOverlay.addEventListener('click', closeMobileMenuDrawer);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenuDrawer);
  });

  // Cart Drawer
  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartDrawerOverlay.addEventListener('click', closeCart);
  checkoutBtn.addEventListener('click', checkoutViaWhatsApp);

  // Close modals on overlay click or Esc
  modalOverlay.addEventListener('click', closeProductModal);
  closeModalBtn.addEventListener('click', closeProductModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCart();
      closeMobileMenuDrawer();
    }
  });
}

/* ==========================================================================
   SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-element');
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        obs.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

// Launch
document.addEventListener('DOMContentLoaded', init);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
}
