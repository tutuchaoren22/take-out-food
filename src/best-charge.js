function bestCharge(selectedItems) {
    var shoppingList = getAllItems(selectedItems);
    var summary = hasDiscount(shoppingList);
    var result = printAllItems(shoppingList, summary);
    return result;
}

function getAllItems(selectedItems) {
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
    let summary = {};
    summary.hasDiscount = 0;
    let totalPrice = getTotalPrice(shoppingList);
    let [hasDiscountOne, totalPriceOne] = hasDiscountTypeOne(totalPrice);
    let [hasDiscountTwo, totalPriceTwo, discountedItems] = hasDiscountTypeTwo(shoppingList);
    if (hasDiscountOne === true) {
        if (hasDiscountTwo === true) {
            if (totalPriceOne <= totalPriceTwo) {
                summary.totalPrice = totalPriceOne;
                summary.hasDiscount = 1;
                summary.discountPrice = 6;
            } else {
                summary.totalPrice = totalPriceTwo;
                summary.hasDiscount = 2;
                summary.discountPrice = totalPrice - totalPriceTwo;
                summary.discountedItems = discountedItems;
            }

        } else {
            summary.hasDiscount = 1;
            summary.totalPrice = totalPriceOne;
            summary.discountPrice = 6;
        }
    } else {
        if (hasDiscountTwo === true) {
            summary.hasDiscount = 2;
            summary.totalPrice = totalPriceTwo;
            summary.discountPrice = totalPrice - totalPriceTwo;
            summary.discountedItems = discountedItems;
        } else {
            summary.totalPrice = totalPriceOne;
        }
    }
    return summary;
}

function getTotalPrice(shoppingList) {
    let totalPrice = shoppingList.reduce(
        (prev, cur) => {
            return prev + cur.subTotal;
        }, 0);
    return totalPrice;
}

function hasDiscountTypeOne(totalPrice) {
    let hasDiscount = false;
    if (totalPrice >= 30) {
        hasDiscount = true;
        totalPrice = totalPrice - 6;
    }
    return [hasDiscount, totalPrice];
}

function hasDiscountTypeTwo(shoppingList) {
    const discountItems = loadPromotions()[1].items;
    let hasDiscount = false;
    let discountedItems = [];
    let shoppingListDiscounted = JSON.parse(JSON.stringify(shoppingList));
    shoppingListDiscounted.forEach(item => {
        if (discountItems.indexOf(item.id) !== -1) {
            item.subTotal *= 0.5;
            hasDiscount = true;
            discountedItems.push(item.name);
        }
    });
    let totalPrice = getTotalPrice(shoppingListDiscounted);
    return [hasDiscount, totalPrice, discountedItems];
}

function printAllItems(shoppingList, summary) {
    let result = `============= 订餐明细 =============\n`;
    shoppingList.forEach(
        item => {
            return result += `${item.name} x ${item.count} = ${item.subTotal}元\n`

        }
    );
    result += `-----------------------------------\n`
    switch (summary.hasDiscount) {
        case 1:
            result += `使用优惠:\n满30减6元，省6元\n-----------------------------------\n`;
            break;
        case 2:
            result += `使用优惠:\n指定菜品半价(${summary.discountedItems.join('，')})，省${summary.discountPrice}元\n-----------------------------------\n`;
            break;
    }

    result += `总计：${summary.totalPrice}元\n===================================`;
    return result;
}

// let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
// bestCharge(inputs)