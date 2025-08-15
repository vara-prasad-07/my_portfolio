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
      // Replace alert with better UX - guide user to chat application
      guideUserToChat();
      return;
    }

// Function to guide user to chat application with better UX
function guideUserToChat() {
  // Check if we're on mobile or desktop
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Mobile-specific guidance
    guideMobileUser();
  } else {
    // Desktop-specific guidance
    guideDesktopUser();
  }
  
  // Show a subtle tooltip or hint for new users
  showChatHint();
}

// Function to guide desktop users to chat application
function guideDesktopUser() {
  const desktopChat = document.getElementById('desktop-chat');
  
  if (desktopChat) {
    // Add a subtle glow effect to desktop chat
    desktopChat.style.transition = 'all 0.3s ease';
    desktopChat.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.3)';
    
    // Add a gentle bounce animation to the sparkle icon
    const sparkleIcon = desktopChat.querySelector('.sparkle-icon');
    if (sparkleIcon) {
      sparkleIcon.style.animation = 'sparkleBounce 2s ease-in-out 3';
    }
    
    // Add a subtle highlight to the main prompt
    const mainPrompt = desktopChat.querySelector('.main-prompt');
    if (mainPrompt) {
      mainPrompt.style.transition = 'all 0.3s ease';
      mainPrompt.style.color = '#6C63FF';
      setTimeout(() => {
        mainPrompt.style.color = 'white';
      }, 2000);
    }
    
    // Add a subtle focus effect to the chat input
    const chatInput = desktopChat.querySelector('.chat-input');
    if (chatInput) {
      chatInput.style.transition = 'all 0.3s ease';
      chatInput.style.border = '2px solid rgba(108, 99, 255, 0.5)';
      chatInput.style.boxShadow = '0 0 10px rgba(108, 99, 255, 0.2)';
      
      // Remove the focus effect after animation
      setTimeout(() => {
        chatInput.style.border = '';
        chatInput.style.boxShadow = '';
      }, 3000);
    }
    
    // Add subtle animation to suggestion buttons
    const suggestionBtns = desktopChat.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach((btn, index) => {
      setTimeout(() => {
        btn.style.transition = 'all 0.3s ease';
        btn.style.transform = 'scale(1.05)';
        btn.style.backgroundColor = 'rgba(108, 99, 255, 0.3)';
        
        // Reset after animation
        setTimeout(() => {
          btn.style.transform = '';
          btn.style.backgroundColor = '';
        }, 1000);
      }, 500 + (index * 200)); // Stagger the animations
    });
    
    // Remove the glow effect after animation
    setTimeout(() => {
      desktopChat.style.boxShadow = '';
    }, 3000);
    
    // Create desktop background blur effect
    createDesktopBackgroundBlur();
  }
}

// Function to guide mobile users to chat application
function guideMobileUser() {
  const mobileChatBtn = document.getElementById('openChatBtn');
  
  if (mobileChatBtn) {
    // Enhanced mobile chat button animation
    mobileChatBtn.style.animation = 'mobileChatPulse 2s ease-in-out 3, mobileChatGlow 2s ease-in-out 3, mobileChatBorder 2s ease-in-out 3';
    
    // Add a stronger glow effect for mobile
    mobileChatBtn.style.transition = 'all 0.3s ease';
    mobileChatBtn.style.boxShadow = '0 0 25px rgba(108, 99, 255, 0.6)';
    mobileChatBtn.style.transform = 'scale(1.2)';
    
    // Add a pulsing border effect
    mobileChatBtn.style.border = '3px solid rgba(108, 99, 255, 0.8)';
    
    // Create a background blur effect around the button
    createMobileBackgroundBlur();
    
    // Reset the button after animation
    setTimeout(() => {
      mobileChatBtn.style.transform = 'scale(1)';
      mobileChatBtn.style.boxShadow = '';
      mobileChatBtn.style.border = '';
      mobileChatBtn.style.animation = '';
    }, 3000);
    
    // Remove background blur after animation
    setTimeout(() => {
      removeMobileBackgroundBlur();
    }, 3000);
  } else {
    // Fallback: if mobile chat button is not found, try to find it again
    console.log('Mobile chat button not found, attempting to locate...');
    setTimeout(() => {
      const retryMobileChatBtn = document.getElementById('openChatBtn');
      if (retryMobileChatBtn) {
        console.log('Mobile chat button found on retry');
        // Apply the same animations
        retryMobileChatBtn.style.animation = 'mobileChatPulse 2s ease-in-out 3, mobileChatGlow 2s ease-in-out 3, mobileChatBorder 2s ease-in-out 3';
        retryMobileChatBtn.style.transition = 'all 0.3s ease';
        retryMobileChatBtn.style.boxShadow = '0 0 25px rgba(108, 99, 255, 0.6)';
        retryMobileChatBtn.style.transform = 'scale(1.2)';
        retryMobileChatBtn.style.border = '3px solid rgba(108, 99, 255, 0.8)';
        
        createMobileBackgroundBlur();
        
        setTimeout(() => {
          retryMobileChatBtn.style.transform = 'scale(1)';
          retryMobileChatBtn.style.boxShadow = '';
          retryMobileChatBtn.style.border = '';
          retryMobileChatBtn.style.animation = '';
        }, 3000);
        
        setTimeout(() => {
          removeMobileBackgroundBlur();
        }, 3000);
      }
    }, 500);
  }
}

