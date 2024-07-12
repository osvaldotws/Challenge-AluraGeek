  function renderProducts() {
    const productGrid = document.querySelector(".products-grid");
    productGrid.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
        <button class="delete-button" onclick="deleteProduct(${product.id})" aria-label="Eliminar producto">
          ✖
        </button>
      `;
      productGrid.appendChild(productCard);
    });
  }
  
  function addToCart(productId) {
    console.log(`Producto ${productId} agregado al carrito`);
    alert("Producto agregado al carrito");
  }
  
  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.querySelector(".search-bar input").value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    renderFilteredProducts(filteredProducts);
  }
  
  function renderFilteredProducts(filteredProducts) {
    const productGrid = document.querySelector(".products-grid");
    productGrid.innerHTML = "";
    if (filteredProducts.length === 0) {
      productGrid.innerHTML = "<p>No se encontraron productos que coincidan con la búsqueda.</p>";
      return;
    }
    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
        <button class="delete-button" onclick="deleteProduct(${product.id})" aria-label="Eliminar producto">
          ✖
        </button>
      `;
      productGrid.appendChild(productCard);
    });
  }
  
  function handleAddProduct(event) {
    event.preventDefault();
    const form = event.target;
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name: form.querySelector("#product-name").value,
      price: parseFloat(form.querySelector("#product-price").value),
      category: form.querySelector("#product-category").value,
      description: form.querySelector("#product-description").value,
      image: form.querySelector("#product-image-url").value || "placeholder.jpg",
    };
  
    const fileInput = form.querySelector("#product-image");
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newProduct.image = e.target.result;
        addProductAndRender(newProduct, form);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      addProductAndRender(newProduct, form);
    }
  }
  
  function addProductAndRender(newProduct, form) {
    products.push(newProduct);
    saveProducts();
    renderProducts();
    form.reset();
    alert("Producto agregado con éxito");
  }
  
  function handleNewsletter(event) {
    event.preventDefault();
    const email = document.querySelector("#newsletter-email").value;
    console.log(`Suscripción al newsletter: ${email}`);
    alert("Gracias por suscribirte a nuestro newsletter!");
    event.target.reset();
  }
  
  function deleteProduct(productId) {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      products = products.filter((product) => product.id !== productId);
      saveProducts();
      renderProducts();
    }
  }
  
  function loadProducts() {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      products = JSON.parse(savedProducts);
    }
  }
  
  function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const icon = document.querySelector("#dark-mode-toggle i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    renderProducts();
    document.querySelector(".search-bar").addEventListener("submit", handleSearch);
    document.querySelector("#add-product-form").addEventListener("submit", handleAddProduct);
    document.querySelector("#newsletter-form").addEventListener("submit", handleNewsletter);
    const darkModeToggle = document.querySelector("#dark-mode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", toggleDarkMode);
    }
  });