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

    function replaceAllTags() {
        let templTag = document.getElementsByTagName(TAG)[0];
        if (templTag) {
            let src = templTag.getAttribute(ATTRIBUTE);
            getHTML(src).then(content => {
                templTag.insertAdjacentHTML('beforebegin', content);
            }).then(() => {
                templTag.parentNode.removeChild(templTag);
                replaceAllTags();
            });
        }
        else {
            return;
        }
    }
    replaceAllTags();
}());