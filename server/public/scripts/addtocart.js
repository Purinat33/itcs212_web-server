const product = [
    {
        id: 0,
        image: 'image/Candy.jpg',
        title: 'Candy Crush Saga',
        price: 0.00,
        stock: 0
    },
    {
        id: 1,
        image: 'image/Ow2.webp',
        title: 'Overwatch 2',
        price: 0.00
    },
    {
        id: 2,
        image: 'image/Devil.jpg',
        title: 'The Devil in me',
        price: 1190.00
    },
    {
        id: 3,
        image: 'image/sim.png',
        title: 'The Sim 4',
        price: 0.00
    },
    {
        id: 4,
        image: 'image/cyber.webp',
        title: 'Cypherpunk 2077',
        price: 1799.00
    }
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>${price}.00THB</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = 0+".00" + "THB";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = total+".00" + "THB";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image} width="300" height=200>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>${price}.00THB</h2>`+
                "<img src='../img/trash.PNG' alt='DEL' width='50' height='50' onclick='delElement("+ (j++) +")'></div>"
                // +
                // "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    }

    
}
