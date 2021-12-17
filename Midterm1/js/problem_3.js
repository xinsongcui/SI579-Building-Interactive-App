const clickCountButton = document.querySelector('#problem-3 #click-count');

// write your code here
let count = 0;
clickCountButton.addEventListener("click", ()=>{
    count++;
    clickCountButton.textContent = "You clicked the button " + count + " time" + addS(parseInt(count));
});