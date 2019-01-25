(function () {
    function checkIsDom(obj) {
        return obj && obj.nodeType && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    }

    function ScrollTopCheck(container, target) {
        if (!(this instanceof ScrollTopCheck)) {
            return new ScrollTopCheck(container, target)
        }
        this.isDom = checkIsDom(container);
        if (!(this.isDom || container === window) || !checkIsDom(target)) {
            throw Error('container and target is required')
        }
        this.container = container;
        this.target = target;
        this.containerHeught = this.isDom
            ? parseInt(window.getComputedStyle(container).height)
            : window.innerHeight;
        this.init();
    }

    var fn = ScrollTopCheck.prototype;
    fn.init = function () {
        this.container.addEventListener('scroll', this.scroll.bind(this));
    };

    fn.scroll = function (e) {
        var hasScrollHeight = this.isDom
            ? this.container.scrollTop
            : this.container.scrollY;
        if (hasScrollHeight > this.containerHeught / 2) {
            this.removeHidden()
        } else {
            this.addHidden();
        }
    };

    fn.addHidden = function () {
        this.target.setAttribute('hidden', 'true')
    };

    fn.removeHidden = function () {
        this.target.removeAttribute('hidden')
    };
    window && (window.ScrollTopCheck = ScrollTopCheck)
})();

//  说明：使用方法，直接在window上调用ScrollTopCheck函数或者new ScrollTopCheck(),两个必穿参数，
//  第一个是容器，比如windo或者div，第二个为需要隐藏的标签，暂且都为必传。
//  暂为适配移动端。
//  写成构造函数的形式，感觉之后如果增加逻辑比较好扩展一些，条理也更加清楚，
//  放在一个自执行函数里，避免了过多的变量造成全局的污染