// Function to create desktop background blur effect
function createDesktopBackgroundBlur() {
  // Create a blur overlay for the entire page except the chat container
  const blurOverlay = document.createElement('div');
  blurOverlay.id = 'desktop-blur-overlay';
  blurOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 9998;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  
  document.body.appendChild(blurOverlay);
  
  // Fade in the blur
  setTimeout(() => {
    blurOverlay.style.opacity = '1';
  }, 100);
  
  // Add a spotlight effect around the chat container
  const chatContainer = document.getElementById('desktop-chat');
  if (chatContainer) {
    const rect = chatContainer.getBoundingClientRect();
    
    const spotlight = document.createElement('div');
    spotlight.id = 'desktop-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      top: ${rect.top - 20}px;
      left: ${rect.left - 20}px;
      width: ${rect.width + 40}px;
      height: ${rect.height + 40}px;
      background: radial-gradient(ellipse, rgba(108, 99, 255, 0.2) 0%, transparent 70%);
      border-radius: 16px;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(spotlight);
    
    // Fade in the spotlight
    setTimeout(() => {
      spotlight.style.opacity = '1';
    }, 200);
    
    // Remove desktop effects after animation
    setTimeout(() => {
      removeDesktopBackgroundBlur();
    }, 3000);
  }
}

// Function to remove desktop background blur
function removeDesktopBackgroundBlur() {
  const blurOverlay = document.getElementById('desktop-blur-overlay');
  const spotlight = document.getElementById('desktop-spotlight');
  
  if (blurOverlay) {
    blurOverlay.style.opacity = '0';
    setTimeout(() => {
      if (blurOverlay.parentNode) {
        blurOverlay.parentNode.removeChild(blurOverlay);
      }
    }, 500);
  }
  
  if (spotlight) {
    spotlight.style.opacity = '0';
    setTimeout(() => {
      if (spotlight.parentNode) {
        spotlight.parentNode.removeChild(spotlight);
      }
    }, 500);
  }
}

// Function to show a subtle hint about the chat functionality
function showChatHint() {
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;
  
  // Only show hint on mobile
  if (!isMobile) {
    return;
  }
  
  // Create a subtle hint element
  const hint = document.createElement('div');
  hint.className = 'chat-hint';
  hint.innerHTML = `
    <div class="hint-content">
      <span class="hint-icon">💬</span>
      <span class="hint-text">Hey!, let's talk.Click below to start chatting</span>
      <span class="hint-arrow">⬇️</span>
    </div>
  `;
  
  // Add styles with mobile-specific positioning
  const hintStyles = {
    position: 'fixed',
    bottom: '160px', // Position above the floating chat button
    right: '20px',
    left: '20px',
    background: 'rgba(108, 99, 255, 0.95)',
    color: 'white',
    padding: '16px 20px',
    borderRadius: '12px',
    fontSize: '16px',
    zIndex: '10000',
    opacity: '0',
    transform: 'translateY(50px)',
    transition: 'all 0.5s ease',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    fontWeight: '500',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    maxWidth: 'none'
  };
  
  // Apply styles
  Object.assign(hint.style, hintStyles);
  
  // Add to body
  document.body.appendChild(hint);
  
  // Animate in
  setTimeout(() => {
    hint.style.opacity = '1';
    hint.style.transform = 'translateY(0)';
  }, 100);
  
  // Auto-hide after 6 seconds for mobile (longer visibility)
  setTimeout(() => {
    hint.style.opacity = '0';
    hint.style.transform = 'translateY(50px)';
    setTimeout(() => {
      if (hint.parentNode) {
        hint.parentNode.removeChild(hint);
      }
    }, 500);
  }, 6000);
  
  // Add click to dismiss
  hint.addEventListener('click', () => {
    hint.style.opacity = '0';
    hint.style.transform = 'translateY(50px)';
    setTimeout(() => {
      if (hint.parentNode) {
        hint.parentNode.removeChild(hint);
      }
    }, 500);
  });
  
  // Add a subtle bounce animation to the hint
  setTimeout(() => {
    hint.style.transform = 'translateY(0) scale(1.02)';
    setTimeout(() => {
      hint.style.transform = 'translateY(0) scale(1)';
    }, 200);
  }, 300);
}

