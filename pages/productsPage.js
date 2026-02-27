function getStarRatingHTML(rating) {
            return `
                <div class="flex items-center space-x-0.5">
                    ${[1, 2, 3, 4, 5].map(i => `
                        <i data-lucide="star" 
                           class="w-4 h-4 ${i <= Math.floor(rating) ? 'fill-[#de7921] text-[#de7921]' : 'text-gray-300'}">
                        </i>
                    `).join('')}
                </div>
            `;
        }







function createProductCard (product) {
    const priceString = product.price.toFixed(2);

    const [whole, fraction] = priceString.split('.');
    
    return `
    <div class="border border-gray-200 rounded-lg p-4 flex flex-col h-full bg-white hover:bg-gray-50 transition-colors relative group">
        <div class="relative w-full aspect-square flex items-center justify-center mb-2 bg-gray-100 rounded overflow-hidden">
            <img src="${product.image}" alt="${product.name}" class="object-contain h-full w-full mix-blend-multiply p-4">
        </div>
        <div class="flex-1 flex flex-col text-left">
            <h2 class="text-base font-medium text-gray line-clamp-4 leading-snug hover:text-amazon-link cursor-pointer mb-1">
                ${product.name}
            </h2>
            <div></div>
            <div class="flex items-center gap-1 mb-1">
                <span class="text font-medium text-amazon-link">${product.rating}</span>
                ${getStarRatingHTML(product.rating)}
            </div>

            <div class="flex items-start text-amazon-price mb-1">
                <span class="price-symbol">$</span>
                <span class="price-whole text-2xl font-bold">${whole}</span>
                <span class="price-fraction text-xs font-semibold mt-1">${fraction}</span>
            </div>

            <div class="text-xs text-gray-600 mb-2">${product.description}</div>
            
            <button id="add-btn-${product.id}" onclick = "addToCart(${product.id})" class="add-to-cart-btn mt-auto w-full bg-[#FFD814] hover:bg-[#F7CA00] py-1.5 rounded-full text-sm font-medium border border-[#FCD200] shadow-sm transition-colors"
                data-product-id="${product.id}">
                Add to Cart
            </button>
        
            

        </div>
        
    </div>   
        
    `}




// 1. Create a reusable function to draw the products
function renderProducts(productsToDisplay) {
    const gridContainer = document.getElementById('product-grid');
    if (!gridContainer) return;

    // If we have products, draw them. Otherwise, show a "Not Found" message!
    if (productsToDisplay.length > 0) {
        gridContainer.innerHTML = productsToDisplay.map(product => createProductCard(product)).join(" ");
    } else {
        gridContainer.innerHTML = `<p class="col-span-full text-center text-lg font-bold text-gray-500 py-12">No products match your search.</p>`;
    }

    // Re-load the Lucide star icons for the new cards
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 2. Run our logic when the page loads
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Draw all products initially
    if (typeof products !== 'undefined') {
        renderProducts(products);
    } else {
        console.error('Products data not found.');
    }

    // B. Search Bar Logic (Using Linear Search!)
    const searchBar = document.getElementById('default-search');
    
    if (searchBar) {
        // The 'input' event fires every single time a key is typed or deleted
        searchBar.addEventListener('input', (event) => {
            // Grab what the user typed and make it lowercase
            const searchTerm = event.target.value.toLowerCase();
            
            // Filter the array: Keep it if the name OR description includes the search term
            const filteredProducts = products.filter(product => {
                const nameMatches = product.name.toLowerCase().includes(searchTerm);
                const descMatches = product.description.toLowerCase().includes(searchTerm);
                
                return nameMatches || descMatches; 
            });

            // Re-draw the screen with ONLY the filtered items!
            renderProducts(filteredProducts);
        });
    }
});
