let count = Number(localStorage.getItem('counter1'));
let exists = JSON.parse(localStorage.getItem('exists')) || [];
const buttons = document.querySelectorAll('.foodimg button');
const foodimg = document.querySelector('.foodimg');
const cartNav = document.querySelector('.nav');

let savedCart = JSON.parse(localStorage.getItem('cart')) || [];
savedCart.forEach(item => {
    addCartItem(item.img, item.title, item.price, item.qty, false);
});
updateCounter();


buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.foodimg');
        const h2 = card.querySelector('h2');
        const img = card.querySelector('img');
        const price = card.querySelector('.price');

        if (exists.includes(h2.textContent)) {
            alert('Item already in your cart!');
            return;
        }

        exists.push(h2.textContent);
        updateLocalStorage();

        const imgClone = img.cloneNode(true);
        imgClone.classList.add('cart-fly-img');
        imgClone.style.top = img.offsetTop + 'px';
        imgClone.style.left = img.offsetLeft + 'px';
        imgClone.style.width = '150px';
        imgClone.style.height = '150px';
        foodimg.appendChild(imgClone);

        const cart = document.querySelector('.card');
        requestAnimationFrame(() => {
            imgClone.style.top = cart.offsetTop + 'px';
            imgClone.style.left = cart.offsetLeft + 'px';
            imgClone.style.width = '50px';
            imgClone.style.height = '50px';
            imgClone.style.opacity = '0.2';
        });

        setTimeout(() => {
            count++;
            updateCounter();
            imgClone.remove();
        }, 700);

        addCartItem(img.src, h2.textContent, price.textContent, 1, true);
    });
});

function addCartItem(imgSrc, title, price, qty = 1, save = true) {
    const html = `
        <div class="yourcart" data-title="${title}">
            <img src="${imgSrc}" alt="">
            <div class="text">
                <h4>${title}</h4>
                <span class="prices">${price}</span>
            </div>
            <div>
                <button class="add">+</button>
                <span class="result">${qty}</span>
                <button class="remove">-</button>
            </div>
        </div>
    `;
    cartNav.innerHTML += html;
    if (save) {
        saveCart();
    }
    calculateTotal();
}

cartNav.addEventListener('click', function (e) {
    const cartItem = e.target.closest('.yourcart');
    if (!cartItem) return;

    const resultEl = cartItem.querySelector('.result');
    const priceEl = cartItem.querySelector('.prices');
    let qty = Number(resultEl.textContent);
    const basePrice = Number(priceEl.textContent.replace('$', '')) / qty;

    if (e.target.classList.contains('add')) {
        qty++;
        count++;
    } else if (e.target.classList.contains('remove')) {
        qty--;
        count--;
    }

    if (qty <= 0) {
        const title = cartItem.dataset.title;
        exists = exists.filter(item => item !== title);
        cartItem.remove();
    } else {
        resultEl.textContent = qty;
        priceEl.textContent = `$${(basePrice * qty).toFixed(2)}`;
    }

    updateCounter();
    updateLocalStorage();
    saveCart();
    calculateTotal();
});

function updateCounter() {
    document.querySelector('.counter').textContent = count;
    localStorage.setItem('counter1', count);
}

function saveCart() {
    const cartItems = [];
    document.querySelectorAll('.yourcart').forEach(item => {
        const title = item.querySelector('h4').textContent;
        const img = item.querySelector('img').src;
        const price = item.querySelector('.prices').textContent;
        const qty = Number(item.querySelector('.result').textContent);
        cartItems.push({ title, img, price, qty });
    });
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function updateLocalStorage() {
    localStorage.setItem('exists', JSON.stringify(exists));
}

function calculateTotal() {
    let total = 0;
    document.querySelectorAll('.yourcart .prices').forEach(priceEl => {
        total += Number(priceEl.textContent.replace('$', ''));
    });
    document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
}

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('nav').style.width = 0;
});

const cart = document.querySelector('.card');
cart.addEventListener('click', () => {
    document.querySelector('nav').style.width = '20%';
});



const swiper = new Swiper('.container1', {
    loop: true,
    spaceBetween: 40,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
});

