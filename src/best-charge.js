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
            findItem.total = findItem.price * findItem.count;
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
    const loadPromotions = require('./promotions');
    const promotions = loadPromotions();

    const totalPrice =
        return discount;
}

function getTotalPrice

function summaryAllItems(shoppingList, discount) {
    return summary;
}

function printAllItems(shoppingList, discount, summary) {
    return result;
}


let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
// const [selectedItemsID, selectedItemsCount] = getItemsIdAndCount(inputs);
// console.log(selectedItemsID);
// console.log(selectedItemsCount);
bestCharge(inputs);