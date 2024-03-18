window.addEventListener('load', function () {
    var chatbotFrame = document.getElementById('chatbot');
    try {
        var insideDoc = chatbotFrame.contentDocument || chatbotFrame.contentWindow.document;
        insideDoc.documentElement.setAttribute('dir', 'rtl');
    } catch (e) {
        console.log('Cannot change the direction of the iframe content due to cross-origin policies.');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('animatedHeader');
    let headerText = header.textContent;
    header.innerHTML = "";
    for (let i = 0; i < headerText.length; i++) {
        let span = document.createElement('span');
        span.textContent = headerText[i];
        span.style.color = getRandomColor();
        header.appendChild(span);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    setInterval(() => {
        document.querySelectorAll('#animatedHeader span').forEach(span => {
            span.style.color = getRandomColor();
        });
    }, 1000);

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "childList") {
                let nodes = Array.from(mutation.addedNodes);
                for (let node of nodes) {
                    if (node.nodeType === 3) { // TEXT_NODE
                        let text = node.nodeValue;
                        let replacedText = text.replace('<span ', '<span dir="rtl" ');
                        if (replacedText !== text) {
                            node.nodeValue = replacedText;
                        }
                    }
                }
            }
        });
    });

    const chatbotFrame = document.getElementById('chatbot');
    chatbotFrame.onload = function() {
        let body = chatbotFrame.contentWindow.document.body;
        observer.observe(body, {
            childList: true,
            subtree: true
        });
    };
});

document.addEventListener('DOMContentLoaded', function() {
    var directionState = 'ltr'; // Initial direction state

    document.getElementById('toggleDirectionBtn').addEventListener('click', function() {
        directionState = directionState === 'ltr' ? 'rtl' : 'ltr';

        var iframe = document.getElementById('chatbot');
        try {
            var contentDocument = iframe.contentDocument || iframe.contentWindow.document;
            contentDocument.documentElement.dir = directionState;
            contentDocument.body.dir = directionState;
        } catch (error) {
            console.error("Direct manipulation failed, attempting postMessage.", error);
            iframe.contentWindow.postMessage(JSON.stringify({ command: 'changeDirection', direction: directionState }), '*');
        }
    });
});
