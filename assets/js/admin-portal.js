/**
 * Cotton Haven Australia — Catalog Admin Portal
 * Allows the client to customize product catalog (product codes, names, options).
 * Dynamically injects an "Admin Portal" link into the footer on all pages.
 */

let currentProducts = {};
let activeTab = "corporate";

function injectAdminUI() {
  if (document.getElementById("admin-dialog")) return;

  const dialog = document.createElement("dialog");
  dialog.id = "admin-dialog";
  dialog.innerHTML = `
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="dialog-title-wrap">
          <span class="dialog-category">Cotton Haven Management</span>
          <h3 class="dialog-title">Catalog Administration Portal</h3>
        </div>
        <button class="dialog-close-btn" id="admin-close-btn" aria-label="Close Portal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="admin-tab-container" id="admin-tabs">
        <!-- Tabs injected dynamically -->
      </div>
      <div class="dialog-body" style="background: var(--white);">
        <p class="dialog-desc">Customize the options, product codes, sizes, and colors below. Changes are saved locally and update immediately across the entire site.</p>
        <div id="admin-products-editor">
          <!-- Form fields injected dynamically -->
        </div>
      </div>
      <div class="dialog-footer">
        <div style="margin-right: auto; display: flex; gap: 10px;">
          <button class="btn-secondary" id="admin-reset-btn" style="border-color: #d93838; color: #d93838;">Reset to Defaults</button>
        </div>
        <button class="btn-secondary" id="admin-cancel-btn">Cancel</button>
        <button class="btn-primary" id="admin-save-btn" style="background: var(--azure);">Save Changes</button>
      </div>
    </div>
  `;
  document.body.appendChild(dialog);

  // Bind close buttons
  document.getElementById("admin-close-btn").addEventListener("click", () => dialog.close());
  document.getElementById("admin-cancel-btn").addEventListener("click", () => dialog.close());
  document.getElementById("admin-reset-btn").addEventListener("click", handleAdminReset);
  document.getElementById("admin-save-btn").addEventListener("click", handleAdminSave);

  // Close when clicking backdrop
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

/**
 * Renders tabs and form based on current dataset
 */
function renderAdminPortal() {
  currentProducts = getProductsData(); // Load active catalog
  const tabContainer = document.getElementById("admin-tabs");
  if (!tabContainer) return;

  // Render Category Tabs
  tabContainer.innerHTML = "";
  Object.keys(currentProducts).forEach(catId => {
    const category = currentProducts[catId];
    const tabButton = document.createElement("button");
    tabButton.className = `admin-tab ${activeTab === catId ? "active" : ""}`;
    tabButton.innerText = category.categoryName;
    tabButton.addEventListener("click", () => {
      saveEditorState(); // Save state of previous category before switching
      activeTab = catId;
      renderAdminPortal();
    });
    tabContainer.appendChild(tabButton);
  });

  // Render Product Forms for the Active Category
  renderCategoryEditor(activeTab);
}

/**
 * Renders editing forms for the selected category
 */
function renderCategoryEditor(catId) {
  const editorContainer = document.getElementById("admin-products-editor");
  if (!editorContainer) return;

  editorContainer.innerHTML = "";
  const category = currentProducts[catId];
  if (!category || !category.products) return;

  Object.keys(category.products).forEach(prodId => {
    const product = category.products[prodId];
    const prodSection = document.createElement("div");
    prodSection.className = "admin-product-card";
    prodSection.setAttribute("data-product-id", prodId);
    
    prodSection.innerHTML = `
      <div class="admin-prod-header-inputs">
        <div class="cart-input-group">
          <label>Product Category Name</label>
          <input type="text" class="admin-prod-name" value="${product.name}" required>
        </div>
        <div class="cart-input-group">
          <label>Product Code Prefix</label>
          <input type="text" class="admin-prod-prefix" value="${product.codePrefix}" style="font-family: monospace;">
        </div>
      </div>
      <div class="cart-input-group" style="margin-bottom: 14px;">
        <label>Catalog Description</label>
        <input type="text" class="admin-prod-desc" value="${product.description}">
      </div>

      <div class="admin-items-header">Product Options / Sub-items</div>
      <div class="admin-rows-container" id="admin-rows-${prodId}">
        <!-- Sub-item rows rendered here -->
      </div>
      <div class="admin-actions-bar">
        <button class="admin-btn-action admin-add-row-btn" type="button">+ Add Sub-item</button>
      </div>
    `;

    // Populate Sub-item rows
    const rowsContainer = prodSection.querySelector(`#admin-rows-${prodId}`);
    product.items.forEach((item, index) => {
      appendSubItemRow(rowsContainer, item, product.codePrefix);
    });

    // Add Row Click Event
    prodSection.querySelector(".admin-add-row-btn").addEventListener("click", () => {
      const nextNum = rowsContainer.children.length + 1;
      const placeholderItem = {
        code: `${product.codePrefix}-${String(nextNum).padStart(3, '0')}`,
        name: "New Product Item",
        sizes: ["S", "M", "L", "XL", "2XL"],
        colors: ["Black", "Navy", "White"],
        fabric: "Cotton-Blend Fabric"
      };
      appendSubItemRow(rowsContainer, placeholderItem, product.codePrefix);
    });

    editorContainer.appendChild(prodSection);
  });
}

/**
 * Appends a sub-item editing row to the form
 */
function appendSubItemRow(container, item, prefix) {
  const row = document.createElement("div");
  row.className = "admin-item-row";
  row.innerHTML = `
    <input type="text" class="admin-item-code" value="${item.code}" placeholder="Code" style="font-family: monospace;" required>
    <input type="text" class="admin-item-name" value="${item.name}" placeholder="Name" required>
    <input type="text" class="admin-item-fabric" value="${item.fabric}" placeholder="Fabric Specification">
    <input type="text" class="admin-item-sizes" value="${item.sizes.join(', ')}" placeholder="Sizes (e.g. S, M, L)">
    <input type="text" class="admin-item-colors" value="${item.colors.join(', ')}" placeholder="Colors (e.g. Navy, Black)">
    <button class="admin-btn-delete-row" type="button" aria-label="Delete Row">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    </button>
  `;

  // Bind delete button
  row.querySelector(".admin-btn-delete-row").addEventListener("click", () => {
    row.remove();
  });

  container.appendChild(row);
}

/**
 * Saves current input values into currentProducts state
 */
function saveEditorState() {
  const editor = document.getElementById("admin-products-editor");
  if (!editor || !currentProducts[activeTab]) return;

  const category = currentProducts[activeTab];
  const cards = editor.querySelectorAll(".admin-product-card");

  cards.forEach(card => {
    const prodId = card.getAttribute("data-product-id");
    const product = category.products[prodId];
    if (!product) return;

    // Update product headers
    product.name = card.querySelector(".admin-prod-name").value;
    product.codePrefix = card.querySelector(".admin-prod-prefix").value;
    product.description = card.querySelector(".admin-prod-desc").value;

    // Compile rows
    const rows = card.querySelectorAll(".admin-item-row");
    const compiledItems = [];

    rows.forEach(row => {
      const code = row.querySelector(".admin-item-code").value.trim();
      const name = row.querySelector(".admin-item-name").value.trim();
      const fabric = row.querySelector(".admin-item-fabric").value.trim();
      
      const sizesRaw = row.querySelector(".admin-item-sizes").value;
      const sizes = sizesRaw.split(",").map(s => s.trim()).filter(s => s.length > 0);
      
      const colorsRaw = row.querySelector(".admin-item-colors").value;
      const colors = colorsRaw.split(",").map(c => c.trim()).filter(c => c.length > 0);

      if (code && name) {
        compiledItems.push({ code, name, fabric, sizes, colors });
      }
    });

    product.items = compiledItems;
  });
}

/**
 * Save action
 */
function handleAdminSave() {
  saveEditorState(); // Capture final inputs
  if (saveProductsData(currentProducts)) {
    alert("Products catalog saved successfully! Reloading site to apply updates.");
    window.location.reload();
  }
}

/**
 * Reset action
 */
function handleAdminReset() {
  if (confirm("Are you sure you want to reset all products and product codes back to factory defaults? This cannot be undone.")) {
    resetProductsData();
    window.location.reload();
  }
}

/**
 * Opens the admin portal dialog
 */
function openAdminPortal() {
  injectAdminUI();
  renderAdminPortal();
  document.getElementById("admin-dialog").showModal();
}

// ── BOOTSTRAP LINK INJECTION ──
document.addEventListener("DOMContentLoaded", () => {
  // Try to find the footer bottom container to place the link
  const footerContainer = document.querySelector(".footer-bottom .container, .footer-bottom, .site-footer .container, footer .container");
  
  if (footerContainer) {
    const adminLink = document.createElement("div");
    adminLink.style.textAlign = "center";
    adminLink.style.paddingTop = "10px";
    adminLink.style.borderTop = "1px solid rgba(255, 255, 255, 0.05)";
    adminLink.style.marginTop = "20px";
    adminLink.innerHTML = `
      <span class="admin-link-footer" id="admin-portal-link" style="font-size: 11px; opacity: 0.3; cursor: pointer; transition: opacity 0.2s;">
        ⚙️ Manage Catalog (Admin Portal)
      </span>
    `;

    // Add styles hover
    const span = adminLink.querySelector("#admin-portal-link");
    span.addEventListener("mouseenter", () => span.style.opacity = "0.8");
    span.addEventListener("mouseleave", () => span.style.opacity = "0.3");
    span.addEventListener("click", openAdminPortal);

    // Append to footer
    footerContainer.appendChild(adminLink);
  }
});
