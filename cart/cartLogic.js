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
}









// TAX RATE LOGIC
taxRate = 0.07;

function calculateCartTotals(items){
    let subtotalCents = 0;

    items.forEach(item => {
        const priceInCents = Math.round(item.price * 100);

        subtoalcents += priceInCents * item.quantity;
    });

    const taxCents = Math.round(subtotalCents * taxRate);
    const totalCents = subtotalCents + taxCents;

    return {
        subtotal: (subtotalCents / 100).toFixed(2),
        tax: (taxCents / 100).toFixed(2),
        total: (totalCents / 100).toFixed(2)
    };
}