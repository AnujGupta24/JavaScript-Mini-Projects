// console.log("iam inside ,js");

const items = [
    {
        id: "001",
        image: "../images/1.jpg",
        company: "Carlton London",
        item_name: "Rhodium-Plated CZ Floral Studs",
        original_price: 1045,
        current_price: 606,
        discount_percentage: 42,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 4.5,
            count: 1400,
        },
    },
    {
        id: "002",
        image: "../images/2.jpg",
        company: "CUKOO",
        item_name: "Women Padded Halter Neck Swimming Dress",
        original_price: 2599,
        current_price: 1507,
        discount_percentage: 42,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 4.3,
            count: 24,
        },
    },
    {
        id: "003",
        image: "../images/3.jpg",
        company: "NUEVOSDAMAS",
        item_name: "Women Red & White Printed A-Line Knee-Length Skirts",
        original_price: 1599,
        current_price: 495,
        discount_percentage: 69,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 4.1,
            count: 249,
        },
    },
    {
        id: "004",
        image: "../images/4.jpg",
        company: "ADIDAS",
        item_name: "Indian Cricket ODI Jersey",
        original_price: 999,
        current_price: 999,
        discount_percentage: 0,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 5.0,
            count: 10,
        },
    },
    {
        id: "005",
        image: "../images/5.jpg",
        company: "Roadster",
        item_name: "Pure Cotton T-shirt",
        original_price: 1399,
        current_price: 489,
        discount_percentage: 65,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 4.2,
            count: 3500,
        },
    },
    {
        id: "006",
        image: "../images/6.jpg",
        company: "Nike",
        item_name: "Men ReactX Running Shoes",
        original_price: 14995,
        current_price: 14995,
        discount_percentage: 0,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 0.0,
            count: 0,
        },
    },
    {
        id: "007",
        image: "../images/7.jpg",
        company: "The Indian Garage Co",
        item_name: "Men Slim Fit Regular Shorts",
        original_price: 1599,
        current_price: 639,
        discount_percentage: 60,
        rating: {
            stars: 4.2,
            count: 388,
        },
    },
    {
        id: "008",
        image: "../images/8.jpg",
        company: "Nivea",
        item_name: "Men Fresh Deodrant 150ml",
        original_price: 285,
        current_price: 142,
        discount_percentage: 50,
        return_period: 14,
        delivery_date: "10 Oct 2023",
        rating: {
            stars: 4.2,
            count: 5200,
        },
    },
];
displayItemOnHomePage();
function displayItemOnHomePage() {
    let itemsContainerElement = document.querySelector(".items-container");
    // console.log(itemsContainerElement); to check the problem it was o/p null so we
    // used to chck if itemsContainerElement exists before proceeding to update its innerHTML
    // bag load karne ke lie*
    if (!itemsContainerElement) {
        return;
    }
    // above if {} used to fix the error
    /*  index.js:150 Uncaught TypeError: Cannot set properties of null (setting 'innerHTML')
at displayItemOnHomePage (index.js:150:37)
at index.js:123:1
*/
    let innerHtml = " ";

    items.forEach((item) => {
        innerHtml += `
    <div class="item-container">
    <img
        class="item-image"
        src="${item.image}"
        alt="item image"
    />
    <div class="rating"> ${item.rating.stars} ⭐ | ${item.rating.count}</div>
    <p class="company-name">${item.company}</p>
    <p class="item-name">${item.item_name}</p>
    <div class="price">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
    </div>
    <button class="btn-add-bag" onclick="addToBag(${item.id})">Add To Bag</button>
    </div>`;
    });
    itemsContainerElement.innerHTML = innerHtml;
}

let bagItems;
onLoad();

function onLoad() {
    let bagItemsStr = localStorage.getItem("bagItems");
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemOnHomePage();
    displayBagIcon();
}

function addToBag(itemId) {
    bagItems.push(itemId);
    localStorage.setItem("bagItems", JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon() {
    let bagItemCountElement = document.querySelector(".bag-item-count");
    if (bagItems.length > 0) {
        bagItemCountElement.style.visibility = "visible";
        bagItemCountElement.innerText = bagItems.length;
    } else {
        bagItemCountElement.style.visibility = "hidden";
    }
}
displayBagIcon();
