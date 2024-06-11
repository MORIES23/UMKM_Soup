let openShopping = document.querySelector('.navbar .shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// System Cart List Menu
openShopping.addEventListener('click', (e)=>{
    e.preventDefault();
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartQuantity = document.querySelector('.quantity');
    const listCart = document.querySelector('.listCart');
    const total = document.querySelector('.total');
    const closeShopping = document.querySelector('.closeShopping');
    const totalPrice = document.getElementById('totalPrice');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            const image = event.target.dataset.image;

            const existingItem = cart.find(item => item.id === id);
            if (!existingItem) {
                cart.push({ id, name, price, image, quantity: 1 });
            } else {
                existingItem.quantity += 1;
            }
            updateCart();
        });
    });

    closeShopping.addEventListener('click', () => {
        document.querySelector('.cart').style.display = 'none';
    });

    document.querySelector('.shopping').addEventListener('click', () => {
        document.querySelector('.cart').style.display = 'block';
    });

    const updateCart = () => {
        listCart.innerHTML = '';
        let cartTotal = 0;
        let count = 0;

        cart.forEach(item => {
            cartTotal += item.price * item.quantity;
            count += item.quantity;

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div><img src="${item.image}" alt="${item.name}"></div>
                <div>${item.name}</div>
                <div>Rp. ${(item.price * item.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            `;
            listCart.appendChild(listItem);
        });

        total.textContent = `Total: Rp. ${cartTotal.toLocaleString()}`;
        cartQuantity.textContent = count;
        totalPrice.textContent = `Total: Rp. ${cartTotal.toLocaleString()}`;
    };

    window.changeQuantity = (id, quantity) => {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (quantity === 0) {
                const index = cart.indexOf(item);
                cart.splice(index, 1);
            } else {
                item.quantity = quantity;
            }
            updateCart();
        }
    };

    // System Whatsapp
    const generateOrderList = () => {
        return cart.map((item, index) => `${index + 1}. ${item.name}: ${item.quantity}`).join('\n');
    };

    totalPrice.addEventListener('click', () => {
        const totalAmount = totalPrice.textContent.replace('Total: Rp. ', '').replace('.', '').replace(/\./g, '');
        const message = `Halo Hokkien Soup Ikan!\n\nSaya ingin memesan:\n${generateOrderList()}\n\nTotal harga: Rp. ${totalAmount}`;
        const whatsappLink = `https://wa.me/628126109300?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappLink;
    });
});

let listCarts = [];
function initApp(){
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}" alt="${value.name}"/>
            <div class="title">${value.name}</div>
            <div class="description">${value.description}</div>
            <div class="price">Rp. ${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
        `;
        document.querySelector('.list').appendChild(newDiv);
    });
}
initApp();
function addToCart(key){
    if(listCarts[key] == null){
        listCarts[key] = products[key];
        listCarts[key].quantity = 1;
    }
    reloadCart();
}
function reloadCart(){
    listCart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCarts.forEach((value, key) => {
        if(value != null){
            let itemTotalPrice = value.price * value.quantity;
            totalPrice += itemTotalPrice;
            count += value.quantity;

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="${value.image}"/></div>
            <div>${value.name}</div>
            <div>Rp. ${itemTotalPrice.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listCart.appendChild(newDiv);
        }
    });
    total.innerText = `Rp. ${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCarts[key];   
    }else{
        listCarts[key].quantity = quantity;
    }
    reloadCart();
}