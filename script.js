const chatbox = document.querySelector(".output p");
const inputLoc = document.querySelector(".input-loc");
const sendChatBtn = document.querySelector(".add-button");
const loadingCircle = document.querySelector('.circle');

let userMessage = null; 
let gptResponse = null;
let startDate = "03/03/2024";
let endDate = "03/05/2024";
let outputHeader = null;
const API_KEY = ''; 

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer `
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data.choices[0].message.content.trim());
            gptResponse =  data.choices[0].message.content.trim().replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/- /g, "<br>- ").replace(/#/g, "<br>- ").replace(/\n(?=\d+:)/g, "<br>");
            console.log(gptResponse);
            loadingCircle.style.display = 'none';
            chatbox.innerHTML = outputHeader + gptResponse;

        })
        .catch(() => {
            chatbox.textContent = "Oops! Something went wrong. Please try again.";
        });
}

const handleChat = (event) => {
    loadingCircle.style.display = 'block';
    outputHeader = 'Your trip to ' + inputLoc.value.trim()+":";
    outputHeader = '<h2 style =" font-style:italic; font-size:20px; text-align:left;">'+outputHeader+'</h2>';
    userMessage = inputLoc.value.trim(); 
    if(!userMessage) return;
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedStart = startDate.toLocaleDateString('en-US', options);
    const formattedEnd = endDate.toLocaleDateString('en-US', options);
    userMessage = "generate a travel itinerary for my trip to " + inputLoc.value.trim() + " from " +  formattedStart + ' to ' + formattedEnd + ".  Use format date, day. Dont greet or give commentary in your response. Bold the dates, add the time for each event, be more specific at what restaurants, and list more activities per day. Use ** to indicate bold text and # to indicate newline. Create two new lines between each date. Dont display dates as a list item.";
    inputLoc.value = ""
    console.log(userMessage);
    event.preventDefault(); 
    generateResponse();
}

$(function() {
$('input[name="daterange"]').daterangepicker({
    "startDate": new Date("03/03/2024"),
    "endDate": new Date("03/05/2024"),
    "opens": "center"
}, function(start, end, label) {
    startDate = new Date(start);
    endDate = new Date(end);
});
});

sendChatBtn.addEventListener("click", handleChat);
loadingCircle.style.display = "none";