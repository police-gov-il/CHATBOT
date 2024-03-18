
document.addEventListener('DOMContentLoaded', function() {
    var iframe = document.getElementById('chatbot');

    iframe.addEventListener('mouseenter', function() {
        try {
            var contentDocument = iframe.contentDocument || iframe.contentWindow.document;
            contentDocument.documentElement.dir = "rtl";
            contentDocument.body.dir = "rtl";
        } catch (error) {
            console.error("Error changing direction to RTL on hover: ", error);
            // Attempt to use postMessage for cross-origin iframes
            // This requires the iframe's content to have a listener set up to respond to postMessage commands.
            iframe.contentWindow.postMessage(JSON.stringify({ command: 'changeDirection', direction: 'rtl' }), '*');
        }
    });
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
    }, 100);

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
