//Script use es6. You can use "babeljs" for es5.
//Use tag "templ" (or raplace it in constant "TAG") 
//with attribute "src='hereTemplateSrc'".
//For example <templ src="components/header.html"><templ>
//And include this script in header 
//with attribute "defer" before all scripts.
(function () {
    const TAG = "templ";
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
                }
                else {
                    resolve(xhr.responseText);
                }
            };
        });
    }
    let tpls = document.getElementsByTagName(TAG);
    for (let i = 0; i < tpls.length; i++) {
        let src = tpls[0].getAttribute(ATTRIBUTE);
        getHTML(src).then(content => {
            tpls[0].insertAdjacentHTML('beforebegin', content);
            tpls[0].parentNode.removeChild(tpls[0]);
        });
    }
}());