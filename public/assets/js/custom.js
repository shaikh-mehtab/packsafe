document.addEventListener("DOMContentLoaded", function () {
  function reattachRemoveListeners() {
    const cartRemoveButtons = document.querySelectorAll("#cart-product-remove");

    cartRemoveButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.getAttribute("data-id");
        fetch("/remove-from-cart", {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              Toastify({
                text: "Removed from cart",
                duration: 3000, // Duration in milliseconds
                close: true, // Show close button
                gravity: "top", // Toast position - top or bottom
                position: "right", // Toast position - left, center or right
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
                className: "error-toast", // Custom class name for styling
              }).showToast();
              updateCartView(data.cart);
            }
          })
          .catch((err) => console.error(err));
      });
    });
  }

  const addToCartButton = document.querySelector("#add-to-cart-submit");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
      const formData = new FormData(
        document.querySelector("#add-to-cart-form")
      );
      const cartData = {};
      formData.forEach((value, key) => {
        cartData[key] = value;
      });
      fetch("/add-to-cart", {
        method: "POST",
        body: JSON.stringify(cartData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            Toastify({
              text: "Added to Cart",
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              backgroundColor: "#4CAF50",
            }).showToast();
            updateCartView(data.cart);
          } else {
            Toastify({
              text: data.message,
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
          }
        })
        .catch((err) => console.error(err));
    });
  }

  const quickAddToCartBtn = document.querySelectorAll(".quick-add-to-cart");
  quickAddToCartBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-id");
      fetch("/add-to-cart", {
        method: "POST",
        body: JSON.stringify({ productId: productId, quantity: 1 }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            updateCartView(data.cart);
            Toastify({
              text: "Added to Cart!",
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
              },
            }).showToast();
          } else {
            Toastify({
              text: data.message,
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
          }
        })
        .catch((err) =>
          Toastify({
            text: err.message,
            duration: 3000, // Duration in milliseconds
            close: true, // Show close button
            gravity: "top", // Toast position - top or bottom
            position: "right", // Toast position - left, center or right
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
            className: "error-toast", // Custom class name for styling
          }).showToast()
        );
    });
  });

  function updateCartView(cart) {
    const cartContainer = document.querySelector(".cart-item-list");
    const bigCart = document.querySelector("#bigCart");
    const qtyDisplayer = document.querySelector(".totalCountDisplayer");
    qtyDisplayer.innerHTML = cart.totalCount;
    cartContainer.innerHTML = ""; // Clear existing cart items

    let listItem = "";
    cart.products.forEach((product) => {
      listItem += `
      <li class="cart-item align-items-center">
        <a id="cart-product-remove" class="alt-font close" data-id="${product.id}">×</a>
        <div class="product-image">
          <a href="/product/${product.slug}">
            <img src="/api/transform/${product.data_image}" class="cart-thumb" alt="">
          </a>
        </div>
        <div class="product-detail alt-font fw-600">
          <a href="/product/${product.slug}">${product.name}</a>
          <span class="item-ammount fw-500">${product.quantity} x ${product.spl_price}</span>
        </div>
      </li>
    `;
    });

    const listEnd = `
    <li class="cart-total">
      <div class="alt-font mb-15px">
        <span class="w-50 fw-500">Subtotal:</span>
        <span class="w-50 text-end fw-700">${cart.totalAmount}</span>
      </div>
      <a href="/cart" class="btn btn-large btn-transparent-base-color border-color-extra-medium-gray btn-round-edge">View cart</a>
      <a href="/checkout" class="btn btn-large btn-base-color btn-box-shadow btn-round-edge">Checkout</a>
    </li>
  `;

    cartContainer.innerHTML = listItem + listEnd;

    let bigListItem = "";
    if (bigCart) {
      bigCart.innerHTML = "";
      cart.products.forEach((product) => {
        bigListItem += `
        <tr>
          <td class="cart-product-remove">
            <a id="cart-product-remove" data-id="${
              product.id
            }" class="fs-20 fw-500">×</a>
          </td>
          <td class="product-thumbnail">
            <a href="/product/${product.slug}">
              <img class="cart-product-image" src="/assets/images/demo-decor-store-product-01.jpg" alt="">
            </a>
          </td>
          <td class="product-name">
            <a href="/product/${
              product.slug
            }" class="text-dark-gray fw-500 d-block lh-initial">${
          product.name
        }</a>
          </td>
          <td class="product-price" data-title="Price">${product.price}</td>
          <td class="product-quantity" data-title="Quantity">
            <div class="quantity">
              <input class="qty-text" type="text" value="${
                product.quantity
              }" aria-label="qty-text" />
            </div>
          </td>
          <td class="product-subtotal" data-title="Total">${(
            product.price * product.quantity
          ).toFixed(2)}</td>
        </tr>
      `;
      });

      bigCart.innerHTML = bigListItem;
    }

    // Update cart count and total amount in other parts of the page
    const cartCountContainers = document.querySelectorAll(
      ".cartCountContainer"
    );
    cartCountContainers.forEach((el) => (el.innerHTML = cart.totalCount));

    const totalAmountContainers = document.querySelectorAll(
      ".totalAmountContainer"
    );
    totalAmountContainers.forEach((el) => (el.innerHTML = cart.totalAmount));

    // Reattach event listeners to the new remove buttons
    reattachRemoveListeners();
  }

  const cartEmptyBtn = document.querySelectorAll("#cart-emptier");
  if (cartEmptyBtn.length > 0) {
    cartEmptyBtn.forEach((el) => {
      el.addEventListener("click", () => {
        fetch("/empty-cart")
          .then((res) => res.json())
          .then((data) => {
            if (data.status) {
              Toastify({
                text: "Cart Emptied",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "#4CAF50",
              }).showToast();
              updateCartView(data.cart);
            }
          });
      });
    });
  }

  // Initial call to attach event listeners
  reattachRemoveListeners();

  const registerBtn = document.querySelector("#register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      const formData = new FormData(document.querySelector("#register-form"));
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.status) {
            Toastify({
              text: data.message,
              duration: 3000, // Duration in milliseconds
              close: true, // Show close button
              gravity: "top", // Toast position - top or bottom
              position: "right", // Toast position - left, center or right
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
          } else {
            window.location.replace("/login");
          }
        })
        .catch((err) => console.error(err));
    });
  }

  const loginBtn = document.querySelector("#login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const formData = new FormData(document.querySelector("#login-form"));
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.status) {
            Toastify({
              text: data.message,
              duration: 3000, // Duration in milliseconds
              close: true, // Show close button
              gravity: "top", // Toast position - top or bottom
              position: "right", // Toast position - left, center or right
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
          } else {
            window.location.replace("/login");
          }
        })
        .catch((err) =>
          Toastify({
            text: err.message,
            duration: 3000, // Duration in milliseconds
            close: true, // Show close button
            gravity: "top", // Toast position - top or bottom
            position: "right", // Toast position - left, center or right
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
            className: "error-toast", // Custom class name for styling
          }).showToast()
        );
    });
  }

  const placeOrderBtn = document.querySelector("#place-order-btn");
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      const formData = new FormData(
        document.querySelector("#new-address-form")
      );
      const addressData = {};
      formData.forEach((value, key) => {
        addressData[key] = value;
      });
      fetch("/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const options = {
              key: data.razorpay_credentials.razorpay_id,
              amount: data.razorpayOrder.amount,
              name: "Packsafe",
              description: "Order Payment",
              image: "qwerty/logo.png",
              order_id: data.razorpayOrder.id,
              handler: function (response) {
                Toastify({
                  text: "Payment successful!",
                  duration: 3000,
                  close: true,
                  gravity: "top", // `top` or `bottom`
                  position: "right", // `left`, `center` or `right`
                  backgroundColor: "#4CAF50",
                }).showToast();
                fetch("/update-order-status", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    order_id: data.order_id,
                    paymentId: response.razorpay_payment_id,
                    payment_status: response.razorpay_payment_id,
                  }),
                })
                  .then((res) => res.json())
                  .then((repsponse) => {
                    if (data.status === "success") {
                      window.location.replace(
                        `/order-details/${data.order_id}`
                      );
                    } else {
                      alert("Server Error.Please Try again");
                    }
                  });
              },
              theme: {
                color: "#3399cc",
              },
              modal: {
                ondismiss: function () {
                  fetch("/update-order-status", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      order_id: data.order_id,
                      payment_status: "failed",
                    }),
                  }).then((data) => {
                    if (data.status === "success") {
                      window.location.replace(
                        `/order-details/${data.order_id}`
                      );
                    } else {
                      alert("Server Error.Please Try again");
                    }
                  });
                  Toastify({
                    text: "Payment Aborted",
                    duration: 3000, // Duration in milliseconds
                    close: true, // Show close button
                    gravity: "top", // Toast position - top or bottom
                    position: "right", // Toast position - left, center or right
                    backgroundColor:
                      "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
                    className: "error-toast", // Custom class name for styling
                  }).showToast();
                },
              },
            };
            const rzp = new Razorpay(options);
            rzp.open();
          } else {
            Toastify({
              text: data.message,
              duration: 3000, // Duration in milliseconds
              close: true, // Show close button
              gravity: "top", // Toast position - top or bottom
              position: "right", // Toast position - left, center or right
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
          }
        })
        .catch((err) => {
          Toastify({
            text: err.message,
            duration: 3000, // Duration in milliseconds
            close: true, // Show close button
            gravity: "top", // Toast position - top or bottom
            position: "right", // Toast position - left, center or right
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
            className: "error-toast", // Custom class name for styling
          }).showToast();
          console.error(err);
        });
    });
  }

  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      fetch("/auth/logout", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            Toastify({
              text: data.message,
              duration: 3000, // Duration in milliseconds
              close: true, // Show close button
              gravity: "top", // Toast position - top or bottom
              position: "right", // Toast position - left, center or right
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
            window.location.replace("/");
          }
        });
    });
  }

  const addressForm = document.querySelector("#addressEditForm");
  if (addressForm) {
    document
      .getElementById("addressEditForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(
          document.querySelector("#addressEditForm")
        );
        const data = {};
        formData.forEach((value, key) => {
          console.log("key", key, " : value", value);
          data[key] = value;
        });
        console.log(data);
        try {
          const response = await fetch(`/updateAddress/${data.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const result = await response.json();
          if (response.ok) {
            Toastify({
              text: "Address Updated Successfully",
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              backgroundColor: "#4CAF50",
            }).showToast();
            location.reload(); // Reload the page
          } else {
            Toastify({
              text: "Error updating address: " + result.message,
              duration: 3000, // Duration in milliseconds
              close: true, // Show close button
              gravity: "top", // Toast position - top or bottom
              position: "right", // Toast position - left, center or right
              backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
              className: "error-toast", // Custom class name for styling
            }).showToast();
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    console.log(contactForm);
    document
      .querySelector("#contact-form-submit")
      .addEventListener("click", function () {
        console.log("contact form");
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        fetch("/contact-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              Toastify({
                text: data.message,
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                backgroundColor: "#4CAF50",
              }).showToast();
            } else {
              Toastify({
                text: data.message,
                duration: 3000, // Duration in milliseconds
                close: true, // Show close button
                gravity: "top", // Toast position - top or bottom
                position: "right", // Toast position - left, center or right
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // Background color
                className: "error-toast", // Custom class name for styling
              }).showToast();
            }
          });
      });
  }
});

function hasEmptyValue(obj) {
  return Object.values(obj).some(
    (value) => value === "" || value === null || value === undefined
  );
}
