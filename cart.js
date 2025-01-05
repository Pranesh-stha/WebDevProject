document.addEventListener("DOMContentLoaded", () => {
  console.log("Script Loaded");

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log("Cart Items:", cartItems);

  

  const RawPrice = cartItems.reduce((total, item) => {
      return total + (item.Price * item.Amount);
    }, 0);

    console.log("RawPrice:", RawPrice);
    document.getElementById("initialPrice").innerHTML=`$${RawPrice.toFixed(2)}`;

    if(RawPrice === 0){
      shippingPrice = 0;
    }

    else{
      shippingPrice = 4.99;
    }
    document.getElementById("deliveryMan").innerHTML=`$${shippingPrice.toFixed(2)}`;
   
    const PriceAfterShipping = RawPrice + shippingPrice;
    document.getElementById("deliveryCharge").innerHTML=`$${PriceAfterShipping.toFixed(2)}`;

    const taxAmount = 0.1 * PriceAfterShipping;
    document.getElementById("taxAmountPrice").innerHTML=`$${taxAmount.toFixed(2)}`;

    const finalAmount = PriceAfterShipping + taxAmount;
    document.getElementById("finalPrice").innerHTML=`$${finalAmount.toFixed(2)}`;




  const cartContainer = document.querySelector(".order-summary");
  if (!cartContainer) {
    console.error("Error: '.order-summary' container not found!");
    return;
  }
  console.log("Cart Container Found:", cartContainer);

  cartContainer.innerHTML = "";
  document.getElementById("noOfItems").innerHTML = `${cartItems.length} items`;
  document.getElementById("noInFinal").innerHTML = `Items (${cartItems.length}):`;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  window.deleteItem = (index) => {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    location.reload();
  };

  window.updateQuantity = (index) => {
    const input = document.getElementById(`quantity-input-${index}`);
    const newQuantity = parseInt(input.value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      cartItems[index].Amount = newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      location.reload();
    } else {
      alert("Please enter a valid quantity.");
    }
  };

  cartItems.forEach((item, index) => {
    const itemHTML = `
      <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: Thursday, January 9
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${item.Image || 'default-image.jpg'}">

            <div class="cart-item-details">
              <div class="product-name">
                ${item.Name}
              </div>
              <div class="product-price">
                $${item.Price}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <input type="number" class="quantity-label" id="quantity-input-${index}" value="${item.Amount}" min="1">
                </span>
                <span class="update-quantity-link link-primary" onClick="updateQuantity(${index})">
                  Update
                </span>
                <span class="delete-quantity-link link-primary" onClick="deleteItem(${index})">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Cash on Delivery
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Pay Online on Delivery
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-1">
                <div>
                  <div class="delivery-option-date">
                    Pay Online Now
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

    cartContainer.insertAdjacentHTML("beforeend", itemHTML);

    
  });
});

function clearCart(){
let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
let orderItems = JSON.parse(localStorage.getItem("orderItems") || "[]");
orderItems.unshift(...cartItems);
localStorage.setItem("orderItems", JSON.stringify(orderItems));
console.log(orderItems); 
localStorage.setItem('cartItems', JSON.stringify([]));
document.getElementById("goToOrder").innerHTML=`Orders Placed`
}

