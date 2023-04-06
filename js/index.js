const containerProducts = document.getElementById('products');
const cartContent = document.querySelector('#cart');
const cartWindow = document.querySelector('#cartcard-container');
const btnMenu = document.querySelector('#menu').querySelector(".fa-solid");
const headerItems = document.querySelector(".header-list");

const containerCart = document.getElementById('cart-window');
const totalPriceSpan = document.querySelector('.total-priceSpan');
const clearCartBtn = document.querySelector('.cart-btn');
const cartWindowContent = cartWindow.querySelector('.cart-window-content');

const header = document.querySelector('#header');
const headerClasslist = header.classList;

let totalPrice = 0;
let cartProducts = [];

if(localStorage.localCart) {
    cartProducts = JSON.parse(localStorage.localCart);
}

getItems().then(items => {
    printProducts(items);
});

async function getItems() {
    const response = await fetch('./js/json/items.json');
    const items = await response.json();
    return items.items;
}

function formatPrice(item){
    return item.toLocaleString("pt-BR",{
        style: 'currency',
        currency:'BRL'
    });
}

function atualizarCart() {
    containerCart.innerHTML = "";
    totalPrice = 0;
    totalPriceSpan.textContent = formatPrice(0);
    cartProducts.forEach((cartItem)=> {
        printCartProducts(cartItem);
        totalPriceSpan.textContent = formatPrice((totalPrice += cartItem.price*cartItem.quantidade));
        localStorage.setItem("localCart", JSON.stringify(cartProducts));
    });
};

function clearCart() {
    localStorage.clear();
    cartProducts.forEach((cartItem) => cartItem.quantidade = 0);
    cartProducts = [];
    atualizarCart();
}

function printProducts(items) {
    atualizarCart();
    items.forEach((item) => {
        const container = document.createElement('div');
        const productImage = document.createElement('img');
        const productPrice = document.createElement('span');
        const productName = document.createElement('h2');
        const productAddCartBtn = document.createElement('a');
        const productCartIcon = document.createElement('i');

        productImage.setAttribute('src', item.img);
        productImage.setAttribute('loading', 'lazy');
        productAddCartBtn.setAttribute("id", "addCart");

        productAddCartBtn.textContent = "Adicionar ao carrinho";
        productPrice.textContent = formatPrice(item.price);
        productName.textContent = item.nome;

        container.classList.add("product-single");
        productCartIcon.classList.add("fa-solid", "fa-cart-plus");

        container.appendChild(productImage);
        container.appendChild(productPrice);
        container.appendChild(productName);
        productAddCartBtn.insertBefore(productCartIcon, productAddCartBtn.firstChild);
        container.appendChild(productAddCartBtn);
        
        containerProducts.appendChild(container);

        productAddCartBtn.addEventListener('click', () => {
            item.quantidade++;
            const index = cartProducts.findIndex((element) => element.id === item.id);
            if(index === -1) {
                cartProducts.push(item);
            };
            atualizarCart();
        });
    });
}
function printCartProducts(item) {
    const cartItemContainer = document.createElement('div');
    const itemNameContainer = document.createElement('div');
    const itemCartImage = document.createElement('img');
    const itemCartName = document.createElement('p');
    const itemDataContainer = document.createElement('div');
    const itemCartQuant = document.createElement('p');
    const itemCartQuantSpan = document.createElement('span');
    const itemCartPrice = document.createElement('span');

    cartItemContainer.classList.add('cartItem');
    itemNameContainer.classList.add('item-name');
    itemCartImage.classList.add('cartItem-img');
    itemDataContainer.classList.add('item-data');
    itemCartQuantSpan.classList.add('quantidade-span');

    itemCartImage.setAttribute('src', item.img)
    itemCartName.textContent = item.nome;
    itemCartQuant.textContent = "Quantidade: ";
    itemCartQuantSpan.textContent = item.quantidade;
    itemCartPrice.textContent = formatPrice(item.price);

    cartItemContainer.appendChild(itemNameContainer);
    itemNameContainer.appendChild(itemCartImage);
    itemNameContainer.appendChild(itemCartName);
    cartItemContainer.appendChild(itemDataContainer);
    itemCartQuant.appendChild(itemCartQuantSpan);
    itemDataContainer.appendChild(itemCartQuant);
    itemDataContainer.appendChild(itemCartPrice);

    containerCart.appendChild(cartItemContainer);
}

clearCartBtn.addEventListener('click', clearCart);

cartContent.addEventListener('click', function(){
    cartWindowContent.classList.toggle('hide');
    cartContent.classList.toggle('cartopen');
});
cartWindow.addEventListener('mouseleave', function(){
    cartWindowContent.classList.add('hide');
    cartContent.classList.remove('cartopen')
});
window.addEventListener('scroll', () => {
    if (window.scrollY >= 300) {
        if (!headerClasslist.contains('header-hide')){
            headerClasslist.add('header-hide');
            listSearch.classList.add('hide');
            headerItems.classList.remove('show');
        }
    } else {
        if (headerClasslist.contains('header-hide')) {
            headerClasslist.remove('header-hide');
        }
    }
});

//mobile
btnMenu.addEventListener('click',() => {
    headerItems.classList.toggle('show');
    console.log(headerItems);
});
btnMenu.addEventListener('mouseout',() => {
    headerItems.classList.remove('show');
});

//theme

const colors = {
    green01: getComputedStyle(document.documentElement).getPropertyValue('--clr-green-01'),
    green02: getComputedStyle(document.documentElement).getPropertyValue('--clr-green-02'),
    green03: getComputedStyle(document.documentElement).getPropertyValue('--clr-green-03'),
};

const addProperties = [
    { name: "--clr-white02", value: "black" },
    { name: "--clr-white01", value: "#151515" },
    { name: "--clr-white01b", value: "#303030" },
    { name: "--clr-black", value: "white" },
    { name: "--clr-green01", value: "#192323" },
    { name: "--clr-green02", value: "#91adad" },
    { name: "--clr-greenbg", value: "#2c4243" },
    { name: "--clr-green03", value: "#497174" },
    { name: "--clr-orange02", value: "#ff3e0b" },
    { name: "--clr-orange03", value: "#fff" },
];

const removeProperties = [
    "--clr-white01",
    "--clr-white01b",
    "--clr-white02",
    "--clr-black",
    "--clr-green01",
    "--clr-green02",
    "--clr-green03",
    "--clr-greenbg",
    "--clr-orange02",
    "--clr-orange03",
];


const themebtn = document.querySelector('#themebtn');
const dark = document.querySelector('#darkTheme');
const ligth = document.querySelector('#ligthTheme');

themebtn.addEventListener('click', () => {
    changeTheme()
});

function changeTheme() {
    dark.classList.toggle('hide');
    ligth.classList.toggle('hide');
    if(dark.classList.contains('hide')) {
        addProperties.forEach((property) => {
            document.body.style.setProperty(property.name, property.value);
        });
        return;
    }    
    removeProperties.forEach((propertyName) => {
        document.body.style.removeProperty(propertyName);
    });
};