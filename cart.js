let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartContainer = document.getElementById("cartItems");

function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<h3 style='color:white;text-align:center'>Cart is Empty</h3>";
    document.getElementById("totalItems").innerText = "";
    document.getElementById("totalPrice").innerText = "";
    return;
  }

  cartContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" class="cart-img">

      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>

        <div class="quantity-controls">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
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

