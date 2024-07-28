let foods = [
    {
        "Food": "Cheeseburger",
        "Description": "Juicy, perfectly seasoned beef patty topped with melted cheese, crisp lettuce, fresh tomato, and tangy pickles, all nestled in a soft, toasted bun.",
        "OriginalPrice": 5.99,
        "Price": 5.99,
        "Choices": [
            "tomatoes",
            "lettuce",
            "tangy pickles"
        ],
        "ChoicePrice": [
            0.99,
            0.89,
            0.67,
        ],
        "Picture": "./img/hamburger-7461299_640.webp",
        "OrderAmount": 1,
        "ToppingPrice": 0
    },
    {
        "Food": "Classic BLT",
        "Description": "Crispy bacon, fresh lettuce, and juicy tomatoes layered between toasted slices of bread, slathered with creamy mayo.",
        "OriginalPrice": 3.99,
        "Price": 3.99,
        "Choices": [
            "tomatoes",
            "lettuce",
            "bacon",
            "cheese",
            "mayo"
        ],
        "ChoicePrice": [
            0.99,
            0.89,
            0.97,
            1.19,
            0.87
        ],
        "Picture": "./img/classicBLT.avif",
        "OrderAmount": 1,
        "ToppingPrice": 0
    },
    {
        "Food": "Reuben Sandwich",
        "Description": "Slices of corned beef, Swiss cheese, sauerkraut, and russian dressing, all grilled together on bread.",
        "OriginalPrice": 4.99,
        "Price": 4.99,
        "Choices": [
            "swiss cheese",
            "sauerkraut",
            "russian dressing",
            "crispy bacon chips"
        ],
        "ChoicePrice": [
            0.99,
            0.89,
            0.67,
            1.19
        ],
        "Picture": "./img/reubenSandwich.jpg",
        "OrderAmount": 1,
        "ToppingPrice": 0
    },
    {
        "Food": "Monster Sub",
        "Description": "A culinary giant loaded with an array of delicious ingredients that make each bite an adventure.",
        "OriginalPrice": 7.99,
        "Price": 7.99,
        "Choices": [
            "Tomatoes",
            "Spinach",
            "Olives ",
            "Cucumbers",
            "Avocado",
            "Pepperoni",
            "Mozzarella cheese"
        ],
        "ChoicePrice": [
            0.96,
            0.89,
            0.99,
            0.94,
            0.97,
            0.95,
            1.12
        ],
        "Picture": "./img/monsterSub.webp",
        "OrderAmount": 1,
        "ToppingPrice": 0
    },
]

let foodsTemp = [];
let shoppingCart = [];
let shoppingCartTotalSum = 0;
let sum = 0;
let subtotal = [];
let orderFees = 1.49
let ToppingPrice = 0;

window.onscroll = function shoppingCartFixed() {
    let shoppingCartFixed = document.getElementById('shoppingCart');
    if (window.scrollY > 0) {
        shoppingCartFixed.style = 'top: 0';
    } else {
        shoppingCartFixed.style = 'top: 99px';
    }
}

function render() {
    let inputContent = document.getElementById('foodOptions');
    inputContent.innerHTML = '';
    for (let i = 0; i < foods.length; i++) {
        let food = foods[i];
        inputContent.innerHTML += renderTemplate(food, i);
    }
}

function showAddingOptions(i) {
    let inputContent = document.getElementById('ingredientsOptions');
    inputContent.innerHTML = /*html*/`
        <h2 class="foodOptionTitle">Choose your extra toppings</h2>
    `;
    let food = foods[i];
    for (let j = 0; j < foods[i]['Choices'].length; j++) {
        inputContent.innerHTML += showAddingOptionTemplate(food, i, j);
    }
    let inputContent2 = document.getElementById('totalSum');
    inputContent2.innerHTML = '';
    inputContent2.innerHTML += showAddingOptionTemplate2(i);
}

function renderShoppingCart() {
    let inputContent = document.getElementById('shoppingCart');
    inputContent.innerHTML = /*html*/`
        <h2 class="shoppingCartText">Shopping Cart</h2>
    `;
    for (let i = 0; i < shoppingCart.length; i++) {
        let food = shoppingCart[i];
        inputContent.innerHTML += renderShoppingCartTemplate(food, i);
    }
    hideElement('showAddingOptions', 'd-none');
    shoppingCartTotalAmount();
    renderTotalShoppingCartMoney();
    deleteSumCalcInShoppingCart();
}

