// Defining constant variable 'imgs' and assigning all DOM elements with class 'img-select' to it
const imgs = document.querySelectorAll('.img-select a');

// Converting the 'NodeList' to an array using the spread operator and assigning it to variable 'imgBtns'
const imgBtns = [...imgs];

// Initializing a variable 'imgId' with a value of 1
let imgId = 1;

// Attaching a click event listener to each element in 'imgBtns' array
imgBtns.forEach((imgItem) => {
    // Callback function to execute when an element is clicked
    imgItem.addEventListener('click', (event) => {
        // Preventing default behavior of anchor tag
        event.preventDefault();
        // Assigning the value of 'data-id' attribute of clicked element to 'imgId' variable
        imgId = imgItem.dataset.id;
        // Calling the function 'slideImage'
        slideImage();
    });
});

// Function declaration to move to next slide
function plusSlides(imgItem){
    // Incrementing the value of 'imgId' variable by 1 and calling function 'showSlides'
    showSlides(imgId += 1);
}

// Function declaration to slide the image
function slideImage(){
    // Selecting the width of the first child element of '.img-showcase' element and assigning it to variable 'displayWidth'
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    // Translating the '.img-showcase' element horizontally with the help of 'transform' property and 'translateX' function
    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

// Attaching a resize event listener to window object to call 'slideImage' function whenever the window size is changed
window.addEventListener('resize', slideImage);
