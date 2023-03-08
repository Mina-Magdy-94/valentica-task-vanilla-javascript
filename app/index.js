import { fetchProducts } from '/util/fetch_util.js';
import { updateCartList, getCartList } from '/app/store.js';
import { addToCart, removeFromCart, isProductInCart } from '/app/cart.js';

let hamburgerBtn = document.querySelector('.menu-bar')
let navbar = document.querySelector('.navbar')
let listOfNavbar = navbar.firstElementChild
let mainSection = document.querySelector('section')
let sectionContainer = document.querySelector('section .container')
let cart = document.getElementsByClassName('cart')[0]
let cartProducts = document.querySelector('.cart-products')
let navbarListItem = cart.firstChild


function renderCartNumber(cartList) {
    navbarListItem.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> (${cartList.length})`
}

function choosingCartColor() {
    cart.style.backgroundColor = cartProducts.style.display === 'block' ? 'var(--btn-color)' : 'var(--secondary-color)'
}

//*******************Main Layout Events **************** */
mainSection.addEventListener('click', () => {
    cartProducts.style.display = 'none'
    choosingCartColor()
})

cart.addEventListener('click', (e) => {
    if (cartProducts.children.length > 0) {
        if (cartProducts.style.display === 'block') {
            cartProducts.style.display = 'none'
        } else {
            cartProducts.style.display = 'block'
        }
        choosingCartColor()
    }
})

hamburgerBtn.addEventListener('click', (e) => {
    navbar.firstElementChild.style.display = navbar.firstElementChild.style.display !== 'block' ? 'block' : 'none'
})

window.addEventListener('resize', (e) => {
    if (window.innerWidth > 991) {
        listOfNavbar.style.display = 'block'
    } else {
        listOfNavbar.style.display = 'none'
        if (listOfNavbar.style.display == 'none') {
            listOfNavbar.style.display == 'none'
        } else {
            listOfNavbar.style.display == 'block'
        }
    }
})
//*******************Main Layout Events **************** */



function reRenderCart() {
    cartProducts.innerHTML = '';
    getCartList().forEach((product) => {
        let listItem = document.createElement('li')
        listItem.setAttribute('id', product.product_name)
        let childDiv = document.createElement('div')
        childDiv.style.cssText = 'display:flex;flex-wrap:wrap;justify-content:space-between;align-items: center;padding-left:5px;padding-right:5px'
        listItem.appendChild(childDiv)

        //image
        let prodImg = document.createElement('div')
        prodImg.className = 'cart-product-img'
        prodImg.style.backgroundImage = `url(${product.product_image})`
        childDiv.appendChild(prodImg)

        //product name
        let productName = document.createElement('p')
        productName.textContent = `${product.product_name}`
        productName.className = 'cart-product-paragraph'
        childDiv.appendChild(productName)

        //remove button
        let removeBtn = document.createElement('div')
        removeBtn.className = 'cart-product-btn'
        removeBtn.textContent = '-'
        removeBtn.addEventListener('click', () => addOrRemoveFromCart(product))
        childDiv.appendChild(removeBtn)
        cartProducts.appendChild(listItem)
    });
    renderCartNumber(getCartList());
    cartProducts.style.display = 'none'
    choosingCartColor()
}

function reRenderProduct(product) {
    let productToRerender = document.getElementById(`card-${product.product_name}`)
    let addBtn = productToRerender.firstElementChild;
    let addedToCartParagrapgh = productToRerender.querySelector(':nth-child(3)').querySelector(':nth-child(3)').lastChild
    if (isProductInCart(getCartList(), product)) {
        addBtn.textContent = '-';
        addedToCartParagrapgh.textContent = 'Added';
    } else {
        addBtn.textContent = '+';
        addedToCartParagrapgh.textContent = 'Not Added';
    }
}

function reRenderCartAndProduct(product) {
    reRenderCart();
    reRenderProduct(product);
    reRenderModal(product)
}

function addOrRemoveFromCart(product) {
    let newCartList;
    if (isProductInCart(getCartList(), product)) {
        newCartList = removeFromCart(getCartList(), product);
    } else {
        newCartList = addToCart(getCartList(), product);
    }
    updateCartList(newCartList);
    reRenderCartAndProduct(product);
}

function viewModal(product) {
    if (isProductInCart(getCartList(), product)) {
        product.added_to_cart = true
    } else {
        product.added_to_cart = false
    }

    let createModalElement = (type, NameOfClass, parent, isAppend = true ,content) => {
        let x = document.createElement(type)
        if (NameOfClass) {
            x.className = NameOfClass
        }

        if(content){
            x.innerHTML=content
        }

        isAppend ? parent.appendChild(x) : parent.prepend(x)
        return x
    }

    let overlay = createModalElement('div', 'modal', document.body, false)
    overlay.addEventListener('click', (e) => e.target.remove())

    let content = createModalElement('div', 'modal-content', overlay)
    content.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    //Modal Top
    let top = createModalElement('div', 'modal-top', content)
    let modalTitle = createModalElement('p',null,top,true,'Product Quick View')

    let closeBtn = document.createElement('button')
    closeBtn.className = 'close'
    closeBtn.textContent = 'x'
    closeBtn.addEventListener('click', (e) => {
        overlay.remove()
    })
    top.appendChild(closeBtn)

    //Modal Center
    let center=createModalElement('div','modal-center',content)

    // Modal Product Image
    let imgContainer=createModalElement('div','modal-img-container',center)
    let prodImg=createModalElement('div','modal-prod-img',imgContainer)
    prodImg.style.backgroundImage=`url(${product.product_image})`

    // Modal Product Details
    let prodDetails=createModalElement('div','modal-prod-details',center)
    let productName=createModalElement('p',null,prodDetails,true,`<span>Product Name : </span>${product.product_name}`)
    let productPrice=createModalElement('p',null,prodDetails,true,`<span>Price : </span>${product.product_price}`)
    let productAvailability=createModalElement('p',null,prodDetails,true,`<span>Added To Cart : </span>${product.added_to_cart ? 'Added' : 'Not Added'}`)

    //Modal bottom
    let bottom=createModalElement('div','modal-bottom',content)
    let addToCartBtn=createModalElement('button','modal-cart-btn',bottom,true,product.added_to_cart ? 'Remove From Cart' : 'Add To Cart')
    addToCartBtn.addEventListener('click', () => addOrRemoveFromCart(product))
}

function reRenderModal(product) {
    let overlay = document.querySelector('.modal')
    if (overlay) {
        overlay.remove()
        viewModal(product)
    }
}

const productsToShow = fetchProducts();
renderProducts(productsToShow);

function renderProducts(productsToShow) {
    sectionContainer.innerHTML = '';
    productsToShow.forEach((prod) => {
        //creating card
        let card = document.createElement('div')
        card.setAttribute('id', `card-${prod.product_name}`)
        card.className = 'card'
        sectionContainer.appendChild(card)

        //creating Add to Cart button
        let addToCart = document.createElement('div')
        addToCart.className = 'add'
        addToCart.textContent = prod.added_to_cart ? '-' : '+'
        addToCart.addEventListener('click', (e) => addOrRemoveFromCart(prod))
        card.appendChild(addToCart)


        // creating card image
        let imgDiv = document.createElement('div')
        imgDiv.className = 'img-div'
        imgDiv.style.setProperty('background-image', `url(${prod.product_image})`)
        card.appendChild(imgDiv)

        //creating card content
        let contentDiv = document.createElement('div')
        contentDiv.className = 'content-div'
        card.appendChild(contentDiv)
        let heading = document.createElement('h3')
        heading.textContent = prod.product_name
        let paragraphOne = document.createElement('p')
        let priceSpan = document.createElement('span')
        priceSpan.textContent = 'Price : '
        paragraphOne.textContent = `${prod.product_price} EGP`
        paragraphOne.prepend(priceSpan)

        let paragraphTwo = document.createElement('p')
        let availableSpan = document.createElement('span')
        availableSpan.textContent = 'Added To Cart : '
        paragraphTwo.textContent = `${prod.added_to_cart ? 'added' : 'not added'}`
        paragraphTwo.prepend(availableSpan)


        contentDiv.appendChild(heading)
        contentDiv.appendChild(paragraphOne)
        contentDiv.appendChild(paragraphTwo)

        //creating card button
        let btnDiv = document.createElement('div')
        btnDiv.className = 'btn-div'
        card.appendChild(btnDiv)
        let quickViewBtn = document.createElement('button')
        quickViewBtn.textContent = 'Quick View'
        quickViewBtn.addEventListener('click', () => viewModal(prod))
        btnDiv.appendChild(quickViewBtn)
    })
}

reRenderCart(getCartList());
