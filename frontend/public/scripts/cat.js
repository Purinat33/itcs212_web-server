document.getElementById('next').onclick = function(){ // Attaching a click event listener on an HTML element with the ID 'next' and defining an anonymous function as a callback when the event is triggered
    const widthItem = document.querySelector('.item').offsetWidth; // Defining a constant variable 'widthItem' that retrieves the width of an HTML element with a class of 'item'
    document.getElementById('formList').scrollLeft += widthItem; // Accessing an HTML element with the ID 'formList' and incrementing its horizontal scroll position by the value of 'widthItem'
}
document.getElementById('prev').onclick = function(){ // Attaching a click event listener on an HTML element with the ID 'prev' and defining an anonymous function as a callback when the event is triggered
    const widthItem = document.querySelector('.item').offsetWidth; // Defining a constant variable 'widthItem' that retrieves the width of an HTML element with a class of 'item'
    document.getElementById('formList').scrollLeft -= widthItem; // Accessing an HTML element with the ID 'formList' and decrementing its horizontal scroll position by the value of 'widthItem'
}