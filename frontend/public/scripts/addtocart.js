// Define an array of objects named "product" which contains product details
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

// Create a new array "categories" which will contain unique values of "product" array using Set and spread operator
const categories = [...new Set(product.map((item)=>
    {return item}))]
// Declare and initialize variable i to 0
let i=0;

// Use innerHTML to display the content of the "categories" array in the HTML element with id "root"
document.getElementById('root').innerHTML = categories.map((item)=>
{
    // Extract the image, title, and price from each object in the "categories" array
    var {image, title, price} = item;
    // Return the HTML content to be displayed on the webpage for each category
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

// Declare an empty array "cart"
var cart =[];

// Declare a function named "addtocart" which takes an argument "a"
function addtocart(a){
    // Add the selected product to the "cart" array using spread operator
    cart.push({...categories[a]});
    // Call the "displaycart" function to update the cart
    displaycart();
}

// Declare a function named "delElement" which takes an argument "a"
function delElement(a){
    // Remove the selected element from the "cart" array using splice method
    cart.splice(a, 1);
    // Call the "displaycart" function to update the cart
    displaycart();
}

function displaycart(){ // Declare a function named displaycart
    let j = 0, total=0; // Declare two variables, j and total, and assign them to 0
    document.getElementById("count").innerHTML=cart.length; // Set the inner HTML of the element with ID "count" to the length of the cart array
    if(cart.length==0){ // If the length of the cart array is 0
        document.getElementById('cartItem').innerHTML = "Your cart is empty"; // Set the inner HTML of the element with ID "cartItem" to "Your cart is empty"
        document.getElementById("total").innerHTML = 0+".00" + "THB"; // Set the inner HTML of the element with ID "total" to "0.00 THB"
    }
    else{ // Otherwise
        document.getElementById("cartItem").innerHTML = cart.map((items)=> // Set the inner HTML of the element with ID "cartItem" to the result of mapping the cart array
        {
            var {image, title, price} = items; // Destructure the properties of each item in the cart array
            total=total+price; // Add the price of the current item to the total
            document.getElementById("total").innerHTML = total+".00" + "THB"; // Set the inner HTML of the element with ID "total" to the total plus "THB"
            return( // Return a string of HTML that will be used to display the current item in the cart
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
        }).join(''); // Join all the HTML strings returned by the map function into a single string
    } 
}

