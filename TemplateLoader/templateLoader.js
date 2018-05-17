//Script use es6. You can use "babeljs" for es5.
//Use tag "tpl" (or raplace it in constant "TAG") 
//with attribute "src='hereTemplateSrc'".
//For example <tpl defer src="components/header.html"><tpl>
//And include this script in header 
//with attribute "defer" before all scripts.
(function () {
    const TAG = "tpl";
    const ATTRIBUTE = "src";

    function getHTML(src) {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", src, true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) {
                    return;
                }
                if (xhr.status !== 200) {
                    console.error(xhr.status + ': ' + xhr.statusText);
                } else {
                    resolve(xhr.responseText);
                }
            };
        });
    }
    let tpls = document.getElementsByTagName(TAG);
    for (let i = 0; i < tpls.length; i++) {
        let src = tpls[i].getAttribute(ATTRIBUTE);
        getHTML(src).then(content => {
            tpls[i].insertAdjacentHTML('beforebegin', content);
            tpls[i].parentNode.removeChild(tpls[i]);
        });
    }
}());
