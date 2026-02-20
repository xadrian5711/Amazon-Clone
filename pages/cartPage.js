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
            <div class="mt-4 flex items-center gap-4">
                <span class="text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded">Qty: ${item.quantity}</span>
            </div>
        </div>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const flexContainer = document.getElementById('activeCart');
    
    // 2. Pull the cart directly from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 3. Check if the cart has items, then render them
    if (savedCart.length > 0) {
        flexContainer.innerHTML = savedCart.map(item => createCartCheckout(item)).join("");
    } else {
        // Show an empty cart message if there is nothing in it
        flexContainer.innerHTML = `
            <div class="py-12 text-center">
                <h2 class="text-2xl font-bold text-gray-900">Your Amazon Cart is empty.</h2>
                <a href="index.html" class="text-blue-600 hover:underline mt-4 inline-block">Continue shopping</a>
            </div>
        `;
    }

    // 4. Update the subtotal box on the right
    updateCheckoutTotals(savedCart);
});

// Function to handle the math for the subtotal box
function updateCheckoutTotals(cartItems) {
    // We are using the calculateCartTotals function you built in cartLogic.js!
    const totals = calculateCartTotals(cartItems);
    
    // Count total items (e.g., if you have 2 basketballs and 1 shoe = 3 items)
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Target the spans we created in Step 1
    const itemCountElement = document.getElementById('checkout-item-count');
    const subtotalElement = document.getElementById('checkout-subtotal');

    // Update the text on the screen
    if (itemCountElement) itemCountElement.innerText = totalQuantity;
    if (subtotalElement) subtotalElement.innerText = `$${totals.subtotal}`;
}