// Function to create background blur effect for mobile
function createMobileBackgroundBlur() {
  // Create a blur overlay around the chat button
  const blurOverlay = document.createElement('div');
  blurOverlay.id = 'mobile-blur-overlay';
  blurOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    z-index: 9998;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  
  document.body.appendChild(blurOverlay);
  
  // Fade in the blur
  setTimeout(() => {
    blurOverlay.style.opacity = '1';
  }, 100);
  
  // Add a spotlight effect around the chat button
  const spotlight = document.createElement('div');
  spotlight.id = 'mobile-spotlight';
  spotlight.style.cssText = `
    position: fixed;
    bottom: 86px;
    right: 30px;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(108, 99, 255, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  
  document.body.appendChild(spotlight);
  
  // Fade in the spotlight
  setTimeout(() => {
    spotlight.style.opacity = '1';
  }, 200);
  
  // Add a pointing arrow BELOW the chat button (pointing up to it)
  const arrow = document.createElement('div');
  arrow.id = 'mobile-pointing-arrow';
  arrow.innerHTML = '👆';
  arrow.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    font-size: 24px;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.5s ease;
    animation: arrowBounce 1s ease-in-out infinite;
  `;
  
  document.body.appendChild(arrow);
  
  // Fade in the arrow
  setTimeout(() => {
    arrow.style.opacity = '1';
  }, 300);
  
  // Add a connecting line between hint and chat button
  const connectingLine = document.createElement('div');
  connectingLine.id = 'mobile-connecting-line';
  connectingLine.style.cssText = `
    position: fixed;
    bottom: 140px;
    right: 54px;
    width: 2px;
    height: 20px;
    background: linear-gradient(to top, rgba(108, 99, 255, 0.8), transparent);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.5s ease;
  `;
  
  document.body.appendChild(connectingLine);
  
  // Fade in the connecting line
  setTimeout(() => {
    connectingLine.style.opacity = '1';
  }, 400);
}

// Function to remove mobile background blur
function removeMobileBackgroundBlur() {
  const blurOverlay = document.getElementById('mobile-blur-overlay');
  const spotlight = document.getElementById('mobile-spotlight');
  const arrow = document.getElementById('mobile-pointing-arrow');
  const connectingLine = document.getElementById('mobile-connecting-line');
  
  if (blurOverlay) {
    blurOverlay.style.opacity = '0';
    setTimeout(() => {
      if (blurOverlay.parentNode) {
        blurOverlay.parentNode.removeChild(blurOverlay);
      }
    }, 500);
  }
  
  if (spotlight) {
    spotlight.style.opacity = '0';
    setTimeout(() => {
      if (spotlight.parentNode) {
        spotlight.parentNode.removeChild(spotlight);
      }
    }, 500);
  }
  
  if (arrow) {
    arrow.style.opacity = '0';
    setTimeout(() => {
      if (arrow.parentNode) {
        arrow.parentNode.removeChild(arrow);
      }
    }, 500);
  }

  if (connectingLine) {
    connectingLine.style.opacity = '0';
    setTimeout(() => {
      if (connectingLine.parentNode) {
        connectingLine.parentNode.removeChild(connectingLine);
      }
    }, 500);
  }
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

// Add window resize event listener to handle screen size changes
window.addEventListener('resize', () => {
  // Remove any existing guidance elements when screen size changes
  const existingElements = [
    'mobile-blur-overlay',
    'mobile-spotlight', 
    'mobile-pointing-arrow',
    'mobile-connecting-line',
    'desktop-blur-overlay',
    'desktop-spotlight'
  ];
  
  existingElements.forEach(id => {
    const element = document.getElementById(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
  
  // Remove any existing chat hints
  const existingHints = document.querySelectorAll('.chat-hint');
  existingHints.forEach(hint => {
    if (hint.parentNode) {
      hint.parentNode.removeChild(hint);
    }
  });
});

