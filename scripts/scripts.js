
function on() {
    // display overlay
    const turnOn = document.getElementById("overlay");
    turnOn.style.display = "block";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "hidden";
}

function off() {
    // display overlay
    const turnOff = document.getElementById("overlay");
    turnOff.style.display = "none";
    // turn off vertical scroll
    const overflow = document.querySelector("body");
    overflow.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".powder-child").forEach((item) => {
        let productName = item.querySelector("h4").textContent.split(" $")[0]; // Get product name
        let productPrice = parseFloat(item.querySelector("h4").textContent.split("$")[1]); // Get price
        let quantityElement = item.querySelector(".quantity");
        let addToCartButton = item.querySelector(".add-to-cart");
        let increaseButton = item.querySelector(".increase");
        let decreaseButton = item.querySelector(".decrease");

        let cartItem = cart.find((item) => item.name === productName);
        let quantity = cartItem ? cartItem.quantity : 0;
        quantityElement.textContent = quantity;

        function updateCart() {
            let itemIndex = cart.findIndex((item) => item.name === productName);
            if (itemIndex > -1) {
                cart[itemIndex].quantity = quantity;
                if (quantity === 0) {
                    cart.splice(itemIndex, 1);
                }
            } else {
                cart.push({ name: productName, quantity: quantity, price: productPrice });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart);
        }

        addToCartButton.addEventListener("click", function () {
            quantity++;
            quantityElement.textContent = quantity;
            updateCart();
        });

        increaseButton.addEventListener("click", function () {
            quantity++;
            quantityElement.textContent = quantity;
            updateCart();
        });

        decreaseButton.addEventListener("click", function () {
            if (quantity > 0) {
                quantity--;
                quantityElement.textContent = quantity;
                updateCart();
            }
        });
    });
});
