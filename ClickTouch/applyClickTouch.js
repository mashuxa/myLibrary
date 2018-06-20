function applyClickTouch(node, callback, argsArray) {
    if ('onclick' in document) {
        node.addEventListener("click", function () {
            callback.apply(node, argsArray);
        }); 
    } else { 
        node.addEventListener("touchstart", function () {
            callback.apply(node, argsArray);
        });
    } 
}
