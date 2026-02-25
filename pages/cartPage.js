// 1. Template for rendering each item that is ACTUALLY in the cart
function createCartCheckout(item) {
    return `
    <div class="flex flex-col md:flex-row py-6 border-b border-gray-200 gap-6">
        <div class="w-48 h-48 shrink-0 bg-white">
            <img src="${item.image}" class="w-full h-full object-contain" alt="${item.name}">
        </div>
        <div class="flex-1">
            <h2 class="text-xl font-bold">${item.name}</h2>
            <p class="text-gray-600 mt-2">${item.description || ''}</p>
            <p class="text-lg font-bold mt-2">$${item.price.toFixed(2)}</p>
            <div class="mt-4 flex items-center gap-2">
                <button onclick="updateQuantity(${item.id}, -1)" class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold transition-colors">-</button>
                <span class="text-gray-700 font-medium px-4 py-1 bg-gray-50 border border-gray-200 rounded">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)" class="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded font-bold transition-colors">+</button>
            </div>
        </div>
    </div>
    `;
}

// 2. We put the drawing logic into a reusable function
function renderCart() {
    const flexContainer = document.getElementById('activeCart');
    // If we aren't on the checkout page, stop running this code
    if (!flexContainer) return; 

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (savedCart.length > 0) {
        flexContainer.innerHTML = savedCart.map(item => createCartCheckout(item)).join("");
    } else {
        flexContainer.innerHTML = `
            <div class="py-12 text-center">
                <h2 class="text-2xl font-bold text-gray-900">Your Amazon Cart is empty.</h2>
                <a href="index.html" class="text-blue-600 hover:underline mt-4 inline-block">Continue shopping</a>
            </div>
        `;
    }

    // Update the subtotal box on the right
    updateCheckoutTotals(savedCart);
}

// 3. Run it once when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});

// 4. Handle the math for the subtotal box
function updateCheckoutTotals(cartItems) {
    const totals = calculateCartTotals(cartItems);
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const itemCountElement = document.getElementById('checkout-item-count');
    const subtotalElement = document.getElementById('checkout-subtotal');

    if (itemCountElement) itemCountElement.innerText = totalQuantity;
    if (subtotalElement) subtotalElement.innerText = `$${totals.subtotal}`;
}