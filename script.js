let cart = [];
loadCart();
function addToCart(button) {
    let product = button.parentElement;
    let name = product.querySelector("h3").innerText;
    let priceText = product.querySelector("p").innerText;
    let image = product.querySelector("img").src;
    priceText = priceText.replace("₦", "");
    priceText = priceText.replace(/,/g, "");
    let price = Number(priceText);
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }
    if (found == false) {
        let newProduct = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        cart.push(newProduct);
    }
    saveCart();
    showCart();
    openCart();
}
function showCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    if (cart.length == 0) {
        let emptyMessage =  document.createElement("p");
        emptyMessage.innerText = "Your cart is empty.";
        cartItems.appendChild(emptyMessage);
        document.getElementById("cart-total").innerText = "₦0";
        document.getElementById("cart-count").innerText = "0";
        return;
    }
    let total = 0;
    let count = 0
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        let productTotal = product.price * product.quantity;
        total =  total + productTotal;
        count = count + product.quantity;
        let cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        let image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        let cartInfo = document.createElement("div");
        cartInfo.className = "cart-info";
        let name = document.createElement("h3");
        name.innerText = product.name;
        let price = document.createElement("p");
        price.innerText = "Price: ₦" + product.price.toLocaleString();
        let itemTotal = document.createElement("p");
        itemTotal.innerText = "Total: ₦" + productTotal.toLocaleString();
        let quantity = document.createElement("div");
        quantity.className = "quantity";
        let minusButton = document.createElement("button");
        minusButton.innerText = "-";
        minusButton.onclick = function () {
                decrease(i);
        };
        let quantityNumber = document.createElement("span");
        quantityNumber.innerText = product.quantity;
        let plusButton = document.createElement("button");
        plusButton.innerText ="+";
        plusButton.onclick =function () {
                increase(i);
        };
        let removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.className = "remove";
        removeButton.onclick = function () {
                removeProduct(i);
        };
        quantity.appendChild(minusButton);
        quantity.appendChild(quantityNumber);
        quantity.appendChild(plusButton);
        cartInfo.appendChild(name);
        cartInfo.appendChild(price);
        cartInfo.appendChild(itemTotal);
        cartInfo.appendChild(quantity);
        cartInfo.appendChild(removeButton);
        cartItem.appendChild(image);
        cartItem.appendChild(cartInfo);
        cartItems.appendChild(cartItem);
    }
    document.getElementById("cart-total").innerText ="₦" + total.toLocaleString();
    document.getElementById("cart-count").innerText =count;
}
function increase(index) {
    cart[index].quantity++;
    saveCart();
    showCart();
}
function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    showCart();
}
function removeProduct(index) {
    cart.splice(index, 1);
    saveCart();
    showCart();
}
function openCart() {
    document.getElementById("cart-panel").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
}
function closeCart() {
    document.getElementById("cart-panel").classList.remove("active");
    document.getElementById("cart-overlay").classList.remove("active");
}
function saveCart() {

    localStorage.setItem(
        "myCart",
        JSON.stringify(cart)
    );
}
function loadCart() {

    let savedCart =
        localStorage.getItem("myCart");
    if (savedCart) {
        cart =
            JSON.parse(savedCart);
    }
    showCart();
}