// variables and constants
const cartContainer = document.querySelector('.cart-container');
const productList = document.querySelector('.product-list');
const cartList = document.querySelector('.cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

eventListeners();

// barcha voqea tinglovchilari
function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });
    // almashtirish tugmasi bosilganda navbat panelini o'zgartirish
    document.querySelector('.navbar-toggler').addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    });

    // korzinka konteynerini ko'rsatish/yashirish
    document.getElementById('cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    // savatchaga qo'shish
    productList.addEventListener('click', purchaseProduct);

    // savatdan o'chirish
    cartList.addEventListener('click', deleteProduct);
}

// savat ma'lumotlarini yangilash
function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

// mahsulot elementlari tarkibini JSON fayli shaklida yuklang
function loadJSON(){
    fetch('furniture.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += `
                <div class = "product-item">
                    <div class = "product-img">
                        <img src = "${product.imgSrc}" alt = "product image">
                        <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                        </button>
                    </div>

                    <div class = "product-content">
                        <h3 class = "product-name">${product.name}</h3>
                        <span class = "product-category">${product.category}</span>
                        <p class = "product-price">$${product.price}</p>
                    </div>
                </div>
            `;
        });
        productList.innerHTML = html;
    })
    .catch(error => {
        alert(`User live server or local server`);
    })
}


// mahsulot sotib olish
function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart-btn')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

// Korzinkaga qo'shish tugmasini bosgandan so'ng mahsulot haqida ma'lumot olish
function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// tanlangan mahsulotni korzinka ro'yxatiga qo'shish
function addToCartList(product){
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `;
    cartList.appendChild(cartItem);
}

// mahsulotni DB-ga saqlang
function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// DB-da mavjud bo'lsa, barcha mahsulotlar haqida ma'lumot olish
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // agar mahsulot haqida ma'lumot bo'lmasa, bo'sh massivni qaytaradi
}

function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));

    // calculate and update UI of cart info 
    updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removing dollar sign
        return acc += price;
    }, 0); // adding all the prices

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

// delete product from cart list and local storage
function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}


// change product

document.getElementById("ForMen").addEventListener("click", ShowMen);
document.getElementById("ForWomen").addEventListener("click", ShowWomen);
document.getElementById("ForKids").addEventListener("click", ShowKids);

function ShowMen() {
  document.querySelector("main").remove();
  document.querySelector(".container").append(document.createElement("main"));
  const men = document.querySelector("main");
  for (let i = 0; i < products.length; i++) {
    if (products[i].type == "Men") {
      const menproduct = document.createElement("div");

      menproduct.innerHTML =
        "<img src='image/" +
        products[i].image +
        "' ></br><h2>" +
        products[i].name +
        "</h2></br> <h4>$" +
        products[i].price +
        "</h4></br><button role='button' id='addToCart'>Add To Cart</button>";

      men.append(menproduct);
    }
  }
}

function ShowWomen() {
  document.querySelector("main").remove();
  document.querySelector(".container").append(document.createElement("main"));
  const women = document.querySelector("main");
  for (let i = 0; i < products.length; i++) {
    if (products[i].type == "Women") {
      const womenproduct = document.createElement("div");

      womenproduct.innerHTML =
        "<img src='image/" +
        products[i].image +
        "' ></br><h2>" +
        products[i].name +
        "</h2></br> <h4>$" +
        products[i].price +
        "</h4></br><button role='button' id='addToCart'>Add To Cart</button>";
      women.append(womenproduct);
    }
  }
}

function ShowKids() {
  document.querySelector("main").remove();
  document.querySelector(".container").append(document.createElement("main"));
  const kids = document.querySelector("main");
  for (let i = 0; i < products.length; i++) {
    if (products[i].type == "Kids") {
      const kidsproduct = document.createElement("div");

      kidsproduct.innerHTML =
        "<img src='image/" +
        products[i].image +
        "' ></br><h2>" +
        products[i].name +
        "</h2></br> <h4>$" +
        products[i].price +
        "</h4></br><button role='button' id='addToCart'>Add To Cart</button>";
      kids.append(kidsproduct);
    }
  }
}

ShowMen();