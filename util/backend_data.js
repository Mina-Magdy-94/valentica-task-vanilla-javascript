let products = [
    { product_name: 'product 1', product_price: '750', product_image: 'images/02.png', added_to_cart: false },
    { product_name: 'product 2', product_price: '1250', product_image: 'images/03.png', added_to_cart: false },
    { product_name: 'product 3', product_price: '550', product_image: 'images/06.png', added_to_cart: false },
    { product_name: 'product 4', product_price: '950', product_image: 'images/011.png', added_to_cart: false },
    { product_name: 'product 5', product_price: '880', product_image: 'images/012.png', added_to_cart: false },
    { product_name: 'product 6', product_price: '300', product_image: 'images/013.png', added_to_cart: false },
]

export function fetchProductsData() {
    return products;
}
