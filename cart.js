let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartContainer = document.getElementById("cartItems");
let totalPrice = 0;

function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<h3 style='color:white;text-align:center'>Cart is Empty</h3>";
    document.getElementById("totalItems").innerText = "";
    document.getElementById("totalPrice").innerText = "";
    return;
  }

  cartContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <div>
        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
        <span style="margin: 0 10px; font-size:18px; color:#024558">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
    </div>
  `).join("");

  updateSummary();
}

function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function updateSummary() {
  let total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  let count = cart.reduce((sum, i) => sum + i.qty, 0);

  document.getElementById("totalItems").innerText = `Items: ${count}`;
  document.getElementById("totalPrice").innerText = `Total: ₹${total}`;
}

displayCart();
