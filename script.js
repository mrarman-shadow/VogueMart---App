// script.js

// Smooth scroll for "Shop Now" button in hero section
document.getElementById("heroShop").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// Smooth scroll for "Shop" link in navbar
document.getElementById("shopBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// Add product to cart and save in localStorage
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added "${name}" to Cart 🛒\nGo to Cart to view`);
}

