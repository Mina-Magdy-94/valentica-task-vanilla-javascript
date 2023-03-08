export let store = {   
    cartList: []
}

export function updateCartList(newCartList) {
    store["cartList"] = newCartList;
}

export function getCartList() {
    return store["cartList"];
}
