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
