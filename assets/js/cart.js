/**
 * Cotton Haven Australia — Enquiry Cart and Product Details Logic
 * Vanilla JS implementation of cross-page enquiry cart with localStorage persistence.
 * Dynamically appends UI elements (floating cart button, slide-out drawer, details dialog) to document body.
 */

// ── CART GLOBAL STATE & HELPERS ──
const CART_STORAGE_KEY = "cotton_haven_enquiry_cart";

/**
 * Returns cart items array from localStorage
 */
function getCart() {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (cartData) {
    try {
      return JSON.parse(cartData);
    } catch (e) {
      console.error("Error parsing cart data, resetting to empty array", e);
      return [];
    }
  }
  return [];
}

/**
 * Saves cart array to localStorage and updates UI
 * @param {Array} cart 
 */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateCartUI();
}

/**
 * Adds an item to the enquiry cart.
 * If code, color, and size match, increments the quantity.
 */
function addToCart(item) {
  const cart = getCart();
  const existingIndex = cart.findIndex(i => i.code === item.code && i.color === item.color && i.size === item.size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += parseInt(item.quantity);
  } else {
    cart.push({
      category: item.category,
      categoryName: item.categoryName,
      productName: item.productName,
      name: item.name,
      code: item.code,
      color: item.color,
      size: item.size,
      quantity: parseInt(item.quantity)
    });
  }

  saveCart(cart);
  showToast(`Added ${item.quantity}x ${item.name} to enquiry`);
}

/**
 * Removes an item from the cart.
 */
function removeFromCart(code, color, size) {
  let cart = getCart();
  cart = cart.filter(i => !(i.code === code && i.color === color && i.size === size));
  saveCart(cart);
}

/**
 * Clears all items in the cart
 */
function clearCart() {
  saveCart([]);
}

