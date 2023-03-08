export function addToCart(cartList, productToAdd) {
    const foundProduct = cartList.find(p => p.product_name === productToAdd.product_name);
    if (!foundProduct) {
        return [...cartList, productToAdd];
    }
    return cartList;
}

export function removeFromCart(cartList, productToRemove) {
    return cartList.filter(p => p.product_name !== productToRemove.product_name);
}

export function isProductInCart(cartList, productToFind) {
    const foundProduct = cartList.find(p => p.product_name === productToFind.product_name);
    return foundProduct ? true : false;
}