// let count = 0;
// let exists = [];
// let exist = false;
// const buttons = document.querySelectorAll('.foodimg button');
// const foodimg = document.querySelector('.foodimg')
// buttons.forEach(button => {
//     button.addEventListener('click', (e) => {
//         e.preventDefault();
//         let html = '';
//         const card = button.closest('.foodimg');
//         const h2 = card.querySelector('.foodimg h2');
//         const img = card.querySelector('.foodimg img');
//         const price = card.querySelector('.price');
//         const imgClone = img.cloneNode(true);
//         const cart = document.querySelector('.card');
//         if (exists.includes(h2.textContent)) {
//             exist = true;
//             alert('Item already in your cart!');
//         }
//         else {
//             exists.push(h2.textContent);
//             exist = false;
//         }
//         if (exist === false) {
//             imgClone.classList.add('cart-fly-img');
//             imgClone.style.top = img.offsetTop + 'px';
//             imgClone.style.left = img.offsetLeft + 'px';
//             imgClone.style.width = '150px';
//             imgClone.style.height = '150px';
//             foodimg.appendChild(imgClone);
//             requestAnimationFrame(() => {
//                 imgClone.style.top = cart.offsetTop + 'px';
//                 imgClone.style.left = cart.offsetLeft + 'px';
//                 imgClone.style.width = '50px';
//                 imgClone.style.height = '50px';
//                 imgClone.style.opacity = '0.2';
//             });
//             setTimeout(() => {
//                 count++;
//                 document.querySelector('.counter').textContent = count;
//                 imgClone.remove();
//             }, 700);
//             html = `<div class="yourcart">
//                 <img src="${img.src}" alt="">
//                 <div class="text">
//                     <h4>${h2.textContent}</h4>
//                     <span class = "prices">${price.textContent}</span>
//                 </div>
//                 <div>
//                     <button class="add">+</button>
//                     <span class="result">1</span>
//                     <button class="remove">-</button>
//                 </div>
//             </div>`
//             document.querySelector('.nav').innerHTML += html;
//             calculateTotal();
//         }
//     });
// });

// const total = 0;
// document.querySelector('.nav').addEventListener('click', function (e) {
//     if (e.target.classList.contains('add')) {
//         const cartItem = e.target.closest('.yourcart');
//         const result = cartItem.querySelector('.result');
//         const prices = cartItem.querySelector('.prices');
//         const reelprice = Number(prices.textContent.split('$').join(''));
//         result.textContent = Number(result.textContent) + 1;
//         let pricees = reelprice + reelprice / (Number(result.textContent) - 1);
//         prices.innerHTML = `$${pricees.toFixed(2)}`;
//         count++;
//         document.querySelector('.counter').textContent = count;
//         calculateTotal();
//     }

//     if (e.target.classList.contains('remove')) {
//         const cartItem = e.target.closest('.yourcart');
//         const result = cartItem.querySelector('.result');
//         const prices = cartItem.querySelector('.prices');
//         const reelprice = Number(prices.textContent.split('$').join(''));
//         let qty = Number(result.textContent);
//         let pricees = reelprice - reelprice / qty;
//         prices.textContent = `$${pricees.toFixed(2)}`;
//         qty--;
//         count--;
//         document.querySelector('.counter').textContent = count;

//         if (qty <= 0) {
//             const title = cartItem.querySelector('h4').textContent;
//             exists = exists.filter(item => item !== title);
//             cartItem.remove();
//         } else {
//             result.textContent = qty;
//         }
//         calculateTotal();
//     }
// });



// const swiper = new Swiper('.container1', {
//     loop: true,
//     spaceBetween: 40,
//     autoplay: {
//         delay: 3000,
//         disableOnInteraction: false,
//         pauseOnMouseEnter: true,
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//         dynamicBullets: true,
//     },
// });

// function calculateTotal() {
//     let total = 0;
//     document.querySelectorAll('.yourcart .prices').forEach(priceEl => {
//         total += Number(priceEl.textContent.replace('$', ''));
//     });
//     document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
// }

// document.querySelector('.close').addEventListener('click', () => {
//     document.querySelector('nav').style.width = 0;
// });

// cart.addEventListener('click', () => {
//     document.querySelector('nav').style.width = '20%';
// });