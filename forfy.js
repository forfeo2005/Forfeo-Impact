/* * CERVEAU DE FORFY 🐶 (Version Vidéo MP4 Corrigée)
 */

// 1. CONFIGURATION
// Nom exact du fichier tel qu'il apparaît dans votre GitHub (Sensible aux majuscules !)
const forfyVideoSource = "GifForfy.MP4"; 

// 2. STYLE CSS
const forfyStyles = `
    #forfy-widget {
        position: fixed; bottom: 20px; right: 20px; z-index: 9999;
        font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; align-items: flex-end;
    }
    
    /* LA BULLE DE MESSAGE */
    #forfy-bubble {
        background: #64ffda; color: #0a192f;
        padding: 12px 20px; border-radius: 20px 20px 5px 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        font-weight: bold; white-space: nowrap;
        margin-bottom: 10px;
        display: none;
        animation: popIn 0.5s ease-out;
    }
    @keyframes popIn { from { opacity: 0; transform: translateY(20px) scale(0.8); } to { opacity: 1; transform: translateY(0) scale(1); } }

    /* L'ICÔNE (Le Cercle) */
    #forfy-icon {
        width: 70px; height: 70px; border-radius: 50%; 
        background: #112240; border: 3px solid #64ffda;
        cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4);
        display: flex; align-items: center; justify-content: center;
        overflow: hidden; transition: transform 0.3s;
        position: relative; /* Important pour centrer la vidéo */
    }
    #forfy-icon:hover { transform: scale(1.1) rotate(5deg); }
    
    /* LA VIDÉO À L'INTÉRIEUR */
    #forfy-video {
        width: 100%; height: 100%; 
        object-fit: cover; /* Remplit tout le cercle sans déformation */
        border-radius: 50%;
    }
    
    /* LA FENÊTRE DE CHAT */
    #forfy-window {
        display: none; width: 320px; height: 450px;
        background: #0a192f; border: 1px solid #64ffda;
        border-radius: 15px; overflow: hidden;
        flex-direction: column; box-shadow: 0 5px 25px rgba(0,0,0,0.6);
        margin-bottom: 15px;
    }
    .chat-header {
        background: #112240; padding: 15px; border-bottom: 1px solid #233554;
        display: flex; justify-content: space-between; align-items: center; color: #e6f1ff; font-weight:bold;
    }
    .chat-messages {
        flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;
    }
    .msg { padding: 10px; border-radius: 10px; font-size: 0.9em; max-width: 85%; }
    .msg-bot { background: #112240; color: #a8b2d1; align-self: flex-start; border-left: 3px solid #64ffda; }
    .msg-user { background: #64ffda; color: #0a192f; align-self: flex-end; font-weight: bold; }
    
    .chat-input-area {
        padding: 10px; border-top: 1px solid #233554; display: flex; gap: 5px; background: #0a192f;
    }
    #user-input {
        flex: 1; padding: 10px; border-radius: 5px; border: 1px solid #233554;
        background: #112240; color: #fff; outline: none;
    }
    #send-btn {
        background: #64ffda; color: #0a192f; border: none; padding: 10px 15px;
        border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 1.2em;
    }
`;

// Injecter le CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = forfyStyles;
document.head.appendChild(styleSheet);

// 3. LA BASE DE CONNAISSANCES
const knowledgeBase = [
    { keys: ["bonjour", "salut", "hello", "hi"], response: "Wouf ! Bonjour ! Je suis Forfy. Comment puis-je vous aider à propos de Forfeo ?" },
    { keys: ["c'est quoi", "mission", "forfeo"], response: "Forfeo est une plateforme de forfaits qui reverse 1% de ses bénéfices aux organismes du Québec. On transforme l'achat plaisir en geste solidaire ! 🐾" },
    { keys: ["1%", "pourcentage", "don", "argent"], response: "C'est simple : Forfeo prend 1% de ses propres bénéfices nets et le met dans une cagnotte. À la fin du mois, la communauté vote pour donner cet argent à une cause." },
    { keys: ["organisme", "partenaire", "inscrire", "obnl"], response: "Les organismes peuvent s'inscrire gratuitement via l'onglet 'Espace Organismes'. C'est simple et sans frais ! 🏢" },
    { keys: ["video", "film", "envoyer", "upload"], response: "Pour envoyer une vidéo : 1. Filmez votre expérience. 2. Envoyez-la via WeTransfer à client@forfeo.com. Consultez la page 'Vidéos' pour le tutoriel complet ! 🎥" },
    { keys: ["vote", "voter", "choisir"], response: "Le vote est ouvert à tous ! Allez sur la page 'Vote', choisissez votre cause préférée et validez. C'est vous qui décidez où va le 1%." },
    { keys: ["contact", "aide", "parler", "humain"], response: "Besoin d'un humain ? Écrivez à support@forfeo.com. Moi je ne suis qu'un chien virtuel ! 🐶" }
];

