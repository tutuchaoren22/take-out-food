function bestCharge(selectedItems) {
    var shoppingList = getAllItems(selectedItems);
    var discount = hasDiscount(shoppingList);
    var summary = summaryAllItems(shoppingList, discount);
    var result = printAllItems(shoppingList, discount, summary);
    console.log(result);
}

function getAllItems(selectedItems) {
    var loadAllItems = require('./items');
    var loadPromotions = require('./promotions');
    console.log(loadAllItems());
    console.log(loadPromotions());


    return shoppingList;
}

function hasDiscount(shoppingList) {
    return discount;
}

function summaryAllItems(shoppingList, discount) {
    return summary;
}

function printAllItems(shoppingList, discount, summary) {
    return result;
}


let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
bestCharge(inputs);