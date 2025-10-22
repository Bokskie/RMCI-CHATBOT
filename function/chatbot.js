document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    if (!chatBubble || !chatWindow) return;

    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatClearBtn = document.getElementById('chatClearBtn');
    
    let isBotTyping = false;

    const SESSION_STORAGE_KEYS = {
        HISTORY: 'chatHistory',
        USERNAME: 'chatUserName'
    };

    let userName = sessionStorage.getItem(SESSION_STORAGE_KEYS.USERNAME) || null; 

    function loadChatHistory() {
        const history = sessionStorage.getItem(SESSION_STORAGE_KEYS.HISTORY);
        userName = sessionStorage.getItem(SESSION_STORAGE_KEYS.USERNAME) || null;
        if (history) {
            chatBody.innerHTML = history;
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }
    loadChatHistory(); 

    function getWelcomeQuickRepliesHTML() {
        return "<div class='quick-replies'>" +
            "<button class='quick-reply-btn' data-reply='What is your location?'> Location</button>" +
            "<button class='quick-reply-btn' data-reply='What services do you offer?'> Services</button>" +
            "<button class='quick-reply-btn' data-reply='How to book an appointment?'> Appointment</button>" +
            "<button class='quick-reply-btn' data-reply='What are your operating hours?'> Operating Hours</button>" +
            "<button class='quick-reply-btn' data-reply='What is your contact number?'> Contact Info</button>" +
            "</div>";
    }

    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active') && chatBody.children.length === 0) {
            if (!userName) {
                addMessage('bot', "Hello! I'm the RMCI virtual assistant. What's your name?", true);
            } else {
                const welcomeMessage = `Hi ${userName}! How can I help you today? Here are some common questions:` + getWelcomeQuickRepliesHTML();
                addMessage('bot', welcomeMessage, false);
            }
        }
    });

    
    if (chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    if (chatClearBtn) {
        chatClearBtn.addEventListener('click', () => {
            chatBody.innerHTML = '';
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.HISTORY);
            sessionStorage.removeItem(SESSION_STORAGE_KEYS.USERNAME);
            userName = null;
    
            const welcomeMessage = "Hello! I'm the RMCI virtual assistant. What's your name?";
    
            setTimeout(() => {
                addMessage('bot', welcomeMessage, true);
            }, 300);
        });
    }

    chatSendBtn.addEventListener('click', () => {
        sendMessage();
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !isBotTyping) {
            sendMessage();
        }
    });

    chatBody.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains('quick-reply-btn')) {
            const button = e.target;
            if (button.disabled) return;

            const replyText = button.getAttribute('data-reply');
            sendMessage(replyText);

            const parentReplies = button.closest('.quick-replies');
            if (parentReplies) {
                parentReplies.querySelectorAll('.quick-reply-btn').forEach(btn => {
                    btn.disabled = true;
                    btn.classList.add('disabled');
                });
            }
        }
        else if (e.target.closest('.feedback-btn')) {
            const feedbackBtn = e.target.closest('.feedback-btn');
            const parentMessage = feedbackBtn.closest('.chat-message.bot');
            const feedbackContainer = parentMessage.querySelector('.feedback-buttons');

            if (feedbackContainer.querySelector('.selected')) return;

            feedbackBtn.classList.add('selected');
            if (feedbackBtn.classList.contains('feedback-up')) {
                feedbackBtn.classList.add('up');
                feedbackBtn.classList.add('down');
            }
            console.log(`Feedback received: ${feedbackBtn.title}`); // For debugging
        }
    });

    function sendMessage(predefinedMessage = null) {
        if (isBotTyping) return; 
        const userMessage = predefinedMessage || chatInput.value.trim();
        if (userMessage === '') return;

        addMessage('user', userMessage);

        if (!userName) {
            chatInput.value = '';
            userName = userMessage.split(' ')[0];
            sessionStorage.setItem(SESSION_STORAGE_KEYS.USERNAME, userName);
            const welcomeMessage = `Nice to meet you, ${userName}! How can I help you? Here are some common questions:` + getWelcomeQuickRepliesHTML();
            addMessage('bot', welcomeMessage, true);
            return;
        }

        if (!predefinedMessage) {
            chatInput.value = '';
        }

        
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage('bot', botResponse, true);
        }, 1000);
    }

    function addMessage(sender, message, isTypingEffect = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        chatBody.appendChild(messageElement);

        if (sender === 'bot' && isTypingEffect) {
            typewriterEffect(messageElement, message);
        } else {
            messageElement.innerHTML = message;
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        if (!isBotTyping) {
            sessionStorage.setItem(SESSION_STORAGE_KEYS.HISTORY, chatBody.innerHTML);
        }
    }

    function typewriterEffect(element, htmlContent) {
        isBotTyping = true;
        chatInput.disabled = true;
        chatSendBtn.disabled = true;
        chatInput.placeholder = "Assistant is typing...";

        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

       
        element.innerHTML = '';

        let currentElement = element;
        let nodeIndex = 0;
        const nodes = Array.from(tempDiv.childNodes);

        function type() {
            if (nodeIndex >= nodes.length) {
                
                isBotTyping = false;
                chatInput.disabled = false;
                chatSendBtn.disabled = false;
                chatInput.placeholder = "Type a message...";
                chatInput.focus();
                sessionStorage.setItem(SESSION_STORAGE_KEYS.HISTORY, chatBody.innerHTML);

                if (!htmlContent.includes('quick-replies')) {
                    const feedbackContainer = document.createElement('div');
                    feedbackContainer.className = 'feedback-buttons';
                    feedbackContainer.innerHTML = `
                        <button class="feedback-btn feedback-up" title="Helpful">
                            <i class="fa-solid fa-thumbs-up"></i>
                        </button>
                        <button class="feedback-btn feedback-down" title="Not Helpful">
                            <i class="fa-solid fa-thumbs-down"></i>
                        </button>`;
                    element.appendChild(feedbackContainer);
                }
                return;
            }

            const node = nodes[nodeIndex];

            if (node.nodeType === Node.TEXT_NODE) {
                let text = node.textContent;
                let i = 0;
                (function typeChar() {
                    if (i < text.length) {
                        currentElement.innerHTML += text.charAt(i);
                        i++;
                        chatBody.scrollTop = chatBody.scrollHeight;
                        setTimeout(typeChar, 20);
                    } else {
                        nodeIndex++;
                        setTimeout(type, 20);
                    }
                })();
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                currentElement.appendChild(node.cloneNode(true));
                
                nodeIndex++;
                setTimeout(type, 20);
            }
        }
        type();
    }

    const responses = new Map([
        [['hello', 'hi'], "Hi there! How can I assist you today?"],
        [['hours', 'open'], "Our hospital provides 24/7 emergency services. For outpatient and clinic schedules, it's best to check our 'Find a Doctor' page or call us directly."],
        [['location', 'address', 'what is your location?'], "We are located at Zone 4, Capunuyan, Aplaya, Jasaan, Misamis Oriental. You can find an interactive map on our <a href='contact.html'>Contact Us</a> page."],
        [['contact', 'phone', 'number'], "You can reach us at +63 88 8904412. For other inquiries, you can email us at revermedicalcenter.hr1@gmail.com."],
        [['book an appointment now!'], "You can request an appointment directly through our <a href='doctors.html'>Find a Doctor</a> page by selecting a specialist and clicking the 'Request an Appointment' button."],
        [['check doctor schedules'], "You can view the schedules of our specialists on the <a href='doctors.html'>Find a Doctor</a> page. Each doctor's card has their clinic schedule."],
        [['contact clinic'], "For direct inquiries or to schedule an appointment by phone, please call us at +63 88 8904412 or visit our <a href='contact.html'>Contact Us</a> page."],
        [['appointment', 'doctor', 'schedule', 'how to book an appointment?'], 
            "What would you like to do regarding appointments? <div class='quick-replies'>" +
            "<button class='quick-reply-btn' data-reply='Book an appointment now!'>Book an appointment now!</button>" +
            "<button class='quick-reply-btn' data-reply='Check doctor schedules'>Check doctor schedules</button>" +
            "<button class='quick-reply-btn' data-reply='Contact clinic'>Contact clinic</button>" +
            "</div>"
        ],
        [['services', 'what services do you offer?', 'service'], "We offer a wide range of healthcare services. You can see a detailed list on our <a href='healthcare-services.html'>Healthcare Services</a> page."],
        [['about'], "You can learn more about our history, mission, and vision on the <a href='about.html'>About Us</a> page."],
        [['thank'], () => `You're welcome, ${userName}! Is there anything else I can help you with?`],
        [['what is your name'], "My name is RMCI Virtual Assistant. How can I assist you today?"],
        [['what is my name', 'remember my name'], () => `Your name is, ${userName}! How can I assist you further?`],
        [['mama mary'], "The Mama Mary of Rever Medical Center is Keycel Rulida from Nurse Department!"],
        [['keycel'], "Keycel Rulida, a dedicated nurse from the Nursing Department, is fondly known as the “Mama Mary” of Rever Medical Center Inc. She captured the heart of Johnzyn, who deeply admires her kindness and grace.💙"],
        [['sir francis', 'francis'], "Sir Francis is our HMO Officer here at Rever Medical Center Inc. — the go-to person for all insurance and HMO concerns!"],
        [['joexander', 'quipanes', 'xander'], "Sir Joexander Quipanes is the Head of the Claims Department — the boss when it comes to PhilHealth and claim processing!"],
        [['alloius', 'arthur', 'alloy'], "Alloius Arthur or Alloyskie — the day one brother of Johnzyn! A true friend and solid companion from the start."],
        [['eazah'], "Eazah is Johnzyn’s bestie and his first lodi! Always supportive and full of positive vibes."],
        [['solh', 'sol', 'solfox'], "Ma’am Solh is the Head of the Billing Department — firm, smart, and always on top of every patient account detail!"],
        [['nova'], "Nova is from the Marketing Department — creative, friendly, and always ready to promote Rever Medical Center with passion!"],
        [['jasha'], "Jasha is part of the HR and Marketing team — energetic and dedicated to making RMCI a better workplace!"],
        [['christine'], "Christine is from HR — approachable, kind, and always making sure everyone in the hospital is doing great!"],
        [['val', 'sir val'], "Val is part of the IT Department — the tech wizard of Rever Medical Center Inc.! Always ready to fix, set up, and save the day when computers go wild. 💻⚡"],
        [['shaira', 'beshy', 'bestfriend shai'], "Shaira or that's my Tomboy is bestfriend and beshy of Johnzyn since birth 💖 Always there through ups and downs, supportive in every way, and one of the realest people who never fails to make things brighter!"]
    ]);

    function getBotResponse(userInput) {
        const lowerInput = userInput.toLowerCase();

        for (const [keywords, response] of responses.entries()) {
            if (keywords.some(keyword => lowerInput.includes(keyword))) {
                return typeof response === 'function' ? response() : response;
            }
        }

        return "I'm sorry, I'm not sure how to answer that. You can try asking about our location, services, or contact number. For complex questions, please call us at +63 88 8904412.";
    }
});