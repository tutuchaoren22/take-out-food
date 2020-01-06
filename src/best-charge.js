function bestCharge(selectedItems) {
    let shoppingList = getAllItems(selectedItems);
    let summary = hasDiscount(shoppingList);
    let result = printAllItems(shoppingList, summary);
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
    let totalPrice = getTotalPrice(shoppingList);
    summary.totalPrice = totalPrice;
    summary = hasDiscountTypeOne(totalPrice, summary);
    summary = hasDiscountTypeTwo(shoppingList, summary, totalPrice);
    return summary;
}

function getTotalPrice(shoppingList) {
    let totalPrice = shoppingList.reduce(
        (prev, cur) => {
            return prev + cur.subTotal;
        }, 0);
    return totalPrice;
}

function hasDiscountTypeOne(totalPrice, summary) {
    if (totalPrice >= 30) {
        discountTypeOneTodo(summary, totalPrice);
    }
    return summary;
}

function discountTypeOneTodo(summary, totalPrice) {
    summary.hasDiscounted = 1;
    summary.totalPrice = totalPrice - 6;
    summary.discountPrice = 6;
}

function hasDiscountTypeTwo(shoppingList, summary, totalPrice) {
    let [totalPriceDiscounted, discountedItems] = discountTypeTwoTotalPrice(shoppingList);
    if (summary.hasDiscounted) {
        if (totalPriceDiscounted < summary.totalPrice) {
            discountTypeTwoTodo(summary, totalPriceDiscounted, totalPrice, discountedItems);
        }
    } else {
        if (totalPriceDiscounted !== totalPrice) {
            discountTypeTwoTodo(summary, totalPriceDiscounted, totalPrice, discountedItems);
        }
    }
    return summary;
}

function discountTypeTwoTotalPrice(shoppingList) {
    const discountItems = loadPromotions()[1].items;
    let discountedItems = [];
    let shoppingListDiscounted = JSON.parse(JSON.stringify(shoppingList));
    shoppingListDiscounted.forEach(item => {
        if (discountItems.indexOf(item.id) !== -1) {
            item.subTotal *= 0.5;
            discountedItems.push(item.name);
        }
    });
    let totalPriceDiscounted = getTotalPrice(shoppingListDiscounted);
    return [totalPriceDiscounted, discountedItems];
}

function discountTypeTwoTodo(summary, totalPriceDiscounted, totalPrice, discountedItems) {
    summary.totalPrice = totalPriceDiscounted;
    summary.hasDiscounted = 2;
    summary.discountPrice = totalPrice - totalPriceDiscounted;
    summary.discountedItems = discountedItems;
}

function printAllItems(shoppingList, summary) {
    let result = `============= 订餐明细 =============\n`;
    shoppingList.forEach(
        item => {
            return result += `${item.name} x ${item.count} = ${item.subTotal}元\n`
        }
    );
    result += `-----------------------------------\n`;
    switch (summary.hasDiscounted) {
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