// ── TOAST NOTIFICATION ──
function showToast(message) {
  let toast = document.getElementById("cart-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cart-toast";
    toast.className = "cart-toast";
    toast.innerHTML = `
      <span class="cart-toast-icon">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13.5 4.5l-7 7-3.5-3.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="cart-toast-msg"></span>
    `;
    document.body.appendChild(toast);
  }
  toast.querySelector(".cart-toast-msg").innerText = message;
  toast.classList.add("show");
  
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ── DOM INJECTION & UI UPDATES ──

function injectCartUI() {
  // Inject Cart CSS if not loaded
  if (!document.querySelector('link[href*="cart.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "assets/css/cart.css";
    document.head.appendChild(link);
  }

  // 1. Floating Cart Trigger Button
  if (!document.getElementById("floating-cart-btn")) {
    const cartBtn = document.createElement("button");
    cartBtn.id = "floating-cart-btn";
    cartBtn.className = "floating-cart-btn";
    cartBtn.ariaLabel = "View Enquiry Cart";
    cartBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span id="cart-badge" class="cart-badge" style="display: none;">0</span>
    `;
    cartBtn.addEventListener("click", toggleCartDrawer);
    document.body.appendChild(cartBtn);
  }

  // 2. Slide-out Cart Drawer
  if (!document.getElementById("cart-drawer")) {
    const drawer = document.createElement("div");
    drawer.id = "cart-drawer";
    drawer.className = "cart-drawer";
    drawer.innerHTML = `
      <div class="cart-header">
        <h2 class="cart-title">Enquiry Cart</h2>
        <button class="cart-close-btn" id="cart-close-btn" aria-label="Close Drawer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="cart-items-container" id="cart-items-list">
        <!-- Cart Items list loaded dynamically -->
      </div>
      <div class="cart-footer" id="cart-footer">
        <div class="cart-summary">
          <span>Total Items:</span>
          <span id="cart-summary-count">0</span>
        </div>
        <form class="cart-enquiry-form" id="cart-enquiry-form">
          <div class="cart-input-group">
            <label for="cart-enq-name">Contact Name</label>
            <input type="text" id="cart-enq-name" required placeholder="Your full name">
          </div>
          <div class="cart-input-group">
            <label for="cart-enq-company">Company Name</label>
            <input type="text" id="cart-enq-company" placeholder="Your business name">
          </div>
          <div class="cart-input-group">
            <label for="cart-enq-email">Email Address</label>
            <input type="email" id="cart-enq-email" required placeholder="contact@company.com">
          </div>
          <div class="cart-input-group">
            <label for="cart-enq-phone">Phone Number</label>
            <input type="tel" id="cart-enq-phone" placeholder="e.g. 0400 123 456">
          </div>
          <div class="cart-input-group">
            <label for="cart-enq-notes">Enquiry Notes</label>
            <textarea id="cart-enq-notes" placeholder="Specify logo requirements, decoration types, or timelines..."></textarea>
          </div>
          <button type="submit" class="btn-primary cart-submit-btn">
            Submit Enquiry Request
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 8h10M9 4l4 4-4 4"></path>
            </svg>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(drawer);

    // Event Listeners
    document.getElementById("cart-close-btn").addEventListener("click", closeCartDrawer);
    document.getElementById("cart-enquiry-form").addEventListener("submit", handleEnquirySubmit);
  }

  // 3. Product Options Details Dialog
  if (!document.getElementById("details-dialog")) {
    const dialog = document.createElement("dialog");
    dialog.id = "details-dialog";
    dialog.innerHTML = `
      <div class="dialog-container">
        <div class="dialog-header">
          <div class="dialog-title-wrap">
            <span class="dialog-category" id="details-cat-label">Corporate Uniforms</span>
            <h3 class="dialog-title" id="details-prod-title">Classic Pique Polo</h3>
          </div>
          <button class="dialog-close-btn" id="details-close-btn" aria-label="Close Options">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="dialog-body">
          <p class="dialog-desc" id="details-prod-desc">Loading details...</p>
          <div class="dialog-items-list" id="details-subitems-list">
            <!-- Dynamically populated rows of sub-items -->
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-secondary" id="details-footer-close">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);

    // Event listeners
    document.getElementById("details-close-btn").addEventListener("click", () => dialog.close());
    document.getElementById("details-footer-close").addEventListener("click", () => dialog.close());

    // HTMLDialog Element standard fallback listener for clicking outside backdrop to close
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          dialog.close();
        }
      });
    }
  }

  // Initial draw
  updateCartUI();
}

/**
 * Updates cart badge and list items rendering
 */
function updateCartUI() {
  const cart = getCart();
  const badge = document.getElementById("cart-badge");
  const listContainer = document.getElementById("cart-items-list");
  const summaryCount = document.getElementById("cart-summary-count");
  const footer = document.getElementById("cart-footer");

  let totalItemsCount = 0;
  cart.forEach(item => totalItemsCount += item.quantity);

  // Badge updates
  if (badge) {
    if (totalItemsCount > 0) {
      badge.innerText = totalItemsCount;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }

  // Summary updates
  if (summaryCount) {
    summaryCount.innerText = totalItemsCount;
  }

  // Items rendering
  if (listContainer) {
    listContainer.innerHTML = "";
    if (cart.length === 0) {
      listContainer.innerHTML = `
        <div class="cart-empty-message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Your enquiry cart is empty.</p>
          <p style="font-size: 12.5px; margin-top: 4px;">Click "View Details" on products to select sizes and colors.</p>
        </div>
      `;
      if (footer) footer.style.display = "none";
    } else {
      if (footer) footer.style.display = "block";

      const tableContainer = document.createElement("div");
      tableContainer.className = "cart-excel-container";

      const table = document.createElement("table");
      table.className = "cart-excel-table";
      table.innerHTML = `
        <thead>
          <tr>
            <th>Item</th>
            <th>Code</th>
            <th>Specs</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      `;

      const tbody = table.querySelector("tbody");

      cart.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <div class="excel-item-name">${item.productName} — ${item.name}</div>
            <div class="excel-item-cat">${item.categoryName}</div>
          </td>
          <td class="excel-code-cell">${item.code}</td>
          <td>
            <div class="excel-spec-cell">Size: ${item.size}</div>
            <div class="excel-spec-cell">Color: ${item.color}</div>
          </td>
          <td class="excel-qty-cell">${item.quantity}</td>
          <td class="excel-action-cell">
            <button class="cart-item-remove-btn-excel" aria-label="Remove item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </td>
        `;

        tr.querySelector(".cart-item-remove-btn-excel").addEventListener("click", () => {
          removeFromCart(item.code, item.color, item.size);
        });

        tbody.appendChild(tr);
      });

      tableContainer.appendChild(table);
      listContainer.appendChild(tableContainer);
    }
  }
}

