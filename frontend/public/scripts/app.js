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
const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const product = document.querySelectorAll(".product"); 
    const pname = storeitems.getElementsByTagName("h2");
    const pgenre = storeitems.getElementsByTagName('h3');
    const pcreator = storeitems.getElementsByTagName('h4');

    if(nname){
        for(var i = 0 ; i < pname.length; i++){
            let match = product[i].getElementsByClassName('p-name')[0];
            
            if(match){
                let textValue =  match.textContent || match.innerHTML;
                if(textValue.toUpperCase().indexOf(searchbox) > -1){
                    product[i].style.display = "";
                }else{
                    product[i].style.display = "none";
                }
            }
        }
    }
    else if(genre){
        for(var i = 0 ; i < pgenre.length; i++){
            let match = product[i].getElementsByClassName('p-genre')[0];
            
            if(match){
                let textValue =  match.textContent || match.innerHTML;
                if(textValue.toUpperCase().indexOf(searchbox) > -1){
                    product[i].style.display = "";
                }else{
                    product[i].style.display = "none";
                }
            }
        }
    }
    else if(pcreator){
        for(var i = 0 ; i < pcreator.length; i++){
            let match = product[i].getElementsByClassName('p-price')[0];
            
            if(match){
                let textValue =  match.textContent || match.innerHTML;
                if(textValue.toUpperCase().indexOf(searchbox) > -1){
                    product[i].style.display = "";
                }else{
                    product[i].style.display = "none";
                }
            }
        }
    }
}

function clearForm(){
    document.getElementById("myForm").reset();
    // const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const product = document.querySelectorAll(".product"); 
    const pname = storeitems.getElementsByTagName("h2");
    for(var i = 0; i < pname.length; i++){
        product[i].style.display = "";
    }
}