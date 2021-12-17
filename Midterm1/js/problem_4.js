const messageInput = document.querySelector('#problem-4 #message-input');
const messageFeedback = document.querySelector('#problem-4 #message-feedback')

const MAX_CHARACTERS = 50;

// Write your code here
messageInput.addEventListener("input", ()=>{
    if(messageInput.value.length <= MAX_CHARACTERS){
        if(messageInput.classList.contains("is-invalid")){
            messageInput.classList.remove("is-invalid");
        }
        messageInput.classList.add("is-valid");
        if(messageFeedback.classList.contains("invalid-feedback")){
            messageFeedback.classList.remove("invalid-feedback");
        }
        messageFeedback.classList.add("valid-feedback");
        let len =  MAX_CHARACTERS - messageInput.value.length 
        messageFeedback.textContent =  len + " character" +addS(len) + " left";
    }
    else{
        if(messageInput.classList.contains("is-valid")){
            messageInput.classList.remove("is-valid");
        }
        messageInput.classList.add("is-invalid");
        if(messageFeedback.classList.contains("valid-feedback")){
            messageFeedback.classList.remove("valid-feedback");
        }
        messageFeedback.classList.add("invalid-feedback"); 
        let len =  messageInput.value.length - MAX_CHARACTERS;
        messageFeedback.textContent = len + " character" + addS(len)+ " too long";
    }
});