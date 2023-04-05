let items = [
    {
        id: 0,
        nome: 'Movel Confortavel',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=0',
        quantidade: 0,
        price: 12
    },
    {
        id: 1,
        nome: 'Provavelmente uma cadeira',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=1',
        quantidade: 0,
        price: 7
    },
    {
        id: 2,
        nome: 'Movel desconfortavel',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=2',
        quantidade: 0,
        price: 88
    },
    {
        id: 3,
        nome: 'Talvez um sofa',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=3',
        quantidade: 0,
        price: 89
    },
    {
        id: 4,
        nome: 'Assento conceitual',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=4',
        quantidade: 0,
        price: 24.5
    },
    {
        id: 5,
        nome: 'Chair',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=5',
        quantidade: 0,
        price: 69.69
    },
    {
        id: 6,
        nome: 'Definitivamente um Produto',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=6',
        quantidade: 0,
        price: 42
    },
    {
        id: 7,
        nome: 'Lorem ipsum',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=7',
        quantidade: 0,
        price: 2.25
    },
    {
        id: 8,
        nome: 'Coisa pra sentar',
        img: 'https://api.lorem.space/image/furniture?w=600&h=600&id=8',
        quantidade: 0,
        price: 18
    },
];

let cartItens = [];

const loadCart = () => {
    if(localStorage.localCart) {
        cartItens = JSON.parse(localStorage.getItem("localCart"));
    }
}
loadCart()

const cartContent = document.querySelector('#cart');
const cartWindow = document.querySelector('#cartcard-container');
const btnMenu = document.querySelector('#menu').querySelector(".fa-solid");
const headerItems = document.querySelector(".header-list");

fotmatPrice = (item) => {
    return item.toLocaleString("pt-BR",{
        style: 'currency',
        currency:'BRL'
    });
}

atualizarCart = () => {
    let totalPrice = 0;
    var containerCart = document.getElementById('cart-window');
    let totalPriceSpan = document.querySelector('.total-priceSpan');

    cartItens = items.filter((item) => {
        item.quantidade > 0 
    });
    containerCart.innerHTML = "";
    cartItens.map((item)=> {
        containerCart.innerHTML +=  `
        <div class="cartItem">
            <div class="item-name">
                <img src="`+item.img+`" class="cartItem-img"/>
                <p>`+item.nome+`</p> 
            </div>
            <div class="item-data">
                <p>quantidade: <span class=quantidade-span>`+item.quantidade+`</span></p>
                <span>`+fotmatPrice(item.price)+`</span>
            </div>
        </div>
        `;
        totalPriceSpan.innerHTML = `
        <span>`+fotmatPrice((totalPrice += item.price*item.quantidade))+`</span>
        `;
    });
    if(cartItens.length > 0){
        localStorage.setItem("localCart", JSON.stringify(cartItens));
    }
    console.log(cartItens)
};

limparCart = () => {
    localStorage.clear();
    items.forEach(e => {
        e.quantidade = 0;
    });
    totalPrice = 0;
    atualizarCart();
}

iniciarloja = () => {
    atualizarCart();
    var containerProducts = document.getElementById('products');
    items.map((item)=> {
        containerProducts.innerHTML +=  `
        <div class="product-single">
            <img src="`+'item.img'+`"/>
            <span>`+fotmatPrice(item.price)+`</span>
            <h2>`+item.nome+`</h2>
            <a keys="`+item.id+`" id="addCart">
                <i class="fa-solid fa-cart-plus"></i>
                Adicionar ao carrinho
            </a>
        </div>
        `;
    });
}

iniciarloja();


const links = document.querySelectorAll('#addCart'); // selecionar os links
const clearCartBtn = document.querySelector('.cart-btn');


for(i = 0; i < links.length; i++){ //adicionar os clinks nos links
    links[i].addEventListener('click', function(){
        let key = this.getAttribute('keys');
        items[key].quantidade++;
        atualizarCart();
        return false;
    });
};


