// Replace this with the shop's WhatsApp number.
// Use the country code without + or spaces.
const WHATSAPP_NUMBER = "256782374181";

const products = [
    {
        id: 1,
        name: "Cement",
        description: "Cement for building and construction.",
        price: 35000,
        image: "images/cement.jpg"
    },
    
    {
        id: 2,
        name: "Iron Sheets",
        description: "Roofing materials for buildings.",
        price: 50000,
        image: "images/iron sheets.jpg"
    },
    {
        id: 3,
        name: "Nails",
        description: "Nails for construction and carpentry.",
        price: 5000,
        image: "images/nails.jpg"
    },
    {
        id: 4,
        name: "Paint",
        description: "Paint for walls and other surfaces.",
        price: 45000,
        image: "images/paint.jpg"
    },
    {
        id: 5,
        name: "Plumbing Pipes",
        description: "Pipes for plumbing installations.",
        price: 15000,
        image: "images/plumbing pipes.jpg"
    },
    {
        id: 6,
        name: "Construction Tools",
        description: "Tools for building and repairs.",
        price: 25000,
        image: "images/construction tools.jpg"
    }
];

// The cart stores product IDs and quantities.
let cart = {};

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");

function formatPrice(price) {
    return price.toLocaleString("en-UG");
}

function displayProducts(searchTerm = "") {
    productList.innerHTML = "";

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    document.getElementById("no-results").hidden =
        filteredProducts.length !== 0;

    filteredProducts.forEach(product => {
        const card = document.createElement("div");

        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("div");
        price.className = "price";
        price.textContent = "UGX " + formatPrice(product.price);

        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        card.append(image, name, description, price, button);
        productList.appendChild(card);
    });
}

function addToCart(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    updateCart();
}

function changeQuantity(productId, amount) {
    cart[productId] += amount;

    if (cart[productId] <= 0) {
        delete cart[productId];
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    Object.entries(cart).forEach(([id, quantity]) => {
        const product = products.find(item => item.id === Number(id));

        total += product.price * quantity;
        count += quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("span");
        details.textContent =
            `${product.name} × ${quantity} — UGX ` +
            formatPrice(product.price * quantity);

        const controls = document.createElement("div");

        const minus = document.createElement("button");
        minus.textContent = "−";
        minus.setAttribute("aria-label", "Remove one " + product.name);
        minus.addEventListener("click", () =>
            changeQuantity(product.id, -1)
        );

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.setAttribute("aria-label", "Add one " + product.name);
        plus.addEventListener("click", () =>
            changeQuantity(product.id, 1)
        );

        controls.append(minus, document.createTextNode(" "), plus);
        row.append(details, controls);
        cartItems.appendChild(row);
    });

    if (count === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = formatPrice(total);
}

function clearCart() {
    cart = {};
    updateCart();
}

function checkout() {
    const entries = Object.entries(cart);

    if (entries.length === 0) {
        alert("Please add products to your cart first.");
        return;
    }

    if (!/^\d{10,15}$/.test("256782374181")) {
        alert("Please configure the shop's WhatsApp number in script.js.");
        return;
    }

    let message = "Hello Kelubz General Hardware! I would like to order:\n\n";
    let total = 0;

    entries.forEach(([id, quantity]) => {
        const product = products.find(item => item.id === Number(id));
        const subtotal = product.price * quantity;

        total += subtotal;

        message += `${product.name} x ${quantity} = UGX ${formatPrice(subtotal)}\n`;
    });

    message += `\nEstimated total: UGX ${formatPrice(total)}`;
    message += "\n\nPlease confirm product availability, final prices and delivery charges.";

    const whatsappURL =
        "https://wa.me/256782374181+?text=" 
        + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

searchInput.addEventListener("input", event => {
    displayProducts(event.target.value);
});

document.getElementById("clear-cart").addEventListener("click", clearCart);

document.getElementById("checkout").addEventListener("click", checkout);

displayProducts();
updateCart();