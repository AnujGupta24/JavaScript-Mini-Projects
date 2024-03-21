//now we gonna tranform the item id into objeccts using map function to show it on screen dynamically
const CONVINIENCE_FEE = 99;
let bagItemObjects;
onLoad();

function onLoad() {
    loadBagItemObjects();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary() {
    let BagSummaryElement = document.querySelector(".bag-summary");
    let totalItems = bagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    // togetthemrp
    bagItemObjects.forEach((bagItem) => {
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    });
    let finalPayment = totalMRP - totalDiscount + CONVINIENCE_FEE;

    BagSummaryElement.innerHTML = `
        <div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${totalItems} Items)</div>
            <div class="price-item">
                <span class="price-item-tag">Total MRP</span>
                <span class="price-item-value">Rs ${totalMRP}</span>
            </div>
        <div class="price-item">
            <span class="price-item-tag">Discount on MRP</span>
            <span
            class="price-item-value priceDetail-base-discount"
            >-${totalDiscount}</span
        >
        </div>
        <div class="price-item">
            <span class="price-item-tag">Convenience Fee</span>
            <span class="price-item-value">Rs 99</span>
            </div>
            <hr />
            <div class="price-footer">
            <span class="price-item-tag">Total Amount</span>
            <span class="price-item-value">${finalPayment}</span>
            </div>
        </div>
        <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
        </button>
`;
}

//map function convert array to array of different type

function loadBagItemObjects() {
    bagItemObjects = bagItems.map((itemId) => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }
        }
    });
}
// loadBagItemObjects();
function displayBagItems() {
    let containerElement = document.querySelector(".bag-items-container");
    let innerHTML = " ";
    bagItemObjects.forEach((bagItem) => {
        innerHTML += generateItemHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;
}

// removeFromBag not working
function removeFromBag(itemId) {
    bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    loadBagItemObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function generateItemHTML(item) {
    return `
<div class="bag-item-container">
    <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}" />
    </div>
    <div class="item-right-part">
        <div class="company">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
            <span class="current-price">${item.current_price}</span>
            <span class="original-price">${item.original_price}</span>
            <span class="discount-percentage"
                >(${item.discount_percentage}% OFF)
            </span
            >
        </div>
        <div class="return-period">
            <span class="return-period-days">${item.return_period} days</span>
            return available
        </div>
        <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days"
                >${item.delivery_date} Oct 2023</span
            >
        </div>
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${item.Id})">X</div>
</div>
`;
}
