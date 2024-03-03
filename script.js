const chatbox = document.querySelector(".output p");
const chatInput = document.querySelector(".input-loc");
const sendChatBtn = document.querySelector(".add-button");

let userMessage = null; // Variable to store user's message
let gptResponse = null;
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

    // Send POST request to API, get response and set the response as paragraph text
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data.choices[0].message.content.trim());
            gptResponse = data.choices[0].message.content.trim();
            console.log (gptResponse.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/ - /g, "<br>- ").replace(/\n(?=\d+:)/g, "<br>"))
            chatbox.innerHTML = gptResponse.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/- /g, "<br>- ").replace(/\n(?=\d+:)/g, "<br>");
        })
        .catch(() => {
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
//gptResponse = '**March 3rd, Friday** - 9:00am: Arrival in Berkeley - Visit Berkeley Botanical Garden - Lunch at **Chez Panisse** - Explore Telegraph Avenue for shopping - Dinner at **Comal** **March 4th, Saturday** - Breakfast at **La Note** - Lunch at **Jupiter**'
// gptResponse = ''
// const formattedResponse = gptResponse.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/ - /g, "<br>- ");
// chatbox.innerHTML = formattedResponse;