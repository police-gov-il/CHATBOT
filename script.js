
document.addEventListener('DOMContentLoaded', function() {
    var changeDirBtn = document.getElementById('changeDirBtn');

    changeDirBtn.addEventListener('click', function() {
        var iframe = document.getElementById('chatbot');
        try {
            var contentDocument = iframe.contentDocument || iframe.contentWindow.document;
            var htmlContent = contentDocument.documentElement.innerHTML;

            // Simple string replacement to change dir="ltr" to dir="rtl"
            var updatedHtmlContent = htmlContent.replace(/dir="ltr"/g, 'dir="rtl"');

            contentDocument.documentElement.innerHTML = updatedHtmlContent;
        } catch (error) {
            console.error("Unable to modify iframe content:", error);
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

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('killBtn').addEventListener('click', function() {
        var iframe = document.getElementById('chatbot');
        try {
            var contentDocument = iframe.contentDocument || iframe.contentWindow.document;
            var style = contentDocument.createElement('style');
            style.innerHTML = `
                body, body * {
                    background-color: black !important;
                    color: white !important;
                    border-color: white !important;
                }
            `;
            contentDocument.head.appendChild(style);
        } catch (error) {
            console.error("Cannot invert colors due to cross-origin restrictions:", error);
            // You might attempt a postMessage strategy here, but it requires the iframe's content to be set up to respond.
        }
    });
});
