window.onload = function () {
    // 获取标签
    var slider = $('slider');
    var slider_main = $('slider_main');
    var allBoxs = slider_main.children;
    var next = $('next');
    var prev = $('prev');
    var slider_index = $('slider_index');
    var iNow = 0; // 当前可视元素的索引

    // 动态创建索引器
    for (var i = 0; i < allBoxs.length; i++) {
        var span = document.createElement('span');
        span.innerHTML = i + 1;

        if(i == 0){
            span.className = 'slider_index_icon current';
        }else{
            span.className = 'slider_index_icon';
        }

        slider_index.appendChild(span);
    }

    // 让滚动的元素归位
    var scroll_w = parseInt(getStyle(slider, 'width')); //得到图片的宽度
    for(var i = 1; i < allBoxs.length; i ++){
        allBoxs[i].style.left = scroll_w + 'px';
    }

    // 监听下一张按钮的事件
    next.onclick = function(){
        /**
         * 让当前可视的图片滚到左边
         * 并让下一张图片显示到正中间
         */

        startAnimation(allBoxs[iNow], {
            "left": -scroll_w
        })
        // 让iNow更新
        iNow ++;
        if(iNow >= allBoxs.length){
            iNow = 0;
        }
        allBoxs[iNow].style.left = scroll_w + 'px';
        startAnimation(allBoxs[iNow], {
            "left": 0
        })

        // 改变索引
        changeIndex();
    }

    // 控制当前的索引
    function changeIndex(){
        for(var i = 0; i < slider_index.children.length;i ++){
            slider_index.children[i].className = 'slider_index_icon';
        }
        slider_index.children[iNow].className = 'slider_index_icon current';
    }
}

function $(id) {
    return typeof (id) == 'string' ? document.getElementById(id) : null;
}