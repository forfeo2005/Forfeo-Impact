/* --- WIDGET FORFY INTELLIGENT --- */
(function() {
    // 1. INJECTION DU STYLE CSS (Optimisé Mobile)
    const style = document.createElement('style');
    style.innerHTML = `
        /* BOUTON FLOTTANT */
        .chat-widget-btn {
            position: fixed; bottom: 30px; right: 30px; width: 70px; height: 70px;
            background-color: #64ffda; border-radius: 50%; display: flex; justify-content: center; align-items: center;
            cursor: pointer; box-shadow: 0 0 20px rgba(100, 255, 218, 0.4); z-index: 99999;
            transition: transform 0.3s; animation: float 3s ease-in-out infinite;
            border: 2px solid #64ffda; overflow: visible;
        }
        .chat-video-icon { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .chat-widget-btn:hover { transform: scale(1.1); }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }

        /* BULLE D'AIDE */
        .chat-tooltip {
            position: absolute; bottom: 85px; left: 50%; transform: translateX(-50%);
            background-color: #e6f1ff; color: #0a192f; padding: 8px 15px; border-radius: 20px;
            font-size: 0.85em; font-weight: bold; white-space: nowrap; font-family: sans-serif;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3); pointer-events: none;
            animation: tooltipPopup 4s ease-in-out infinite;
        }
        .chat-tooltip::after {
            content: ''; position: absolute; top: 100%; left: 50%; margin-left: -5px;
            border-width: 5px; border-style: solid; border-color: #e6f1ff transparent transparent transparent;
        }
        @keyframes tooltipPopup { 0%, 100% { opacity: 0; transform: translate(-50%, 10px); } 20%, 80% { opacity: 1; transform: translate(-50%, 0); } }

        /* FENÊTRE DE CHAT */
        .chat-window {
            position: fixed; bottom: 110px; right: 30px; width: 360px; height: 550px;
            background-color: #112240; border-radius: 15px; border: 1px solid #64ffda;
            box-shadow: 0 20px 50px rgba(0,0,0,0.6); z-index: 99998;
            display: none; flex-direction: column; overflow: hidden; font-family: 'Segoe UI', sans-serif;
        }
        .chat-header { background-color: #0a192f; padding: 15px; border-bottom: 1px solid #233554; display: flex; justify-content: space-between; align-items: center; }
        .chat-header h4 { margin: 0; color: #e6f1ff; font-size: 1.1em; }
        .header-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1px solid #64ffda; }
        .close-chat { cursor: pointer; color: #8892b0; font-weight: bold; font-size: 1.5em; padding: 0 10px; }
        
        .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; background-color: #112240; }
        .message { padding: 12px 16px; border-radius: 12px; font-size: 0.95em; max-width: 85%; line-height: 1.4; }
        .bot-msg { background-color: #233554; color: #ccd6f6; align-self: flex-start; border-bottom-left-radius: 2px; }
        .user-msg { background-color: #64ffda; color: #0a192f; align-self: flex-end; border-bottom-right-radius: 2px; font-weight: 600; }
        
        .chat-input-area { padding: 15px; background-color: #0a192f; border-top: 1px solid #233554; display: flex; gap: 10px; }
        .chat-input { flex: 1; padding: 12px; border-radius: 25px; border: 1px solid #233554; background-color: #112240; color: #fff; outline: none; font-size: 1em; }
        .send-btn { background: none; border: none; color: #64ffda; cursor: pointer; font-size: 1.5em; display: flex; align-items: center; }

        /* --- MOBILE OPTIMIZATION (FULL SCREEN) --- */
        @media only screen and (max-width: 480px) {
            .chat-window {
                width: 100% !important;
                height: 100% !important;
                bottom: 0 !important;
                right: 0 !important;
                border-radius: 0 !important;
                border: none !important;
                position: fixed;
                top: 0;
            }
            .chat-widget-btn {
                bottom: 20px; right: 20px; /* Un peu plus près du bord sur mobile */
            }
            /* Cacher la bulle sur mobile pour ne pas gêner */
            .chat-tooltip { display: none; }
            
            /* Ajuster la zone de saisie pour les doigts */
            .chat-input-area { padding-bottom: 30px; /* Espace pour la barre de navigation iOS/Android */ }
        }
    `;
    document.head.appendChild(style);

    // 2. INJECTION DU HTML (STRUCTURE)
    const chatHTML = `
        <div class="chat-widget-btn" id="forfyBtn">
            <div class="chat-tooltip">Besoin d'aide ?</div>
            <video src="GifForfy.MP4" autoplay loop muted playsinline class="chat-video-icon"></video>
        </div>

        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <div style="display:flex; align-items:center; gap:10px;">
                    <video src="GifForfy.MP4" autoplay loop muted playsinline class="header-avatar"></video>
                    <div>
                        <h4 style="margin:0;">Forfy</h4>
                        <span style="font-size:0.75em; color:#64ffda;">Assistant Dons & Impact</span>
                    </div>
                </div>
                <span class="close-chat" id="closeChat">✕</span>
            </div>
            <div class="chat-body" id="chatBody">
                <div class="message bot-msg">
                    Wouf ! Je suis Forfy 🐾.<br>Je suis partout avec vous sur le site ! Une question sur les dons, les concours ou comment participer ?
                </div>
            </div>
            <div class="chat-input-area">
                <input type="text" id="userInput" class="chat-input" placeholder="Posez votre question...">
                <button class="send-btn" id="sendBtn">➤</button>
            </div>
        </div>
    `;
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = chatHTML;
    document.body.appendChild(wrapper);

    // 3. LOGIQUE JS (CERVEAU)
    const btn = document.getElementById('forfyBtn');
    const windowChat = document.getElementById('chatWindow');
    const close = document.getElementById('closeChat');
    const input = document.getElementById('userInput');
    const send = document.getElementById('sendBtn');
    const body = document.getElementById('chatBody');

    // Ouvrir / Fermer
    function toggle() {
        if (windowChat.style.display === 'flex') {
            windowChat.style.display = 'none';
        } else {
            windowChat.style.display = 'flex';
            // Focus sur l'input sur Desktop seulement (pour ne pas ouvrir le clavier sur mobile direct)
            if(window.innerWidth > 768) input.focus(); 
        }
    }
    btn.onclick = toggle;
    close.onclick = toggle;

    // Base de connaissance
    const knowledgeBase = [
        { keys: ["participer", "jouer", "comment faire", "marche", "fonctionne"], resp: "C'est très simple !<br>1. Achetez un forfait sur <a href='https://isow.forfeo.com' style='color:#64ffda'>Forfeo.com</a>.<br>2. 1% du profit va dans la cagnotte.<br>3. Vous êtes inscrit aux concours et vous pouvez voter pour la cause du mois !" },
        { keys: ["inscrire", "inscription", "compte", "créer"], resp: "Pour les utilisateurs, l'inscription est automatique à l'achat. Pour les **organismes** qui veulent bénéficier des dons, c'est par ici : <a href='partenaires.html' style='color:#64ffda'>Espace Partenaires</a>." },
        { keys: ["cause", "organisme", "partenaire", "association", "soutenir", "qui aidons nous"], resp: "Nous soutenons des OBNL québécois enregistrés (ex: Moisson, SPA, Refuges...). Vous pouvez voir des exemples sur la carte ci-dessus ou dans la section <a href='causes.html' style='color:#64ffda'>Causes</a>." },
        { keys: ["vote", "choisir", "gagner la cause", "sélection"], resp: "Le pouvoir est à vous ! Chaque mois, la communauté vote pour la cause qui recevra le don. Ça se passe sur la page <a href='vote.html' style='color:#64ffda'>Vote</a>." },
        { keys: ["concours", "gagner prix", "tirage", "cadeau"], resp: "On adore gâter notre communauté ! Nous avons des tirages trimestriels et des concours 'Escapade de Rêve'. Jetez un œil à la section <a href='index.html#concours' style='color:#64ffda'>Concours</a>." },
        { keys: ["argent", "don", "1%", "combien", "sous", "profit"], resp: "Forfeo s'engage fermement à reverser **1 % de ses bénéfices nets**. C'est un don corporatif qui ne coûte rien de plus au client lors de son achat." },
        { keys: ["qui êtes vous", "équipe", "forfeo c'est quoi", "histoire", "mission"], resp: "Nous sommes une équipe de passionnés québécois qui veulent reconnecter le commerce local à l'entraide sociale. Découvrez notre histoire sur la page <a href='apropos.html' style='color:#64ffda'>À Propos</a>." },
        { keys: ["bonjour", "salut", "allo", "hey", "coucou"], resp: "Wouf ! Bonjour ! Je suis prêt à vous guider sur le site. Posez-moi une question sur les concours ou les causes !" }
    ];

    function findResponse(text) {
        text = text.toLowerCase();
        for (let item of knowledgeBase) {
            if (item.keys.some(key => text.includes(key))) return item.resp;
        }
        return "Je ne suis pas sûr de comprendre. Je connais tout sur les **concours**, les **organismes**, le **vote** et comment **participer**. Essayez un mot-clé ! 🐶";
    }

    function sendMessage() {
        const text = input.value.trim();
        if (!text) return;

        // User msg
        const userDiv = document.createElement('div');
        userDiv.className = 'message user-msg';
        userDiv.innerText = text;
        body.appendChild(userDiv);
        input.value = '';
        body.scrollTop = body.scrollHeight;

        // Loading
        const loadDiv = document.createElement('div');
        loadDiv.className = 'message bot-msg';
        loadDiv.innerHTML = '<em>Forfy réfléchit... 🦴</em>';
        body.appendChild(loadDiv);
        body.scrollTop = body.scrollHeight;

        // Bot msg
        setTimeout(() => {
            loadDiv.innerHTML = findResponse(text);
            body.scrollTop = body.scrollHeight;
        }, 600);
    }

    send.onclick = sendMessage;
    input.onkeypress = (e) => { if(e.key === 'Enter') sendMessage(); };

})();
