// Smooth scroll for "Shop Now" button
document.getElementById("heroShop").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("shopBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

// Unified Add to Cart Function
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added "${name}" to Cart 🛒`);
}
function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find(item => item.name === name);
  if (!exists) {
    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist ❤️");
  } else {
    alert("Already in Wishlist ❤️");
  }
} 

// ==================== ON PAGE LOAD ================================
window.onload = () => {
  loadCartItems();
  loadWishlistItems();
  updateCounts();
};
function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.push({ name, price, image });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Added to Wishlist ❤️");
}


