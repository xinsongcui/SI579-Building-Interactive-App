/**
 * Returns a list of objects grouped by some property. For example:
 * groupBy([{name: 'Steve', team:'blue'}, {name: 'Jack', team: 'red'}, {name: 'Carol', team: 'blue'}], 'team')
 * 
 * returns:
 * { 'blue': [{name: 'Steve', team: 'blue'}, {name: 'Carol', team: 'blue'}],
 *    'red': [{name: 'Jack', team: 'red'}]
 * }
 * 
 * @param {any[]} objects: An array of objects
 * @param {string|Function} property: A property to group objects by
 * @returns  An object where the keys representing group names and the values are the items in objects that are in that group
 */
 function groupBy(objects, property) {
    // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
    // value for property (obj[property])
    if(typeof property !== 'function') {
        const propName = property;
        property = (obj) => obj[propName];
    }

    const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
    for(const object of objects) {
        const groupName = property(object);
        //Make sure that the group exists
        if(!groupedObjects.has(groupName)) {
            groupedObjects.set(groupName, []);
        }
        groupedObjects.get(groupName).push(object);
    }

    // Create an object with the results. Sort the keys so that they are in a sensible "order"
    const result = {};
    for(const key of Array.from(groupedObjects.keys()).sort()) {
        result[key] = groupedObjects.get(key);
    }
    return result;
}

const wordInput = document.querySelector('#word_input');
const showRhymesButton = document.querySelector('#show_rhymes');
const showSynonymsButton = document.querySelector('#show_synonyms');
const outputDescription = document.querySelector('#output_description');
const rhymesOutput = document.querySelector('#word_output');
const savedWords = document.querySelector('#saved_words');

let saved_words = new Set();

outputDescription.innerHTML = 'Words that rhyme with:'
savedWords.innerHTML = "(none)"
showRhymesButton.addEventListener("click", ()=>{
    getRhymes(wordInput.value, (words)=>{
        outputDescription.innerHTML = 'Words that rhyme with ' + wordInput.value + ':';
        rhymesOutput.textContent = "";
        if(words.length === 0){
            rhymesOutput.textContent = "No results";
        }
        
        let word_dic = groupBy(words, 'numSyllables');
        
        for(const syllable_index in word_dic){
            const h2 = document.createElement("h2");
            h2.classList.add("col");
            h2.textContent = syllable_index + ((syllable_index > 1) ? ' syllables:' : ' syllable:');
          
            rhymesOutput.appendChild(h2);
            const ul = document.createElement("ul");
            for (const word_index in word_dic[syllable_index]){
                const li = document.createElement("li");
                const save_button = document.createElement("button");
                save_button.innerHTML = "(save)";
                save_button.classList.add("btn");
                save_button.classList.add("btn-outline-success");
                save_button.addEventListener("click",()=>{
                    saved_words.add(word_dic[syllable_index][word_index]["word"]);
                    savedWords.textContent = Array.from(saved_words).join(', ');
                });
                li.textContent =  word_dic[syllable_index][word_index]["word"];
                li.appendChild(save_button);
                ul.appendChild(li);
            }
            rhymesOutput.appendChild(ul);
        }
        
    });
});

showSynonymsButton.addEventListener("click", ()=>{
    getSynonyms(wordInput.value, (words)=>{
        outputDescription.innerHTML = 'Words with a similar meaning to ' + wordInput.value + ':';
        rhymesOutput.textContent = "";
        if(words.length === 0){
            rhymesOutput.textContent = "No results";
        }
        const ul = document.createElement("ul");
        for(const index in words){
            const li = document.createElement("li");
            const save_button = document.createElement("button");
            save_button.innerHTML = "(save)";
            save_button.classList.add("btn");
            save_button.classList.add("btn-outline-success");
            save_button.addEventListener("click",()=>{
                saved_words.add(words[index]["word"]);
                savedWords.textContent = Array.from(saved_words).join(', ');
            });
            
            li.textContent =  words[index]["word"];
            li.appendChild(save_button);
            ul.appendChild(li);
        }
        rhymesOutput.appendChild(ul);
    });
});

function getRhymes(rel_rhy, callback) {
    outputDescription.innerHTML = '...loading';
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({rel_rhy})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}

function getSynonyms(ml, callback) {
    outputDescription.innerHTML = '...loading';
    fetch(`https://api.datamuse.com/words?${(new URLSearchParams({ml})).toString()}`)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        }, (err) => {
            console.error(err);
        });
}
