function copyToClipboard(btnId, codeWrapperId) {
    document.body.addEventListener("click", function (e) {
        if (e.target.id === btnId) {
            var copyText = document.getElementById(codeWrapperId).innerHTML.trim();
            console.log(copyText);
            var textArea = document.createElement("textarea");
            textArea.value = copyText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            alert('Promocode ' + textArea.value + ' copied to clipboard');
            textArea.remove();
        }
    }); 
} 
copyToClipboard("copypromo", "promotocopy");
