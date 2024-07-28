function showAddingOptionTemplate(food, i, j) {
    return /*html*/`
        <div class="foodOptionPopUp" id="foodOptionPopUp${i}${j}">
                <h3 class="fontweight">Extra ${food['Choices'][j]} (+${food['ChoicePrice'][j]} €)</h3>
                <div class="checkbox-wrapper-31"><input onclick="checkToppings(${i},${j})" id="checkbox${i}${j}" type="checkbox" />
                    <svg viewBox="0 0 35.6 35.6"><circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                    <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle><polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87">
                    </polyline></svg>
                </div>
        </div>
    `;
}

function displayChosenToppings(food) {
    if (food.SelectedToppings && food.SelectedToppings.length > 0) {
        return 'With ' + food.SelectedToppings.join(', ');
    }
    return '';
}

function renderShoppingCartTemplate(food, i) {
    return /*html*/`
        <div class="shoppingCartOrder" id="order${i}">
            <p style="margin: 12px 0 0 0; font-size: 18px;"><b>${food['OrderAmount']}x</b> ${food['Food']} (${(food['Price'] + food['ToppingPrice']).toFixed(2)} €)</p>
            <p>${displayChosenToppings(food)} </p>
            <div class="orderAmount">
                <img onclick="increaseAmountInShoppingCart(${i})" id="addFoodNr${i}" class="addIconShoppingCart" src="./img/addIcon2.jpg" alt="">
                <img onclick="decreaseAmountInShoppingCart(${i})" id="addFoodNr${i}" class="minusIconShoppingCart" src="./img/minusIcon2.jpg" alt="">
            </div>
        </div>
    `;
}

function renderTemplate(food, i) {
    return /*html*/`
        <div class="foodOption" onclick="showElement('showAddingOptions','d-none'); showAddingOptions(${i})">
            <div class="foodOptionText" id="foodText${i}">
                <h3>${food['Food']} (${food['Price']} €)</h3>
                <span>${food['Description']}</span>
            </div>
            <img class="burgerImg" src="${food['Picture']}" alt="">
            <img id="addFoodNr${i}" class="addIcon" src="./img/addIcon.jpg" alt="">
        </div>
    `;
}

function showAddingOptionTemplate2(i) {
    return /*html*/`
        <div onclick="checkDoubleEntries(${i})" class="sumContainer" id="sum">
            → <input id="subtotal" type="number" value="${foods[i]['OriginalPrice'].toFixed(2)}" readonly> €   
        </div>
    `;
}

function renderTOtalShoppingCartMoneyTemplate() {
    return /*HTML*/`
        <div class="totalAmount">
            <div class="flex2">
                <p>Subtotal: ${(shoppingCartTotalSum).toFixed(2)} €</p>
                <p>Order Fees: ${orderFees} €</p>
            </div>
            <div class="">
                <p style="font-size: 22px"><b>Total: ${(shoppingCartTotalSum + orderFees).toFixed(2)} €</b></p>
                <button>Continue to payment</button>
            </div>
        </div>
    `;
}