// Drawer Drawer Controls
function toggleCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) {
    drawer.classList.toggle("open");
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) {
    drawer.classList.add("open");
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  if (drawer) {
    drawer.classList.remove("open");
  }
}

// ── ENQUIRY ACTION SUBMIT ──
function handleEnquirySubmit(e) {
  e.preventDefault();
  const cart = getCart();
  if (cart.length === 0) return;

  const name = document.getElementById("cart-enq-name").value;
  const company = document.getElementById("cart-enq-company").value;
  const email = document.getElementById("cart-enq-email").value;
  const phone = document.getElementById("cart-enq-phone").value;
  const notes = document.getElementById("cart-enq-notes").value;

  // Compile full enquiry details
  let enquiryText = `COTTON HAVEN AUSTRALIA — ENQUIRY REQUEST\n`;
  enquiryText += `==========================================\n`;
  enquiryText += `CONTACT DETAILS\n`;
  enquiryText += `Name: ${name}\n`;
  enquiryText += `Company: ${company || "Not Provided"}\n`;
  enquiryText += `Email: ${email}\n`;
  enquiryText += `Phone: ${phone || "Not Provided"}\n`;
  enquiryText += `Notes: ${notes || "No special instructions"}\n\n`;
  enquiryText += `ITEMS IN ENQUIRY:\n`;
  
  cart.forEach((item, index) => {
    enquiryText += `${index + 1}. ${item.productName} — ${item.name}\n`;
    enquiryText += `   Category: ${item.categoryName}\n`;
    enquiryText += `   Product Code: ${item.code}\n`;
    enquiryText += `   Selected Size: ${item.size}\n`;
    enquiryText += `   Selected Color: ${item.color}\n`;
    enquiryText += `   Quantity: ${item.quantity}\n`;
    enquiryText += `   ---------------------------\n`;
  });

  console.log("Enquiry Compiled:\n", enquiryText);

  // Show a beautiful custom success dialog
  showEnquirySuccessModal(name, cart);

  // Clear cart and form
  clearCart();
  document.getElementById("cart-enquiry-form").reset();
  closeCartDrawer();
}

/**
 * Creates and renders a beautiful success dialog for the submitted enquiry.
 */
function showEnquirySuccessModal(name, cart) {
  let successDialog = document.getElementById("success-dialog");
  if (!successDialog) {
    successDialog = document.createElement("dialog");
    successDialog.id = "success-dialog";
    successDialog.style.width = "480px";
    successDialog.style.maxWidth = "90vw";
    document.body.appendChild(successDialog);
  }

  let totalItemsCount = 0;
  cart.forEach(item => totalItemsCount += item.quantity);

  successDialog.innerHTML = `
    <div class="dialog-container" style="padding: 32px; text-align: center;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--azure-xl); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--azure)" stroke-width="2.5" style="width: 32px; height: 32px;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3 class="dialog-title" style="font-size: 26px; margin-bottom: 8px;">Enquiry Received!</h3>
      <p style="font-size: 14.5px; color: var(--ink-60); line-height: 1.6; margin-bottom: 24px;">
        Thank you, <strong>${name}</strong>. Your corporate uniform enquiry for <strong>${totalItemsCount} items</strong> has been compiled. 
        <br><br>
        A Cotton Haven Australia uniform specialist will review your request and get back to you with custom pricing and details within 24 hours.
      </p>
      <button class="btn-primary" id="success-close-btn" style="width: 100%; justify-content: center;">Done</button>
    </div>
  `;

  successDialog.showModal();
  document.getElementById("success-close-btn").addEventListener("click", () => {
    successDialog.close();
  });
}

// ── VIEW DETAILS ACTION & MODAL POPULATOR ──

/**
 * Opens details modal with selected category and product items
 * @param {string} categoryId 
 * @param {string} productId 
 */
