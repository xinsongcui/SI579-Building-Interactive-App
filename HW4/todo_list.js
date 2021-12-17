function addTask(description, dueTime=false){
    const element = document.getElementById("task_list");
    const li = document.createElement("li");
    const text = document.createTextNode(description);

    const button = document.createElement("button");
    button.classList.add("btn", "btn-sm", "btn-outline-danger" ,"done");
    button.setAttribute("type", "button"); 
    const button_text = document.createTextNode("Done");
    button.append(button_text);
    button.addEventListener("click", ()=>{
        li.remove();
    });
    
    if (dueTime != false){
        const span = document.createElement("span");
        span.classList.add("due");
        const time = new Date(dueTime);
        const due_text = document.createTextNode("due " + time.toLocaleString());
        span.append(due_text);

        li.append(text);
        li.append(span);
        li.append(button);
    }
    else{
        li.append(text);
        li.append(button);
        
    }
    element.append(li);

}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

function addTaskFromButton(){
    const task_description = document.getElementById("task_description_input");
    const duedate = document.getElementById("duedate_input");
    const duetime = document.getElementById("duetime_input");
    addTask(task_description.value, dateAndTimeToTimestamp(duedate, duetime));
    task_description.value = "";
}

const addTaskButton = document.getElementById("add_task");
addTaskButton.addEventListener("click", addTaskFromButton);

document.getElementById("task_description_input").addEventListener('keydown', function(event) {
    if (event.code === "Enter") {
        addTaskFromButton();
    }
});


addTask("first task", 1639944400000);
addTask("second task", 1539944400000);
addTask("third task");