// 4. LOGIQUE INTELLIGENTE
function getBotResponse(input) {
    input = input.toLowerCase();
    for (let entry of knowledgeBase) {
        for (let key of entry.keys) {
            if (input.includes(key)) {
                return entry.response;
            }
        }
    }
    return "Je ne suis pas sûr de comprendre (je suis un petit chien après tout 🐶). Essayez 'vidéo', 'organisme' ou 'vote' !";
}

// 5. CRÉATION DU WIDGET HTML (Avec balise VIDEO)
const widgetHTML = `
    <div id="forfy-widget">
        <div id="forfy-window">
            <div class="chat-header">
                <span>🐶 Forfy - Assistant</span>
                <span onclick="toggleChat()" style="cursor:pointer; font-size:1.2em;">✖</span>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="msg msg-bot">Wouf ! Je suis là si vous avez des questions.</div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="user-input" placeholder="Posez une question..." onkeypress="handleKeyPress(event)">
                <button id="send-btn" onclick="sendMessage()">➤</button>
            </div>
        </div>

        <div id="forfy-bubble" onclick="toggleChat()">Wouf ! 👋</div>

        <div id="forfy-icon" onclick="toggleChat()">
            <video id="forfy-video" autoplay loop muted playsinline>
                <source src="${forfyVideoSource}" type="video/mp4">
            </video>
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', widgetHTML);

// 6. FONCTIONS DU CHAT
function toggleChat() {
    const win = document.getElementById("forfy-window");
    const bubble = document.getElementById("forfy-bubble");
    
    if (win.style.display === "none" || win.style.display === "") {
        win.style.display = "flex";
        bubble.style.display = "none";
    } else {
        win.style.display = "none";
        bubble.style.display = "block";
    }
}

function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.classList.add("msg", sender === "bot" ? "msg-bot" : "msg-user");
    div.innerText = text;
    document.getElementById("chat-messages").appendChild(div);
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;
    
    appendMessage(text, "user");
    input.value = "";
    
    setTimeout(() => {
        const response = getBotResponse(text);
        appendMessage(response, "bot");
    }, 600);
}

function handleKeyPress(e) {
    if (e.key === "Enter") sendMessage();
}

// 7. ACCUEIL CONTEXTUEL
function setBubbleGreeting() {
    const path = window.location.pathname;
    let msg = "Wouf ! Besoin d'aide ? 👋"; 
    
    if (path.includes("videos.html")) {
        msg = "Wouf ! Envoyez vos vidéos ici ! 🎥";
    } else if (path.includes("partenaires.html")) {
        msg = "Organismes : je réponds à vos questions ! 🏢";
    } else if (path.includes("vote.html")) {
        msg = "C'est le moment de voter ! 🗳️";
    } else if (path.includes("causes.html")) {
        msg = "Découvrez nos causes du mois ! ❤️";
    } else if (path.includes("apropos.html")) {
        msg = "Voici notre histoire ! 📖";
    } else if (path.includes("index.html") || path === "/") {
         msg = "Bienvenue ! 1% pour le Québec ! ⚜️";
    }
    
    const bubble = document.getElementById("forfy-bubble");
    if(bubble) {
        bubble.innerText = msg;
        bubble.style.display = "block";
        
        setTimeout(() => {
             if(document.getElementById("forfy-window").style.display !== "flex") {
                 bubble.style.opacity = "0.8";
             }
        }, 10000);
    }
}

// Lancer au chargement
window.onload = function() {
    setBubbleGreeting();
};