function renderTotalShoppingCartMoney() {
    let inputContent = document.getElementById('shoppingCart');
    inputContent.innerHTML += renderTOtalShoppingCartMoneyTemplate();
}

function deleteSumCalcInShoppingCart() {
    let inputContent = document.getElementById('shoppingCart');
    if (shoppingCart.length == 0) {
        inputContent.innerHTML = /*html*/`
            <h2 class="shoppingCartText">Shopping Cart</h2>
            <p>Your shopping cart is empty.</p>
        `;
    }
}

function checkDoubleEntries(j) {
    let foodCopy = JSON.parse(JSON.stringify(foods[j])); // Deep copy of the food item
    foodCopy.SelectedToppings = foodCopy.SelectedToppings || []; // Ensure SelectedToppings is initialized
    foodCopy.SelectedToppings.sort();  // Sort the SelectedToppings array to ensure the order does not affect comparison
    let index = getMenuIndex(foodCopy);
    if (index == -1) {
        shoppingCart.push(foodCopy);
    } else {
        shoppingCart[index]['OrderAmount']++;
        shoppingCart[index]['Price'] += foodCopy['Price'] + foodCopy['ToppingPrice'];
    }
    foods[j].ToppingPrice = 0;  // Reset toppings and prices for the original food item
    foods[j].SelectedToppings = [];
    renderShoppingCart();
}

function getMenuIndex(x) {
    return shoppingCart.findIndex(item =>
        item.Food === x.Food &&
        JSON.stringify(item.SelectedToppings.sort()) === JSON.stringify(x.SelectedToppings.sort()) &&
        item.ToppingPrice === x.ToppingPrice
    );
}

function checkToppings(i, j) {
    let checkbox = document.getElementById(`checkbox${i}${j}`);
    if (checkbox.checked === true) {
        increaseExtraToppings(i, j);
    } else {
        decreaseExtraToppings(i, j);
    }
    updateCurrentPrice(i)
}

function increaseExtraToppings(i, j) {
    if (!foods[i].SelectedToppings) {
        foods[i].SelectedToppings = [];
    }
    foods[i]['ToppingPrice'] += foods[i]['ChoicePrice'][j];
    foods[i].SelectedToppings.push(foods[i]['Choices'][j]);
    updateCurrentPrice(i);
}

function updateCurrentPrice(index) {
    let priceInput = document.getElementById('subtotal');
    let currentPrice = foods[index].OriginalPrice + foods[index].ToppingPrice;
    priceInput.value = currentPrice.toFixed(2);
}

function decreaseExtraToppings(i, j) {
    if (!foods[i].SelectedToppings) {
        foods[i].SelectedToppings = [];
    }
    foods[i]['ToppingPrice'] -= foods[i]['ChoicePrice'][j];
    const index = foods[i].SelectedToppings.indexOf(foods[i]['Choices'][j]);
    if (index > -1) {
        foods[i].SelectedToppings.splice(index, 1);
    }
    updateCurrentPrice(i);
}

function increaseAmountInShoppingCart(i) {
    shoppingCart[i]['OrderAmount']++;
    shoppingCart[i]['Price'] += (shoppingCart[i]['OriginalPrice'] + shoppingCart[i]['ToppingPrice']);
    renderShoppingCart();
}

function decreaseAmountInShoppingCart(i) {
    if (shoppingCart[i]['OrderAmount'] == 1) {
        shoppingCart.splice(getMenuIndex(shoppingCart[i]), 1);
    } else {
        shoppingCart[i]['OrderAmount']--;
        shoppingCart[i]['Price'] -= (shoppingCart[i]['OriginalPrice'] + shoppingCart[i]['ToppingPrice']);
    }
    renderShoppingCart();
}


function shoppingCartTotalAmount() {
    shoppingCartTotalSum = 0;
    for (let i = 0; i < shoppingCart.length; i++) {
        let element = shoppingCart[i];
        shoppingCartTotalSum += element['Price'] + element['ToppingPrice'];
    }
}

function hideElement(id, x) {
    document.getElementById(id).classList.add(x);
    subtotal = [0];
}

function showElement(id, x) {
    document.getElementById(id).classList.remove(x);
}

function stopClose(event) {
    event.stopPropagation();
}