clearCartBtn.addEventListener('click', function(){
    limparCart();
})
cartContent.addEventListener('mouseenter', function(){
    cartWindow.querySelector('.cart-window-content').classList.remove('hide');
    cartContent.classList.add('cartopen');
});
cartWindow.addEventListener('mouseleave', function(){
    cartWindow.querySelector('.cart-window-content').classList.add('hide');
    cartContent.classList.remove('cartopen')
});
btnMenu.addEventListener('click',() => {
    headerItems.classList.toggle('show');
    console.log(headerItems);
});
btnMenu.addEventListener('mouseout',() => {
    headerItems.classList.remove('show');
});

const  header = document.querySelector('#header');
const headerClasslist = header.classList;

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

//theme

const clrGreen01 = getComputedStyle(document.documentElement).getPropertyValue('--clr-green-01');
const clrGreen02 = getComputedStyle(document.documentElement).getPropertyValue('--clr-green-02');
const clrGreen03 = getComputedStyle(document.documentElement).getPropertyValue('--clr-green-03');

const themebtn = document.querySelector('#themebtn');
const dark = document.querySelector('#darkTheme');
const ligth = document.querySelector('#ligthTheme');
let currentTheme = "ligth";

themebtn.addEventListener('click', () => {
    dark.classList.toggle('hide');
    document.body.style.setProperty('--clr-white02', 'black');
    document.body.style.setProperty('--clr-white01', '#151515');
    document.body.style.setProperty('--clr-white01b', '#303030');
    document.body.style.setProperty('--clr-black', 'white');
    document.body.style.setProperty('--clr-green01', '#192323');
    document.body.style.setProperty('--clr-green02', '#91adad');
    document.body.style.setProperty('--clr-greenbg', '#2c4243');
    document.body.style.setProperty('--clr-green03', '#497174');
    document.body.style.setProperty('--clr-orange02', '#ff3e0b');
    document.body.style.setProperty('--clr-orange03', '#fff');
    if (!dark.classList.contains('hide')){
        document.body.style.removeProperty('--clr-white01');
        document.body.style.removeProperty('--clr-white01b');
        document.body.style.removeProperty('--clr-white02');
        document.body.style.removeProperty('--clr-black');
        document.body.style.removeProperty('--clr-green01');
        document.body.style.removeProperty('--clr-green02');
        document.body.style.removeProperty('--clr-green03');
        document.body.style.removeProperty('--clr-greenbg');
        document.body.style.removeProperty('--clr-orange02');
        document.body.style.removeProperty('--clr-orange03');
    }
    ligth.classList.toggle('hide');
});

//seacrh

t = "";
const listSearch = document.querySelector('#listSearch');
let listSearchItems = items.map((item) => item.nome );
const searchtxt = document.querySelector('#searchtxt');
const seacrhClearbtn = document.querySelector('.clearbtn');

seacrhClearbtn.onclick = function() {
    searchtxt.value = "";
    seacrhClearbtn.style.opacity = '0';
};

for (i in listSearchItems) {
    t += `<li class="SearchItem">`+listSearchItems[i]+`</li>`;
    listSearchItems[i] = listSearchItems[i].toLowerCase();
}
listSearch.innerHTML += t;

searchtxt.addEventListener('keyup',function(e){
    t = this.value;
    regSearch = new RegExp(t,"g");
    for(i in listSearchItems) {
        if (listSearchItems[i].match(regSearch)) {
            listSearch.children[i].removeAttribute("style");
        } else {
            listSearch.children[i].style.display = "none";
        }
    }

    if(t == "") {
        listSearch.classList.add('hide')
        seacrhClearbtn.style.opacity = '0';
    } else {
        listSearch.classList.remove('hide');
        seacrhClearbtn.style.opacity = '1';
    }
});
seacrhClearbtn.style.opacity = '0';
listSearch.classList.add('hide')