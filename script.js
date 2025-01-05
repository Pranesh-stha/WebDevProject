const slides = document.getElementById('slides');
  const slideCount = slides.children.length;
  const sliderWidth = document.querySelector('.slider').offsetWidth;
  let currentIndex = 0;

  slides.style.width = `${sliderWidth * slideCount}px`;

  function showSlide(index) {
    currentIndex = (index + slideCount) % slideCount;
    slides.style.transform = `translateX(-${currentIndex * sliderWidth}px)`;
  }

  document.getElementById('next').addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  document.getElementById('prev').addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 4000);

  


  let productsLoaded = 0;
        const PRODUCTS_PER_LOAD = 12;
        const apiUrl = "https://dummyjson.com/products";

        async function fetchProducts() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                return data.products;
            } catch (error) {
                console.error("Error fetching product details:", error);
                return [];
            }
        }

        function getRandomRatingCount() {
            return Math.floor(Math.random() * 501);
        }

        function createProductHTML(product) {
          let pilds = Math.round(product.rating);
          const productImage = product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/180";
          
          return `
              <div class="product-container">
                  <div class="product-image-container">
                      <img class="product-image" src="${productImage}" alt="Product Image">
                  </div>
                  <div class="product-name">${product.title}</div>
                  <div class="product-rating-container">
                      <span class="product-rating-stars"> <img class="product-rating-stars"
                        src="images/ratings/rating-${pilds*10}.png"> </span>
                      <span class="product-rating-count">(${getRandomRatingCount()} reviews)</span>
                  </div>
                  <div class="product-price">$${product.price.toFixed(2)}</div>
                  <div class="product-quantity-container">
                      <select class="select" id="productAmount-${product.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                  </div>
                  <button class="add-to-cart-button" type="button" 
                      onclick="locallyadd('${product.title}', ${product.price}, '${productImage}', 'productAmount-${product.id}')">
                      Add to Cart
                  </button>
              </div>
          `;
      }
        async function loadProducts() {
            const allProducts = await fetchProducts();
            const productGrid = document.getElementById("product-grid");

            const productsToDisplay = allProducts.slice(productsLoaded, productsLoaded + PRODUCTS_PER_LOAD);
            productsToDisplay.forEach(product => {
                const productHTML = createProductHTML(product);
                productGrid.insertAdjacentHTML('beforeend', productHTML);
            });

            productsLoaded += productsToDisplay.length;

            if (productsLoaded >= allProducts.length) {
                document.getElementById("load-more-button").style.display = "none";
            }
        }

        document.getElementById("load-more-button").addEventListener("click", loadProducts);

        loadProducts();

        let cartItems;

        cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const fornw = cartItems.length;
        document.getElementById("headerCartAmount").innerHTML = `${fornw}`;

        function locallyadd(productName, productPrice, productImage, productAmountId) {
          const amountOfProduct = document.getElementById(productAmountId).value;
      
           cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
          cartItems.push({ 
              Name: productName, 
              Price: productPrice, 
              Image: productImage, 
              Amount: amountOfProduct 
          });
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
      
          console.log("Product added:", { 
              Name: productName, 
              Price: productPrice, 
              Image: productImage, 
              Amount: amountOfProduct 
          });
            const fornow = cartItems.length;
            document.getElementById("headerCartAmount").innerHTML = `${fornow}`;
          
        }




