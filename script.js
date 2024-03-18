
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


document.addEventListener('DOMContentLoaded', function() 
{
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


    document.addEventListener('DOMContentLoaded', function() {
        var changeDirBtn = document.getElementById('changeDirBtn');
        var killBtn = document.getElementById('killBtn');
    
        changeDirBtn.addEventListener('click', function() {
            console.log('Attempting to change direction to RTL.');
            // Your logic here
        });
    
        killBtn.addEventListener('click', function() {
            console.log('Attempting to invert colors.');
            // Your logic here
        });
    });
