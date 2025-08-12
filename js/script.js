import { Client } from "https://esm.sh/@gradio/client";

const hamburgerMenu = document.querySelector(".hamburger-menu");
const navBar = document.querySelector("nav");
const navMenu = document.querySelector(".nav-links");
const navItem = document.querySelectorAll(".nav-links li");
const scrollupBtn = document.querySelector(".scrollup");
let client=null;

// Show Hamburger Menu
hamburgerMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
  document.body.classList.toggle("stop-scroll");
});

// Close Hamburger Menu
navItem.forEach((link) => link.addEventListener("click", closeMenu));

function closeMenu() {
  navMenu.classList.remove("active");
  hamburgerMenu.classList.remove("active");
  document.body.classList.remove("stop-scroll");
}

// Activate Scroll Button
window.addEventListener("scroll", () => {
  if (window.scrollY >= window.innerHeight * 0.8 || window.pageYOffset > 300) {
    scrollupBtn.classList.add("display");
  } else {
    scrollupBtn.classList.remove("display");
  }
});

function scrollUp() {
  let position = document.documentElement.scrollTop || document.body.scrollTop;

  if (position > 0) {
    window.scrollTo(0, 0);
  }
}

scrollupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  scrollUp();
});

// Select Logo and Switch Elements
const lightSwitch = document.querySelector(".brighten");
const darkSwitch = document.querySelector(".darken");

const lightLogo = document.querySelector(".light-logo");
const darkLogo = document.querySelector(".dark-logo");

// Dark Mode Theme Switch
const themeSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
let skillhead=document.getElementById("head")
let interntype=document.getElementById("intertype")
let interdesp=document.getElementById("interndesp")
let remotespan=document.getElementById("remotespan")
themeSwitch.addEventListener("change", changeTheme, false);

//  Save selected mode in Local Storage
function changeTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme-color", "dark");
    localStorage.setItem("theme", "dark");
    skillhead.style.color="white"
    interntype.style.color="white"
    interdesp.style.color="white"
    remotespan.style.color="white"
    lightSwitch.classList.remove("hide");
    lightLogo.classList.remove("hide");
   
    darkSwitch.classList.add("hide");
    darkLogo.classList.add("hide");
  } else {
    document.documentElement.setAttribute("data-theme-color", "light");
    localStorage.setItem("theme", "light");

    lightSwitch.classList.add("hide");
    lightLogo.classList.add("hide");

    darkSwitch.classList.remove("hide");
    darkLogo.classList.remove("hide");
  }
}

// Save mode on reload
const selectedTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (selectedTheme) {
  document.documentElement.setAttribute("data-theme-color", selectedTheme);

  if (selectedTheme === "dark") {
    themeSwitch.checked = true;

    lightSwitch.classList.remove("hide");
    lightLogo.classList.remove("hide");

    darkSwitch.classList.add("hide");
    darkLogo.classList.add("hide");
  }
}

// Filter Projects by category
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((button) => button.classList.remove("active"));

    e.target.classList.add("active");
  });
});

const mixer = mixitup(".projects", {
  selectors: {
    target: ".project-box",
  },
  animation: {
    duration: 350,
  },
});

// Scroll to Webpage with definite height
document.documentElement.style.setProperty(
  "--scroll-padding",
  navBar.offsetHeight + "px"
);

