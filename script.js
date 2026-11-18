// ==================================================
//  GIRLS WHO CODE — SIMPLE CHATBOT
// ==================================================
//  This file has THREE main parts:
//    1. CUSTOMIZE YOUR CHATBOT  (edit this part!)
//    2. CHATBOT BRAIN           (how the bot thinks)
//    3. CHAT UI LOGIC           (how the chat works)
//
//  You only need to edit Part 1 to make the chatbot
//  your own. Parts 2 and 3 make everything run.
// ==================================================


// ##################################################
// #                                                #
// #   PART 1: CUSTOMIZE YOUR CHATBOT HERE!         #
// #                                                #
// #   ✏️  EDIT THE THREE THINGS BELOW:              #
// #      • botName         — your bot's name       #
// #      • botIntro        — your bot's intro line  #
// #      • responses       — what your bot says     #
// #                                                #
// ##################################################

// -----------------------------
// CUSTOMIZE YOUR CHATBOT HERE!
// -----------------------------

// The name of your chatbot. It shows up in the header!
const botName = "Nova";

// The intro message shown when the chat opens.
// It also appears as the personality tagline in the header.
const botIntro = "Hi! I'm Nova. I'm friendly and curious.";

// This is a "dictionary" of responses.
// The KEY (left side)  = a word the user might type.
// The VALUE (right side) = what the bot says back.
//
// To add a new response, just add a new line like:
//   "your keyword": "what the bot says",
//
// Tip: keep keywords in lowercase!
const responses = {
  "hello": "Hi there! How are you feeling today?",
  "hi": "Hey! So happy to see you! 😊",
  "girls who code": "Girls Who Code is all about sisterhood, coding, and empowerment! 💪",
  "code": "Coding is like giving instructions to a computer. It's super fun once you get the hang of it!",
  "help": "Sure! What do you need help with?",
  "name": "I'm " + botName + "! What's your name?",
  "how are you": "I'm doing great, thanks for asking! How about you?",
  "coding": "Coding is my favorite thing to talk about! What languages are you learning?",
  "python": "Python is a great first language — it reads almost like English!",
  "javascript": "JavaScript makes websites come alive. It's super powerful!",
  "html": "HTML is the skeleton of every website. Every page starts with it!",
  "css": "CSS is what makes things look pretty — colors, fonts, layouts, and more!",
  "fun": "Want to hear a joke? Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "joke": "Why did the programmer quit their job? Because they didn't get arrays! 😄",
  "thank": "You're so welcome! Happy to help! 💖",
  "bye": "Talk to you later! Keep coding and stay awesome! 👋",
  "goodbye": "See you next time! You've got this! ✨",
};

// The default message when the bot doesn't recognize a keyword.
// The bot will repeat the user's message back in quotes.
const defaultResponse = "Hmm, I don't know about that yet. Can you teach me about \"";


// ##################################################
// #                                                #
// #   PART 2: CHATBOT BRAIN                        #
// #                                                #
// #   This is how the bot decides what to say.     #
// #   You usually don't need to change this.       #
// #                                                #
// ##################################################

// This function takes the user's message and returns the bot's reply.
function getBotResponse(userMessage) {
  // Convert everything to lowercase so matching is easier.
  const message = userMessage.toLowerCase();

  // Loop through every keyword in the responses dictionary.
  for (const keyword in responses) {
    // If the user's message contains this keyword, return the matching response.
    if (message.includes(keyword)) {
      return responses[keyword];
    }
  }

  // If no keyword matched, return the default "teach me" message.
  return defaultResponse + userMessage + "\"? 🤔";
}


// ##################################################
// #                                                #
// #   PART 3: CHAT UI LOGIC                        #
// #                                                #
// #   This connects the chatbot brain to the       #
// #   on-screen chat window. You usually don't      #
// #   need to change this.                         #
// #                                                #
// ##################################################

// Grab the important elements from the HTML page.
const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Derive a short personality tagline from the intro for the header.
// This pulls the text after "I'm friendly and curious." style phrasing.
function getPersonalityTagline() {
  const match = botIntro.match(/I'm (.+?)\.?$/i);
  return match ? match[1] : "ready to chat";
}

// Show the bot's name and personality in the header.
document.getElementById("bot-name-display").textContent = botName;
document.getElementById("bot-personality-display").textContent = getPersonalityTagline();

// This function adds a message bubble to the chat window.
// "sender" is either "user" or "bot".
function addMessage(text, sender) {
  // Create a new div element for the message bubble.
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;

  // Add it to the chat window.
  chatWindow.appendChild(messageDiv);

  // Scroll to the bottom so the newest message is visible.
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// This function shows the three-dot "typing" animation while the bot "thinks."
function showTypingIndicator() {
  const indicator = document.createElement("div");
  indicator.classList.add("typing-indicator");
  indicator.id = "typing-indicator";
  indicator.innerHTML = "<span></span><span></span><span></span>";
  chatWindow.appendChild(indicator);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// This function removes the typing animation.
function hideTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) indicator.remove();
}

// This function runs when the user sends a message.
function sendMessage() {
  // Get the text the user typed and remove extra spaces.
  const text = userInput.value.trim();

  // If the input is empty, do nothing.
  if (text === "") return;

  // Show the user's message on the screen.
  addMessage(text, "user");

  // Clear the input box.
  userInput.value = "";

  // Show the typing animation.
  showTypingIndicator();

  // Ask the chatbot brain for a response.
  const botReply = getBotResponse(text);

  // Wait a short moment, then show the bot's reply.
  // This makes it feel like the bot is "thinking."
  setTimeout(() => {
    hideTypingIndicator();
    addMessage(botReply, "bot");
  }, 500);
}

// Send a message when the Send button is clicked.
sendButton.addEventListener("click", sendMessage);

// Send a message when the user presses the Enter key.
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Show a friendly welcome message when the page loads.
window.addEventListener("DOMContentLoaded", () => {
  addMessage(botIntro + " Type a message to chat with me! 💬", "bot");
});
