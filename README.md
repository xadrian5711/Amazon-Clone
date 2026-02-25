AMAZON CLONE
---

## What You're Starting With

After our setup together, you have:

- A Vite + Tailwind project running in the browser
- A `menuItems` array with 4 items in `main.js`
- A `renderMenu()` function that displays item cards on the page
- An "Add to Cart" button on each card that **doesn't do anything yet**

Everything below is what **you** build from here.

---

## Tier 1 — Core Features (Your main goal for today)

### 1.1 — Expand Your Menu

- Add at least **8 more menu items** to your `menuItems` array (12+ total)
- Use at least **3 different categories** (e.g., mains, sides, drinks, desserts)
- Each item needs: `id`, `name`, `description`, `price`, `category`, `image`
- Make the items fit YOUR restaurant theme

### 1.2 — Category Filters

- Add filter buttons to the page (one per category + an "All" button)
- Clicking a filter button shows **only** items in that category
- Clicking "All" shows every item again
- The currently active filter should look visually different (different color, bold, underline — your call)

### 1.3 — Working Cart

- Create a `cart` array to store items the user adds
- When "Add to Cart" is clicked, add that item to the `cart` array
- Display the cart on the page — show each item's name and price
- Show the **total price** of all items in the cart

### 1.4 — Remove from Cart

- Each item in the cart should have a "Remove" button
- Clicking it removes that item from the cart
- The total updates when items are removed

---

## Tier 2 — Stretch Features (If you finish Tier 1)

### 2.1 — Quantity Controls

- If the same item is added twice, don't duplicate it — increase the quantity
- Show quantity next to each cart item
- Add +/- buttons to adjust quantity in the cart
- Total should reflect quantities (price x quantity)

### 2.2 — Cart Item Count

- Show a count somewhere visible (like "Cart (3)") that updates as items are added/removed

### 2.3 — Tax & Order Summary

- Calculate and display tax (use 8% or whatever your state charges)
- Show a breakdown: Subtotal, Tax, Total

### 2.4 — Search

- Add a text input that filters menu items by name as the user types
- Should work together with category filters (e.g., search "chicken" within "mains")

---

## Tier 3 — Challenge Features (For the ambitious)

### 3.1 — LocalStorage Persistence

- Save the cart to `localStorage` so it survives page refresh
- Load the cart from `localStorage` when the page loads

### 3.2 — Animations

- Add a transition or animation when items appear/disappear (filter changes, cart add/remove)
- CSS transitions or keyframe animations — you covered this in CSS unit!

### 3.3 — Discount Codes

- Add a text input for promo codes
- If the user enters a valid code (you define what's valid), apply a discount
- Show the discount in the order summary

### 3.4 — Sort Options

- Add the ability to sort menu items by price (low to high, high to low)
- Or sort alphabetically

### 3.5 — Item Customization Modal

- When clicking on a menu item card, show a detail view or modal
- Could include size options, add-ons, special instructions

---

## Hints

Only look at these if you're stuck. Try to work it out yourself first.

<details>
<summary><strong>Hint: How do I know which "Add to Cart" button was clicked?</strong></summary>

When you create the button in your loop, you have access to the current `item`. You can use a `data-id` attribute on the button:

```js
<button data-id="${item.id}">Add to Cart</button>
```

Then in your event listener, grab the id with:

```js
const itemId = event.target.dataset.id;
```

Or, you can add the event listener inside the same loop where you create the card — that way you already have the `item` variable available.

</details>

<details>
<summary><strong>Hint: How do I filter items by category?</strong></summary>

You already have `renderMenu()` which takes an array of items. You just need to give it a _filtered_ array:

```js
// Using a for loop
const filtered = [];
for (let i = 0; i < menuItems.length; i++) {
  if (menuItems[i].category === "mains") {
    filtered.push(menuItems[i]);
  }
}
renderMenu(filtered);
```

You can also look up the array `.filter()` method if you want a shorter approach.

</details>

<details>
<summary><strong>Hint: How do I calculate the cart total?</strong></summary>

Loop through the cart array and add up the prices:

```js
let total = 0;
for (let i = 0; i < cart.length; i++) {
  total = total + cart[i].price;
}
```

Use `.toFixed(2)` when displaying it so you don't get weird floating point numbers.

</details>

<details>
<summary><strong>Hint: How do I remove a specific item from an array?</strong></summary>

Find its index, then use `.splice()`:

```js
// Find the index of the item with the matching id
let indexToRemove = -1;
for (let i = 0; i < cart.length; i++) {
  if (cart[i].id === idToRemove) {
    indexToRemove = i;
    break;
  }
}

// Remove it if found
if (indexToRemove !== -1) {
  cart.splice(indexToRemove, 1);
}
```

</details>

<details>
<summary><strong>Hint: How do I update the cart display?</strong></summary>

Same pattern as `renderMenu()` — write a `renderCart()` function that clears the cart container and loops through the `cart` array to build HTML. Call `renderCart()` every time the cart changes (after add or remove).

</details>

<details>
<summary><strong>Hint: How do I make the active filter button look different?</strong></summary>

When a filter button is clicked:

1. Remove the "active" styling from all filter buttons
2. Add the "active" styling to the clicked button

You can swap Tailwind classes, for example removing `bg-gray-200` and adding `bg-indigo-500 text-white`.

</details>

---

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs) — search for any utility class
- [MDN — createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [MDN — addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [MDN — Array splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
# mtech_day8_project
