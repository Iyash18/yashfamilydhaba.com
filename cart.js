let label = document.getElementById("label");
let shopingcart = document.getElementById("shoping-cart" );


let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartamount");
    cartIcon.innerHTML = basket.map((x) =>x.item) .reduce((x,y) => x + y , 0 );
    
};
   
calculation();


let generateCartItems = () => {
    if(basket.length !==0 ){
        return (shopingcart.innerHTML = basket
            .map((x) => {
            
             let { id, item } = x;
             let search = shopItemsData.find((y) => y.id === id) || []

            return`
            <div class="cart-item">  
            <img width="100" src=${search.img} alt="" />
             <div class="details"></div>

              <div class="total-price-x">
              <h4 class"title-price">
               <p> ${search.name}</p>
               <p class="cart-item-price">  ${search.price}</p>
              </h4>
                  
              
              <div class="buttons2">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity"> ${item}</div>
                 
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                <br>
                 <h3> ₹ ${item * search.price }</h3>
              </div>
            <i onclick="removeItem(${id})" class="bi bi-x-octagon"></i>
             
              
              </div>
            </div>
            
            `;
            
        })
        .join (""));
    }
    else{
        shopingcart.innerHTML = ``;
        label.innerHTML = `
        <h2 class="emptycart"> Cart Is Empty </h2>
        <a href="menu2.html">
        <button class="homebtn">Home  <i class="bi bi-house-door"></i>  </buttton>
        </a>
        
        
        `; 
         
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search=basket.find((x) => x.id === selectedItem.id);
    
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }  else {
        search.item += 1;
    }
    
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
 };
 let decrement = (id) => {
    let selectedItem = id;
    let search=basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;
    
    else if (search.item === 0) return;
     else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !==0 );
    generateCartItems();
    

    localStorage.setItem("data", JSON.stringify(basket));
};
 let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log (search.item);
    document.getElementById(id).innerHTML = search.item ;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((x) => x.id !==selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
   
    localStorage.setItem("data", JSON.stringify(basket)); paymentconfirm();
};

let ClearCart = () => {
     basket = [];
     generateCartItems();
     calculation();
     localStorage.setItem("data", JSON.stringify(basket));
};





let TotalAmount = () => {
    if (basket.length !==0) {
        let amount = basket.map((x) => {
            let { item,id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item  * search.price;
        }).reduce((x,y)=>x+y,0);
        //console.log(amount);
        label.innerHTML = `
        <h2> Total Amount : ₹ ${amount}</h2>
        <div class="done1">
        <a href="menu2.html">
        <button class="addmore">Add <i class="bi bi-plus"></i> </button>
        </a>
        <a href="#paymentconfirm">
        <button class="confirm"> Confirm <i class="bi bi-hand-thumbs-up"></i></button>
        </a>
        <button onclick="ClearCart()" class="removeall"> Clear Cart <i class="bi bi-x"></i></button>
        </div>
        `;
    } else return;
};
TotalAmount();