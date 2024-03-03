const chatbox = document.querySelector(".output p");
const chatInput = document.querySelector(".input-loc");
const sendChatBtn = document.querySelector(".add-button");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        chatbox.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        // messageElement.classList.add("error");
        chatbox.textContent = "Oops! Something went wrong. Please try again.";
    });
}

const handleChat = (event) => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;
    userMessage = "generate a travel itinerary for my trip to " + chatInput.value.trim() + "from march 3rd - march 5th. Use format date, day. Take into account weather, opening hours, closing hours. dont greet or give commentary in your response. Bold the days, add the times, be more specific at what restaurants, and list more activities per day. Make location names pressable to go to website.";
    chatInput.value = ""
    event.preventDefault(); 
    generateResponse();
}

sendChatBtn.addEventListener("click", handleChat);
// userMessage = "generate a travel itinerary for my trip to " + chatInput.value.trim() + "from march 3rd - march 5th. Use format date, day. Take into account weather, opening hours, closing hours. dont greet or give commentary in your response. Bold the days, add the times, be more specific at what restaurants, and list more activities per day. Make location names pressable to go to website.";