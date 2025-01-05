let cartItems;

        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const fornw = cartItems.length;
        document.getElementById("headerCartAmount").innerHTML = `${fornw}`;

document.addEventListener("DOMContentLoaded", () => {
  console.log("Script Loaded");

  const orderItems = JSON.parse(localStorage.getItem("orderItems")) || [];
  console.log("Order Items Retrieved:", orderItems);

  const orderContainer = document.querySelector(".past-orders");
  if (!orderContainer) {
      console.error("Error: '.past-orders' container not found!");
      return;
  }

  if (orderItems.length === 0) {
      orderContainer.innerHTML = "<p>No past orders found.</p>";
      return;
  }

  orderItems.forEach((item, index) => {
      const orderHTML = `
          <div class="order-details-grid">
              <div class="product-image-container">
                  <img src="${item.Image || 'default-image.jpg'}" alt="${item.Name}">
              </div>
              <div class="product-details">
                  <div class="product-name">${item.Name}</div>
                  <div class="product-delivery-date">Price: $${item.Price}</div>
                  <div class="product-quantity">Quantity: ${item.Amount}</div>
                  <button class="buy-again-button button-primary">
                      <img class="buy-again-icon" src="images/buy-again.png" alt="Buy Again">
                      <span class="buy-again-message">Buy Again</span>
                  </button>
              </div>
              <div class="product-actions">
                  <a href="tracking.html">
                      <button class="track-package-button button-secondary">
                          Track package
                      </button>
                  </a>
              </div>
          </div>`;
      orderContainer.insertAdjacentHTML("beforeend", orderHTML);
  });
});