function openDetailsModal(categoryId, productId) {
  const categoryData = getCategoryData(categoryId);
  if (!categoryData) {
    console.error(`Category data not found for categoryId: ${categoryId}`);
    return;
  }

  const product = categoryData.products[productId];
  if (!product) {
    console.error(`Product data not found for productId: ${productId} in category: ${categoryId}`);
    return;
  }

  const dialog = document.getElementById("details-dialog");
  if (!dialog) {
    console.error("Details dialog element not found in document body.");
    return;
  }

  // Update header metadata
  document.getElementById("details-cat-label").innerText = categoryData.categoryName;
  document.getElementById("details-prod-title").innerText = product.name;
  document.getElementById("details-prod-desc").innerText = product.description;

  // Render items options list
  const listContainer = document.getElementById("details-subitems-list");
  listContainer.innerHTML = "";

  product.items.forEach((item, index) => {
    const itemRow = document.createElement("div");
    itemRow.className = "details-product-row";
    
    // Generate color options HTML
    let colorSelectHtml = `<select id="color-${index}">`;
    item.colors.forEach(col => {
      colorSelectHtml += `<option value="${col}">${col}</option>`;
    });
    colorSelectHtml += `</select>`;

    // Generate size options HTML
    let sizeSelectHtml = `<select id="size-${index}">`;
    item.sizes.forEach(sz => {
      sizeSelectHtml += `<option value="${sz}">${sz}</option>`;
    });
    sizeSelectHtml += `</select>`;

    const itemImage = item.image || 'assets/images/products/classic_pique_polo.png';
    itemRow.innerHTML = `
      <div class="details-row-meta">
        <div class="details-row-img-wrap">
          <img src="${itemImage}" alt="${item.name}" class="details-row-img">
        </div>
        <div class="details-row-title-wrap">
          <span class="details-row-code">${item.code}</span>
          <span class="details-row-name">${item.name}</span>
          <div class="details-row-fabric">Fabric: ${item.fabric}</div>
        </div>
      </div>
      <div class="details-row-controls">
        <div class="details-control">
          <label for="color-${index}">Color</label>
          ${colorSelectHtml}
        </div>
        <div class="details-control">
          <label for="size-${index}">Size</label>
          ${sizeSelectHtml}
        </div>
        <div class="details-control details-qty-control">
          <label for="qty-${index}">Quantity</label>
          <input type="number" id="qty-${index}" value="10" min="1" max="10000">
        </div>
        <div class="details-row-btn-wrap">
          <button class="btn-primary details-add-btn" id="add-btn-${index}">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="8" y1="3" x2="8" y2="13"></line>
              <line x1="3" y1="8" x2="13" y2="8"></line>
            </svg>
            Add to Enquiry
          </button>
        </div>
      </div>
    `;

    // Event listener for Add Button
    itemRow.querySelector(`#add-btn-${index}`).addEventListener("click", () => {
      const selectedColor = itemRow.querySelector(`#color-${index}`).value;
      const selectedSize = itemRow.querySelector(`#size-${index}`).value;
      const selectedQty = parseInt(itemRow.querySelector(`#qty-${index}`).value) || 10;

      addToCart({
        category: categoryId,
        categoryName: categoryData.categoryName,
        productName: product.name,
        name: item.name,
        code: item.code,
        color: selectedColor,
        size: selectedSize,
        quantity: selectedQty
      });
    });

    listContainer.appendChild(itemRow);
  });

  dialog.showModal();
}

// ── DOM BOOTSTRAP INITIALIZATION ──
document.addEventListener("DOMContentLoaded", () => {
  injectCartUI();

  // Attach dynamic listener for details buttons
  document.addEventListener("click", (e) => {
    // Check if clicked element or its parent is a "View Details" trigger
    const link = e.target.closest("[data-product][data-category]");
    if (link) {
      e.preventDefault();
      const categoryId = link.getAttribute("data-category");
      const productId = link.getAttribute("data-product");
      openDetailsModal(categoryId, productId);
    }

    // Trigger Quote form button click to open cart and scroll down
    const triggerBtn = e.target.closest(".corp-enquire-card-btn, .btn-enquire");
    if (triggerBtn) {
      // Find parent product card to see if it has metadata
      const card = triggerBtn.closest("[data-product][data-category]");
      if (card) {
        e.preventDefault();
        const categoryId = card.getAttribute("data-category");
        const productId = card.getAttribute("data-product");
        openDetailsModal(categoryId, productId);
      } else {
        // Just open the cart drawer
        e.preventDefault();
        openCartDrawer();
      }
    }
  });

  // Check if cart should open automatically on hash change or query param
  if (window.location.hash === "#enquire" || window.location.hash === "#cart") {
    openCartDrawer();
  }
});
