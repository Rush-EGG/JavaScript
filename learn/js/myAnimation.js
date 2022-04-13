var speed = 0;

function startAnimation(obj, json, fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        var cur = 0;
        var flag = true; // 为保证所有的属性都已经变为目标值
        for(var attr in json){
            switch (attr) {
                case 'opacity':
                    cur = Math.round(parseInt(getStyle(obj, attr)) * 100);
                    break;

                case 'scrollTop':
                    cur = obj[attr];
                    break;
            
                default:
                    cur = parseInt(getStyle(obj, attr));
                    break;
            }
            speed = (json[attr] - cur) / 20;
            // 防止speed的绝对值小于1时，对obj.style.width不起影响
            speed = json[attr] > cur ? Math.ceil(speed) : Math.floor(speed);

            if(cur != json[attr]){
                flag = false;
            }
            switch (attr) {
                case 'scrollTop':
                    obj.scrollTop = speed + cur;
                    break;

                case 'opacity':
                    obj.style[attr] = `alpha(opacity: ${cur + speed})`;
                    obj.style[attr] = (cur + speed) / 100;
                    break;
            
                default:
                    obj.style[attr] = speed + cur + 'px';
                    break;
            }
            // console.log(speed);
        }
        if(flag){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
            return;
        }
    }, 30);
}

function getStyle(obj, style){
    return getComputedStyle(obj, null)[style];
}