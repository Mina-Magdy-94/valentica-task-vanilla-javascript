import {getProductsFromLocalStorage,storeProductFromLocalStorage} from './localstorage_util.js';
import {fetchProductsData} from './backend_data.js';

export function fetchProducts() {
    let productsFromLocalStorage = getProductsFromLocalStorage();
    if (productsFromLocalStorage) {
        return productsFromLocalStorage;
    }

    const products = fetchProductsData();
    storeProductFromLocalStorage(products);
    return products;
}
