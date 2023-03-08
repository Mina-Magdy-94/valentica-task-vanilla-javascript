
export function getProductsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(`products`))
}

export function storeProductFromLocalStorage(products) {
    localStorage.setItem("products",JSON.stringify(products));
}
