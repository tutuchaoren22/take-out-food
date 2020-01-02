function bestCharge(selectedItems) {
    var shoppingList = getAllItems(selectedItems);
    console.log(shoppingList);

    var discount = hasDiscount(shoppingList);
    console.log(discount);

    // var summary = summaryAllItems(shoppingList, discount);
    // var result = printAllItems(shoppingList, discount, summary);
    // console.log(result);
}

function getAllItems(selectedItems) {
    const loadAllItems = require('./items');
    const allItems = loadAllItems();
    const [selectedItemsID, selectedItemsCount] = getItemsIdAndCount(selectedItems);
    const shoppingList = selectedItemsID.map(
        (selectedItem, index) => {
            const findItem = allItems.find(item => item.id === selectedItem);
            findItem.count = selectedItemsCount[index];
            findItem.subTotal = findItem.price * findItem.count;
            return findItem;
        })
    return shoppingList;
}


function getItemsIdAndCount(selectedItems) {
    const selectedItemsID = selectedItems.map(item => item.split(' x ')[0]);
    const selectedItemsCount = selectedItems.map(item => item.split(' x ')[1]);
    return [selectedItemsID, selectedItemsCount];
}

function hasDiscount(shoppingList) {
    let hasDiscountType, totalPrice;
    let [hasDiscountTypeOne, totalPriceTypeOne] = hasDiscountTypeOne(shoppingList);
    let [hasDiscountTypeTwo, totalPriceTypeTwo] = hasDiscountTypeTwo(shoppingList);
    if () {

    }
    return [hasDiscountType, totalPrice];
}

function getTotalPrice(shoppingList) {
    let totalPrice = shoppingList.reduce(
        (prev, cur) => {
            return prev + cur.subTotal;
        }, 0);
    return totalPrice;
}

function hasDiscountTypeOne(shoppingList) {
    let totalPrice = getTotalPrice(shoppingList);
    let hasDiscount = false;
    if (totalPrice >= 30) {
        hasDiscount = true;
        totalPrice = totalPrice - 6;
    }
    return [hasDiscount, totalPrice];
}

function hasDiscountTypeTwo(shoppingList) {
    const loadPromotions = require('./promotions');
    const discountItems = loadPromotions()[1].items;
    let hasDiscount = false;
    shoppingList.forEach(item => {
        if (discountItems.indexOf(item.id) !== -1) {
            item.subTotal *= 0.5;
            hasDiscount = true;
        }
    });
    let totalPrice = getTotalPrice(shoppingList);
    return [hasDiscount, totalPrice];
}

function summaryAllItems(shoppingList, discount) {
    return summary;
}

function printAllItems(shoppingList, discount, summary) {
    return result;
}


let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
var shoppingList = getAllItems(inputs);
console.log(shoppingList);
hasDiscountTypeOne(shoppingList)
hasDiscountTypeTwo(shoppingList)

// bestCharge(inputs);