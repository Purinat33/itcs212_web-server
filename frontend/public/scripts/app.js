//This is for search functionality

//Change active btn class
//https://www.w3schools.com/howto/howto_js_active_element.asp

// Get the container element
var btnContainer = document.getElementById("filter");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    if(this.className.includes("active")){
        clearForm();
    }
  });
}

//If clicking on the already active then do nothing

let genre;
let creator;
let nname = true; //Default 

function searchBy(a){
    if(a.toUpperCase() == 'GENRE'){
        nname = false;
        genre = true;
        creator = false;
        console.log(
            `nname = ${nname}\tgenre = ${genre}\tcreator = ${creator}`
        );
    }
    else if(a.toUpperCase() == 'CREATOR'){
        creator = true;
        nname = false;
        genre = false;
        
        console.log(
            `nname = ${nname}\tgenre = ${genre}\tpprice = ${creator}`
        );
    }
    else{
        nname = true;
        creator = false;
        genre = false;

        console.log(
            `nname = ${nname}\tgenre = ${genre}\tpprice = ${creator}`
        );
    }
}


// var btnContainer = document.getElementById("filter");
// var btns = btnContainer.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }

//h2 = name
//h3 = genre
//h4 = price

//https://www.youtube.com/watch?v=ZFUOC-y4i0s&list=FLi_YRuAJvtFdkWBx2x5XBDg&index=1
// This function is named `search`
const search = () => {
    // Get the value of the search input field and convert it to uppercase
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    
    // Get the list of products and their details by their ids
    const storeitems = document.getElementById("product-list");
    
    // Get all the products in the list
    const product = document.querySelectorAll(".product"); 
    
    // Get all the product names
    const pname = storeitems.getElementsByTagName("h2");
    
    // Get all the product genres
    const pgenre = storeitems.getElementsByTagName('h3');
    
    // Get all the product creators
    const pcreator = storeitems.getElementsByTagName('h4');

    // Check if pname is true, and loop through all the products' names
    if (nname) {
        for (var i = 0; i < pname.length; i++) {
            // Get the product name from the list of products
            let match = product[i].getElementsByClassName('p-name')[0];
            
            // If a matching product name is found, show the product, otherwise hide it
            if (match) {
                let textValue =  match.textContent || match.innerHTML;
                if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                    product[i].style.display = "";
                } else {
                    product[i].style.display = "none";
                }
            }
        }
    } 
    // Check if pgenre is true, and loop through all the products' genres
    else if (genre) {
        for (var i = 0; i < pgenre.length; i++) {
            // Get the product genre from the list of products
            let match = product[i].getElementsByClassName('p-genre')[0];
            
            // If a matching product genre is found, show the product, otherwise hide it
            if (match) {
                let textValue =  match.textContent || match.innerHTML;
                if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                    product[i].style.display = "";
                } else {
                    product[i].style.display = "none";
                }
            }
        }
    } 
    // Check if pcreator is true, and loop through all the products' creators
    else if (pcreator) {
        for (var i = 0; i < pcreator.length; i++) {
            // Get the product creator from the list of products
            let match = product[i].getElementsByClassName('p-price')[0];
            
            // If a matching product creator is found, show the product, otherwise hide it
            if (match) {
                let textValue =  match.textContent || match.innerHTML;
                if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                    product[i].style.display = "";
                } else {
                    product[i].style.display = "none";
                }
            }
        }
    }
}

function clearForm(){
    document.getElementById("myForm").reset(); //Reset the form with id "myForm"
    // const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list"); //Get the element with id "product-list" and assign it to the variable "storeitems"
    const product = document.querySelectorAll(".product"); //Select all elements with class "product" and assign them to the variable "product"
    const pname = storeitems.getElementsByTagName("h2"); //Get all elements with tag "h2" that are descendants of "storeitems" and assign them to the variable "pname"
    for(var i = 0; i < pname.length; i++){ //Loop through all elements in "pname"
        product[i].style.display = ""; //Set the display style of the element at index "i" in "product" to an empty string, which will cause it to be displayed
    }
}