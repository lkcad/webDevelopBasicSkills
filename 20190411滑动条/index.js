(function (window) {
    var SliderBar = function SliderBar(root, percent) {
        if (!root || root.nodeType !== Node.ELEMENT_NODE) {
            throw Error('请确保构造函数的第一个参数为DOM节点')
        }
        this.root = root;
        this.percent = percent || 0;
        this.isMobile = "ontouchstart" in window;
        this.setPercentThroughMouse = this.setPercentThroughMouse.bind(this);
        this.getSlidBarPosition = this.getSlidBarPosition.bind(this);
        this.render();
        this.bindEvent();
        this.getSlidBarPosition();
        window.addEventListener('resize', this.getSlidBarPosition)
    };
    SliderProtoType = SliderBar.prototype;

    // 将滑动条添加到DOM中。
    SliderProtoType.render = function () {
        this.sliderBarDom = document.createElement('div');
        this.sliderBarDom.setAttribute('class', 'slider');
        this.sliderBarDom.setAttribute('style', '--percent:' + this.percent);
        this.sliderTrack = document.createElement('button');
        this.sliderTrack.setAttribute('class', 'slider-track');
        this.sliderThumb = document.createElement('button');
        this.sliderThumb.setAttribute('class', 'slider-thumb');
        this.sliderBarDom.appendChild(this.sliderTrack);
        this.sliderBarDom.appendChild(this.sliderThumb);
        this.root.appendChild(this.sliderBarDom);
    };

    // 将滑动条的位置进行存储
    SliderProtoType.getSlidBarPosition = function (percent) {
        this.sliderTrackBoundingClientRect = this.sliderTrack.getBoundingClientRect();
    };

    // 用于设置滑动条的进度
    SliderProtoType.setPercent = function (percent) {
        this.percent = Math.round(percent * 100) / 100;
        if (this.percent < 0) {
            this.percent = 0
        } else if (this.percent > 100) {
            this.percent = 100
        }
        this.percentChange();
        this.sliderBarDom.setAttribute('style', '--percent:' + this.percent);
    };

    // 用于处理点击和滑动时的操作
    SliderProtoType.setPercentThroughMouse = function (e) {
        var left = this.sliderTrackBoundingClientRect.left;
        var width = this.sliderTrackBoundingClientRect.width;
        console.log(e);
        var clientX = this.isMobile ? (e.touches && e.touches[0].pageX) : e.clientX
        this.setPercent((clientX - left) / width * 100)
    };

    //绑定事件
    SliderProtoType.bindEvent = function () {
        var _this = this;
        var down = this.isMobile ? "touchstart" : 'mousedown';
        var move = this.isMobile ? 'touchmove' : 'mousemove';
        var up = this.isMobile ? 'touchend' : 'mouseup';
        window.addEventListener(up, function (e) {
            window.removeEventListener(move, _this.setPercentThroughMouse)
        });

        this.sliderThumb.addEventListener(down, function (e) {
            window.addEventListener(move, _this.setPercentThroughMouse)
        });

        this.sliderTrack.addEventListener('click', _this.setPercentThroughMouse)
    };

    // 执行监听函数，当滑动条变化，会执行实例的onPercentChange方法
    SliderProtoType.percentChange = function () {
        Object.prototype.toString.call(this.onPercentChange) === "[object Function]" && this.onPercentChange(this.percent)
    };

    //将构造函数挂在到window
    window.SliderBar = SliderBar
})(window);


var firstSlidBar = new SliderBar(document.body);
var secondSlidBar = new SliderBar(document.body);

secondSlidBar.onPercentChange = function (percent) {
    document.querySelector('.percent').innerText = percent
};

document.querySelector('.set-percent-btn').addEventListener('click', function () {
    firstSlidBar.setPercent(50)
});
