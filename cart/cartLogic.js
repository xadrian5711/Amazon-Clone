// cart counter
let cart =  JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('nav-cart-count');
    if (cartCountElement) {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = totalQuantity;
    }
}

// ADD TO CART Function 

function addToCart(productId){
    const product = products.find(p => p.id === productId);

    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem){
        existingItem.quantity +=1;
    } else {
        cart.push({...product, quantity: 1

        });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();


const button = document.getElementById(`add-btn-${productId}`);
    
    if (button) {
        // 2. Change the text and make it green
        button.innerText = "Added ✓";
        button.classList.remove('bg-yellow-400', 'hover:bg-yellow-500');
        button.classList.add('white', 'hover:bg-green-600', 'text-white');

        // 3. Set a timer (2000 milliseconds = 2 seconds) to change it back
        setTimeout(() => {
            button.innerText = "Add to Cart";
            button.classList.remove('white', 'hover:bg-green-600', 'text-white');
            button.classList.add('bg-yellow-400', 'hover:bg-yellow-500');
        }, 2000);
    }
}








// TAX RATE LOGIC
taxRate = 0.07;

function calculateCartTotals(items){
    let subtotalCents = 0;

    items.forEach(item => {
        const priceInCents = Math.round(item.price * 100);

        subtotalCents += priceInCents * item.quantity;
    });

    const taxCents = Math.round(subtotalCents * taxRate);
    const totalCents = subtotalCents + taxCents;

    return {
        subtotal: (subtotalCents / 100).toFixed(2),
        tax: (taxCents / 100).toFixed(2),
        total: (totalCents / 100).toFixed(2)
    };
}


// --- ADJUST QUANTITY LOGIC ---
function updateQuantity(productId, changeAmount) {
    // 1. Find where the item lives in the cart array
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    // If the item exists in the cart
    if (itemIndex > -1) {
        // 2. Add the change (e.g., +1 or -1) to the current quantity
        cart[itemIndex].quantity += changeAmount;

        // 3. If the quantity drops to 0 or below, remove the item entirely
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Splice cuts the item out of the array
        }

        // 4. Save the new cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // 5. Update the red nav bubble
        updateCartCount();

        // 6. Refresh the checkout page to show the new numbers
        // (We check if renderCart exists just in case we are on the homepage)
        if (typeof renderCart === 'function') {
            renderCart();
        }
    }
}



