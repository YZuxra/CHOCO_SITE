let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartItems = document.getElementById("cart-items");
let totalPrice = document.getElementById("total-price");

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} so'm</td>
                <td>${item.qty}</td>
                <td>
                    <button onclick="removeItem(${index})">❌</button>
                </td>
            </tr>
        `;
    });

    totalPrice.innerText = total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
document.getElementById("order-form").addEventListener("submit", function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Savat bo‘sh!");
        return;
    }

    let order = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        items: cart,
        total: totalPrice.innerText
    };

    console.log("BUYURTMA:", order);

    localStorage.removeItem("cart");
    cart = [];
    renderCart();

    document.getElementById("order-form").reset();
    document.getElementById("success").style.display = "block";
});
