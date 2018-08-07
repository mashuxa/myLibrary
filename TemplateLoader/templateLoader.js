"use strict";

//Script use es6. You can use "babeljs" for es5.
//Use tag "templ" (or raplace it in constant "TAG") 
//with attribute "src='hereTemplateSrc'".
//For example <templ src="components/header.html"><templ>
//And include this script in header 
//with attribute "defer" before all scripts.
//Also you can set src for scripts in array
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var scriptsSrc = [
            "design/js/jquery-3.3.1.min.js",
            "design/js/slick.js",
            "design/js/mobile-menu.js",
            "design/js/mobile.js"];
        var TAG = "templ";
        var ATTRIBUTE = "src";

        function getHTML(src) {
            return new Promise(function (resolve) {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", src, true);
                xhr.send();
                xhr.onreadystatechange = function () {
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

        function replaceAllTags() {
            var templTag = document.getElementsByTagName(TAG)[0];
            if (templTag) {
                var src = templTag.getAttribute(ATTRIBUTE);
                getHTML(src).then(function (content) {
                    templTag.insertAdjacentHTML('beforebegin', content);
                    templTag.parentNode.removeChild(templTag);
                    replaceAllTags();
                });
            } else {
                var counter = 0;

                function loadJS(fileSrc) {
                    new Promise(function (resolve) {
                        var script = document.createElement("script");
                        script.src = fileSrc;
                        script.setAttribute("defer", "");
                        document.body.appendChild(script);
                        counter++;
                        script.onload = resolve;
                    }).then(function () {
                        if (counter === scriptsSrc.length) {
                            return;
                        } else {
                            loadJS(scriptsSrc[counter]);
                        }
                    });
                }
                if (scriptsSrc.length) {
                    loadJS(scriptsSrc[counter]);
                }
            }
        }
        replaceAllTags();
    });
})();
