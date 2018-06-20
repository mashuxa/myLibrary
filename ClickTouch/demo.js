(function () {

    //начальные данные
    var yourNodeName = document.getElementById("btn");
    var arg1 = 123;
    var arg2 = "some string";

    function callThisFunction(args1, args2) {
        console.log(this, args1, args2);
    }


    // используем функцию
    // первых два аргументы обязательны, 1й - к чему привязать событие (node element), 2й callback
    // 3ий массив аргументов - попадут в callback - необязательные, любое кол-во
    applyClickTouch(yourNodeName, callThisFunction, [arg1, arg2]);






}());
