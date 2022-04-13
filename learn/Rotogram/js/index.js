window.onload = function () {
    // 获取标签
    var slider = $('slider');
    var slider_main = $('slider_main');
    var allBoxs = slider_main.children;
    var next = $('next');
    var prev = $('prev');
    var slider_index = $('slider_index');
    var iNow = 0; // 当前可视元素的索引
    var timer = null;

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

    // 监听上一张按钮的事件
    prev.onclick = function(){
        /**
         * 让当前可视的图片滚到右边
         * 并让上一张图片显示到中间
         */
        startAnimation(allBoxs[iNow], {
            "left": scroll_w
        })
        // 让iNow更新
        iNow --;
        if(iNow < 0){
            iNow = allBoxs.length - 1;
        }
        allBoxs[iNow].style.left = -scroll_w + 'px';
        startAnimation(allBoxs[iNow], {
            "left": 0
        })

        // 改变索引
        changeIndex();
    }

    var slider_index_icons = slider_index.children;
    // 遍历索引器，添加监听事件
    for(var i = 0; i < slider_index_icons.length; i++){
        slider_index_icons[i].onmousedown = function(){
            // console.log(this.innerHTML);
            var index = parseInt(this.innerHTML) - 1;

            // 点击的索引与当前的iNow进行对比
            if(index > iNow){
                startAnimation(allBoxs[iNow], {
                    "left": -scroll_w
                })
                allBoxs[index].style.left = scroll_w + 'px';
            }else if(index < iNow){
                startAnimation(allBoxs[iNow], {
                    "left": scroll_w
                })
                allBoxs[index].style.left = -scroll_w + 'px';
            }
            iNow = index;
            startAnimation(allBoxs[iNow], {
                "left": 0
            })

            // 改变索引
            changeIndex();
        }
    }

    // 开启定时器，自动播放
    timer = setInterval(autoPlay, 4000);
    // 但是当鼠标悬浮到轮播图上的任意位置时，就应该停止自动播放
    slider.onmouseover = function(){
        clearInterval(timer);
    }
    // 离开了就继续开启自动播放
    slider.onmouseout = function(){
        timer = setInterval(autoPlay, 4000);
    }

    // 自动播放的代码
    function autoPlay(){
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