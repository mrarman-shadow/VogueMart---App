const products = [
  {
    name: "Classic Cotton Shirt",
    price: 999,
    image: "IMAGE_URL_1"
  },
  {
    name: "Luxury Wrist Watch",
    price: 1799,
    image: "IMAGE_URL_2"
  }
];

let container = document.getElementById("shopProducts");

container.innerHTML = products.map(p => `
  <div class="product-card">
    <img src="${p.image}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>

    <div class="actions">
      <button onclick="addToCart('${p.name}', ${p.price}, '${p.image}')">Add to Cart</button>
      <button onclick="addToWishlist('${p.name}', ${p.price}, '${p.image}')">❤️</button>
    </div>
  </div>
`).join("");
