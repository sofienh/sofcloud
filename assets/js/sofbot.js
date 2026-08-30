import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js";

var _p = window.location.pathname;
var _c = {
  '/competences/':    '#6d28d9',
  '/experiences/':    '#1d4ed8',
  '/projets/':        '#b45309',
  '/veille/':         '#c2410c',
  '/a-propos/':       '#0e7490',
  '/lab-notes/':      '#fb7185'
};
var _col = '#1a6b3c';
for (var k in _c) {
  if (_p.indexOf(k) !== -1) { _col = _c[k]; break; }
}


Chatbot.init({
  chatflowid: "c4555371-e340-4826-b0a0-7ac4e810448b",
  apiHost: "https://bot.sofcloud.org",
  theme: {
    button: { bottom: 80, right: 20, backgroundColor: _col },
    chatWindow: {
      backgroundColor: "#1a1a1a",
      textColor: "#ffffff",
      title: "SofBot",
      welcomeMessage: "Bonjour ! Je suis SofBot, posez-moi vos questions sur Soufiane et ses projets.",
      titleColor: "#ffffff",
      titleBackgroundColor: _col,
      userMessage: { backgroundColor: _col, textColor: "#ffffff" },
      botMessage:  { backgroundColor: "#2a2a2a", textColor: "#ffffff" },
      textInput:   { backgroundColor: "#2a2a2a", textColor: "#ffffff", placeholder: "Posez votre question...", sendButtonColor: _col }
    }
  }
});
