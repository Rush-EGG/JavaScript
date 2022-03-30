// 可以认为把整个function包起来的那个小括号是在执行整个function
// 再后面跟的那个小括号里就在给整个function的运行传参

// window是一个全局变量，在window下包括了很多方法，如alert, close等
// 现在我取一个未被使用的方法名"first"，把hello()方法赋给它
// 能够在html页面中避免因不同js文件中有相同的方法名而导致的全局污染
// 
(function (a) {
    var name = "tt";

    var hello = function () {
        alert(a + " & " + name);
    }

    window.first = hello;
})("pp");