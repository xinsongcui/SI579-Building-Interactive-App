import { useState } from "react";

export const description =
'In `src/problem_4.js`, write code that allows the user to increment the click counter by clicking the "Clicked" `<button />`\
 element (or reset it to `0` by clicking the "Reset" `<button />`). Then, **use\
 [the `localStorage` API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to make the click count\
 persistent**. When the user reloads the page, it should remember the number of clicks.\n\n\
 - *Note 1: your code should handle plural rules correctly; it should be "Clicked 1 time" and\
 "Clicked 2 time**s**".*\n\
 - *Note 2: remember that `localStorage` can only store **strings**.*\
 ';
const SAVED_TASKS_KEY = 'saved_tasks';

export function Problem () {
    const[count, setCount] = useState(()=>{
        const savedTasks = localStorage.getItem(SAVED_TASKS_KEY);
        const initialTasks = JSON.parse(savedTasks);
        return initialTasks || 0;    
    });
    

    function updateCount(){
        const stringifiedTasks = JSON.stringify(count+1);
        localStorage.setItem(SAVED_TASKS_KEY, stringifiedTasks);
        setCount(count+1);
    }

    function resetCount(){
        const stringifiedTasks = JSON.stringify(0);
        localStorage.setItem(SAVED_TASKS_KEY, stringifiedTasks);
        setCount(0);
    }

    return <div className="btn-group">
            <button className="btn btn-primary" onClick={updateCount} >Clicked {count} time{count===1?"":"s"}</button>
            <button className="btn btn-secondary" onClick={resetCount}>Reset</button>
        </div>;
    ;
}