// Animate on scroll
const observer = new IntersectionObserver((items) => {
  items.forEach((item) => {
    console.log(item);

    if (item.isIntersecting) {
      item.target.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
});

const hiddenElems = document.querySelectorAll(".hidden");
hiddenElems.forEach((entry) => observer.observe(entry));


// chatbot js

async function loadClient() {
      client = await Client.connect("vara-prasad-07/rag_model_backend");
      alert("You chat about vara prasad by asking questions in chatbot input field!");
      return;
    }
// Show chat popup on mobile when floating icon is clicked
const openChatBtn = document.getElementById('openChatBtn');
const chatPopupModal = document.getElementById('mobile-chat-modal');
const closeChatBtn = document.getElementById('mobile-close-btn');

if (openChatBtn && chatPopupModal && closeChatBtn) {
  openChatBtn.addEventListener('click', () => {
    chatPopupModal.style.display = 'flex';
  });
  closeChatBtn.addEventListener('click', () => {
    chatPopupModal.style.display = 'none';
  });
  // Optional: Close popup when clicking outside content
  chatPopupModal.addEventListener('click', (e) => {
    if (e.target === chatPopupModal) chatPopupModal.style.display = 'none';
  });
}

loadClient();

// Unified chat handler function
async function handleChatSubmit(e) {
    // Determine if we're in desktop or mobile mode
    const isDesktop = (e.type === "click" && e.target.id === "desktop-send-btn") || 
                     (e.type === "keydown" && e.key === "Enter" && e.target.id === "desktop-chat-input");
    const inputId = isDesktop ? 'desktop-chat-input' : 'mobile-chat-input';
    const containerId = isDesktop ? 'desktop-msg-container' : 'mobile-msg-container';
    const chatBoxId = isDesktop ? 'desktop-chat-box' : 'mobile-chat-box';
    
    // Get elements
    const input = document.getElementById(inputId);
    if (!input) {
        console.error(`Input element with ID '${inputId}' not found`);
        return;
    }
    
    const inputValue = input.value.trim();
    
    // Check if input is empty before proceeding
    if (!inputValue) {
        alert("Please enter a message before asking.");
        return; // Exit the function if no input
    }
    
    const chatBox = document.getElementById(chatBoxId);
    const msgContainer = document.getElementById(containerId);
    
    if (!chatBox || !msgContainer) {
        console.error(`Chat elements not found: chatBox=${chatBoxId}, msgContainer=${containerId}`);
        return;
    }
    
    // Clear input and hide elements
    input.value = '';
    const parent = chatBox.closest('.chat-content');
    if (parent) {
        const sparkleIcon = parent.querySelector('.sparkle-icon');
        const suggestions = parent.querySelector('.suggestions');
        const mainPrompt = parent.querySelector('.main-prompt');
        
        if (sparkleIcon) sparkleIcon.style.display = 'none';
        if (suggestions) suggestions.style.display = 'none';
        if (mainPrompt) mainPrompt.style.display = 'none';
    }

    // Add user message
    let userMsg = document.createElement("div");
    userMsg.classList.add("msg-container");
    userMsg.innerHTML = inputValue;
    msgContainer.appendChild(userMsg);

    // Show loading animation
    let loadingMsg = document.createElement("div");
    loadingMsg.classList.add("msg_container_response", "loading-container");
    loadingMsg.innerHTML = `
        <div class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    `;
    msgContainer.appendChild(loadingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Handle bot response
    try {
        setTimeout(async () => {
            let responsecontent = await client.predict("/predict", [inputValue]);
            let responseR = responsecontent.data[0];
            
            // Remove loading animation
            loadingMsg.remove();
            
            // Create bot response with typing animation
            let botResponse = document.createElement("div");
            botResponse.classList.add("msg_container_response");
            msgContainer.appendChild(botResponse);
            
            // Type out the response character by character
            await typeResponse(botResponse, responseR);
            
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
    } catch (error) {
        console.error("Error:", error);
        // Remove loading animation on error
        loadingMsg.remove();
        alert("Error fetching response: " + error.message);
    }

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to type out response character by character
async function typeResponse(element, text) {
    element.innerHTML = '';
    element.classList.add('typing');
    
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text[i];
        
        // Add a small delay between characters for natural typing effect
        // Add slight randomness to make it more human-like
        const baseDelay = 30;
        const randomDelay = Math.random() * 20; // 0-20ms random variation
        await new Promise(resolve => setTimeout(resolve, baseDelay + randomDelay));
    }
    
    // Remove typing class after animation completes
    element.classList.remove('typing');
}

// Handle Enter key press
function handleEnterKey(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const btnId = e.target.id === 'desktop-chat-input' ? 'desktop-send-btn' : 'mobile-send-btn';
        document.getElementById(btnId)?.click();
    }
}

// Add event listeners for desktop chat
document.getElementById('desktop-send-btn')?.addEventListener('click', handleChatSubmit);
document.getElementById('desktop-chat-input')?.addEventListener('keypress', handleEnterKey);

// Add event listeners for mobile chat
document.getElementById('mobile-send-btn')?.addEventListener('click', handleChatSubmit);
document.getElementById('mobile-chat-input')?.addEventListener('keypress', handleEnterKey);

// Handle suggestion buttons for both interfaces
document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Find the nearest chat input within the same chat interface
        const chatContent = this.closest('.chat-content');
        if (chatContent) {
            const input = chatContent.querySelector('.chat-input');
            if (input) {
                input.value = this.textContent;
            }
        }
    });
});
