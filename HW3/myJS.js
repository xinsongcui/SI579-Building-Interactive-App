/*
* Excercise 1
*
*/
const color = document.getElementById("color-name").textContent;
document.getElementById("color-block").addEventListener("click", ()=>{
    changeColor();
})

/*
* Then write a function that changes the text and the color inside the div
*
*/

function changeColor(){
    //Write a condition determine what color it should be changed to
    if(document.getElementById("color-name").textContent == color){
        //change the background color using JS  
        document.getElementById("color-block").style.background = "#EEEEEE";
        //Change the text of the color using the span id color-name
        document.getElementById("color-name").textContent = "#EEEEEE";
    }
    else{
        //change the background color using JS
        document.getElementById("color-block").style.background = "#F08080";  
        //Change the text of the color using the span id color-name
        document.getElementById("color-name").textContent = "#F08080";

    }
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/
document.getElementById("convertbtn").addEventListener("click", ()=>{
    convertTemp();
})

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){
    //Calculate the temperature here
    const f_degree = document.getElementById("f-input").value;
    if(f_degree){
        const c_degree = (f_degree-32)*5/9;
        //Send the calculated temperature to HTML
        document.getElementById("c-output").textContent = c_degree;
    }
}


