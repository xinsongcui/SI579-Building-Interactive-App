const wordInput = document.querySelector('#problem-5 #rhyme-with-input');
const showRhymesButton = document.querySelector('#problem-5 #show-rhymes-button');
const clearButton = document.querySelector('#problem-5 #clear-rhymes-button');
const rhymesOutput = document.querySelector('#problem-5 #rhymes');

function getRhymes(rel_rhy, callback) {
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

// Write your code here
showRhymesButton.addEventListener("click", ()=>{
    rhymesOutput.innerHTML = "";
    getRhymes(wordInput.value, (words)=>{
        if(words.length === 0){
            rhymesOutput.textContent = "No Rhymes";
        }
        for(const index in words){  
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent =  words[index]["word"];
            rhymesOutput.appendChild(li);
        }
        
    });
});

clearButton.addEventListener("click", ()=>{
    rhymesOutput.innerHTML = "";
    wordInput.value = "";
});
